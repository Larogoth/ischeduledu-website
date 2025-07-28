import { Link } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, Share2, Download, CheckCircle, Play, Plus, Settings, Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppName from "@/components/AppName";
import RelatedContent from "@/components/RelatedContent";
import StickyNavigation from "@/components/home/StickyNavigation";
import { Helmet } from "react-helmet-async";

const CustomScheduleGuide = () => {
  const steps = [
    {
      step: 1,
      title: "Open the Schedules Tab",
      description: "Launch iSchedulEDU and navigate to the 'Schedules' tab in the bottom navigation. This is where you'll create and manage all your custom schedules.",
      tip: "The Schedules tab is your central hub for all schedule creation and management."
    },
    {
      step: 2,
      title: "Tap the '+' Button",
      description: "Tap the '+' button to create a new custom schedule. This will open the schedule creation interface where you can build your daily schedule from scratch.",
      tip: "You can create multiple schedules for different days, scenarios, or purposes."
    },
    {
      step: 3,
      title: "Name Your Schedule",
      description: "Give your schedule a descriptive name that will help you identify it later. Examples: 'Regular Day Schedule', 'Early Dismissal Schedule', 'Substitute Schedule'.",
      tip: "Use clear, descriptive names to make it easy to find the right schedule when you need it."
    },
    {
      step: 4,
      title: "Add Your First Event",
      description: "Tap 'Add Event' to create your first class period or event. Enter the start time and end time for this period.",
      tip: "Start with your first class of the day and work through your schedule chronologically."
    },
    {
      step: 5,
      title: "Name Your Events",
      description: "Give each event a name (like 'Math', 'Science', 'Lunch', etc.) to make your schedule more organized and professional.",
      tip: "Using subject names or class names makes it easier to follow your schedule throughout the day."
    },
    {
      step: 6,
      title: "Add All Your Events",
      description: "Continue adding events for each class period, break, lunch, and any other activities in your day. The app will automatically calculate durations.",
      tip: "You can add as many events as you need - there's no limit to the number of periods in your schedule."
    },
    {
      step: 7,
      title: "Enable Notifications",
      description: "Toggle on notifications for events that need reminders. This will alert you when each class period ends, helping you stay on track.",
      tip: "You can enable notifications for all events or just specific ones that you need reminders for."
    },
    {
      step: 8,
      title: "Save Your Schedule",
      description: "Tap 'Save' to store your custom schedule. It will now appear in your schedules list and can be used for daily planning or linked to rotation days.",
      tip: "Saved schedules can be edited, shared, or used as templates for other schedules."
    },
    {
      step: 9,
      title: "Share Your Schedule",
      description: "Use the share button to send your schedule to colleagues, substitute teachers, or administrators via Universal Links, QR codes, or PDF export.",
      tip: "Universal Links work for everyone - app users get direct import, non-app users see web versions."
    }
  ];

  const scheduleTypes = [
    {
      type: "Regular Day Schedule",
      description: "Your standard daily schedule with all normal class periods",
      useCase: "Daily classroom use",
      periods: [
        "1st Period: 7:55 AM - 8:49 AM (54m)",
        "Elective: 8:49 AM - 9:42 AM (53m)",
        "3rd Period: 9:42 AM - 10:35 AM (53m)",
        "4th Period: 10:35 AM - 12:00 PM (1h 25m)",
        "Lunch: 10:45 AM - 11:15 AM (30m)",
        "5th Period: 12:00 PM - 12:47 PM (47m)",
        "6th Period: 12:47 PM - 1:35 PM (48m)",
        "7th Period: 1:35 PM - 2:20 PM (45m)"
      ]
    },
    {
      type: "1-Hour Delay Schedule", 
      description: "Abbreviated schedule for weather delays or late starts",
      useCase: "Weather delays, late starts",
      periods: [
        "1st Period: 8:55 AM - 9:44 AM (49m)",
        "2nd Period: 9:44 AM - 11:03 AM (1h 19m)",
        "3rd Period: 11:03 AM - 11:49 AM (46m)",
        "4th Period: 11:49 AM - 12:36 PM (47m)",
        "5th Period: 12:36 PM - 1:25 PM (49m)",
        "6th Period: 1:25 PM - 2:14 PM (49m)",
        "7th Period: 2:14 PM - 3:05 PM (51m)"
      ]
    },
    {
      type: "RTI Schedule",
      description: "Schedule with Response to Intervention periods",
      useCase: "RTI days, intervention periods",
      periods: [
        "1st Period: 7:55 AM - 8:45 AM (50m)",
        "2nd Period: 8:45 AM - 9:30 AM (45m)",
        "3rd Period: 9:30 AM - 10:15 AM (45m)",
        "4th Period: 10:15 AM - 11:30 AM (1h 15m)",
        "Lunch: 10:25 AM - 10:55 AM (30m)",
        "5th Period: 11:30 AM - 12:00 PM (30m)",
        "RTI: 12:15 PM - 1:05 PM (50m)",
        "6th Period: 1:05 PM - 1:50 PM (45m)",
        "7th Period: 1:50 PM - 2:35 PM (45m)"
      ]
    },
    {
      type: "Early Dismissal Schedule",
      description: "Abbreviated schedule for early dismissal days",
      useCase: "Half-days, early dismissal",
      periods: [
        "Create shorter periods to fit the abbreviated day",
        "while maintaining equal time distribution"
      ]
    }
  ];

  const tips = [
    {
      title: "Plan Your Day",
      description: "Before creating your schedule, plan out your entire day including all class periods, breaks, and special activities."
    },
    {
      title: "Use Consistent Times",
      description: "Try to use consistent start and end times that work well with your school's bell schedule and transition times."
    },
    {
      title: "Include All Activities",
      description: "Don't forget to include lunch, recess, special classes, and any other activities that are part of your daily routine."
    },
    {
      title: "Test Your Schedule",
      description: "Review your completed schedule to make sure all times flow logically and there are no conflicts or gaps."
    },
    {
      title: "Save Multiple Versions",
      description: "Create and save multiple schedule versions for different scenarios (regular day, early dismissal, substitute, etc.)."
    }
  ];

  return (
    <>
      <Helmet>
        <title>How to Create Custom Schedules with iSchedulEDU - Complete Guide</title>
        <meta name="description" content="Learn how to create custom daily schedules with iSchedulEDU. Step-by-step guide for building personalized schedules for regular days, early dismissals, and substitute teachers." />
        <meta name="keywords" content="custom schedule guide, daily schedule creation, teacher schedule builder, class schedule maker, school schedule creator, personalized schedule, teacher planning, classroom schedule" />
        <meta property="og:title" content="How to Create Custom Schedules with iSchedulEDU" />
        <meta property="og:description" content="Complete guide for creating custom daily schedules. Perfect for regular days, early dismissals, and substitute teacher scenarios." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://ischeduledu.app/custom-schedule-guide" />
        <link rel="canonical" href="https://ischeduledu.app/custom-schedule-guide" />
        
        {/* How-To Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Create Custom Schedules with iSchedulEDU",
            "description": "Step-by-step guide for creating custom daily schedules using iSchedulEDU app",
            "image": "https://ischeduledu.app/lovable-uploads/ischeduledu-custom-schedule-creation-naming.png",
            "totalTime": "PT3M",
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "USD",
              "value": "0"
            },
            "supply": [
              {
                "@type": "HowToSupply",
                "name": "iSchedulEDU App"
              },
              {
                "@type": "HowToSupply", 
                "name": "iPhone or iPad"
              }
            ],
            "tool": [
              {
                "@type": "HowToTool",
                "name": "iSchedulEDU Mobile App"
              }
            ],
            "step": steps.map((step, index) => ({
              "@type": "HowToStep",
              "name": step.title,
              "text": step.description,
              "url": `https://ischeduledu.app/custom-schedule-guide#step-${index + 1}`,
              "image": "https://ischeduledu.app/lovable-uploads/ischeduledu-app-logo-elementary-teacher-schedule-planner.png"
            }))
          })}
        </script>
      </Helmet>

      <StickyNavigation />
      
      <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-14">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Calendar className="w-4 h-4" />
                <span>Custom Schedule Guide</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                How to Create Custom Schedules with <AppName />
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Learn how to build personalized daily schedules from scratch. Perfect for regular days, 
                early dismissals, substitute teachers, and special events.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center p-6">
                <Plus className="w-8 h-8 text-[#0FA0CE] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Build from Scratch</h3>
                <p className="text-gray-600 dark:text-gray-300">Create completely custom schedules tailored to your needs</p>
              </Card>
              <Card className="text-center p-6">
                <Bell className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Smart Notifications</h3>
                <p className="text-gray-600 dark:text-gray-300">Get alerts when classes end to stay on track</p>
              </Card>
              <Card className="text-center p-6">
                <Share2 className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Easy Sharing</h3>
                <p className="text-gray-600 dark:text-gray-300">Share schedules with colleagues and substitutes instantly</p>
              </Card>
            </div>

            {/* Schedule Types */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Types of Custom Schedules
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scheduleTypes.map((type, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-[#0FA0CE]/10 dark:bg-[#0FA0CE]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-[#0FA0CE]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {type.type}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                          {type.description}
                        </p>
                        <Badge variant="secondary" className="mb-2">
                          {type.useCase}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        <strong>Example:</strong>
                      </p>
                      <div className="space-y-1">
                        {type.periods.map((period, periodIndex) => (
                          <p key={periodIndex} className="text-sm text-gray-600 dark:text-gray-300">
                            {period}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Step-by-Step Guide */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Step-by-Step Instructions
              </h2>
              
              <div className="space-y-8">
                {steps.map((step, index) => (
                  <Card key={index} className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-[#0FA0CE]"></div>
                    <CardContent className="p-6 pl-8">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-[#0FA0CE] text-white rounded-full flex items-center justify-center font-bold text-lg">
                            {step.step}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                            {step.description}
                          </p>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                              <p className="text-blue-800 dark:text-blue-200 text-sm">
                                <strong>Pro Tip:</strong> {step.tip}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Real Schedule Examples */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Real Schedule Examples from iSchedulEDU
              </h2>
              
              <div className="space-y-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Regular Day Schedule
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">1st Period:</span>
                        <span>7:55 AM - 8:49 AM (54m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Elective:</span>
                        <span>8:49 AM - 9:42 AM (53m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">3rd Period:</span>
                        <span>9:42 AM - 10:35 AM (53m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">4th Period:</span>
                        <span>10:35 AM - 12:00 PM (1h 25m)</span>
                      </div>
                      <div className="flex justify-between text-blue-600 dark:text-blue-400">
                        <span className="font-medium">Lunch:</span>
                        <span>10:45 AM - 11:15 AM (30m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">5th Period:</span>
                        <span>12:00 PM - 12:47 PM (47m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">6th Period:</span>
                        <span>12:47 PM - 1:35 PM (48m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">7th Period:</span>
                        <span>1:35 PM - 2:20 PM (45m)</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    1-Hour Delay Schedule
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">1st Period:</span>
                        <span>8:55 AM - 9:44 AM (49m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">2nd Period:</span>
                        <span>9:44 AM - 11:03 AM (1h 19m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">3rd Period:</span>
                        <span>11:03 AM - 11:49 AM (46m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">4th Period:</span>
                        <span>11:49 AM - 12:36 PM (47m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">5th Period:</span>
                        <span>12:36 PM - 1:25 PM (49m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">6th Period:</span>
                        <span>1:25 PM - 2:14 PM (49m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">7th Period:</span>
                        <span>2:14 PM - 3:05 PM (51m)</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    RTI Schedule
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">1st Period:</span>
                        <span>7:55 AM - 8:45 AM (50m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">2nd Period:</span>
                        <span>8:45 AM - 9:30 AM (45m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">3rd Period:</span>
                        <span>9:30 AM - 10:15 AM (45m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">4th Period:</span>
                        <span>10:15 AM - 11:30 AM (1h 15m)</span>
                      </div>
                      <div className="flex justify-between text-blue-600 dark:text-blue-400">
                        <span className="font-medium">Lunch:</span>
                        <span>10:25 AM - 10:55 AM (30m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">5th Period:</span>
                        <span>11:30 AM - 12:00 PM (30m)</span>
                      </div>
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span className="font-medium">RTI:</span>
                        <span>12:15 PM - 1:05 PM (50m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">6th Period:</span>
                        <span>1:05 PM - 1:50 PM (45m)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">7th Period:</span>
                        <span>1:50 PM - 2:35 PM (45m)</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </section>

            {/* Best Practices */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Best Practices for Custom Schedules
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tips.map((tip, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Video Tutorial Section */}
            <section className="mb-16">
              <Card className="p-8 text-center">
                <div className="max-w-2xl mx-auto">
                  <Play className="w-16 h-16 text-[#0FA0CE] mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Watch the Video Tutorial
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    See iSchedulEDU in action as we create a complete custom schedule from start to finish.
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                    <p className="text-gray-500 dark:text-gray-400">
                      Video tutorial coming soon! Subscribe to our newsletter to be notified when it's available.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Download CTA */}
            <section className="text-center mb-16">
              <Card className="p-8 bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white">
                <h2 className="text-2xl font-bold mb-4">
                  Ready to Create Your Custom Schedule?
                </h2>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Download iSchedulEDU now and build personalized schedules in minutes. 
                  Create schedules for regular days, early dismissals, substitutes, and special events.
                </p>
                <a
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#0FA0CE] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download iSchedulEDU
                </a>
              </Card>
            </section>

            <RelatedContent currentPage="custom-schedule-guide" />
          </div>
        </div>
      </main>
    </>
  );
};

export default CustomScheduleGuide; 