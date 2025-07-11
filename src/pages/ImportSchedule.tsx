import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, Download, Calendar, Clock, Users, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
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

interface IOSScheduleEvent {
  id: string;
  name: string;
  startTime: number;
  endTime: number;
  enableAlert: boolean;
  colorData?: {
    red: number;
    green: number;
    blue: number;
  };
}

interface IOSScheduleData {
  name: string;
  scheduleType: string;
  id: string;
  events: IOSScheduleEvent[];
}

const ImportSchedule = () => {
  const { scheduleId } = useParams();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appStatus, setAppStatus] = useState<'unknown' | 'installed' | 'not-installed' | 'checking'>('unknown');
  const [showAppStoreRedirect, setShowAppStoreRedirect] = useState(false);

  // Convert iOS timestamp to readable time - handles both seconds and milliseconds
  const formatTimeFromTimestamp = (timestamp: number): string => {
    console.log('Original timestamp:', timestamp);
    
    // Try different interpretations of the timestamp
    let date: Date;
    
    // If timestamp seems to be in seconds since a reference date (like NSDate's timeIntervalSinceReferenceDate)
    // iOS NSDate reference date is January 1, 2001, 00:00:00 UTC
    const referenceDate = new Date('2001-01-01T00:00:00Z').getTime() / 1000;
    date = new Date((referenceDate + timestamp) * 1000);
    
    console.log('Converted date:', date);
    
    // If the date seems invalid, try treating as seconds since Unix epoch
    if (date.getFullYear() < 2020 || date.getFullYear() > 2030) {
      date = new Date(timestamp * 1000);
      console.log('Alternative date interpretation:', date);
    }
    
    // If still invalid, try as milliseconds
    if (date.getFullYear() < 2020 || date.getFullYear() > 2030) {
      date = new Date(timestamp);
      console.log('Milliseconds interpretation:', date);
    }
    
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Transform iOS schedule data to web format
  const transformIOSScheduleData = (iosData: IOSScheduleData): ScheduleData => {
    console.log('Transforming iOS data:', iosData);
    const events = iosData.events || [];
    const subjects = events.map(event => event.name);
    
    // Calculate time range from events
    let earliestStart = Infinity;
    let latestEnd = 0;
    
    events.forEach(event => {
      if (event.startTime < earliestStart) earliestStart = event.startTime;
      if (event.endTime > latestEnd) latestEnd = event.endTime;
    });

    const startTime = earliestStart !== Infinity ? formatTimeFromTimestamp(earliestStart) : '8:00 AM';
    const endTime = latestEnd > 0 ? formatTimeFromTimestamp(latestEnd) : '3:00 PM';
    
    console.log('Transformed data:', {
      name: iosData.name,
      type: iosData.scheduleType || 'custom',
      subjects: subjects,
      periods: events.length,
      startTime: startTime,
      endTime: endTime,
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      notifications: events.some(event => event.enableAlert)
    });
    
    return {
      name: iosData.name,
      type: iosData.scheduleType || 'custom',
      subjects: subjects,
      periods: events.length,
      startTime: startTime,
      endTime: endTime,
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], // Default school days
      notifications: events.some(event => event.enableAlert)
    };
  };

  useEffect(() => {
    const loadScheduleData = () => {
      try {
        // Try to get data from URL query parameter first
        const encodedData = searchParams.get('data');
        console.log('Encoded data from URL:', encodedData);
        
        if (encodedData) {
          const decodedData = JSON.parse(atob(encodedData));
          console.log('Decoded data:', decodedData);
          
          // Check if this is iOS app format or web format
          if (decodedData.scheduleType !== undefined || decodedData.events !== undefined) {
            // iOS app format
            console.log('Detected iOS app format:', decodedData);
            const transformedData = transformIOSScheduleData(decodedData as IOSScheduleData);
            setScheduleData(transformedData);
          } else if (decodedData.type !== undefined && decodedData.subjects !== undefined) {
            // Web format
            console.log('Detected web format:', decodedData);
            setScheduleData(decodedData as ScheduleData);
          } else {
            console.error('Unknown data format:', decodedData);
            setError('Unsupported schedule data format');
          }
        } else if (scheduleId) {
          // For future implementation with specific schedule IDs
          setError('Schedule ID lookup not yet implemented');
        } else {
          setError('No schedule data found in URL');
        }
      } catch (err) {
        console.error('Error parsing schedule data:', err);
        setError('Invalid schedule data format');
      } finally {
        setIsLoading(false);
      }
    };

    loadScheduleData();
  }, [scheduleId, searchParams]);

  const checkAppInstallation = () => {
    if (!isMobile) return;
    
    setAppStatus('checking');
    
    // Create a hidden iframe to test the custom URL scheme
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'ischeduled://test';
    document.body.appendChild(iframe);
    
    // Set a timeout to detect if the app opened
    const timeout = setTimeout(() => {
      setAppStatus('not-installed');
      document.body.removeChild(iframe);
    }, 2500);
    
    // If the page becomes hidden (app opened), we assume the app is installed
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timeout);
        setAppStatus('installed');
        document.body.removeChild(iframe);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Fallback: assume not installed after timeout
    setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, 3000);
  };

  const handleOpenInApp = () => {
    const appUrl = `ischeduled://import?data=${searchParams.get('data')}`;
    
    if (appStatus === 'installed') {
      // Direct open since we know the app is there
      window.location.href = appUrl;
    } else {
      // Try to open and detect
      setAppStatus('checking');
      const startTime = Date.now();
      
      // Try to open the app
      window.location.href = appUrl;
      
      // Check if we're still on the page after a delay
      setTimeout(() => {
        const timeElapsed = Date.now() - startTime;
        
        // If we're still here and enough time has passed, show App Store option
        if (timeElapsed > 2000 && !document.hidden) {
          setAppStatus('not-installed');
          setShowAppStoreRedirect(true);
        }
      }, 2500);
    }
  };

  const handleDownloadApp = () => {
    window.open('https://apps.apple.com/app/your-app-id', '_blank');
  };

  const handleTryAgain = () => {
    setShowAppStoreRedirect(false);
    setAppStatus('unknown');
    checkAppInstallation();
  };

  useEffect(() => {
    if (isMobile && scheduleData) {
      checkAppInstallation();
    }
  }, [isMobile, scheduleData]);

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
                  {/* App Status Alert */}
                  {appStatus === 'checking' && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Checking if iSchedulEDU is installed...
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {appStatus === 'installed' && (
                    <Alert className="border-green-200 bg-green-50">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Great! iSchedulEDU is installed on your device.
                      </AlertDescription>
                    </Alert>
                  )}

                  {showAppStoreRedirect && (
                    <Alert className="border-orange-200 bg-orange-50">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <AlertDescription className="text-orange-800">
                        It looks like iSchedulEDU isn't installed. Download the app to import this schedule directly.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Smartphone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                        {appStatus === 'installed' ? (
                          <>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Import</h3>
                            <p className="text-gray-600 mb-4">
                              Tap the button below to import this schedule directly into your iSchedulEDU app.
                            </p>
                            <Button onClick={handleOpenInApp} className="w-full">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Import to iSchedulEDU
                            </Button>
                          </>
                        ) : appStatus === 'not-installed' || showAppStoreRedirect ? (
                          <>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Get iSchedulEDU App</h3>
                            <p className="text-gray-600 mb-4">
                              Download iSchedulEDU to easily import and manage this schedule on your device.
                            </p>
                            <div className="space-y-2">
                              <Button onClick={handleDownloadApp} className="w-full">
                                <Download className="w-4 h-4 mr-2" />
                                Download iSchedulEDU
                              </Button>
                              <Button onClick={handleTryAgain} variant="outline" className="w-full">
                                I Already Have the App
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Import Schedule</h3>
                            <p className="text-gray-600 mb-4">
                              If you have iSchedulEDU installed, tap "Open in App" to import directly. Otherwise, download the app first.
                            </p>
                            <div className="space-y-2">
                              <Button onClick={handleOpenInApp} className="w-full">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Open in App
                              </Button>
                              <Button onClick={handleDownloadApp} variant="outline" className="w-full">
                                <Download className="w-4 h-4 mr-2" />
                                Download App
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Download className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Get iSchedulEDU Mobile App</h3>
                      <p className="text-gray-600 mb-4">
                        This schedule is designed for mobile import. Download the iSchedulEDU app on your phone or tablet to import this schedule.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button onClick={handleDownloadApp} className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4" />
                          Download for iOS
                        </Button>
                        <Button variant="outline" onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                        }}>
                          Copy Link for Mobile
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-3">
                        Send this link to your mobile device to import the schedule
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : null}

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
