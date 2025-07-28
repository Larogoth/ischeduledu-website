import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, AlertTriangle, Clock, Share2, Download, CheckCircle, Play, Pause, Bell } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppName from "@/components/AppName";

import RelatedContent from "@/components/RelatedContent";
import Footer from "@/components/home/Footer";
import StickyNavigation from "@/components/home/StickyNavigation";
import { Helmet } from "react-helmet-async";

const EmergencyScheduleGuide = () => {
  const steps = [
    {
      step: 1,
      title: "Open iSchedulEDU App",
      description: "Launch the app on your iPhone or iPad. You'll see the main dashboard with options for creating schedules.",
      tip: "Make sure you have the latest version of the app for the best experience."
    },
    {
      step: 2,
      title: "Tap 'Create New Schedule'",
      description: "From the main screen, tap the '+' button or 'Create New Schedule' option to start building your emergency schedule.",
      tip: "You can also access this from the Schedules tab in the bottom navigation."
    },
    {
      step: 3,
      title: "Enter Your Emergency Times",
      description: "Input your new start time and end time for the abbreviated day. For example, if school normally starts at 8:00 AM but there's a 2-hour delay, enter 10:00 AM as your start time.",
      tip: "The app will automatically calculate the total available time for your classes."
    },
    {
      step: 4,
      title: "Add Fixed Events (Optional)",
      description: "If you have fixed events like lunch or special periods that can't be changed, add them with their specific times. The app will work around these events.",
      tip: "Common fixed events include lunch periods, assemblies, or special classes that must happen at specific times."
    },
    {
      step: 5,
      title: "Generate Equal Time Schedule",
      description: "Tap 'Generate Schedule' and watch as iSchedulEDU automatically creates equal-length class periods. The app uses intelligent algorithms to distribute time fairly.",
      tip: "The app makes most periods equal and only adjusts the last period to handle any remaining odd minutes."
    },
    {
      step: 6,
      title: "Review and Customize",
      description: "Review the generated schedule. You can adjust individual class times if needed, or add specific class names to make it more organized.",
      tip: "You can name your classes (Math, Science, etc.) to make the schedule more professional and easier to follow."
    },
    {
      step: 7,
      title: "Enable Notifications",
      description: "Toggle on notifications for each class period so you'll get alerts when classes end. This helps keep you on track during the abbreviated day.",
      tip: "Make sure notifications are enabled in your device settings for the app to work properly."
    },
    {
      step: 8,
      title: "Save Your Schedule",
      description: "Give your emergency schedule a descriptive name like '2-Hour Delay Schedule' or 'Early Dismissal 1:00 PM' and save it for future use.",
      tip: "Saving with descriptive names makes it easy to find and reuse emergency schedules when similar situations arise."
    },
    {
      step: 9,
      title: "Share with Colleagues",
      description: "Use the share button to send your schedule to other teachers, administrators, or substitute teachers via Universal Links, QR codes, or text messages.",
      tip: "Universal Links work for everyone - app users get direct import, non-app users see web versions."
    }
  ];

  const scenarios = [
    {
      title: "Fire Drill Disruption",
      description: "When a fire drill cuts into your morning, you need to redistribute remaining time quickly.",
      steps: [
        "Enter your new start time (when students return to class)",
        "Keep your normal end time",
        "Generate schedule to get equal class periods",
        "Share with substitute if needed"
      ]
    },
    {
      title: "Weather Delay",
      description: "School announces a 2-hour delay due to weather conditions.",
      steps: [
        "Set start time to 10:00 AM (instead of 8:00 AM)",
        "Keep normal end time",
        "Add lunch period if it's still needed",
        "Generate and save as '2-Hour Delay Schedule'"
      ]
    },
    {
      title: "Assembly Interruption",
      description: "Morning assembly eats up your first two periods.",
      steps: [
        "Set start time to when assembly ends",
        "Keep normal end time",
        "Generate equal periods for remaining time",
        "Share schedule with your team"
      ]
    },
    {
      title: "Early Dismissal",
      description: "School announces early dismissal due to weather or other emergency.",
      steps: [
        "Keep normal start time",
        "Set end time to dismissal time (e.g., 1:00 PM)",
        "Generate abbreviated schedule",
        "Save as 'Early Dismissal 1:00 PM'"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>How to Create Emergency Schedules with iSchedulEDU - Step-by-Step Guide</title>
        <meta name="description" content="Learn how to create emergency schedules in under 2 minutes with iSchedulEDU. Complete step-by-step guide for fire drills, weather delays, assemblies, and early dismissals." />
        <meta name="keywords" content="emergency schedule guide, fire drill schedule, weather delay schedule, assembly schedule, early dismissal schedule, teacher emergency planning, school schedule emergency, abbreviated schedule tutorial" />
        <meta property="og:title" content="How to Create Emergency Schedules with iSchedulEDU" />
        <meta property="og:description" content="Step-by-step guide for creating emergency schedules in under 2 minutes. Perfect for fire drills, weather delays, and assemblies." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://ischeduledu.app/emergency-schedule-guide" />
        <link rel="canonical" href="https://ischeduledu.app/emergency-schedule-guide" />
        
        {/* How-To Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Create Emergency Schedules with iSchedulEDU",
            "description": "Step-by-step guide for creating emergency schedules in under 2 minutes using iSchedulEDU app",
            "image": "https://ischeduledu.app/lovable-uploads/ischeduledu-emergency-schedule-generation.png",
            "totalTime": "PT2M",
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
              "url": `https://ischeduledu.app/emergency-schedule-guide#step-${index + 1}`,
              "image": "https://ischeduledu.app/lovable-uploads/ischeduledu-app-logo-elementary-teacher-schedule-planner.png"
            }))
          })}
        </script>
      </Helmet>

      <StickyNavigation />
      
      <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-14">
        <div className="container mx-auto px-4 py-8">


          <div className="max-w-4xl mx-auto">
            {/* Header with Navigation */}
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Home
              </Link>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <AlertTriangle className="w-4 h-4" />
                <span>Emergency Schedule Guide</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                How to Create Emergency Schedules with <AppName />
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Learn how to create emergency schedules in under 2 minutes. Perfect for fire drills, 
                weather delays, assemblies, and early dismissals.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center p-6">
                <Clock className="w-8 h-8 text-[#0FA0CE] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Under 2 Minutes</h3>
                <p className="text-gray-600 dark:text-gray-300">Create emergency schedules faster than manual calculations</p>
              </Card>
              <Card className="text-center p-6">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Equal Time Division</h3>
                <p className="text-gray-600 dark:text-gray-300">Intelligent algorithms ensure fair class time distribution</p>
              </Card>
              <Card className="text-center p-6">
                <Share2 className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Easy Sharing</h3>
                <p className="text-gray-600 dark:text-gray-300">Share schedules instantly with colleagues and substitutes</p>
              </Card>
            </div>

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

            {/* Common Scenarios */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Common Emergency Scenarios
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scenarios.map((scenario, index) => (
                  <Card key={index} className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {scenario.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {scenario.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {scenario.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-[#0FA0CE] text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                            {stepIndex + 1}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {step}
                          </p>
                        </div>
                      ))}
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
                    See iSchedulEDU in action as we create an emergency schedule from start to finish.
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
                  Ready to Create Emergency Schedules?
                </h2>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Download iSchedulEDU now and be prepared for any schedule disruption. 
                  Create emergency schedules in under 2 minutes with our intelligent algorithms.
                </p>
                <a
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-[#0FA0CE] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download iSchedulEDU
                </a>
              </Card>
            </section>

            <RelatedContent currentPage="emergency-schedule-guide" />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default EmergencyScheduleGuide; 