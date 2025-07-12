import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, Download, Calendar, Clock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
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

interface ProcessedEvent {
  name: string;
  startTime: string;
  endTime: string;
  color?: string;
}

const ImportSchedule = () => {
  console.log('=== ImportSchedule COMPONENT MOUNTED ===');
  console.log('Component render timestamp:', new Date().toISOString());
  
  const { scheduleId } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [processedEvents, setProcessedEvents] = useState<ProcessedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [appStatus, setAppStatus] = useState<'unknown' | 'installed' | 'not-installed' | 'checking'>('unknown');
  const [showAppStoreRedirect, setShowAppStoreRedirect] = useState(false);

  // Convert Swift TimeInterval to readable time
  const formatTimeFromTimestamp = (timestamp: number): string => {
    console.log('Original Swift TimeInterval:', timestamp);
    
    const swiftReferenceOffset = 978307200;
    const unixTimestamp = timestamp + swiftReferenceOffset;
    
    console.log('Converted to Unix timestamp:', unixTimestamp);
    
    const date = new Date(unixTimestamp * 1000);
    console.log('Converted date:', date);
    
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Convert RGB color data to CSS color
  const formatColor = (colorData?: { red: number; green: number; blue: number }): string => {
    if (!colorData) return 'hsl(var(--primary))';
    
    const r = Math.round(colorData.red * 255);
    const g = Math.round(colorData.green * 255);
    const b = Math.round(colorData.blue * 255);
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Transform iOS schedule data to web format
  const transformIOSScheduleData = (iosData: IOSScheduleData): ScheduleData => {
    console.log('Transforming iOS data:', iosData);
    const events = iosData.events || [];
    const subjects = events.map(event => event.name);
    
    // Process events with colors and times
    const processed: ProcessedEvent[] = events.map(event => ({
      name: event.name,
      startTime: formatTimeFromTimestamp(event.startTime),
      endTime: formatTimeFromTimestamp(event.endTime),
      color: formatColor(event.colorData)
    }));
    
    setProcessedEvents(processed);
    
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
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      notifications: events.some(event => event.enableAlert)
    };
  };

  // Enhanced data extraction function
  const extractDataParameter = (): string | null => {
    console.log('=== ENHANCED DATA EXTRACTION ===');
    
    const reactRouterData = searchParams.get('data');
    console.log('React Router searchParams.get("data"):', reactRouterData);
    
    const locationSearchData = new URLSearchParams(location.search).get('data');
    console.log('URLSearchParams from location.search:', locationSearchData);
    
    const windowSearchData = new URLSearchParams(window.location.search).get('data');
    console.log('URLSearchParams from window.location.search:', windowSearchData);
    
    const fullUrl = window.location.href;
    const regexMatch = fullUrl.match(/[?&]data=([^&]*)/);
    const regexData = regexMatch ? regexMatch[1] : null;
    console.log('Regex extraction from full URL:', regexData);
    
    const hashMatch = window.location.hash.match(/[?&]data=([^&]*)/);
    const hashData = hashMatch ? hashMatch[1] : null;
    console.log('Regex extraction from hash:', hashData);
    
    const pathname = window.location.pathname;
    let pathnameData = null;
    if (pathname.includes('data=')) {
      const dataIndex = pathname.indexOf('data=');
      const dataStart = dataIndex + 5;
      const dataEnd = pathname.indexOf('/', dataStart);
      pathnameData = dataEnd === -1 ? pathname.substring(dataStart) : pathname.substring(dataStart, dataEnd);
    }
    console.log('Data extraction from pathname:', pathnameData);
    
    const methods = [
      { name: 'React Router searchParams', value: reactRouterData },
      { name: 'URLSearchParams from location.search', value: locationSearchData },
      { name: 'URLSearchParams from window.location.search', value: windowSearchData },
      { name: 'Regex extraction from full URL', value: regexData },
      { name: 'Regex extraction from hash', value: hashData },
      { name: 'Data extraction from pathname', value: pathnameData }
    ];
    
    for (const method of methods) {
      if (method.value) {
        console.log(`SUCCESS: Using data from ${method.name}`);
        console.log(`Data length: ${method.value.length}`);
        console.log(`Data preview: ${method.value.substring(0, 50)}...`);
        return method.value;
      }
    }
    
    console.log('ERROR: No data parameter found using any method');
    return null;
  };

  useEffect(() => {
    console.log('=== ImportSchedule useEffect TRIGGERED ===');
    console.log('Effect dependencies - scheduleId:', scheduleId);
    console.log('Current URL:', window.location.href);
    console.log('Location object:', location);
    
    const loadScheduleData = () => {
      try {
        console.log('=== STARTING DATA LOAD PROCESS ===');
        
        const encodedData = extractDataParameter();
        
        if (encodedData) {
          console.log('Found encoded data, attempting to decode...');
          
          try {
            const decodedData = JSON.parse(atob(encodedData));
            console.log('Successfully decoded data:', decodedData);
            
            if (decodedData.scheduleType !== undefined || decodedData.events !== undefined) {
              console.log('Detected iOS app format');
              const transformedData = transformIOSScheduleData(decodedData as IOSScheduleData);
              setScheduleData(transformedData);
            } else if (decodedData.type !== undefined && decodedData.subjects !== undefined) {
              console.log('Detected web format');
              setScheduleData(decodedData as ScheduleData);
            } else {
              console.error('Unknown data format:', decodedData);
              setError('Unsupported schedule data format. Please ensure you\'re using a valid iSchedulEDU share link.');
            }
          } catch (decodeError) {
            console.error('Failed to decode data:', decodeError);
            setError('Invalid schedule data format. The shared link may be corrupted.');
          }
        } else if (scheduleId) {
          console.log('Attempting to load schedule by ID:', scheduleId);
          setError('Schedule ID lookup not yet implemented');
        } else {
          console.error('No schedule data found');
          setError('No schedule data found in URL. Please check that the share link is complete and try again.');
        }
      } catch (err) {
        console.error('Error in loadScheduleData:', err);
        setError('An error occurred while loading the schedule data.');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(loadScheduleData, 100);
    return () => clearTimeout(timer);
  }, [scheduleId, location.pathname, location.search, location.hash]);

  const checkAppInstallation = () => {
    if (!isMobile) return;
    
    setAppStatus('checking');
    
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'ischeduled://test';
    document.body.appendChild(iframe);
    
    const timeout = setTimeout(() => {
      setAppStatus('not-installed');
      document.body.removeChild(iframe);
    }, 2500);
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timeout);
        setAppStatus('installed');
        document.body.removeChild(iframe);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, 3000);
  };

  const handleOpenInApp = () => {
    const encodedData = extractDataParameter();
    if (!encodedData) {
      console.error('No data parameter found for app opening');
      return;
    }
    
    const appUrl = `ischeduled://import?data=${encodedData}`;
    console.log('Opening app with URL:', appUrl);
    
    if (appStatus === 'installed') {
      window.location.href = appUrl;
    } else {
      setAppStatus('checking');
      const startTime = Date.now();
      
      window.location.href = appUrl;
      
      setTimeout(() => {
        const timeElapsed = Date.now() - startTime;
        
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
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Schedule</h3>
                <p className="text-gray-600 mb-4">{error}</p>
                <div className="space-y-2">
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Reload Page
                  </Button>
                  <Button onClick={() => window.location.href = '/'} variant="outline">
                    Go to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : scheduleData ? (
          <>
            {/* Schedule Preview */}
            <Card className="mb-6 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Calendar className="w-6 h-6" />
                  {scheduleData.name}
                </CardTitle>
                <CardDescription className="text-blue-100 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {scheduleData.startTime} - {scheduleData.endTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                      Schedule Events
                    </h4>
                    <div className="space-y-3">
                      {processedEvents.map((event, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border-l-4 hover:shadow-md transition-shadow"
                          style={{ borderLeftColor: event.color }}
                        >
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900 text-lg">
                              {event.name}
                            </h5>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="font-medium">
                                {event.startTime} - {event.endTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
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
