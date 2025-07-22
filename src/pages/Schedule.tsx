
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useScheduleStore } from '@/store/scheduleStore';

const Schedule = () => {
  const navigate = useNavigate();
  const { scheduleData, clearScheduleData } = useScheduleStore();

  if (!scheduleData) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>No Schedule Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              No schedule data available. Please import a schedule from the iOS app.
            </p>
            <Button onClick={() => navigate('/')}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatTime = (timeString: string) => {
    if (!timeString) return 'No time set';
    // Handle different time formats from iOS app
    return timeString;
  };

  const rgbToHex = (colorData: any) => {
    if (!colorData || typeof colorData !== 'object') {
      return '#3B82F6'; // Default blue
    }
    
    const r = Math.round((colorData.red || 0) * 255);
    const g = Math.round((colorData.green || 0) * 255);
    const b = Math.round((colorData.blue || 0) * 255);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl font-bold">{scheduleData.name}</CardTitle>
            <div className="space-x-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  clearScheduleData();
                  navigate('/');
                }}
              >
                Clear Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Schedule Information</h3>
                <p><strong>Type:</strong> {scheduleData.type || 'Unknown'}</p>
                {scheduleData.startTime && (
                  <p><strong>Start Time:</strong> {formatTime(scheduleData.startTime)}</p>
                )}
                {scheduleData.endTime && (
                  <p><strong>End Time:</strong> {formatTime(scheduleData.endTime)}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Events ({scheduleData.events?.length || 0})
                </h3>
                {scheduleData.events && scheduleData.events.length > 0 ? (
                  <div className="space-y-3">
                    {scheduleData.events.map((event, index) => (
                      <Card key={index} className="border-l-4" style={{ borderLeftColor: rgbToHex(event.colorData) }}>
                        <CardContent className="p-4">
                          <h4 className="font-semibold">{event.name}</h4>
                          <div className="text-sm text-gray-600 mt-1">
                            {event.startTime && (
                              <span>Start: {formatTime(event.startTime)}</span>
                            )}
                            {event.endTime && (
                              <span className="ml-4">End: {formatTime(event.endTime)}</span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No events in this schedule.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
