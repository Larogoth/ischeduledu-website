import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Share2, QrCode, MessageSquare, Download, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AppName from "@/components/AppName";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import Footer from "@/components/home/Footer";
import BackToTop from "@/components/BackToTop";
import StickyNavigation from "@/components/home/StickyNavigation";
import { Helmet } from "react-helmet-async";

const ShareablePlans = () => {
  const sharingMethods = [
    {
      icon: <QrCode className="w-8 h-8 text-[#0FA0CE]" />,
      title: "QR Code Sharing",
      description: "Generate QR codes that app users can scan to import schedules directly into their app.",
      benefit: "Instant import for app users"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-green-600" />,
      title: "Universal Link Sharing",
      description: "Share schedules via Universal Links that work for both app users and non-app users. App users get direct import, others see web version.",
      benefit: "Works for everyone, regardless of app installation"
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
    <>
      <Helmet>
        <title>Shareable School Day Plans for Teachers | iSchedulEDU - Schedule Sharing & Collaboration</title>
        <meta name="description" content="Create professional, shareable schedules that everyone can access instantly. From substitute teachers to parents, iSchedulEDU makes schedule sharing effortless with QR codes, Universal Links, and PDF exports." />
        <meta name="keywords" content="shareable school schedules, substitute teacher schedule sharing, QR code schedule sharing, Universal Links sharing, PDF schedule export, teacher collaboration app" />
        <meta property="og:title" content="Shareable School Day Plans for Teachers | iSchedulEDU" />
        <meta property="og:description" content="Create professional, shareable schedules that everyone can access instantly. From substitute teachers to parents, iSchedulEDU makes schedule sharing effortless." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ischeduledu.app/shareable-plans" />
        <link rel="canonical" href="https://ischeduledu.app/shareable-plans" />
        
        {/* Article Schema for Shareable Plans */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Shareable School Day Plans for Teachers",
            "description": "Create professional, shareable schedules that everyone can access instantly. From substitute teachers to parents, iSchedulEDU makes schedule sharing effortless.",
            "author": {
              "@type": "Organization",
              "name": "iSchedulEDU"
            },
            "publisher": {
              "@type": "Organization",
              "name": "iSchedulEDU"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://ischeduledu.app/shareable-plans"
            }
          })}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://ischeduledu.app/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Shareable Plans",
                "item": "https://ischeduledu.app/shareable-plans"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <StickyNavigation />
        <div className="pt-20">

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
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
              <span className="text-gray-900 dark:text-gray-100 font-semibold">Shareable Plans</span>
            </nav>
          </div>
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Share2 className="w-4 h-4" />
              Shareable School Day Plans
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Shareable School Day Plans for Teachers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Multiple Ways to Share Your Schedule
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sharingMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {method.icon}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{method.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{method.description}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Real Sharing Scenarios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-l-4 border-[#0FA0CE]">
                  <CardContent className="py-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{useCase.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{useCase.description}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              How Schedule Sharing Works
            </h2>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Create Schedule</h3>
                  <p className="text-gray-600 dark:text-gray-300">Build your schedule with <AppName /> as usual.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Choose Share Method</h3>
                  <p className="text-gray-600 dark:text-gray-300">Select Universal Links, QR code, text, or PDF export.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Generate & Send</h3>
                  <p className="text-gray-600 dark:text-gray-300">App creates shareable format instantly.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    4
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Everyone Informed</h3>
                  <p className="text-gray-600 dark:text-gray-300">Recipients get complete schedule details.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Example Shared Schedule */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Example: Shared Schedule Format
            </h2>
            <Card className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 border-[#0FA0CE]/20">
              <CardContent className="py-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sample Schedule - App Generated</h3>
                  <p className="text-gray-600 dark:text-gray-300">This is a sample of the schedule format your app creates</p>
                </div>
                <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-lg text-gray-900 dark:text-white">Mrs. Johnson's Class - Regular Day Schedule</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Monday, July 28th - 7:55 AM to 3:00 PM</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-gray-50/50 dark:bg-gray-600/50 backdrop-blur-sm rounded">
                      <span className="font-semibold dark:text-white">7:55-9:14</span>
                      <span className="dark:text-gray-300">Math - Fractions Review</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50/50 dark:bg-gray-600/50 backdrop-blur-sm rounded">
                      <span className="font-semibold dark:text-white">9:14-10:33</span>
                      <span className="dark:text-gray-300">Reading - Chapter 5 Discussion</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50/50 dark:bg-gray-600/50 backdrop-blur-sm rounded">
                      <span className="font-semibold dark:text-white">10:33-11:00</span>
                      <span className="dark:text-gray-300">Science - Weather Unit</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50/50 dark:bg-gray-600/50 backdrop-blur-sm rounded">
                      <span className="font-semibold dark:text-white">11:00-11:30</span>
                      <span className="dark:text-gray-300">Lunch</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50/50 dark:bg-gray-600/50 backdrop-blur-sm rounded">
                      <span className="font-semibold dark:text-white">11:30-12:22</span>
                      <span className="dark:text-gray-300">Science (continued) - Weather Unit</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50/50 dark:bg-gray-600/50 backdrop-blur-sm rounded">
                      <span className="font-semibold dark:text-white">12:22-1:41</span>
                      <span className="dark:text-gray-300">Social Studies - Community Helpers</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50/50 dark:bg-gray-600/50 backdrop-blur-sm rounded">
                      <span className="font-semibold dark:text-white">1:41-3:00</span>
                      <span className="dark:text-gray-300">Writing - Journal Entry</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>Note: Science is interrupted by lunch and continues afterward. The app intelligently handles interruptions while maintaining equal time distribution.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits of Sharing */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Benefits of Shareable Schedules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Better Communication</h3>
                <p className="text-gray-600 dark:text-gray-300">Everyone stays informed with clear, professional schedules.</p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Instant Sharing</h3>
                <p className="text-gray-600 dark:text-gray-300">Share schedules in seconds, not minutes. No more manual typing.</p>
              </Card>
              <Card className="text-center p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Professional Format</h3>
                <p className="text-gray-600 dark:text-gray-300">Clean, organized schedules that look professional to administrators.</p>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Can I share schedules with people who don't have <AppName />?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes! <AppName /> supports multiple sharing methods: Universal Links work for both app users and non-app users, 
                    QR codes are for app users only, and PDF exports work for everyone. Universal Links automatically 
                    import schedules for app users or show web versions at ischeduledu.app/import for non-app users.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">What information is included in shared schedules?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Shared schedules include all class periods, times, subject names, and any special notes you add. 
                    They also show fixed events like lunch and recess, plus any emergency notes about the schedule change.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Can I customize what information is shared?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
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
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Share Schedules Like Never Before
                </h3>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
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
          
          {/* Related Content Section */}
          <RelatedContent currentPage="shareable-plans" />
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
      </div>
    </div>
    </>
  );
};

export default ShareablePlans; 