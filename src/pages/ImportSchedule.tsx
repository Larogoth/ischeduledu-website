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

  // Convert various date formats to readable time
  const parseDate = (dateValue: any): Date => {
    console.log('Parsing date value:', dateValue, 'Type:', typeof dateValue);
    
    if (typeof dateValue === 'string') {
      // ISO string format
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date;
      }
    } else if (typeof dateValue === 'number') {
      // Check if it's Swift TimeInterval (seconds since 2001-01-01)
      if (dateValue > 0 && dateValue < 1000000000) {
        // Likely Swift TimeInterval
        const swiftReferenceOffset = 978307200; // Seconds between Jan 1, 1970 and Jan 1, 2001
        const unixTimestamp = dateValue + swiftReferenceOffset;
        return new Date(unixTimestamp * 1000);
      } else if (dateValue > 1000000000) {
        // Likely Unix timestamp in seconds or milliseconds
        if (dateValue > 10000000000) {
          // Milliseconds
          return new Date(dateValue);
        } else {
          // Seconds
          return new Date(dateValue * 1000);
        }
      }
    }
    
    // Fallback to current time if parsing fails
    console.warn('Failed to parse date value, using current time:', dateValue);
    return new Date();
  };

  const formatTimeFromDate = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // Convert RGB color data to CSS color
  const formatColor = (colorData?: any): string => {
    if (!colorData) return 'rgb(59, 130, 246)'; // Default blue
    
    try {
      const r = Math.round((colorData.red || 0) * 255);
      const g = Math.round((colorData.green || 0) * 255);
      const b = Math.round((colorData.blue || 0) * 255);
      return `rgb(${r}, ${g}, ${b})`;
    } catch (e) {
      console.warn('Failed to parse color data:', colorData);
      return 'rgb(59, 130, 246)'; // Default blue
    }
  };

  // Universal schedule transformer that handles any format
  const transformScheduleData = (rawData: any): ScheduleData => {
    console.log('=== TRANSFORMING SCHEDULE DATA ===');
    console.log('Raw data:', JSON.stringify(rawData, null, 2));
    console.log('Raw data keys:', Object.keys(rawData));
    
    let events: any[] = [];
    let scheduleName = '';
    let scheduleType = 'custom';
    
    // Extract basic info
    if (rawData.name) {
      scheduleName = rawData.name;
    }
    
    if (rawData.scheduleType) {
      scheduleType = rawData.scheduleType;
    } else if (rawData.type) {
      scheduleType = rawData.type;
    }
    
    // Extract events from various possible formats
    if (rawData.events && Array.isArray(rawData.events)) {
      events = rawData.events;
      console.log('Found events array with', events.length, 'events');
    } else if (rawData.setEvents && Array.isArray(rawData.setEvents)) {
      events = rawData.setEvents;
      console.log('Found setEvents array with', events.length, 'events');
    } else {
      console.warn('No events array found in data');
      events = [];
    }
    
    // Process events
    const processed: ProcessedEvent[] = [];
    let earliestTime: Date | null = null;
    let latestTime: Date | null = null;
    let hasAlerts = false;
    
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      console.log(`Processing event ${i}:`, event);
      
      try {
        let eventName = event.name || `Event ${i + 1}`;
        let startTime: Date;
        let endTime: Date;
        let color = formatColor(event.colorData);
        
        // Parse start time
        if (event.startTime !== undefined) {
          startTime = parseDate(event.startTime);
        } else if (event.start !== undefined) {
          startTime = parseDate(event.start);
        } else {
          console.warn('No start time found for event:', event);
          startTime = new Date();
        }
        
        // Parse end time
        if (event.endTime !== undefined) {
          endTime = parseDate(event.endTime);
        } else if (event.end !== undefined) {
          endTime = parseDate(event.end);
        } else {
          console.warn('No end time found for event:', event);
          endTime = new Date(startTime.getTime() + 3600000); // Add 1 hour
        }
        
        // Check for alerts
        if (event.enableAlert || event.alarmsEnabled) {
          hasAlerts = true;
        }
        
        // Track earliest and latest times
        if (!earliestTime || startTime < earliestTime) {
          earliestTime = startTime;
        }
        if (!latestTime || endTime > latestTime) {
          latestTime = endTime;
        }
        
        processed.push({
          name: eventName,
          startTime: formatTimeFromDate(startTime),
          endTime: formatTimeFromDate(endTime),
          color: color
        });
        
        console.log(`Successfully processed event: ${eventName}, ${formatTimeFromDate(startTime)} - ${formatTimeFromDate(endTime)}`);
      } catch (eventError) {
        console.error('Error processing event:', eventError, 'Event data:', event);
        // Continue processing other events
      }
    }
    
    setProcessedEvents(processed);
    
    const subjects = processed.map(event => event.name);
    const startTime = earliestTime ? formatTimeFromDate(earliestTime) : '8:00 AM';
    const endTime = latestTime ? formatTimeFromDate(latestTime) : '3:00 PM';
    
    const transformedData = {
      name: scheduleName,
      type: scheduleType,
      subjects: subjects,
      periods: processed.length,
      startTime: startTime,
      endTime: endTime,
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      notifications: hasAlerts
    };
    
    console.log('=== FINAL TRANSFORMED DATA ===');
    console.log('Transformed data:', transformedData);
    console.log('Processed events:', processed);
    
    return transformedData;
  };

  // Enhanced data extraction function
  const extractDataParameter = (): string | null => {
    console.log('=== ENHANCED DATA EXTRACTION ===');
    console.log('Full URL:', window.location.href);
    
    const methods = [
      { name: 'React Router searchParams', value: searchParams.get('data') },
      { name: 'URLSearchParams from location.search', value: new URLSearchParams(location.search).get('data') },
      { name: 'URLSearchParams from window.location.search', value: new URLSearchParams(window.location.search).get('data') },
      { name: 'Regex extraction from full URL', value: window.location.href.match(/[?&]data=([^&]*)/)?.[1] },
      { name: 'Regex extraction from hash', value: window.location.hash.match(/[?&]data=([^&]*)/)?.[1] },
    ];
    
    // Check pathname for malformed URLs
    const pathname = window.location.pathname;
    if (pathname.includes('data=')) {
      const dataIndex = pathname.indexOf('data=');
      const dataStart = dataIndex + 5;
      const dataEnd = pathname.indexOf('/', dataStart);
      const pathnameData = dataEnd === -1 ? pathname.substring(dataStart) : pathname.substring(dataStart, dataEnd);
      methods.push({ name: 'Data extraction from pathname', value: pathnameData });
    }
    
    for (const method of methods) {
      if (method.value) {
        console.log(`SUCCESS: Using data from ${method.name}`);
        console.log(`Raw data: ${method.value}`);
        console.log(`Data length: ${method.value.length}`);
        return method.value;
      }
    }
    
    console.log('ERROR: No data parameter found using any method');
    return null;
  };

  // Comprehensive base64 decode function
  const safeBase64Decode = (encodedData: string): any => {
    console.log('=== COMPREHENSIVE BASE64 DECODE ===');
    console.log('Input encoded data:', encodedData);
    console.log('Input data length:', encodedData.length);
    
    const decodeMethods = [
      {
        name: 'Direct base64 decode',
        decode: (data: string) => {
          const jsonString = atob(data);
          return JSON.parse(jsonString);
        }
      },
      {
        name: 'URL decode then base64 decode',
        decode: (data: string) => {
          const urlDecoded = decodeURIComponent(data);
          const jsonString = atob(urlDecoded);
          return JSON.parse(jsonString);
        }
      },
      {
        name: 'Replace URL encoded chars then base64 decode',
        decode: (data: string) => {
          const fixed = data.replace(/%2B/g, '+').replace(/%2F/g, '/').replace(/%3D/g, '=');
          const jsonString = atob(fixed);
          return JSON.parse(jsonString);
        }
      },
      {
        name: 'Manual URL decode with space handling',
        decode: (data: string) => {
          let manualDecoded = data.replace(/\+/g, ' ');
          manualDecoded = decodeURIComponent(manualDecoded);
          manualDecoded = manualDecoded.replace(/ /g, '+');
          const jsonString = atob(manualDecoded);
          return JSON.parse(jsonString);
        }
      },
      {
        name: 'Try as JSON string directly',
        decode: (data: string) => {
          return JSON.parse(data);
        }
      }
    ];
    
    for (const method of decodeMethods) {
      try {
        console.log(`Trying decode method: ${method.name}`);
        const result = method.decode(encodedData);
        console.log(`✅ Success with ${method.name}`);
        console.log('Decoded result:', result);
        return result;
      } catch (error) {
        console.log(`❌ Failed with ${method.name}:`, error.message);
      }
    }
    
    throw new Error('All decode methods failed');
  };

  useEffect(() => {
    console.log('=== ImportSchedule useEffect TRIGGERED ===');
    
    const loadScheduleData = () => {
      try {
        console.log('=== STARTING DATA LOAD PROCESS ===');
        
        const encodedData = extractDataParameter();
        
        if (encodedData) {
          console.log('Found encoded data, attempting to decode...');
          
          try {
            const decodedData = safeBase64Decode(encodedData);
            console.log('Successfully decoded data:', decodedData);
            console.log('Data type:', typeof decodedData);
            console.log('Data keys:', Object.keys(decodedData));
            
            // Use universal transformer
            const transformedData = transformScheduleData(decodedData);
            setScheduleData(transformedData);
            
          } catch (decodeError) {
            console.error('Failed to decode data:', decodeError);
            console.error('Raw encoded data for debugging:', encodedData);
            console.error('Encoded data length:', encodedData.length);
            console.error('Encoded data sample:', encodedData.substring(0, 100) + '...');
            
            // Try to provide more helpful error message
            let errorMessage = 'Invalid schedule data format. ';
            if (encodedData.length < 10) {
              errorMessage += 'The data appears to be too short.';
            } else if (encodedData.length > 10000) {
              errorMessage += 'The data appears to be too long.';
            } else {
              errorMessage += `Decode error: ${decodeError.message}`;
            }
            
            setError(errorMessage);
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
        setError(`An error occurred while loading the schedule data: ${err.message}`);
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
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 2500);
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timeout);
        setAppStatus('installed');
        if (document.body.contains(iframe)) {
          document.body.removeChild(iframe);
        }
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
    
    const urlEncodedData = encodeURIComponent(encodedData);
    const appUrl = `ischeduled://import?data=${urlEncodedData}`;
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
                <p className="text-gray-700 mb-6 max-w-md mx-auto leading-relaxed text-sm">{error}</p>
                
                {/* Enhanced debug info */}
                <div className="bg-gray-100 p-4 rounded-lg text-left text-xs mb-4 max-w-lg mx-auto">
                  <p><strong>Debug Information:</strong></p>
                  <p className="break-all mb-2">URL: {window.location.href}</p>
                  <p className="break-all mb-2">Data param: {extractDataParameter()}</p>
                  <p className="mb-2">Data length: {extractDataParameter()?.length || 'N/A'}</p>
                  <p className="break-all">Data sample: {extractDataParameter()?.substring(0, 50) || 'N/A'}...</p>
                  <Button 
                    onClick={() => {
                      const data = extractDataParameter();
                      if (data) {
                        navigator.clipboard.writeText(data);
                        alert('Debug data copied to clipboard');
                      }
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    Copy Debug Data
                  </Button>
                </div>
                
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
