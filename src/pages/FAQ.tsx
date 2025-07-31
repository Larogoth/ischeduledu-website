import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ExternalLink, Download, Smartphone, Clock, Share2, Bell, QrCode, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer';
import BackToTop from '../components/BackToTop';
import StickyNavigation from '../components/home/StickyNavigation';

const FAQ: React.FC = () => {
  const faqData = [
    {
      category: "App Features",
      questions: [
        {
          question: "What is iSchedulEDU and how does it help teachers?",
          answer: "iSchedulEDU is an emergency schedule generator app designed specifically for teachers. It allows you to create custom school schedules in under 2 minutes, handle A/B rotations, manage early dismissals, delays, and emergency schedule changes instantly. The app automatically generates equal-time schedules and provides features like notifications, QR code sharing, and visual timeline views."
        },
        {
          question: "What types of schedule rotations does iSchedulEDU support?",
          answer: "iSchedulEDU supports A/B day rotations, A/B/C rotations, and custom multi-day cycles. You can set up rotating schedules with different periods, times, and activities for each rotation day. The app handles complex rotation patterns commonly used in schools and automatically adjusts schedules based on your rotation settings."
        },
        {
          question: "Can iSchedulEDU handle early dismissals and delays?",
          answer: "Yes, iSchedulEDU is specifically designed for early dismissals, delays, and abbreviated schedules. Simply input the shortened school day time and the app will automatically create an equal-time schedule that fits within the available time. This is perfect for weather delays, fire drills, assemblies, and other schedule disruptions."
        },
        {
          question: "How do I share schedules with other teachers and administrators?",
          answer: "iSchedulEDU offers multiple sharing options: QR code generation for easy scanning, text message sharing, and direct printing. Teachers can also save schedules and access them later. The app makes it easy to communicate schedule changes quickly and efficiently to other teachers, substitutes, and administrators."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "What devices are supported by iSchedulEDU?",
          answer: "iSchedulEDU is compatible with iOS and iPadOS devices, requiring iOS 17.6 or later and iPadOS 17.6 or later. The app is optimized for both iPhone and iPad, making it perfect for teachers who use multiple devices throughout their day."
        },
        {
          question: "Is iSchedulEDU free to use?",
          answer: "iSchedulEDU offers 4 free schedule generation sessions to get started. Additional premium features are available through in-app purchases. The app is designed to be accessible for all teachers while offering advanced features for power users who need more frequent schedule generation."
        },
        {
          question: "How does iSchedulEDU handle notifications?",
          answer: "iSchedulEDU allows teachers to set up daily notifications for schedule changes. You can configure notification times, customize messages, and ensure teachers and administrators are informed of schedule modifications in advance. This helps maintain clear communication during schedule disruptions."
        },
        {
          question: "Can I create custom daily schedules?",
          answer: "Yes, iSchedulEDU excels at creating custom daily schedules. You can input specific times, periods, activities, and create personalized schedules for regular days, special events, substitute teachers, and unique school situations. The app adapts to your specific needs."
        }
      ]
    },
    {
      category: "Emergency Scenarios",
      questions: [
        {
          question: "How do I create a fire drill schedule?",
          answer: "For fire drills, open iSchedulEDU and select 'Emergency Schedule'. Input your start time and end time, along with the number of class rotations you want to have (including pre-set periods like lunch or elective). The app will automatically generate an equal-time schedule that fits within the available time, ensuring all classes get fair time allocation."
        },
        {
          question: "What about weather delay schedules?",
          answer: "For weather delays, use the same emergency schedule feature. Input your delayed start time and the desired end time. iSchedulEDU will create a schedule that maximizes learning time while ensuring equal distribution among all classes. This is especially useful for snow days or late starts."
        },
        {
          question: "How do I handle assembly schedules?",
          answer: "Assembly schedules are easily managed by inputting the assembly time and duration as a pre-set event. Input the start time of the abbreviated schedule and the end time of the abbreviated schedule, then generate the alternate schedule. iSchedulEDU will automatically adjust your regular schedule to accommodate the assembly while maintaining equal time for remaining classes."
        },
        {
          question: "Can I create substitute teacher schedules?",
          answer: "Yes, iSchedulEDU is perfect for substitute teacher scenarios. Create a simplified schedule that's easy for substitutes to follow, with clear time blocks. You can customize the names of the classes to make it easier for substitutes to understand the schedule structure."
        }
      ]
    },
    {
      category: "Advanced Features",
      questions: [
        {
          question: "How does the QR code sharing work?",
          answer: "iSchedulEDU generates QR codes for each schedule you create. Other teachers, substitutes, and administrators can scan these codes with their phone's camera to instantly access the schedule. This eliminates the need for paper copies and ensures everyone has the most up-to-date schedule information."
        },
        {
          question: "How do universal links work for sharing schedules?",
          answer: "iSchedulEDU uses universal links for seamless schedule sharing. When you share a schedule via universal link, other teachers with the app will have it automatically imported into their iSchedulEDU app. For those without the app, the link opens a web version of the schedule. This ensures compatibility regardless of whether recipients have the app installed."
        },
        {
          question: "What is the visual timeline view?",
          answer: "The visual timeline view provides a clear, graphical representation of your daily schedule. It shows each period as a block with start and end times, making it easy to see the flow of your day at a glance. This is especially helpful for complex schedules with multiple periods."
        },
        {
          question: "How do I manage bell schedules?",
          answer: "iSchedulEDU allows you to input your school's bell schedule as a custom schedule. You can set up different bell schedules for different days or special events, ensuring your schedules align with your school's timing system."
        },
        {
          question: "Can I save and reuse schedules?",
          answer: "Yes, iSchedulEDU allows you to save frequently used schedules for quick access. This is especially useful for common scenarios like fire drills, early dismissals, or special events. You can also modify saved schedules to fit new situations."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <StickyNavigation />
      <div className="container mx-auto px-4 pt-20 pb-8">
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
                <span className="text-gray-900 dark:text-gray-100 font-semibold">FAQ</span>
              </nav>
            </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to know about iSchedulEDU - the emergency schedule generator for teachers
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2 Minutes</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Schedule Creation Time</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Smartphone className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">iOS 17.6+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Required Version</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <QrCode className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">QR Sharing</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Instant Schedule Sharing</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Bell className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Smart Alerts</p>
            </CardContent>
          </Card>
          </div>
          
        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="shadow-lg">
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-sm">
                    {category.category}
                  </Badge>
                </CardTitle>
                </CardHeader>
                <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, index) => (
                    <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 dark:text-gray-300">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white dark:from-blue-800 dark:to-indigo-800">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Simplify Your Schedule Management?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Join thousands of teachers who trust iSchedulEDU for emergency schedule generation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 dark:bg-white dark:text-blue-600 dark:hover:bg-gray-100"
                  onClick={() => window.open('https://apps.apple.com/us/app/ischeduledu/id6504114850', '_blank')}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download on App Store
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm dark:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-blue-600"
                  onClick={() => window.open('https://ischeduledu.app', '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Additional Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Calendar className="w-8 h-8 mb-4 text-blue-600" />
                <h4 className="font-semibold mb-2">Emergency Schedule Guide</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Step-by-step instructions for creating emergency schedules
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Share2 className="w-8 h-8 mb-4 text-green-600" />
                <h4 className="font-semibold mb-2">Rotating Schedule Guide</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Complete guide for A/B day rotations and multi-day cycles
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6">
                <Smartphone className="w-8 h-8 mb-4 text-purple-600" />
                <h4 className="font-semibold mb-2">Custom Schedule Guide</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Guide for creating personalized daily schedules
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default FAQ;
