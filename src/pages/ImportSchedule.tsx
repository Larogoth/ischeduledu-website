
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { handleAsyncError } from '@/utils/errorHandling';
import { validateScheduleData } from '@/utils/inputValidation';
import { transformScheduleData } from '@/utils/transformers';
import { ScheduleData } from '@/types';
import { useScheduleStore } from '@/store/scheduleStore';
import * as pako from 'pako';

const ImportSchedule = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { setScheduleData } = useScheduleStore();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Convert TimeInterval (seconds since 2001-01-01) to JavaScript Date
  const parseTimeInterval = (timeInterval: number): Date => {
    const swiftReferenceDate = new Date('2001-01-01T00:00:00Z');
    return new Date(swiftReferenceDate.getTime() + (timeInterval * 1000));
  };

  // Convert various date formats to readable time
  const parseDate = (dateValue: any): Date => {
    console.log('Parsing date value:', dateValue, 'Type:', typeof dateValue);
    
    if (typeof dateValue === 'string') {
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date;
      }
    } else if (typeof dateValue === 'number') {
      if (dateValue > 0 && dateValue < 1000000000) {
        return parseTimeInterval(dateValue);
      } else if (dateValue > 1000000000) {
        if (dateValue > 10000000000) {
          return new Date(dateValue);
        } else {
          return new Date(dateValue * 1000);
        }
      }
    }
    
    console.warn('Failed to parse date value, using current time:', dateValue);
    return new Date();
  };

  // Minimal format interfaces matching iOS app
  interface ShareableEvent {
    n: string;  // name
    s: number;  // startTime (TimeInterval)
    e: number;  // endTime (TimeInterval)
  }

  interface ShareableSchedule {
    n: string;  // name
    e: ShareableEvent[];  // events
    t: number;  // type (0 = custom, 1 = generated)
  }

  const convertMinimalToFullSchedule = (shareableSchedule: ShareableSchedule): any => {
    console.log('Converting minimal format:', shareableSchedule);
    
    const fullEvents = shareableSchedule.e.map(event => {
      const startTime = parseTimeInterval(event.s);
      const endTime = parseTimeInterval(event.e);
      
      return {
        name: event.n,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        start: startTime,
        end: endTime,
        color: '#3B82F6', // Default blue color
        colorData: { red: 0.231, green: 0.510, blue: 0.965 }, // Blue color data
        enableAlert: true  // Default alerts enabled
      };
    });
    
    const scheduleType = shareableSchedule.t === 0 ? 'custom' : 'generated';
    
    const fullSchedule = {
      name: shareableSchedule.n,
      scheduleType: scheduleType,
      type: scheduleType,
      events: fullEvents,
      setEvents: fullEvents, // Legacy support
      importedAt: new Date().toISOString()
    };
    
    console.log('✅ Converted schedule:', fullSchedule.name, 'with', fullEvents.length, 'events');
    return fullSchedule;
  };

  const extractDataParameters = (): { data: string | null; version: string; isCompressed: boolean } => {
    console.log('=== ENHANCED DATA EXTRACTION ===');
    
    const urlParams = new URLSearchParams(window.location.search);
    let data = urlParams.get('data');
    let version = urlParams.get('v') || '1';
    let isCompressed = urlParams.get('c') === '1';
    
    console.log('Initial parsing results:', { data: data?.substring(0, 50) + '...', version, isCompressed });
    
    if (data && data.includes('?v=')) {
      console.log('🔧 Detected malformed URL with query string in data parameter');
      
      const versionMatch = data.match(/\?v=(\d+)/);
      if (versionMatch) {
        version = versionMatch[1];
        console.log('✅ Extracted version:', version);
      }
      
      const compressionMatch = data.match(/\?c=(\d+)/);
      if (compressionMatch) {
        isCompressed = compressionMatch[1] === '1';
        console.log('✅ Extracted compression:', isCompressed);
      }
      
      const cleanData = data.split('?v=')[0];
      data = cleanData;
      console.log('✅ Cleaned data:', data.substring(0, 50) + '...');
    }
    
    console.log('Final extracted parameters:', { 
      data: data?.substring(0, 50) + '...', 
      version, 
      isCompressed 
    });
    
    return { data, version, isCompressed };
  };

  const decodeUrlSafeBase64 = (urlSafeBase64: string): Uint8Array => {
    try {
      let base64 = urlSafeBase64
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      
      const remainder = base64.length % 4;
      if (remainder > 0) {
        base64 += '='.repeat(4 - remainder);
      }
      
      const binaryString = atob(base64);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      return bytes;
    } catch (error) {
      console.error('❌ Base64 decoding error:', error);
      throw new Error('Invalid base64 encoding');
    }
  };
  
  const handleV3Format = (encodedData: string, isCompressed: boolean): any => {
    try {
      console.log('Processing v3 format, compressed:', isCompressed);
      
      const binaryData = decodeUrlSafeBase64(encodedData);
      
      let jsonData: string;
      
      if (isCompressed) {
        console.log('🔍 Attempting decompression...');
        
        let decompressedData: Uint8Array | null = null;
        
        try {
          decompressedData = pako.inflateRaw(binaryData);
        } catch (error) {
          console.log('❌ inflateRaw failed:', error.message || error);
        }
        
        if (!decompressedData) {
          try {
            decompressedData = pako.inflate(binaryData);
          } catch (error) {
            console.log('❌ inflate failed:', error.message || error);
          }
        }
        
        if (!decompressedData) {
          try {
            decompressedData = pako.ungzip(binaryData);
          } catch (error) {
            console.log('❌ ungzip failed:', error.message || error);
          }
        }
        
        if (!decompressedData) {
          jsonData = new TextDecoder().decode(binaryData);
        } else {
          jsonData = new TextDecoder().decode(decompressedData);
        }
      } else {
        jsonData = new TextDecoder().decode(binaryData);
      }
      
      if (!jsonData || jsonData.length === 0) {
        throw new Error('Decompressed data is empty');
      }
      
      let shareableSchedule: ShareableSchedule;
      try {
        shareableSchedule = JSON.parse(jsonData);
      } catch (parseError) {
        console.error('❌ JSON parsing failed:', parseError);
        throw new Error(`JSON parsing failed: ${parseError.message}`);
      }
      
      if (!shareableSchedule.n || !shareableSchedule.e || !Array.isArray(shareableSchedule.e)) {
        console.error('❌ Invalid schedule data structure:', shareableSchedule);
        throw new Error('Invalid schedule data structure - missing required fields (n, e, t)');
      }
      
      const fullSchedule = convertMinimalToFullSchedule(shareableSchedule);
      
      console.log('✅ Converted to full schedule:', fullSchedule.name);
      return fullSchedule;
      
    } catch (error) {
      console.error('❌ V3 format processing error:', error);
      throw new Error(`V3 format processing failed: ${error.message}`);
    }
  };

  const handleV2Format = (encodedData: string): any => {
    try {
      const binaryData = decodeUrlSafeBase64(encodedData);
      const jsonData = new TextDecoder().decode(binaryData);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('❌ V2 format processing error:', error);
      throw error;
    }
  };

  const handleV1Format = (encodedData: string): any => {
    try {
      const decodedData = decodeURIComponent(encodedData);
      const jsonString = atob(decodedData);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('❌ V1 format processing error:', error);
      throw error;
    }
  };

  const safeBase64Decode = (encodedData: string, version: string, isCompressed: boolean): any => {
    console.log('=== COMPREHENSIVE BASE64 DECODE ===');
    
    try {
      if (version === '3') {
        return handleV3Format(encodedData, isCompressed);
      } else if (version === '2') {
        return handleV2Format(encodedData);
      } else {
        return handleV1Format(encodedData);
      }
    } catch (error) {
      console.error('❌ All decode methods failed:', error);
      throw new Error('Failed to decode schedule data: ' + error.message);
    }
  };

  const handleScheduleImport = async (encodedData: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    console.log('=== SCHEDULE IMPORT DEBUG ===');
    console.log('1. Encoded data length:', encodedData.length);
    console.log('2. First 100 chars of encoded data:', encodedData.substring(0, 100));

    try {
      // Extract parameters from URL
      const { data: urlData, version, isCompressed } = extractDataParameters();
      
      let dataToDecode = encodedData;
      if (urlData) {
        dataToDecode = urlData;
      }

      // Decode the schedule data
      console.log('3. Attempting to decode data with version:', version, 'compressed:', isCompressed);
      const decodedData = safeBase64Decode(dataToDecode, version, isCompressed);
      console.log('4. Decoded data:', decodedData);
      
      // Transform the data
      console.log('5. Transforming data...');
      const result = await handleAsyncError(
        () => Promise.resolve(transformScheduleData(decodedData)),
        'schedule_transform'
      );

      if (result.success === false) {
        console.error('6. Schedule transformation failed:', result.error.userMessage);
        setError(result.error.userMessage);
        setIsLoading(false);
        return;
      }

      const transformedData = result.data;
      console.log('6. Transformed data:', transformedData);

      // Apply validation - but with very permissive rules
      console.log('7. Validating transformed data...');
      const validationResult = validateScheduleData(transformedData);
      console.log('8. Validation result:', {
        isValid: validationResult.isValid,
        errorsCount: validationResult.errors.length,
        errors: validationResult.errors,
        hasEvents: validationResult.sanitizedData.events?.length > 0
      });

      if (!validationResult.isValid) {
        console.error('9. Validation failed with errors:', validationResult.errors);
        setError(`Schedule data validation failed: ${validationResult.errors.join(', ')}`);
        setIsLoading(false);
        return;
      }

      // Use the sanitized data
      const finalData = validationResult.sanitizedData;
      console.log('9. Final data to be stored:', finalData);

      // Persist to store and navigate
      setScheduleData(finalData);
      console.log('10. Data stored successfully, navigating to schedule page');
      
      toast({
        title: "Success!",
        description: "Schedule imported successfully from your iOS app.",
      });
      
      navigate('/schedule');
    } catch (error) {
      console.error('=== IMPORT ERROR ===');
      console.error('Error type:', error?.constructor?.name);
      console.error('Error message:', error?.message);
      console.error('Full error:', error);
      
      let errorMessage = 'Invalid schedule link. Please check that you\'re using a complete share link from the iOS app.';
      
      if (error instanceof SyntaxError) {
        errorMessage = 'The schedule data format is corrupted. Please generate a new share link from the iOS app.';
      } else if (error?.message?.includes('atob')) {
        errorMessage = 'The schedule link is not properly encoded. Please generate a new share link from the iOS app.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('=== ImportSchedule useEffect TRIGGERED ===');
    
    const loadScheduleData = () => {
      try {
        console.log('=== STARTING DATA LOAD PROCESS ===');
        
        const { data: encodedData, version, isCompressed } = extractDataParameters();
        
        if (encodedData) {
          console.log('Found encoded data, attempting to decode...');
          
          try {
            const decodedData = safeBase64Decode(encodedData, version, isCompressed);
            const transformedData = transformScheduleData(decodedData);
            setScheduleData(transformedData);
            
          } catch (decodeError) {
            console.error('Failed to decode data:', decodeError);
            setError('Invalid schedule data format.');
          }
        } else if (scheduleId) {
          console.log('Attempting to load schedule by ID:', scheduleId);
          handleScheduleImport(scheduleId);
        } else {
          console.error('No schedule data found');
          setError('No schedule data found in URL. Please check that the share link is complete and try again.');
        }
      } catch (err) {
        console.error('Error in loadScheduleData:', err);
        setError(`An error occurred while loading the schedule data: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadScheduleData, 100);
    return () => clearTimeout(timer);
  }, [scheduleId, location.pathname, location.search, location.hash]);

  const handleRetry = () => {
    if (scheduleId) {
      handleScheduleImport(scheduleId);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Import Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-600">Importing your schedule...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Import Failed</h3>
                <p className="text-red-600">{error}</p>
              </div>
              
              <div className="space-y-2">
                <Button onClick={handleRetry} variant="outline" className="w-full">
                  Try Again
                </Button>
                <p className="text-sm text-gray-500">
                  Make sure you're using a complete share link from the iSchedulED iOS app.
                </p>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div className="text-center py-8">
              <p className="text-green-600">Schedule imported successfully! Redirecting...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportSchedule;
