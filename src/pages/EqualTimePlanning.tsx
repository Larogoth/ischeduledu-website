import { Link } from "react-router-dom";
import { ChevronLeft, Clock, Calculator, Share2, Save, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AppName from "@/components/AppName";

const EqualTimePlanning = () => {
  const benefits = [
    {
      icon: <Calculator className="w-8 h-8 text-[#0FA0CE]" />,
      title: "Smart Equal Division",
      description: "The app intelligently divides remaining time into equal periods, adjusting the last period if needed to handle odd minutes perfectly.",
      benefit: "Handles any time division scenario"
    },
    {
      icon: <Clock className="w-8 h-8 text-green-600" />,
      title: "Precise Time Management",
      description: "Every minute counts. Get exact equal periods that maximize learning time for each subject.",
      benefit: "Optimizes every learning minute"
    },
    {
      icon: <Save className="w-8 h-8 text-blue-600" />,
      title: "Save & Reuse Templates",
      description: "Save your favorite equal-time configurations and reuse them for similar schedule changes.",
      benefit: "Build your perfect schedule library"
    },
    {
      icon: <Share2 className="w-8 h-8 text-purple-600" />,
      title: "Share Equal Schedules",
      description: "Share your balanced schedules with colleagues, substitutes, or administrators instantly.",
      benefit: "Perfect for team collaboration"
    }
  ];

  const scenarios = [
    {
      title: "Early Dismissal Days",
      description: "When school ends early, create equal periods that maintain learning balance across all subjects.",
      timeExample: "2:30 PM dismissal → 5 equal 30-minute periods"
    },
    {
      title: "Assembly Days",
      description: "Morning assemblies eating your time? Redistribute remaining hours equally across subjects.",
      timeExample: "Assembly 9-10 AM → 6 equal 40-minute periods"
    },
    {
      title: "Weather Delays",
      description: "Late starts due to weather? Create balanced schedules that don't favor any subject.",
      timeExample: "10 AM start → 4 equal 45-minute periods"
    },
    {
      title: "Special Event Days",
      description: "Field trips, testing, or special activities? Balance the remaining time fairly.",
      timeExample: "Testing 1-3 PM → 3 equal 50-minute periods"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-gray-50 p-4 border-b">
        <Link to="/" className="inline-flex items-center text-primary hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Calculator className="w-4 h-4" />
              Equal Time Lesson Planning
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              App for Equal Time Lesson Planning
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stop playing favorites with your subjects! <AppName /> automatically creates perfectly balanced 
              schedules where every subject gets equal time. Fair, fast, and frustration-free.
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
                  alt="Download iSchedulEDU Equal Time Planning App" 
                  className="h-14"
                />
              </a>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Why Equal Time Planning Matters
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {benefit.icon}
                      <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      {benefit.benefit}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Scenarios Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Perfect Equal Time Scenarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scenarios.map((scenario, index) => (
                <Card key={index} className="border-l-4 border-[#0FA0CE]">
                  <CardContent className="py-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{scenario.title}</h3>
                    <p className="text-gray-600 mb-3">{scenario.description}</p>
                    <div className="flex items-center gap-2 text-[#0FA0CE] font-semibold">
                      <Clock className="w-4 h-4" />
                      {scenario.timeExample}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How Equal Time Planning Works
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Set Time Frame</h3>
                  <p className="text-gray-600">Input your start and end times, plus any fixed events.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Auto-Calculate</h3>
                  <p className="text-gray-600">App divides remaining time into perfectly equal periods.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Review & Adjust</h3>
                  <p className="text-gray-600">See your balanced schedule and make any final tweaks.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    4
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Save & Share</h3>
                  <p className="text-gray-600">Save your equal-time template and share with others.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example Schedule */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Example: Perfect Equal Time Schedule
            </h2>
            <Card className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 border-[#0FA0CE]/20">
              <CardContent className="py-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real App-Generated Schedule</h3>
                  <p className="text-gray-600">7:55 AM to 3:00 PM with lunch interruption (11:00-11:30)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <h4 className="font-bold text-gray-900 mb-2">Math</h4>
                    <p className="text-[#0FA0CE] font-semibold">1h 19m</p>
                    <p className="text-sm text-gray-500">7:55-9:14</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <h4 className="font-bold text-gray-900 mb-2">Reading</h4>
                    <p className="text-[#0FA0CE] font-semibold">1h 19m</p>
                    <p className="text-sm text-gray-500">9:14-10:33</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <h4 className="font-bold text-gray-900 mb-2">Science</h4>
                    <p className="text-[#0FA0CE] font-semibold">27m</p>
                    <p className="text-sm text-gray-500">10:33-11:00</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <h4 className="font-bold text-gray-900 mb-2">Lunch</h4>
                    <p className="text-[#0FA0CE] font-semibold">30m</p>
                    <p className="text-sm text-gray-500">11:00-11:30</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <h4 className="font-bold text-gray-900 mb-2">Science (cont.)</h4>
                    <p className="text-[#0FA0CE] font-semibold">52m</p>
                    <p className="text-sm text-gray-500">11:30-12:22</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <h4 className="font-bold text-gray-900 mb-2">Social Studies</h4>
                    <p className="text-[#0FA0CE] font-semibold">1h 19m</p>
                    <p className="text-sm text-gray-500">12:22-1:41</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow">
                    <h4 className="font-bold text-gray-900 mb-2">Writing</h4>
                    <p className="text-[#0FA0CE] font-semibold">1h 19m</p>
                    <p className="text-sm text-gray-500">1:41-3:00</p>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">Note: Science is interrupted by lunch and continues afterward. The app intelligently handles interruptions while maintaining equal time distribution.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How does <AppName /> ensure truly equal time periods?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    The app uses intelligent mathematical calculations to divide your remaining time into equal periods. 
                    When perfect division isn't possible, it makes the first periods equal and adjusts the last period 
                    to handle any remaining minutes. For example, with 307 minutes divided into 5 periods, you'd get 
                    4 periods of 60 minutes each, and the last period would be 67 minutes. This ensures maximum fairness 
                    while accounting for odd time divisions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I adjust the equal periods if needed?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! While <AppName /> creates perfectly equal periods automatically, you can always make manual 
                    adjustments if you need to prioritize certain subjects or accommodate special activities.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What if I have an odd number of minutes remaining?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    <AppName /> handles odd numbers intelligently. It will create the most equal distribution possible, 
                    with any extra minute or two distributed strategically to maintain balance across your schedule.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 border-[#0FA0CE]/20">
              <CardContent className="py-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Give Every Subject Equal Time
                </h3>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                  Stop playing favorites with your subjects. <AppName /> ensures every class gets the time it deserves 
                  with automatic equal-time calculations.
                </p>
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block transform hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                    alt="Download iSchedulEDU Equal Time Planning App" 
                    className="h-16"
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EqualTimePlanning; 