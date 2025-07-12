import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, Download, Calendar, Clock, CheckCircle, AlertCircle, ExternalLink, Sparkles, GraduationCap } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <Sparkles className="w-4 h-4 text-blue-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <p className="text-gray-700 font-medium">Loading your schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-8 px-4 pb-12">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
            iSchedulEDU
          </h1>
          <p className="text-xl text-gray-600 font-medium">Teacher Schedule Management</p>
          <p className="text-gray-500 mt-2">Import your shared schedule seamlessly</p>
        </div>

        {error ? (
          <Card className="mb-8 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Unable to Load Schedule</h3>
                <p className="text-gray-700 mb-6 max-w-md mx-auto leading-relaxed">{error}</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => window.location.reload()} variant="outline" className="hover:bg-red-50">
                    Try Again
                  </Button>
                  <Button onClick={() => window.location.href = '/'} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Go to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : scheduleData ? (
          <>
            {/* Enhanced Schedule Preview */}
            <Card className="mb-8 shadow-2xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 text-white p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                <div className="relative z-10">
                  <CardTitle className="flex items-center gap-4 text-2xl font-bold mb-2">
                    <Calendar className="w-8 h-8" />
                    {scheduleData.name}
                  </CardTitle>
                  <CardDescription className="text-blue-100 flex items-center gap-3 text-lg">
                    <Clock className="w-5 h-5" />
                    {scheduleData.startTime} - {scheduleData.endTime}
                  </CardDescription>
                </div>
                <div className="absolute top-4 right-4 opacity-20">
                  <GraduationCap className="w-16 h-16" />
                </div>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Schedule Events
                      </h4>
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                        {processedEvents.length} {processedEvents.length === 1 ? 'Event' : 'Events'}
                      </Badge>
                    </div>
                    <div className="grid gap-4">
                      {processedEvents.map((event, index) => (
                        <div 
                          key={index} 
                          className="group relative bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                        >
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full"
                            style={{ backgroundColor: event.color }}
                          ></div>
                          <div className="flex items-center justify-between">
                            <div className="flex-1 pl-4">
                              <h5 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors">
                                {event.name}
                              </h5>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                                <Clock className="w-5 h-5" />
                                <span className="font-semibold text-lg">
                                  {event.startTime} - {event.endTime}
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* Subtle gradient overlay on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-purple-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 transition-all duration-300 rounded-xl pointer-events-none"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Action Cards */}
            <div className="space-y-6">
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

              {isMobile ? (
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center">
                      <div className="relative inline-block mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                          <Smartphone className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      
                      {appStatus === 'installed' ? (
                        <>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Import! 🎉</h3>
                          <p className="text-gray-600 mb-6 text-lg leading-relaxed max-w-md mx-auto">
                            Tap the button below to import this schedule directly into your iSchedulEDU app.
                          </p>
                          <Button 
                            onClick={handleOpenInApp} 
                            className="w-full max-w-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            <ExternalLink className="w-6 h-6 mr-3" />
                            Import to iSchedulEDU
                          </Button>
                        </>
                      ) : appStatus === 'not-installed' || showAppStoreRedirect ? (
                        <>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">Get iSchedulEDU App</h3>
                          <p className="text-gray-600 mb-6 text-lg leading-relaxed max-w-md mx-auto">
                            Download iSchedulEDU to easily import and manage this schedule on your device.
                          </p>
                          <div className="space-y-3">
                            <Button 
                              onClick={handleDownloadApp} 
                              className="w-full max-w-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <Download className="w-6 h-6 mr-3" />
                              Download iSchedulEDU
                            </Button>
                            <Button 
                              onClick={handleTryAgain} 
                              variant="outline" 
                              className="w-full max-w-sm py-3 rounded-xl border-2 hover:bg-gray-50"
                            >
                              I Already Have the App
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">Import Schedule</h3>
                          <p className="text-gray-600 mb-6 text-lg leading-relaxed max-w-md mx-auto">
                            If you have iSchedulEDU installed, tap "Open in App" to import directly. Otherwise, download the app first.
                          </p>
                          <div className="space-y-3">
                            <Button 
                              onClick={handleOpenInApp} 
                              className="w-full max-w-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <ExternalLink className="w-6 h-6 mr-3" />
                              Open in App
                            </Button>
                            <Button 
                              onClick={handleDownloadApp} 
                              variant="outline" 
                              className="w-full max-w-sm py-3 rounded-xl border-2 hover:bg-gray-50"
                            >
                              <Download className="w-6 h-6 mr-3" />
                              Download App
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center">
                      <div className="relative inline-block mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                          <Download className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          <Smartphone className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Get iSchedulEDU Mobile App</h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed max-w-lg mx-auto">
                        This schedule is designed for mobile import. Download the iSchedulEDU app on your phone or tablet to import this schedule.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                          onClick={handleDownloadApp} 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Smartphone className="w-5 h-5 mr-2" />
                          Download for iOS
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                          }}
                          className="py-4 px-8 rounded-xl border-2 hover:bg-gray-50"
                        >
                          Copy Link for Mobile
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500 mt-4 italic">
                        Send this link to your mobile device to import the schedule
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        ) : null}

        {/* Enhanced Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200/50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <p className="text-gray-600 font-medium">
              iSchedulEDU - Teacher Schedule Management
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Streamline your teaching schedule with intelligent automation
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImportSchedule;
