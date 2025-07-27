import { Link } from "react-router-dom";
import { ChevronLeft, Share2, QrCode, MessageSquare, Download, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AppName from "@/components/AppName";

const ShareablePlans = () => {
  const sharingMethods = [
    {
      icon: <QrCode className="w-8 h-8 text-[#0FA0CE]" />,
      title: "QR Code Sharing",
      description: "Generate QR codes instantly that anyone can scan to view your complete schedule.",
      benefit: "Perfect for substitute teachers and staff"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-600" />,
      title: "Text Message Sharing",
      description: "Send schedules directly via text message with all details included.",
      benefit: "Instant communication with parents and colleagues"
    },
    {
      icon: <Download className="w-8 h-8 text-blue-600" />,
      title: "PDF Export",
      description: "Create professional PDF schedules for posting in your classroom or sharing with administrators.",
      benefit: "Professional documentation for any situation"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Team Collaboration",
      description: "Share schedules with your teaching team, administrators, or support staff instantly.",
      benefit: "Everyone stays on the same page"
    }
  ];

  const useCases = [
    {
      title: "Substitute Teacher Handoff",
      description: "When you're unexpectedly absent, share your schedule instantly with the substitute teacher.",
      sharingMethod: "QR Code + Text Message",
      timeSaved: "2 minutes"
    },
    {
      title: "Parent Communication",
      description: "Share daily schedules with parents so they know what their child is learning each day.",
      sharingMethod: "Text Message",
      timeSaved: "1 minute"
    },
    {
      title: "Administrator Updates",
      description: "Keep administrators informed of schedule changes with professional PDF exports.",
      sharingMethod: "PDF Export",
      timeSaved: "30 seconds"
    },
    {
      title: "Team Planning",
      description: "Share schedules with your grade-level team for coordinated planning and support.",
      sharingMethod: "QR Code + PDF",
      timeSaved: "1 minute"
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
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Share2 className="w-4 h-4" />
              Shareable School Day Plans
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Shareable School Day Plans for Teachers
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Create professional, shareable schedules that everyone can access instantly. 
              From substitute teachers to parents, <AppName /> makes schedule sharing effortless.
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
                  alt="Download iSchedulEDU Shareable Plans App" 
                  className="h-14"
                />
              </a>
            </div>
          </div>

          {/* Sharing Methods Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Multiple Ways to Share Your Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sharingMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {method.icon}
                      <h3 className="text-xl font-bold text-gray-900">{method.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <Users className="w-4 h-4" />
                      {method.benefit}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Real Sharing Scenarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-l-4 border-[#0FA0CE]">
                  <CardContent className="py-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 mb-3">{useCase.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#0FA0CE] font-semibold">
                        <Share2 className="w-4 h-4" />
                        {useCase.sharingMethod}
                      </div>
                      <div className="text-sm text-gray-500">
                        Time Saved: {useCase.timeSaved}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How Sharing Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How Schedule Sharing Works
            </h2>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Create Schedule</h3>
                  <p className="text-gray-600">Build your schedule with <AppName /> as usual.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Choose Share Method</h3>
                  <p className="text-gray-600">Select QR code, text, or PDF export.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Generate & Send</h3>
                  <p className="text-gray-600">App creates shareable format instantly.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    4
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Everyone Informed</h3>
                  <p className="text-gray-600">Recipients get complete schedule details.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example Shared Schedule */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Example: Shared Schedule Format
            </h2>
            <Card className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 border-[#0FA0CE]/20">
              <CardContent className="py-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Schedule - Shared via QR Code</h3>
                  <p className="text-gray-600">When shared, recipients see this complete format</p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-lg text-gray-900">Mrs. Johnson's Class - Emergency Schedule</h4>
                    <p className="text-sm text-gray-500">Monday, January 15th - Early Dismissal Day</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold">9:00-9:30</span>
                      <span>Math - Fractions Review</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold">9:30-10:00</span>
                      <span>Reading - Chapter 5 Discussion</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold">10:00-10:30</span>
                      <span>Science - Weather Unit</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold">10:30-11:00</span>
                      <span>Social Studies - Community Helpers</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-semibold">11:00-11:30</span>
                      <span>Writing - Journal Entry</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-500">
                    <p>Lunch: 11:30-12:15 | Recess: 12:15-12:45 | Dismissal: 2:30 PM</p>
                    <p className="mt-2">Special Notes: Early dismissal due to weather. All subjects covered equally.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits of Sharing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Benefits of Shareable Schedules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Better Communication</h3>
                <p className="text-gray-600">Everyone stays informed with clear, professional schedules.</p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Sharing</h3>
                <p className="text-gray-600">Share schedules in seconds, not minutes. No more manual typing.</p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Professional Format</h3>
                <p className="text-gray-600">Clean, organized schedules that look professional to administrators.</p>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I share schedules with people who don't have <AppName />?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! When you share via QR code or text message, recipients can view your complete schedule 
                    without needing the app. The sharing feature creates a web-friendly format that anyone can access.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What information is included in shared schedules?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Shared schedules include all class periods, times, subject names, and any special notes you add. 
                    They also show fixed events like lunch and recess, plus any emergency notes about the schedule change.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I customize what information is shared?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! You can add custom notes, modify subject names, and include special instructions 
                    before sharing. This ensures everyone gets the information they need.
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
                  Share Schedules Like Never Before
                </h3>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                  From substitute teachers to parents, make sure everyone has access to your schedule 
                  with <AppName />'s powerful sharing features.
                </p>
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block transform hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                    alt="Download iSchedulEDU Shareable Plans App" 
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

export default ShareablePlans; 