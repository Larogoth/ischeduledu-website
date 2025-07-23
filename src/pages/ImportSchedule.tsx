
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

interface ProcessedEvent {
  name: string;
  startTime: string;
  endTime: string;
  color?: string;
}

const ImportSchedule = () => {
  // const navigate = useNavigate();
  const { scheduleId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  // const { setScheduleData } = useScheduleStore();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [processedEvents, setProcessedEvents] = useState<ProcessedEvent[]>([]);

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

    try {
      // Extract parameters from URL
      const { data: urlData, version, isCompressed } = extractDataParameters();
      let dataToDecode = encodedData;
      if (urlData) {
        dataToDecode = urlData;
      }
      // Decode the schedule data
      const decodedData = safeBase64Decode(dataToDecode, version, isCompressed);
      // Transform the data
      const result = await handleAsyncError(
        () => Promise.resolve(transformScheduleData(decodedData)),
        'schedule_transform'
      );
      if (result.success === false) {
        setError(result.error.userMessage);
        setIsLoading(false);
        return;
      }
      const transformedData = result.data;
      // Apply validation
      const validationResult = validateScheduleData(transformedData);
      if (!validationResult.isValid) {
        setError(`Schedule data validation failed: ${validationResult.errors.join(', ')}`);
        setIsLoading(false);
        return;
      }
      // Use the sanitized data
      const finalData = validationResult.sanitizedData;
      setScheduleData(finalData);
      // Process events for display
      if (finalData.events && Array.isArray(finalData.events)) {
        setProcessedEvents(finalData.events.map((event: any) => ({
          name: event.name,
          startTime: event.startTime,
          endTime: event.endTime,
          color: event.color || undefined
        })));
      } else {
        setProcessedEvents([]);
      }
      toast({
        title: "Success!",
        description: "Schedule imported successfully from your iOS app.",
      });
      setIsLoading(false);
    } catch (error) {
      let errorMessage = 'Invalid schedule link. Please check that you\'re using a complete share link from the iOS app.';
      if (error instanceof SyntaxError) {
        errorMessage = 'The schedule data format is corrupted. Please generate a new share link from the iOS app.';
      } else if (error?.message?.includes('atob')) {
        errorMessage = 'The schedule link is not properly encoded. Please generate a new share link from the iOS app.';
      }
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadScheduleData = () => {
      try {
        const { data: encodedData, version, isCompressed } = extractDataParameters();
        if (encodedData) {
          try {
            handleScheduleImport(encodedData);
          } catch (decodeError) {
            setError('Invalid schedule data format.');
            setIsLoading(false);
          }
        } else if (scheduleId) {
          handleScheduleImport(scheduleId);
        } else {
          setError('No schedule data found in URL. Please check that the share link is complete and try again.');
          setIsLoading(false);
        }
      } catch (err) {
        setError(`An error occurred while loading the schedule data: ${err.message}`);
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
          {!isLoading && !error && scheduleData && (
            <div className="text-center py-8">
              <h2 className="text-xl font-bold mb-4">{scheduleData.name}</h2>
              <ul className="space-y-2">
                {processedEvents.map((event, idx) => (
                  <li key={idx} className="border rounded p-2">
                    <strong>{event.name}</strong>: {event.startTime} - {event.endTime}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportSchedule;
