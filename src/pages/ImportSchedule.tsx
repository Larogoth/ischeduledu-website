import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Smartphone, Download, Calendar, Clock, CheckCircle, AlertCircle, Star, Users, GraduationCap, Copy, Sparkles, Shield, Zap, Heart } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import * as pako from 'pako';
import { toast } from "@/components/ui/use-toast";
import { validateScheduleData } from '@/utils/inputValidation';

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
 const { scheduleId } = useParams();
 const [searchParams] = useSearchParams();
 const location = useLocation();
 const isMobile = useIsMobile();
 const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
 const [processedEvents, setProcessedEvents] = useState<ProcessedEvent[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);
 const [shareUrlCopied, setShareUrlCopied] = useState(false);

 // --- Improved Decoding and Validation Logic ---
 const extractDataParameters = (): { data: string | null; version: string; isCompressed: boolean } => {
   const urlParams = new URLSearchParams(window.location.search);
   let data = urlParams.get('data');
   let version = urlParams.get('v') || '1';
   let isCompressed = urlParams.get('c') === '1';
   if (data && data.includes('?v=')) {
     const versionMatch = data.match(/\?v=(\d+)/);
     if (versionMatch) version = versionMatch[1];
     const compressionMatch = data.match(/\?c=(\d+)/);
     if (compressionMatch) isCompressed = compressionMatch[1] === '1';
     data = data.split('?v=')[0];
   }
   return { data, version, isCompressed };
 };

 const decodeUrlSafeBase64 = (urlSafeBase64: string): Uint8Array => {
   let base64 = urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/');
   const remainder = base64.length % 4;
   if (remainder > 0) base64 += '='.repeat(4 - remainder);
   const binaryString = atob(base64);
   const bytes = new Uint8Array(binaryString.length);
   for (let i = 0; i < binaryString.length; i++) {
     bytes[i] = binaryString.charCodeAt(i);
   }
   return bytes;
 };

 const handleV3Format = (encodedData: string, isCompressed: boolean): any => {
   const binaryData = decodeUrlSafeBase64(encodedData);
   let jsonData: string;
   let decompressedData: Uint8Array | null = null;
   if (isCompressed) {
     try { decompressedData = pako.inflateRaw(binaryData); } catch {}
     if (!decompressedData) { try { decompressedData = pako.inflate(binaryData); } catch {} }
     if (!decompressedData) { try { decompressedData = pako.ungzip(binaryData); } catch {} }
     jsonData = new TextDecoder().decode(decompressedData || binaryData);
   } else {
     jsonData = new TextDecoder().decode(binaryData);
   }
   if (!jsonData || jsonData.length === 0) throw new Error('Decompressed data is empty');
   let shareableSchedule: ShareableSchedule;
   try { shareableSchedule = JSON.parse(jsonData); } catch (parseError) { throw new Error(`JSON parsing failed: ${parseError.message}`); }
   if (!shareableSchedule.n || !shareableSchedule.e || !Array.isArray(shareableSchedule.e)) throw new Error('Invalid schedule data structure - missing required fields (n, e, t)');
   return convertMinimalToFullSchedule(shareableSchedule);
 };

 const handleV2Format = (encodedData: string): any => {
   const binaryData = decodeUrlSafeBase64(encodedData);
   const jsonData = new TextDecoder().decode(binaryData);
   return JSON.parse(jsonData);
 };

 const handleV1Format = (encodedData: string): any => {
   const decodedData = decodeURIComponent(encodedData);
   const jsonString = atob(decodedData);
   return JSON.parse(jsonString);
 };

 const safeBase64Decode = (encodedData: string, version: string, isCompressed: boolean): any => {
   if (version === '3') return handleV3Format(encodedData, isCompressed);
   else if (version === '2') return handleV2Format(encodedData);
   else return handleV1Format(encodedData);
 };

 // --- End Improved Decoding/Validation ---

 // Convert TimeInterval (seconds since 2001-01-01) to JavaScript Date
 const parseTimeInterval = (timeInterval: number): Date => {
   const swiftReferenceDate = new Date('2001-01-01T00:00:00Z');
   return new Date(swiftReferenceDate.getTime() + (timeInterval * 1000));
 };

 // Convert various date formats to readable time
 const parseDate = (dateValue: any): Date => {
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
     return 'rgb(59, 130, 246)';
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
   const fullEvents = shareableSchedule.e.map(event => {
     const startTime = parseTimeInterval(event.s);
     const endTime = parseTimeInterval(event.e);
     return {
       name: event.n,
       startTime: startTime.toISOString(),
       endTime: endTime.toISOString(),
       start: startTime,
       end: endTime,
       color: '#3B82F6',
       colorData: { red: 0.231, green: 0.510, blue: 0.965 },
       enableAlert: true
     };
   });
   const scheduleType = shareableSchedule.t === 0 ? 'custom' : 'generated';
   return {
     name: shareableSchedule.n,
     scheduleType: scheduleType,
     type: scheduleType,
     events: fullEvents,
     setEvents: fullEvents,
     importedAt: new Date().toISOString()
   };
 };

 // --- Main Effect ---
 useEffect(() => {
   const loadScheduleData = () => {
     try {
       const { data: encodedData, version, isCompressed } = extractDataParameters();
       if (encodedData) {
         try {
           const decodedData = safeBase64Decode(encodedData, version, isCompressed);
           const validationResult = validateScheduleData(decodedData);
           if (!validationResult.isValid) {
             setError(`Schedule data validation failed: ${validationResult.errors.join(', ')}`);
             setIsLoading(false);
             return;
           }
           // Now use the event processing logic
           const rawData = validationResult.sanitizedData;
           let events: any[] = [];
           let scheduleName = '';
           let scheduleType = 'custom';
           if (rawData.name) scheduleName = rawData.name;
           if (rawData.scheduleType) scheduleType = rawData.scheduleType;
           else if (rawData.type) scheduleType = rawData.type;
           if (rawData.events && Array.isArray(rawData.events)) events = rawData.events;
           else if (rawData.setEvents && Array.isArray(rawData.setEvents)) events = rawData.setEvents;
           else events = [];
           const processed: ProcessedEvent[] = [];
           let earliestTime: Date | null = null;
           let latestTime: Date | null = null;
           for (let i = 0; i < events.length; i++) {
             const event = events[i];
             let eventName = event.name || `Event ${i + 1}`;
             let startTime: Date;
             let endTime: Date;
             let color = formatColor(event.colorData);
             if (event.startTime !== undefined) startTime = parseDate(event.startTime);
             else if (event.start !== undefined) startTime = parseDate(event.start);
             else startTime = new Date();
             if (event.endTime !== undefined) endTime = parseDate(event.endTime);
             else if (event.end !== undefined) endTime = parseDate(event.end);
             else endTime = new Date(startTime.getTime() + 3600000);
             if (!earliestTime || startTime < earliestTime) earliestTime = startTime;
             if (!latestTime || endTime > latestTime) latestTime = endTime;
             processed.push({
               name: eventName,
               startTime: formatTimeFromDate(startTime),
               endTime: formatTimeFromDate(endTime),
               duration: calculateDuration(startTime, endTime),
               color: color
             });
           }
           setProcessedEvents(processed);
           const subjects = processed.map(event => event.name);
           const startTime = earliestTime ? formatTimeFromDate(earliestTime) : '8:00 AM';
           const endTime = latestTime ? formatTimeFromDate(latestTime) : '3:00 PM';
           setScheduleData({
             name: scheduleName,
             type: scheduleType,
             subjects: subjects,
             periods: processed.length,
             startTime: startTime,
             endTime: endTime,
             days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
             notifications: false // or set as needed
           });
           setIsLoading(false);
           toast({
             title: 'Schedule imported successfully!',
             description: 'Your schedule has been imported and is ready to view.',
             duration: 3000
           });
         } catch (decodeError) {
           setError('Invalid schedule data format.');
           setIsLoading(false);
         }
       } else if (scheduleId) {
         setError('Schedule ID lookup not yet implemented');
         setIsLoading(false);
       } else {
         setError('No schedule data found in URL. Please check that the share link is complete and try again.');
         setIsLoading(false);
       }
     } catch (err: any) {
       setError(`An error occurred while loading the schedule data: ${err.message}`);
       setIsLoading(false);
     }
   };
   const timer = setTimeout(loadScheduleData, 100);
   return () => clearTimeout(timer);
 }, [scheduleId, location.pathname, location.search, location.hash]);

 // Copy share link logic
 const copyShareLink = async () => {
   try {
     const { data: encodedData, version, isCompressed } = extractDataParameters();
     const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
     const correctUrl = `${baseUrl}?data=${encodedData}&v=${version}&c=${isCompressed ? '1' : '0'}`;
     const scheduleName = scheduleData?.name || "Schedule";
     const shareText = `📅 ${scheduleName} - Import into iSchedulEDU\n\n${correctUrl}\n\nDon't have iSchedulEDU? Get it here: https://apps.apple.com/us/app/ischeduledu-class-planner/id6504114850`;
     await navigator.clipboard.writeText(shareText);
     setShareUrlCopied(true);
     setTimeout(() => setShareUrlCopied(false), 2000);
   } catch (error) {
     setShareUrlCopied(true);
     setTimeout(() => setShareUrlCopied(false), 2000);
   }
 };

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
              {/* Mobile App Download Card - Optimized for Conversion */}
              {isMobile ? (
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center">
                      {/* Smart Banner Notice */}
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">Already have iSchedulEDU?</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Look for the "Open in App" banner at the top of this page to import directly!
                        </p>
                      </div>

                      <div className="relative inline-block mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                          <Smartphone className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                          <Download className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">Get iSchedulEDU</h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed max-w-md mx-auto">
                        Join teachers worldwide who trust iSchedulEDU for seamless schedule management.
                      </p>

                      {/* Social Proof */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                          <span className="text-sm font-semibold text-gray-700 ml-2">5/5 Stars</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-green-700">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">Trusted by teachers worldwide</span>
                        </div>
                      </div>

                      {/* Key Features */}
                      <div className="mb-8 space-y-3">
                        <div className="flex items-center gap-3 text-left bg-white/50 rounded-lg p-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Zap className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-800">One-tap schedule importing</span>
                        </div>
                        <div className="flex items-center gap-3 text-left bg-white/50 rounded-lg p-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Shield className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="font-medium text-gray-800">Smart notifications & alarms</span>
                        </div>
                        <div className="flex items-center gap-3 text-left bg-white/50 rounded-lg p-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Download className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="font-medium text-gray-800">QR code & PDF sharing</span>
                        </div>
                        <div className="flex items-center gap-3 text-left bg-white/50 rounded-lg p-3">
                          <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                            <Heart className="w-4 h-4 text-pink-600" />
                          </div>
                          <span className="font-medium text-gray-800">Works offline & ad-free</span>
                        </div>
                      </div>

                      {/* Call to Action */}
                      <div className="space-y-6">
                        {/* Primary Download Section */}
                        <div className="text-center">
                          <a 
                            href="https://apps.apple.com/us/app/ischeduledu-class-planner/id6504114850"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackAppStoreClick('mobile_main_cta')}
                            className="inline-block w-full max-w-sm"
                          >
                            <img 
                              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                              alt="Download on the App Store"
                              className="h-16 mx-auto hover:scale-105 transition-transform duration-200 shadow-lg rounded-lg"
                            />
                          </a>
                          
                          <div className="mt-4">
                            <p className="text-sm text-green-600 font-semibold">✓ Free Download • 4 Free Sessions</p>
                            <p className="text-xs text-gray-500">One-time $4.99 purchase for unlimited access</p>
                          </div>
                        </div>

                        {/* Share Section */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                          <div className="text-center">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
                              Share This Schedule
                            </h4>
                            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                              Copy a formatted message to share with colleagues via any platform
                            </p>
                            
                            <Button 
                              onClick={copyShareLink}
                              variant="outline"
                              className="w-full max-w-sm flex items-center gap-2 py-3 border-2 hover:bg-white mb-4"
                            >
                              {shareUrlCopied ? (
                                <>
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  Copied to Clipboard!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4" />
                                  Copy Share Message
                                </>
                              )}
                            </Button>
                            
                            <div className="space-y-2">
                              <p className="text-sm text-gray-500">
                                Includes schedule link and App Store link
                              </p>
                              <p className="text-xs text-gray-400">
                                Perfect for iMessage, email, Slack, or any messaging app
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Learn More CTA */}
                        <div className="bg-white/60 rounded-xl p-4 border border-gray-200">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-3">
                              Want to learn more about iSchedulEDU's features?
                            </p>
                            <a 
                              href="https://ischeduledu.app"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-600 hover:text-cyan-700 font-medium text-sm underline"
                            >
                              Visit our website →
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* Desktop/Tablet View - Focused on Mobile Download */
                <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
                  <CardContent className="pt-10 pb-10">
                    <div className="text-center max-w-2xl mx-auto">
                      <div className="relative inline-block mb-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                          <Smartphone className="w-12 h-12 text-white" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                          <Download className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-4xl font-bold text-gray-900 mb-4">Get iSchedulEDU on Mobile</h3>
                      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        This schedule is designed for mobile import. Download the iSchedulEDU app on your iPhone or iPad to import and manage your schedules seamlessly.
                      </p>

                      {/* Enhanced Social Proof for Desktop */}
                      <div className="grid md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                          <div className="flex items-center justify-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="font-bold text-gray-900 text-lg">5/5 Stars</p>
                          <p className="text-sm text-gray-600">App Store Rating</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                          <Users className="w-8 h-8 text-green-600 mx-auto mb-3" />
                          <p className="font-bold text-gray-900 text-lg">Teachers</p>
                          <p className="text-sm text-gray-600">Worldwide</p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                          <Heart className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                          <p className="font-bold text-gray-900 text-lg">Ad-Free</p>
                          <p className="text-sm text-gray-600">Clean Experience</p>
                        </div>
                      </div>

                      {/* Feature Highlights */}
                      <div className="grid md:grid-cols-2 gap-6 mb-10 text-left">
                        <div className="flex items-start gap-4 bg-white/60 rounded-xl p-6 border border-gray-200">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Zap className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">Instant Import</h4>
                            <p className="text-gray-600 text-sm">Import shared schedules with a single tap using our Smart Banner technology.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 bg-white/60 rounded-xl p-6 border border-gray-200">
                          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Shield className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">Smart Notifications</h4>
                            <p className="text-gray-600 text-sm">Never miss a class with intelligent alerts and AlarmKit integration.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 bg-white/60 rounded-xl p-6 border border-gray-200">
                          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                            <Download className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">Multiple Sharing Options</h4>
                            <p className="text-gray-600 text-sm">Share schedules via QR codes, PDFs, text, or web links - all generated in-app.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 bg-white/60 rounded-xl p-6 border border-gray-200">
                          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                            <Heart className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 mb-2">One-Time Purchase</h4>
                            <p className="text-gray-600 text-sm">Free to try with 4 sessions, then just $4.99 for unlimited access. No subscriptions!</p>
                          </div>
                        </div>
                      </div>

                      {/* Call to Action */}
                      <div className="space-y-8">
                        {/* Primary CTA */}
                        <div className="text-center">
                          <a 
                            href="https://apps.apple.com/us/app/ischeduledu-class-planner/id6504114850"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackAppStoreClick('desktop_main_cta')}
                            className="inline-block hover:scale-105 transition-transform duration-200"
                          >
                            <img 
                              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                              alt="Download on the App Store"
                              className="h-20 shadow-lg rounded-lg mx-auto"
                            />
                          </a>
                        </div>
                        
                        {/* Share Section */}
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                          <div className="text-center max-w-md mx-auto">
                            <h4 className="text-lg font-semibold text-gray-900 mb-3">
                              Share This Schedule
                            </h4>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                              Copy a formatted message to share with colleagues via any platform
                            </p>
                            
                            <Button 
                              variant="outline" 
                              onClick={copyShareLink}
                              className="py-3 px-6 rounded-xl border-2 hover:bg-white flex items-center gap-3 mx-auto mb-4"
                            >
                              {shareUrlCopied ? (
                                <>
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                  Copied to Clipboard!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-5 h-5" />
                                  Copy Share Message
                                </>
                              )}
                            </Button>
                            
                            <div className="space-y-2">
                              <p className="text-sm text-gray-500">
                                Includes schedule link and App Store link
                              </p>
                              <p className="text-xs text-gray-400">
                                Perfect for iMessage, email, Slack, or any messaging app
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <p className="text-sm text-green-600 font-semibold">✓ Free Download • 4 Free Sessions • $4.99 One-Time Purchase</p>
                        <p className="text-xs text-gray-500 mt-2 italic leading-relaxed">
                          Users with iSchedulEDU can tap shared links to import directly into the app.<br />
                          Others will be guided to download the app first.
                        </p>
                        
                        {/* Learn More Link for Desktop */}
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">
                            Want to explore all of iSchedulEDU's powerful features?
                          </p>
                          <a 
                            href="https://ischeduledu.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-600 hover:text-cyan-700 font-medium underline"
                          >
                            Learn more on our website →
                          </a>
                        </div>
                      </div>
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
