
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
      handleScheduleImport(scheduleId);
    } else {
      setError("No schedule data found in the URL. Please use a valid share link from the iOS app.");
      setIsLoading(false);
    }
  }, [scheduleId]);

  const handleScheduleImport = async (encodedData: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Decode the schedule data from the URL parameter
      const decodedData = atob(encodedData);
      const rawDataJson = JSON.parse(decodedData);
      
      console.log('Raw imported data:', rawDataJson);
      
      // Transform the data
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

      // Apply final validation before importing
      const validationResult = validateScheduleData(transformedData);
      if (!validationResult.isValid) {
        setError(`Schedule data validation failed: ${validationResult.errors.join(', ')}`);
        setIsLoading(false);
        return;
      }

      // Use the sanitized data
      const finalData = validationResult.sanitizedData;

      // Persist to store and navigate
      setScheduleData(finalData);
      toast({
        title: "Success!",
        description: "Schedule imported successfully from your iOS app.",
      });
      navigate('/schedule');
    } catch (error) {
      console.error('Import error:', error);
      setError(`Invalid schedule link. Please check that you're using a complete share link from the iOS app.`);
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
