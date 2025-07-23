
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { handleAsyncError } from '@/utils/errorHandling';
import { validateScheduleData } from '@/utils/inputValidation';
import { transformScheduleData } from '@/utils/transformers';
import { ScheduleData } from '@/types';
import { useScheduleStore } from '@/store/scheduleStore';

const ImportSchedule = () => {
  const navigate = useNavigate();
  const { scheduleId } = useParams();
  const { setScheduleData } = useScheduleStore();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (scheduleId) {
      console.log('Import triggered with scheduleId:', scheduleId);
      handleScheduleImport(scheduleId);
    } else {
      console.log('No scheduleId found in URL params');
      setError("No schedule data found in the URL. Please use a valid share link from the iOS app.");
      setIsLoading(false);
    }
  }, [scheduleId]);

  const handleScheduleImport = async (encodedData: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    console.log('=== SCHEDULE IMPORT DEBUG ===');
    console.log('1. Encoded data length:', encodedData.length);
    console.log('2. First 100 chars of encoded data:', encodedData.substring(0, 100));

    try {
      // Decode the schedule data from the URL parameter
      console.log('3. Attempting to decode base64 data...');
      const decodedData = atob(encodedData);
      console.log('4. Decoded data length:', decodedData.length);
      console.log('5. First 200 chars of decoded data:', decodedData.substring(0, 200));
      
      console.log('6. Attempting to parse JSON...');
      const rawDataJson = JSON.parse(decodedData);
      console.log('7. Raw imported data structure:', {
        hasName: !!rawDataJson.name,
        hasType: !!rawDataJson.type,
        hasEvents: !!rawDataJson.events,
        hasSetEvents: !!rawDataJson.setEvents,
        eventsCount: rawDataJson.events?.length || rawDataJson.setEvents?.length || 0,
        keys: Object.keys(rawDataJson)
      });
      console.log('8. Complete raw data:', rawDataJson);
      
      // Transform the data
      console.log('9. Transforming data...');
      const result = await handleAsyncError(
        () => Promise.resolve(transformScheduleData(rawDataJson)),
        'schedule_transform'
      );

      if (result.success === false) {
        console.error('10. Schedule transformation failed:', result.error.userMessage);
        setError(result.error.userMessage);
        setIsLoading(false);
        return;
      }

      const transformedData = result.data;
      console.log('10. Transformed data:', transformedData);

      // Apply validation - but with very permissive rules
      console.log('11. Validating transformed data...');
      const validationResult = validateScheduleData(transformedData);
      console.log('12. Validation result:', {
        isValid: validationResult.isValid,
        errorsCount: validationResult.errors.length,
        errors: validationResult.errors,
        hasEvents: validationResult.sanitizedData.events?.length > 0
      });

      if (!validationResult.isValid) {
        console.error('13. Validation failed with errors:', validationResult.errors);
        setError(`Schedule data validation failed: ${validationResult.errors.join(', ')}`);
        setIsLoading(false);
        return;
      }

      // Use the sanitized data
      const finalData = validationResult.sanitizedData;
      console.log('13. Final data to be stored:', finalData);

      // Persist to store and navigate
      setScheduleData(finalData);
      console.log('14. Data stored successfully, navigating to schedule page');
      
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
