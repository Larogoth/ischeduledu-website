import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Calendar, Clock, Share2, Download, CheckCircle, Play, ArrowRight, Settings } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppName from "@/components/AppName";
import RelatedContent from "@/components/RelatedContent";
import Footer from "@/components/home/Footer";
import StickyNavigation from "@/components/home/StickyNavigation";
import { Helmet } from "react-helmet-async";

const RotatingScheduleGuide = () => {
  const steps = [
    {
      step: 1,
      title: "Open the Rotating Schedule Tab",
      description: "Launch iSchedulEDU and navigate to the 'Rotating Schedule' tab in the bottom navigation. This is where you'll manage your A/B day rotations and multi-day cycles.",
      tip: "The rotating schedule feature is perfect for schools that use A/B day schedules, block schedules, or any other alternating pattern."
    },
    {
      step: 2,
      title: "Select Your Rotation Type",
      description: "Choose your rotation type from the available options: A/B (2-day cycle), A/B/C (3-day cycle), or custom multi-day cycles. This determines how your schedule will alternate.",
      tip: "Most schools use A/B rotations, but some use 3-day or 4-day cycles for more complex scheduling needs."
    },
    {
      step: 3,
      title: "Set Your Schedule Dates",
      description: "Enter the start and end dates for your rotation schedule. This tells the app when your rotation begins and ends for the school year or semester.",
      tip: "You can set up multiple rotation periods for different semesters or quarters throughout the year."
    },
    {
      step: 4,
      title: "Generate Your Rotation Calendar",
      description: "Tap 'Generate Schedule' to create your rotation calendar. The app will automatically assign A/B days (or A/B/C days) to each school day within your date range.",
      tip: "The app automatically skips weekends and holidays, focusing only on school days."
    },
    {
      step: 5,
      title: "Link Custom Schedules to Rotation Days",
      description: "Use the 'Assign Schedules' feature to link your custom schedules to specific rotation days. For example, link your 'A Day Schedule' to all A days and your 'B Day Schedule' to all B days.",
      tip: "This linking allows you to view your actual daily schedule from the calendar view and get automatic notifications."
    },
    {
      step: 6,
      title: "Mark Days Off",
      description: "Select any dates that should be marked as 'off' (holidays, teacher workdays, etc.) by tapping on the date and selecting 'Mark Day Off'.",
      tip: "Marked-off days won't count toward your rotation, ensuring your A/B pattern stays consistent."
    },
    {
      step: 7,
      title: "View Your Daily Schedule",
      description: "Tap on any day in the calendar to view the schedule for that specific day. If you've linked custom schedules, you'll see your actual class periods and times.",
      tip: "This view shows you exactly what your day will look like, including class times and notifications."
    },
    {
      step: 8,
      title: "Set Up Notifications",
      description: "Enable notifications for your linked schedules so you'll get alerts when classes end, even on rotating days.",
      tip: "Notifications work automatically for all linked schedules, so you don't need to set them up for each individual day."
    },
    {
      step: 9,
      title: "Share Your Rotation Schedule",
      description: "Share your rotation schedule with colleagues, administrators, or substitute teachers using Universal Links, QR codes, or PDF export.",
      tip: "Substitute teachers especially benefit from seeing which rotation day it is and what the schedule looks like."
    }
  ];

  const rotationTypes = [
    {
      type: "A/B Rotation",
      description: "Most common rotation type used in schools",
      cycle: "2-day cycle",
      example: "Monday = A Day, Tuesday = B Day, Wednesday = A Day, etc.",
      useCase: "Perfect for schools with alternating schedules"
    },
    {
      type: "A/B/C Rotation", 
      description: "Three-day rotation cycle",
      cycle: "3-day cycle",
      example: "Monday = A Day, Tuesday = B Day, Wednesday = C Day, Thursday = A Day, etc.",
      useCase: "Common in schools with complex scheduling needs"
    },
    {
      type: "Custom Multi-Day",
      description: "Custom rotation patterns",
      cycle: "4+ day cycle",
      example: "A/B/C/D rotation or other custom patterns",
      useCase: "For schools with unique scheduling requirements"
    }
  ];

  const tips = [
    {
      title: "Plan Ahead",
      description: "Set up your rotation schedule at the beginning of the school year or semester to ensure consistency throughout the term."
    },
    {
      title: "Use Descriptive Names",
      description: "Name your custom schedules clearly (e.g., 'A Day Schedule', 'B Day Schedule') to make linking easier and more intuitive."
    },
    {
      title: "Mark All Holidays",
      description: "Don't forget to mark holidays, teacher workdays, and other non-student days as 'off' to maintain your rotation pattern."
    },
    {
      title: "Share with Your Team",
      description: "Share your rotation schedule with your teaching team so everyone knows which day it is and what the schedule looks like."
    },
    {
      title: "Check Regularly",
      description: "Review your rotation schedule periodically to ensure it's working correctly and make adjustments as needed."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Rotating Schedule Guide | iSchedulEDU - A/B Day Setup</title>
        <meta name="description" content="Learn how to set up A/B day rotations, multi-day cycles, and complex rotating schedules with iSchedulEDU. Step-by-step guide for teachers and administrators." />
        <meta name="keywords" content="rotating schedule guide, A/B day schedule, block schedule, multi-day rotation, school rotation schedule, teacher rotation guide, alternating schedule, school calendar rotation" />
        <meta property="og:title" content="How to Set Up Rotating Schedules with iSchedulEDU" />
        <meta property="og:description" content="Complete guide for setting up A/B day rotations and multi-day cycles. Perfect for schools with alternating schedules." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://ischeduledu.app/rotating-schedule-guide" />
        <link rel="canonical" href="https://ischeduledu.app/rotating-schedule-guide" />
        
        {/* How-To Article Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Set Up Rotating Schedules with iSchedulEDU",
            "description": "Step-by-step guide for setting up A/B day rotations and multi-day cycles using iSchedulEDU app",
            "image": "https://ischeduledu.app/lovable-uploads/ischeduledu-rotating-block-schedule-calendar.png",
            "totalTime": "PT5M",
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
              "url": `https://ischeduledu.app/rotating-schedule-guide#step-${index + 1}`,
              "image": "https://ischeduledu.app/lovable-uploads/ischeduledu-app-logo-elementary-teacher-schedule-planner.png"
            }))
          })}
        </script>
      </Helmet>

      <StickyNavigation />
      
      <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-14">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <div className="mb-8">
              <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Link 
                  to="/" 
                  className="hover:text-[#0FA0CE] transition-colors duration-200 flex items-center gap-1 font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Home
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Rotating Schedule Guide</span>
              </nav>
            </div>

            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <Calendar className="w-4 h-4" />
                <span>Rotating Schedule Guide</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                How to Set Up Rotating Schedules with <AppName />
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Learn how to create A/B day rotations, multi-day cycles, and complex rotating schedules. 
                Perfect for schools with alternating schedules and block periods.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center p-6">
                <Calendar className="w-8 h-8 text-[#0FA0CE] mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">A/B Day Support</h3>
                <p className="text-gray-600 dark:text-gray-300">Handle 2-day, 3-day, and custom rotation cycles</p>
              </Card>
              <Card className="text-center p-6">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Automatic Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">The app automatically tracks which rotation day it is</p>
              </Card>
              <Card className="text-center p-6">
                <Share2 className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Easy Sharing</h3>
                <p className="text-gray-600 dark:text-gray-300">Share rotation schedules with colleagues and substitutes</p>
              </Card>
            </div>

            {/* Rotation Types */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Types of Rotating Schedules
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rotationTypes.map((type, index) => (
                  <Card key={index} className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-12 h-12 bg-[#0FA0CE] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {type.type}
                      </h3>
                      <Badge variant="secondary" className="mb-3">
                        {type.cycle}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                      {type.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-sm">
                        <strong className="text-gray-900 dark:text-white">Example:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">{type.example}</p>
                      </div>
                      <div className="text-sm">
                        <strong className="text-gray-900 dark:text-white">Best for:</strong>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">{type.useCase}</p>
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

            {/* Best Practices */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Best Practices for Rotating Schedules
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
                    See iSchedulEDU in action as we set up a complete A/B day rotation from start to finish.
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
                  Ready to Set Up Your Rotating Schedule?
                </h2>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                  Download iSchedulEDU now and create professional rotating schedules in minutes. 
                  Handle A/B days, multi-day cycles, and complex rotations with ease.
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

            <RelatedContent currentPage="rotating-schedule-guide" />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default RotatingScheduleGuide; 