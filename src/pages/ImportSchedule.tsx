
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, Calendar, Clock, AlertCircle, CheckCircle, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useScheduleStore } from "@/store/scheduleStore";
import { decodeScheduleData } from "@/utils/scheduleSharing";
import { validateScheduleData } from "@/utils/inputValidation";
import { handleSecureError } from "@/utils/errorHandling";
import { Helmet } from "react-helmet-async";

const ImportSchedule = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>();
  const navigate = useNavigate();
  const { addSchedule } = useScheduleStore();
  const [schedule, setSchedule] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);

  useEffect(() => {
    const loadSchedule = async () => {
      if (!scheduleId) {
        setError("No schedule ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const decodedSchedule = await decodeScheduleData(scheduleId);
        
        if (!decodedSchedule) {
          setError("Invalid schedule link");
          setLoading(false);
          return;
        }

        const validationResult = validateScheduleData(decodedSchedule);
        if (!validationResult.isValid) {
          setError(`Invalid schedule data: ${validationResult.errors.join(", ")}`);
          setLoading(false);
          return;
        }

        setSchedule(decodedSchedule);
        setError(null);
      } catch (err) {
        handleSecureError(err, "Failed to load schedule");
        setError("Failed to load schedule. The link may be invalid or expired.");
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, [scheduleId]);

  const handleImport = async () => {
    if (!schedule) return;

    try {
      setImporting(true);
      
      // Add the schedule to the store
      addSchedule({
        id: Date.now().toString(),
        name: schedule.name || "Imported Schedule",
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        periods: schedule.periods,
        events: schedule.events || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      setImported(true);
      toast.success("Schedule imported successfully!");
      
      // Navigate to the app after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      handleSecureError(err, "Failed to import schedule");
      toast.error("Failed to import schedule");
    } finally {
      setImporting(false);
    }
  };

  const formatTime = (time: string) => {
    return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Schedule - iSchedulEDU</title>
          <meta name="description" content="Loading shared schedule..." />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0FA0CE] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading schedule...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>Schedule Not Found - iSchedulEDU</title>
          <meta name="description" content="The requested schedule could not be found." />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-5 h-5" />
                Schedule Not Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="mt-4 space-y-3">
                <Button 
                  onClick={() => navigate("/")} 
                  className="w-full"
                >
                  Go to iSchedulEDU
                </Button>
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                    alt="Download iSchedulEDU on the App Store" 
                    className="w-full max-w-[200px] mx-auto"
                  />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (!schedule) {
    return (
      <>
        <Helmet>
          <title>Schedule Not Available - iSchedulEDU</title>
          <meta name="description" content="The requested schedule is not available." />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-600">
                <AlertCircle className="w-5 h-5" />
                Schedule Not Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                The schedule you're looking for is not available.
              </p>
              <Button 
                onClick={() => navigate("/")} 
                className="w-full"
              >
                Go to iSchedulEDU
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{schedule.name || "Shared Schedule"} - iSchedulEDU</title>
        <meta name="description" content={`View and import the shared schedule: ${schedule.name || "Shared Schedule"}`} />
      </Helmet>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img
                src="/lovable-uploads/ischeduledu-app-logo-elementary-teacher-schedule-planner.png"
                alt="iSchedulEDU Logo"
                className="w-12 h-12 object-contain"
              />
              <h1 className="text-3xl font-bold text-gray-900">iSchedulEDU</h1>
            </div>
            <p className="text-gray-600">Shared Schedule</p>
          </div>

          {/* Schedule Card */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-900">
                  {schedule.name || "Shared Schedule"}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>Shared Schedule</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Schedule Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0FA0CE]" />
                  <span className="font-medium">Start Time:</span>
                  <span>{formatTime(schedule.startTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#0FA0CE]" />
                  <span className="font-medium">End Time:</span>
                  <span>{formatTime(schedule.endTime)}</span>
                </div>
              </div>

              {/* Schedule Preview */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 mb-3">Schedule Preview</h3>
                {schedule.periods && schedule.periods.length > 0 ? (
                  <div className="space-y-2">
                    {schedule.periods.map((period: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[#0FA0CE] rounded-full"></div>
                          <span className="font-medium">{period.name || `Period ${index + 1}`}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatTime(period.startTime)} - {formatTime(period.endTime)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No periods available</p>
                )}
              </div>

              {/* Events */}
              {schedule.events && schedule.events.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Events</h3>
                  <div className="space-y-2">
                    {schedule.events.map((event: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="font-medium">{event.name}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatTime(event.startTime)} - {formatTime(event.endTime)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Import Button */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {!imported ? (
                  <Button 
                    onClick={handleImport}
                    disabled={importing}
                    className="flex-1 bg-[#0FA0CE] hover:bg-[#0D8CB6] text-white"
                  >
                    {importing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Importing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Import to iSchedulEDU
                      </>
                    )}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle className="w-5 h-5" />
                    Schedule imported successfully!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* App Download Section */}
          <Card className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 border-[#0FA0CE]/20">
            <CardContent className="py-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Get the Full iSchedulEDU Experience
              </h3>
              <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                Download iSchedulEDU to create your own schedules, handle emergency changes, 
                and share with colleagues. Free to start, no ads, and designed specifically for teachers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block transform hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                    alt="Download iSchedulEDU on the App Store" 
                    className="h-14"
                  />
                </a>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")}
                  className="border-[#0FA0CE] text-[#0FA0CE] hover:bg-[#0FA0CE] hover:text-white"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ImportSchedule;
