
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Download, Calendar, Clock, Users } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface ScheduleData {
  name: string;
  type: string;
  subjects: string[];
  periods: number;
  startTime: string;
  endTime: string;
  days: string[];
  notifications: boolean;
}

const ImportSchedule = () => {
  const { scheduleId } = useParams();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadScheduleData = () => {
      try {
        // Try to get data from URL query parameter first
        const encodedData = searchParams.get('data');
        if (encodedData) {
          const decodedData = JSON.parse(atob(encodedData));
          setScheduleData(decodedData);
        } else if (scheduleId) {
          // For future implementation with specific schedule IDs
          // This would normally fetch from a backend, but for now we'll show a message
          setError('Schedule ID lookup not yet implemented');
        } else {
          setError('No schedule data found in URL');
        }
      } catch (err) {
        setError('Invalid schedule data format');
      } finally {
        setIsLoading(false);
      }
    };

    loadScheduleData();
  }, [scheduleId, searchParams]);

  const handleOpenInApp = () => {
    // Try to open in the iOS app using custom URL scheme
    const appUrl = `ischededu://import?data=${searchParams.get('data')}`;
    window.location.href = appUrl;
    
    // Fallback to App Store after a delay if app doesn't open
    setTimeout(() => {
      window.open('https://apps.apple.com/app/your-app-id', '_blank');
    }, 2000);
  };

  const handleDownloadApp = () => {
    window.open('https://apps.apple.com/app/your-app-id', '_blank');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">iSchedulEDU</h1>
          <p className="text-gray-600">Import your shared schedule</p>
        </div>

        {error ? (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Schedule</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={() => window.location.href = '/'} variant="outline">
                  Go to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : scheduleData ? (
          <>
            {/* Schedule Preview */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {scheduleData.name}
                </CardTitle>
                <CardDescription>
                  Schedule preview - Import to your iSchedulEDU app
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Schedule Type</label>
                      <p className="text-gray-900">{scheduleData.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Time Range</label>
                      <div className="flex items-center gap-2 text-gray-900">
                        <Clock className="w-4 h-4" />
                        {scheduleData.startTime} - {scheduleData.endTime}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Periods</label>
                      <p className="text-gray-900">{scheduleData.periods} periods</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Days</label>
                      <div className="flex flex-wrap gap-1">
                        {scheduleData.days.map((day) => (
                          <Badge key={day} variant="secondary">{day}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Subjects</label>
                      <div className="flex flex-wrap gap-1">
                        {scheduleData.subjects.slice(0, 3).map((subject) => (
                          <Badge key={subject} variant="outline">{subject}</Badge>
                        ))}
                        {scheduleData.subjects.length > 3 && (
                          <Badge variant="outline">+{scheduleData.subjects.length - 3} more</Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Notifications</label>
                      <p className="text-gray-900">{scheduleData.notifications ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Cards */}
            <div className="space-y-4">
              {isMobile ? (
                <>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Open in iSchedulEDU App</h3>
                        <p className="text-gray-600 mb-4">
                          Import this schedule directly into your iSchedulEDU app
                        </p>
                        <Button onClick={handleOpenInApp} className="w-full mb-2">
                          Open in App
                        </Button>
                        <Button onClick={handleDownloadApp} variant="outline" className="w-full">
                          Download App
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Get iSchedulEDU</h3>
                      <p className="text-gray-600 mb-4">
                        Download the iSchedulEDU app on your mobile device to import this schedule
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button onClick={handleDownloadApp} className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          Download for iOS
                        </Button>
                        <Button variant="outline" onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                        }}>
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            iSchedulEDU - Teacher Schedule Management
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportSchedule;
