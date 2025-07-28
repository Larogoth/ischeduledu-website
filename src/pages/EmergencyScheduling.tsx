import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, AlertTriangle, Clock, Share2, Download, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AppName from "@/components/AppName";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import Footer from "@/components/home/Footer";
import BackToTop from "@/components/BackToTop";
import StickyNavigation from "@/components/home/StickyNavigation";
import { Helmet } from "react-helmet-async";

const EmergencyScheduling = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-[#0FA0CE]" />,
      title: "Instant Emergency Schedule Generation",
      description: "Create equal-length class periods in under 2 minutes when your school day gets disrupted by assemblies, fire drills, or weather delays.",
      benefit: "No more panic when the schedule changes unexpectedly"
    },
    {
      icon: <AlertTriangle className="w-8 h-8 text-orange-500" />,
      title: "Emergency-Ready Design",
      description: "Built specifically for last-minute schedule changes. Handle any disruption with confidence and keep your students on track.",
      benefit: "Always prepared for the unexpected"
    },
    {
      icon: <Share2 className="w-8 h-8 text-green-600" />,
      title: "Universal Link Sharing",
      description: "Share schedules via Universal Links that work for both app users and non-app users. App users get direct import, others see web version.",
      benefit: "Works for everyone, regardless of app installation"
    },
    {
      icon: <Download className="w-8 h-8 text-blue-600" />,
      title: "Printable & Exportable",
      description: "Generate printable schedules and PDF exports for posting in your classroom or sharing with administrators.",
      benefit: "Professional documentation for any emergency"
    }
  ];

  const useCases = [
    {
      scenario: "Fire Drill Disruption",
      description: "When a fire drill cuts into your morning, quickly redistribute remaining time across all subjects equally.",
      timeSaved: "5-10 minutes"
    },
    {
      scenario: "Assembly Interruption", 
      description: "Morning assemblies eating up your schedule? Rebalance the entire day with equal class periods instantly.",
      timeSaved: "3-5 minutes"
    },
    {
      scenario: "Weather Delays",
      description: "Late starts due to weather? Create a shortened schedule that maintains learning momentum.",
      timeSaved: "2-3 minutes"
    },
    {
      scenario: "Substitute Teacher Emergency",
      description: "Last-minute substitute needs a clear schedule? Generate and share instantly via QR code.",
      timeSaved: "1-2 minutes"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Emergency Schedule Generator for Teachers | iSchedulEDU - Fire Drill & Assembly Scheduling</title>
        <meta name="description" content="Create emergency schedules instantly when fire drills, assemblies, or weather delays disrupt your school day. Generate equal-length class periods in under 2 minutes with iSchedulEDU." />
        <meta name="keywords" content="emergency schedule generator, fire drill schedule, assembly interruption, weather delay schedule, substitute teacher emergency, classroom scheduling app" />
        <meta property="og:title" content="Emergency Schedule Generator for Teachers | iSchedulEDU" />
        <meta property="og:description" content="Create emergency schedules instantly when fire drills, assemblies, or weather delays disrupt your school day. Generate equal-length class periods in under 2 minutes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ischeduledu.app/emergency-scheduling" />
        <link rel="canonical" href="https://ischeduledu.app/emergency-scheduling" />
        
        {/* Article Schema for Emergency Scheduling */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Emergency Schedule Generator for Teachers",
            "description": "Create emergency schedules instantly when fire drills, assemblies, or weather delays disrupt your school day.",
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
              "@id": "https://ischeduledu.app/emergency-scheduling"
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
                "name": "Emergency Scheduling",
                "item": "https://ischeduledu.app/emergency-scheduling"
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
              <span className="text-gray-900 dark:text-gray-100 font-semibold">Emergency Scheduling</span>
            </nav>
          </div>
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <AlertTriangle className="w-4 h-4" />
              Emergency Scheduling Solution
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              iOS App to Generate Emergency Class Schedules
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              When your school day gets thrown off by assemblies, fire drills, or weather delays, 
              <AppName /> creates equal-length schedules instantly. No more panic, no more manual calculations.
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
                  alt="Download iSchedulEDU Emergency Scheduling App" 
                  className="h-14"
                />
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Teachers Choose <AppName /> for Emergency Scheduling
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      {feature.icon}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      {feature.benefit}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Real Emergency Scenarios <AppName /> Solves
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-l-4 border-[#0FA0CE]">
                  <CardContent className="py-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{useCase.scenario}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{useCase.description}</p>
                    <div className="flex items-center gap-2 text-[#0FA0CE] font-semibold">
                      <Clock className="w-4 h-4" />
                      Time Saved: {useCase.timeSaved}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              How Emergency Schedule Generation Works
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Input Your Constraints</h3>
                  <p className="text-gray-600 dark:text-gray-300">Set your start time, end time, and any fixed events like lunch or recess.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Auto-Generate Equal Periods</h3>
                  <p className="text-gray-600 dark:text-gray-300">The app automatically calculates equal class periods for your remaining time.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#0FA0CE] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Share & Save</h3>
                  <p className="text-gray-600 dark:text-gray-300">Share via Universal Links, QR codes, text, or PDF. Save for future reference.</p>
                </div>
              </div>
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
                  <CardTitle className="text-lg dark:text-white">Can I create printable schedules from <AppName />?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Yes! <AppName /> generates printable schedules that you can post in your classroom, 
                    share with administrators, or keep for documentation. The app creates clean, 
                    professional layouts perfect for any emergency situation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Does it support QR code sharing or PDFs?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Absolutely! <AppName /> supports multiple sharing methods: Universal Links for app users and non-app users, 
                    QR codes for app users, text messages, and PDF export for professional documentation. 
                    Universal Links automatically import schedules for app users or show web versions for non-app users.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">How fast can I create an emergency schedule?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Most teachers create emergency schedules in under 2 minutes. Simply input your 
                    start time, end time, and any fixed events, then let the app handle the math. 
                    No manual calculations needed!
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
                  Never Panic About Schedule Changes Again
                </h3>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join hundreds of teachers who trust <AppName /> for emergency scheduling. 
                  Be prepared for any disruption to your school day.
                </p>
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block transform hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                    alt="Download iSchedulEDU Emergency Scheduling App" 
                    className="h-16"
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Related Content Section */}
      <RelatedContent currentPage="emergency-scheduling" />
      
      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
      </div>
    </div>
    </>
  );
};

export default EmergencyScheduling; 