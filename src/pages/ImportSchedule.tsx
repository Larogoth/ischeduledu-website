
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { handleAsyncError } from '@/utils/errorHandling';
import { validateScheduleData, validateUrlParameter } from '@/utils/inputValidation';
import { transformScheduleData } from '@/utils/transformers';
import { ScheduleData } from '@/types';
import { useScheduleStore } from '@/store/scheduleStore';

const ImportSchedule = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setScheduleData } = useScheduleStore();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get data from URL query parameters
    const urlParams = new URLSearchParams(location.search);
    const dataParam = urlParams.get('data');
    
    console.log('ImportSchedule: URL search params:', location.search);
    console.log('ImportSchedule: Data parameter found:', dataParam ? 'YES' : 'NO');
    
    if (dataParam) {
      handleScheduleImport(dataParam);
    } else {
      setError("No schedule data found in the URL. Please use a valid share link from the iOS app.");
      setIsLoading(false);
    }
  }, [location.search]);

  const handleScheduleImport = async (encodedData: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('Starting schedule import process...');
      console.log('Encoded data length:', encodedData.length);
      console.log('Encoded data preview:', encodedData.substring(0, 100) + '...');

      // Validate URL parameter with more lenient validation
      const paramValidation = validateUrlParameter(encodedData);
      if (!paramValidation.isValid) {
        console.error('URL parameter validation failed:', paramValidation.error);
        setError(`Invalid share link: ${paramValidation.error}`);
        setIsLoading(false);
        return;
      }

      console.log('URL parameter validation passed');

      // Decode the schedule data from the URL parameter
      console.log('Attempting to decode base64 data...');
      let decodedData: string;
      try {
        decodedData = atob(encodedData);
      } catch (decodeError) {
        console.error('Base64 decode error:', decodeError);
        setError('The share link appears to be corrupted. Please try copying the link again from the iOS app.');
        setIsLoading(false);
        return;
      }
      
      console.log('Decoded data:', decodedData);
      
      console.log('Parsing JSON...');
      let rawDataJson: any;
      try {
        rawDataJson = JSON.parse(decodedData);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        setError('The schedule data format is invalid. Please check that the share link is complete.');
        setIsLoading(false);
        return;
      }
      
      console.log('Parsed JSON data:', rawDataJson);
      
      // Transform the data with minimal processing
      console.log('Transforming schedule data...');
      const result = await handleAsyncError(
        () => Promise.resolve(transformScheduleData(rawDataJson)),
        'schedule_transform'
      );

      if (result.success === false) {
        console.error('Schedule transformation failed:', result.error.userMessage);
        setError(result.error.userMessage);
        setIsLoading(false);
        return;
      }

      const transformedData = result.data;
      console.log('Transformed data:', transformedData);

      // Apply very lenient validation
      console.log('Validating transformed data...');
      const validationResult = validateScheduleData(transformedData);
      if (!validationResult.isValid) {
        console.error('Validation errors:', validationResult.errors);
        setError(`Schedule data validation failed: ${validationResult.errors.join(', ')}`);
        setIsLoading(false);
        return;
      }

      // Use the sanitized data
      const finalData = validationResult.sanitizedData;
      console.log('Final validated data:', finalData);

      // Persist to store and navigate
      setScheduleData(finalData);
      toast({
        title: "Success!",
        description: "Schedule imported successfully from your iOS app.",
      });
      
      console.log('Import completed successfully, navigating to schedule page...');
      navigate('/schedule');
    } catch (error) {
      console.error('Import error:', error);
      if (error instanceof Error) {
        setError(`Import failed: ${error.message}`);
      } else {
        setError('An unexpected error occurred during import. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    const urlParams = new URLSearchParams(location.search);
    const dataParam = urlParams.get('data');
    if (dataParam) {
      handleScheduleImport(dataParam);
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
