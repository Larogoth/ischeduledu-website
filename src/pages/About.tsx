import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, GraduationCap, Clock, Users, Shield, Zap, Heart, Star, Award, Globe, Smartphone, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import AppName from "@/components/AppName";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import Footer from "@/components/home/Footer";
import BackToTop from "@/components/BackToTop";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About iSchedulEDU - Educational Technology Company | Teacher Schedule Solutions</title>
        <meta name="description" content="Learn about iSchedulEDU, the educational technology company revolutionizing teacher scheduling. Discover our mission to help teachers manage emergency schedules, equal time divisions, and classroom disruptions with intelligent algorithms." />
        <meta name="keywords" content="iSchedulEDU company, educational technology, teacher scheduling solutions, emergency schedule management, equal time division algorithms, classroom management software, educational software company, teacher tools, school administration software" />
        <meta property="og:title" content="About iSchedulEDU - Educational Technology Company" />
        <meta property="og:description" content="Learn about iSchedulEDU, the educational technology company revolutionizing teacher scheduling with intelligent algorithms and comprehensive emergency management solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ischeduledu.app/about" />
        <link rel="canonical" href="https://ischeduledu.app/about" />
        
        {/* Organization Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "iSchedulEDU",
            "url": "https://ischeduledu.app",
            "logo": "https://ischeduledu.app/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png",
            "description": "Educational technology company focused on creating intelligent scheduling solutions for teachers and school administrators. Specializing in emergency schedule management, equal time division algorithms, and seamless schedule sharing across educational environments.",
            "foundingDate": "2024",
            "industry": "Educational Technology",
            "numberOfEmployees": "5-10",
            "location": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            },
            "sameAs": [
              "https://twitter.com/ischeduledu",
              "https://www.facebook.com/ischeduledu",
              "https://apps.apple.com/us/app/ischeduledu/id6504114850"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "ischeduledu@gmail.com",
              "availableLanguage": "English"
            },
            "knowsAbout": [
              "Teacher scheduling",
              "Emergency schedule management",
              "Equal time division algorithms",
              "Educational technology",
              "Classroom management",
              "School administration",
              "iOS development",
              "Educational software"
            ]
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
                "name": "About",
                "item": "https://ischeduledu.app/about"
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="py-8 px-4 sm:px-6 lg:px-8">
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
                <span className="text-gray-900 dark:text-gray-100 font-semibold">About</span>
              </nav>
            </div>

            
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About <AppName /></h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Revolutionizing teacher scheduling with intelligent algorithms and comprehensive emergency management solutions
              </p>
            </div>

            {/* Mission Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  At <AppName />, we believe that teachers should spend their time educating students, not calculating schedules. 
                  Our mission is to provide educators with intelligent, reliable tools that handle the complex mathematics of 
                  emergency scheduling while ensuring every subject receives fair instructional time.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We understand the unique challenges faced by elementary and middle school teachers - fire drills, assemblies, 
                  weather delays, and substitute teacher scenarios. Our technology is specifically designed to address these 
                  real-world classroom situations with precision and speed.
                </p>
              </CardContent>
            </Card>

            {/* What We Do */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  What We Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Emergency Schedule Management</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We specialize in creating intelligent algorithms that handle emergency schedule changes. 
                      When disruptions occur, our technology automatically redistributes remaining time into 
                      equal class periods, ensuring no subject is favored over another.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Equal Time Division</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Our proprietary algorithms ensure fair distribution of instructional time. 
                      When perfect division isn't possible, we make most periods equal and adjust 
                      only the last period to handle remainders intelligently.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Seamless Sharing</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We provide multiple sharing methods that work for everyone - Universal Links for 
                      app users and non-app users, QR codes for instant imports, and PDF export for 
                      professional documentation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Modern iOS Integration</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Our app integrates deeply with modern iOS features including AlarmKit for enhanced 
                      alarms, Universal Links for seamless sharing, and QR code scanning for instant 
                      schedule imports.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology & Innovation */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Award className="w-6 h-6 text-blue-500" />
                  Technology & Innovation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Intelligent Algorithms</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Our equal time division algorithms are specifically designed for educational environments. 
                      They handle any scheduling scenario - fire drills, weather delays, early dismissals, 
                      and assembly interruptions - with mathematical precision and educational fairness.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Universal Compatibility</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Our sharing technology works for everyone. App users get direct imports, while 
                      non-app users see professional web versions. This ensures smooth transitions 
                      regardless of technical setup.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Privacy-First Design</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We prioritize data privacy and security. All schedules are stored locally on your 
                      device, ensuring your information remains private and secure while maintaining 
                      full functionality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact & Statistics */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Globe className="w-6 h-6 text-green-500" />
                  Our Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">171+</div>
                    <p className="text-gray-600 dark:text-gray-400">Downloads</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">5.0</div>
                    <p className="text-gray-600 dark:text-gray-400">Average Rating</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">&lt;2min</div>
                    <p className="text-gray-600 dark:text-gray-400">Average Setup Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Values */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Trust & Reliability</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Teachers trust us with their daily schedules. We ensure our technology is 
                        reliable, accurate, and ready when emergencies strike.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Speed & Efficiency</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Time is precious in education. Our technology creates emergency schedules 
                        in under 2 minutes, giving teachers more time for what matters most.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-purple-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Teacher-First Design</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        Every feature is designed with real classroom scenarios in mind. We understand 
                        the challenges teachers face and build solutions accordingly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-6 h-6 text-orange-500 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Educational Excellence</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        We're committed to supporting educational excellence by providing tools that 
                        enhance classroom management and student learning outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-900/20 dark:to-cyan-900/20 dark:border-blue-800">
              <CardContent className="py-8 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Ready to Experience the Difference?
                </h3>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  Join hundreds of teachers who trust <AppName /> for their emergency scheduling needs. 
                  Download the app and experience intelligent scheduling that works as fast as you need it to.
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
      <RelatedContent currentPage="about" />
      
      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
};

export default About; 