import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, Download, Calendar, Clock, CheckCircle, AlertCircle, ExternalLink, GraduationCap, Copy, Sparkles } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import * as pako from 'pako';

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
  duration: string;
  color?: string;
}

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
  const [shareUrlCopied, setShareUrlCopied] = useState(false);

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

  const formatTimeFromDate = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

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

  const calculateDuration = (startTime: Date, endTime: Date): string => {
    const diffMs = endTime.getTime() - startTime.getTime();
    const diffMinutes = Math.round(diffMs / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  };

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

  const transformScheduleData = (rawData: any): ScheduleData => {
    console.log('=== TRANSFORMING SCHEDULE DATA ===');
    console.log('Raw data:', JSON.stringify(rawData, null, 2));
    
    let events: any[] = [];
    let scheduleName = '';
    let scheduleType = 'custom';
    
    if (rawData.name) {
      scheduleName = rawData.name;
    }
    
    if (rawData.scheduleType) {
      scheduleType = rawData.scheduleType;
    } else if (rawData.type) {
      scheduleType = rawData.type;
    }
    
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
        
        if (event.startTime !== undefined) {
          startTime = parseDate(event.startTime);
        } else if (event.start !== undefined) {
          startTime = parseDate(event.start);
        } else {
          console.warn('No start time found for event:', event);
          startTime = new Date();
        }
        
        if (event.endTime !== undefined) {
          endTime = parseDate(event.endTime);
        } else if (event.end !== undefined) {
          endTime = parseDate(event.end);
        } else {
          console.warn('No end time found for event:', event);
          endTime = new Date(startTime.getTime() + 3600000); // Add 1 hour
        }
        
        if (event.enableAlert || event.alarmsEnabled) {
          hasAlerts = true;
        }
        
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
          duration: calculateDuration(startTime, endTime),
          color: color
        });
        
        console.log(`Successfully processed event: ${eventName}, ${formatTimeFromDate(startTime)} - ${formatTimeFromDate(endTime)}, Duration: ${calculateDuration(startTime, endTime)}`);
      } catch (eventError) {
        console.error('Error processing event:', eventError, 'Event data:', event);
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
    
    return transformedData;
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

  useEffect(() => {
    console.log('=== ImportSchedule useEffect TRIGGERED ===');
    
    const loadScheduleData = () => {
      try {
        console.log('=== STARTING DATA LOAD PROCESS ===');
        
        const { data: encodedData, version, isCompressed } = extractDataParameters();
        
        if (encodedData) {
          console.log('Found encoded data, attempting to decode...');
          
          try {
            const decodedData = safeBase64Decode(encodedData, version, isCompressed);
            const transformedData = transformScheduleData(decodedData);
            setScheduleData(transformedData);
            
          } catch (decodeError) {
            console.error('Failed to decode data:', decodeError);
            setError('Invalid schedule data format.');
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

  const fixBase64Padding = (base64String: string): string => {
    const paddingNeeded = (4 - (base64String.length % 4)) % 4;
    return base64String + '='.repeat(paddingNeeded);
  };

  const handleOpenInApp = () => {
  // Get the clean parameters including version and compression info
  const { data: encodedData, version, isCompressed } = extractDataParameters();
  if (!encodedData) {
    console.error('No data parameter found for app opening');
    return;
  }
  
  const fixedData = fixBase64Padding(encodedData);
  
  // Include version and compression parameters in the app URL
  const appURL = `ischeduled://import?data=${fixedData}&v=${version}&c=${isCompressed ? '1' : '0'}`;
  
  console.log('Opening app with URL:', appURL);
  console.log('Version:', version, 'Compressed:', isCompressed);
  
  setAppStatus('checking');
  
  const timeoutId = setTimeout(() => {
    console.log('App did not open, showing App Store redirect');
    setAppStatus('not-installed');
    setShowAppStoreRedirect(true);
  }, 2000);
  
  const handleVisibilityChange = () => {
    if (document.hidden) {
      clearTimeout(timeoutId);
      setAppStatus('installed');
    }
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  window.location.href = appURL;
  
  setTimeout(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, 3000);
};

  const handleDownloadApp = () => {
    window.open('https://apps.apple.com/us/app/ischeduledu-class-planner/id6504114850', '_blank');
  };

  const handleTryAgain = () => {
    setShowAppStoreRedirect(false);
    setAppStatus('unknown');
    checkAppInstallation();
  };

  // Updated copy share link function to match iOS app format
// Updated copy share link function that constructs the correct URL
const copyShareLink = async () => {
  try {
    // Get the clean parameters
    const { data: encodedData, version, isCompressed } = extractDataParameters();
    
    // Construct the correct URL manually
    const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const correctUrl = `${baseUrl}?data=${encodedData}&v=${version}&c=${isCompressed ? '1' : '0'}`;
    
    const scheduleName = scheduleData?.name || "Schedule";
    
    // Format the message exactly like the iOS app
    const shareText = `📅 ${scheduleName} - Import into iSchedulEDU

${correctUrl}

Don't have iSchedulEDU? Get it here: https://apps.apple.com/us/app/ischeduledu-class-planner/id6504114850`;

    console.log('Copying correct URL:', correctUrl);
    console.log('Share text:', shareText);

    await navigator.clipboard.writeText(shareText);
    setShareUrlCopied(true);
    setTimeout(() => setShareUrlCopied(false), 2000);
  } catch (error) {
    console.error('Failed to copy share link:', error);
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = shareText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    setShareUrlCopied(true);
    setTimeout(() => setShareUrlCopied(false), 2000);
  }
};

  useEffect(() => {
    if (isMobile && scheduleData) {
      checkAppInstallation();
    }
  }, [isMobile, scheduleData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-200 border-t-cyan-600 mx-auto mb-4"></div>
          </div>
          <p className="text-gray-700 font-medium">Loading your schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-200/20 to-teal-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto pt-8 px-4 pb-12">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto shadow-lg ring-4 ring-white/20">
              <img 
                src="/lovable-uploads/ischededu-app-logo-teacher-scheduling-software.png" 
                alt="iSchedulEDU Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-[#0FA0CE] to-gray-900 bg-clip-text text-transparent mb-3 font-euclid">
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
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => window.location.reload()} variant="outline" className="hover:bg-red-50">
                    Try Again
                  </Button>
                  <Button onClick={() => window.location.href = '/'} className="bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700">
                    Go to Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : scheduleData ? (
          <>
            {/* Generated with iSchedulEDU Banner */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-cyan-500/10 via-[#0FA0CE]/10 to-teal-500/10 border border-cyan-200/50 rounded-xl p-4 backdrop-blur-sm">
                {/* Mobile view - simple text */}
                <div className="md:hidden flex items-center justify-center gap-2 text-center">
                  <Sparkles className="w-4 h-4 text-cyan-600" />
                  <span className="text-gray-700 font-medium">Generated with</span>
                  <span className="font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                    iSchedulEDU
                  </span>
                </div>
                
                {/* Tablet and desktop view - full layout */}
                <div className="hidden md:flex items-center justify-center gap-3 text-center">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-600" />
                    <span className="text-gray-700 font-medium">
                      Generated with the
                    </span>
                    <span className="font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                      iSchedulEDU
                    </span>
                    <span className="text-gray-700 font-medium">
                      iOS/iPadOS app
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Card className="mb-8 shadow-2xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-cyan-500 via-[#0FA0CE] to-teal-600 text-white p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-teal-600/20"></div>
                <div className="relative z-10">
                  <CardTitle className="flex items-center gap-4 text-2xl font-bold mb-2">
                    <Calendar className="w-8 h-8" />
                    {scheduleData.name}
                  </CardTitle>
                  <CardDescription className="text-cyan-100 flex items-center gap-3 text-lg">
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
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-900">
                        Schedule Events
                      </h4>
                      <Badge className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white border-0">
                        {processedEvents.length} {processedEvents.length === 1 ? 'Event' : 'Events'}
                      </Badge>
                    </div>
                    <div className="grid gap-4">
                      {processedEvents.map((event, index) => (
                        <div 
                          key={index} 
                          className="group relative bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-4 md:p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                        >
                          <div 
                            className="absolute left-0 top-0 bottom-0 w-1.5 rounded-r-full"
                            style={{ backgroundColor: event.color }}
                          ></div>
                          <div className="md:hidden pl-4">
                            <h5 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-cyan-600 transition-colors break-words">
                              {event.name}
                            </h5>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                                <Clock className="w-4 h-4 flex-shrink-0" />
                                <div className="text-sm font-medium">
                                  <div>{event.startTime} - {event.endTime}</div>
                                  <div className="text-xs text-gray-500">{event.duration}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="hidden md:flex items-center justify-between">
                            <div className="flex-1 pl-4">
                              <h5 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-cyan-600 transition-colors">
                                {event.name}
                              </h5>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 rounded-lg px-4 py-2">
                                <Clock className="w-5 h-5" />
                                <div className="font-semibold">
                                  <div className="text-lg">
                                    {event.startTime} - {event.endTime}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {event.duration}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/0 to-teal-50/0 group-hover:from-cyan-50/30 group-hover:to-teal-50/30 transition-all duration-300 rounded-xl pointer-events-none"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {isMobile && (
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardContent className="pt-6 pb-6">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">Share This Schedule</h3>
                      <p className="text-gray-600 mb-4 text-sm">
                        Share this schedule easily with others
                      </p>
                      <Button 
                        onClick={copyShareLink}
                        variant="outline"
                        className="w-full max-w-sm flex items-center gap-2 py-3"
                      >
                        {shareUrlCopied ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Link Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Share Link
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

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
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto">
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
                            className="w-full max-w-sm bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
                            <a 
                              href="https://apps.apple.com/us/app/ischeduledu-class-planner/id6504114850"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block w-full max-w-sm"
                            >
                              <img 
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="Download on the App Store"
                                className="h-16 mx-auto hover:scale-105 transition-transform duration-200"
                              />
                            </a>
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
                              className="w-full max-w-sm bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                              <ExternalLink className="w-6 h-6 mr-3" />
                              Open in App
                            </Button>
                            <a 
                              href="https://apps.apple.com/us/app/ischeduledu-class-planner/id6504114850"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block w-full max-w-sm"
                            >
                              <img 
                                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                                alt="Download on the App Store"
                                className="h-12 mx-auto hover:scale-105 transition-transform duration-200 border-2 border-gray-200 rounded-lg p-2 bg-white/50 backdrop-blur-sm"
                              />
                            </a>
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
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto">
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
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a 
          href="https://apps.apple.com/us/app/ischeduledu-class-planner/id6504114850"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img 
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="h-16 mx-auto hover:scale-105 transition-transform duration-200"
          />
        </a>
        <Button 
          variant="outline" 
          onClick={copyShareLink}
          className="py-4 px-8 rounded-xl border-2 hover:bg-gray-50 flex items-center gap-2"
        >
          {shareUrlCopied ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              Link Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy Link for Mobile
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-gray-500 mt-4 italic leading-relaxed">
        Users with iSchedulEDU can tap the link to import directly into the app.<br />
        Others will be directed to download the app first.
      </p>
    </div>
  </CardContent>
</Card>
              )}
            </div>
          </>
        ) : null}

        <div className="text-center mt-12 pt-8 border-t border-gray-200/50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-cyan-600" />
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
