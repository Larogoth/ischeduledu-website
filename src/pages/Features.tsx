import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Clock, Share2, QrCode, FileText, Bell, Smartphone, Zap, Shield, Users, Calendar, AlertTriangle, CheckCircle, Star, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppName from "@/components/AppName";
import { 
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { Helmet } from "react-helmet-async";

const Features = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Intelligent Equal Time Division",
      description: "Our proprietary algorithms ensure fair distribution of instructional time. When perfect division isn't possible, we make most periods equal and adjust only the last period to handle remainders intelligently.",
      details: [
        "Handles any time division scenario",
        "Prioritizes equal distribution for majority of periods",
        "Intelligently manages odd time remainders",
        "Works for fire drills, weather delays, and early dismissals"
      ]
    },
    {
      icon: <Share2 className="w-8 h-8 text-green-600" />,
      title: "Universal Link Sharing",
      description: "Share schedules that work for everyone. App users get direct import, while non-app users see professional web versions. Perfect for substitute teachers and colleagues.",
      details: [
        "Works for app users and non-app users",
        "Automatic import for app users",
        "Professional web view for others",
        "No app installation required for recipients"
      ]
    },
    {
      icon: <QrCode className="w-8 h-8 text-purple-600" />,
      title: "QR Code Support",
      description: "Generate QR codes for instant schedule import. App users can scan and import schedules directly into their device with a simple tap.",
      details: [
        "Instant schedule import via QR scan",
        "Works with any QR code scanner",
        "Secure and private sharing",
        "Perfect for classroom posting"
      ]
    },
    {
      icon: <FileText className="w-8 h-8 text-orange-600" />,
      title: "PDF Export",
      description: "Generate professional PDF schedules for posting in your classroom, sharing with administrators, or keeping for documentation.",
      details: [
        "Professional layout and formatting",
        "Suitable for classroom posting",
        "Administrator-friendly format",
        "Documentation and record keeping"
      ]
    },
    {
      icon: <Bell className="w-8 h-8 text-red-600" />,
      title: "AlarmKit Integration",
      description: "Enhanced alarm functionality with iOS 26+ integration. Set alarms for class end times with custom sounds and Live Activities support.",
      details: [
        "iOS 26+ AlarmKit framework",
        "Live Activities support",
        "Custom alarm sounds",
        "Background alarm functionality"
      ]
    },
    {
      icon: <Shield className="w-8 h-8 text-indigo-600" />,
      title: "Privacy-First Design",
      description: "All schedules are stored locally on your device. Your data never leaves your device, ensuring complete privacy and security.",
      details: [
        "Local data storage only",
        "No cloud uploads",
        "Complete data privacy",
        "Works offline"
      ]
    }
  ];

  const emergencyScenarios = [
    {
      title: "Fire Drill Disruptions",
      description: "When a fire drill cuts into your morning, input your new start time and let iSchedulEDU redistribute remaining time into equal class periods.",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />
    },
    {
      title: "Assembly Interruptions",
      description: "Morning assemblies eating up your schedule? Our algorithms create balanced schedules that give equal time to all subjects for remaining hours.",
      icon: <Users className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Weather Delays",
      description: "District announces a 2-hour delay? Switch to your pre-made delay schedule instantly instead of manually adjusting all your alarms.",
      icon: <Calendar className="w-6 h-6 text-green-500" />
    },
    {
      title: "Early Dismissals",
      description: "Create schedules for early dismissal days, half-days, or special events in advance and activate them instantly when needed.",
      icon: <Clock className="w-6 h-6 text-orange-500" />
    }
  ];

  return (
    <>
      <Helmet>
        <title>Features - iSchedulEDU | Advanced Teacher Scheduling Features</title>
        <meta name="description" content="Explore iSchedulEDU's advanced features: intelligent equal time division, Universal Link sharing, QR code support, PDF export, AlarmKit integration, and privacy-first design for teachers." />
        <meta name="keywords" content="teacher scheduling features, equal time division, Universal Link sharing, QR code schedule sharing, PDF export, AlarmKit integration, emergency schedule management, classroom scheduling features, educational app features" />
        <meta property="og:title" content="Features - iSchedulEDU | Advanced Teacher Scheduling Features" />
        <meta property="og:description" content="Explore iSchedulEDU's advanced features for intelligent teacher scheduling, emergency management, and seamless schedule sharing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ischeduledu.app/features" />
        <link rel="canonical" href="https://ischeduledu.app/features" />
        


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
                "name": "Features",
                "item": "https://ischeduledu.app/features"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="sticky top-0 z-10 bg-gray-50 p-4 border-b">
          <Link to="/" className="inline-flex items-center text-primary hover:underline">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>

        <div className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb Navigation */}
            <div className="mb-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Home</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Features</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Advanced Features</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the powerful features that make <AppName /> the most intelligent teacher scheduling solution
              </p>
            </div>

            {/* Core Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      {feature.icon}
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Emergency Scenarios */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  Emergency Scenario Management
                </CardTitle>
                <p className="text-gray-600">
                  iSchedulEDU is specifically designed to handle real-world classroom disruptions with intelligent algorithms
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {emergencyScenarios.map((scenario, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      {scenario.icon}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{scenario.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed">{scenario.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technical Specifications */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-blue-500" />
                  Technical Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">System Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">iOS 17.6 or later</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">iPadOS 17.6 or later</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">iPhone or iPad</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Internet connection for sharing features</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Technologies</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">AlarmKit integration (iOS 26+)</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">Universal Links for seamless sharing</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">QR code generation and scanning</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">PDF generation for documentation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <CardContent className="py-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Experience Advanced Teacher Scheduling?
                </h3>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Download <AppName /> and discover how intelligent algorithms can transform your classroom scheduling experience.
                </p>
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transform hover:scale-105 transition-all duration-300"
                >
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                    alt="Download iSchedulEDU on the App Store" 
                    className="h-12"
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Related Content Section */}
      <RelatedContent currentPage="features" />
      
    </>
  );
};

export default Features; 