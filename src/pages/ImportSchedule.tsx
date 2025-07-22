
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { handleAsyncError } from '@/utils/errorHandling';
import { validateScheduleData } from '@/utils/inputValidation';
import { transformScheduleData } from '@/utils/transformers';
import { ScheduleData } from '@/types';
import { useScheduleStore } from '@/store/scheduleStore';

const ImportSchedule = () => {
  const navigate = useNavigate();
  const { setScheduleData } = useScheduleStore();

  const [scheduleName, setScheduleName] = useState<string>('');
  const [scheduleType, setScheduleType] = useState<string>('custom');
  const [rawDataText, setRawDataText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsLoading(true);
    setError(null);

    if (acceptedFiles.length === 0) {
      setError("No files were uploaded.");
      setIsLoading(false);
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const fileContent = event.target?.result;
        if (typeof fileContent === 'string') {
          await handleRawDataInput(fileContent);
        } else {
          setError("Could not read the file content.");
        }
      } catch (e) {
        setError(`An error occurred while reading the file: ${(e as Error).message}`);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      setError("Failed to read the file.");
      setIsLoading(false);
    };

    reader.readAsText(file);

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/json': ['.json'] } })

  const handleRawDataInput = async (rawData: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const rawDataJson = JSON.parse(rawData);
      await handleTransformAndImport(rawDataJson);
    } catch (e) {
      setError(`Failed to parse JSON: ${(e as Error).message}`);
      setIsLoading(false);
    }
  };

  const handleTransformAndImport = async (rawData: any): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      // Transform the data using the enhanced validation
      const result = await handleAsyncError(
        () => Promise.resolve(transformScheduleData(rawData)),
        'schedule_transform'
      );

      if (result.success === false) {
        // Only access result.error here
        console.error('Schedule transformation failed:', result.error.userMessage);
        setError(result.error.userMessage);
        setIsLoading(false);
        return;
      }

      // Only access result.data here
      const transformedData = result.data;

      // Apply final validation before importing
      const validationResult = validateScheduleData(transformedData);
      if (!validationResult.isValid) {
        setError(`Schedule data validation failed: ${validationResult.errors.join(', ')}`);
        setIsLoading(false);
        return;
      }

      // Set additional metadata
      const finalData = validationResult.sanitizedData;
      finalData.name = scheduleName || finalData.name || 'Untitled Schedule';
      finalData.type = scheduleType;

      // Persist to store and navigate
      setScheduleData(finalData);
      toast({
        title: "Success!",
        description: "Schedule imported successfully.",
      })
      navigate('/schedule');
    } catch (error) {
      setError(`An unexpected error occurred: ${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await handleRawDataInput(rawDataText);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Import Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="scheduleName">Schedule Name</Label>
              <Input
                type="text"
                id="scheduleName"
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
                placeholder="Enter schedule name"
              />
            </div>

            <div>
              <Label htmlFor="scheduleType">Schedule Type</Label>
              <select
                id="scheduleType"
                className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-200 focus:outline-none"
                value={scheduleType}
                onChange={(e) => setScheduleType(e.target.value)}
              >
                <option value="custom">Custom</option>
                <option value="generated">Generated</option>
                <option value="imported">Imported</option>
              </select>
            </div>

            <div>
              <Label htmlFor="rawData">Raw Schedule Data (JSON)</Label>
              <Textarea
                id="rawData"
                value={rawDataText}
                onChange={(e) => setRawDataText(e.target.value)}
                placeholder="Paste raw JSON data here"
                rows={8}
              />
            </div>

            <div {...getRootProps()} className={`dropzone w-full p-4 border-2 border-dashed rounded-md cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p className="text-center text-blue-500">Drop the files here ...</p> :
                  <p className="text-center text-gray-500">Drag 'n' drop some files here, or click to select files</p>
              }
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Importing...' : 'Import Schedule'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportSchedule;
