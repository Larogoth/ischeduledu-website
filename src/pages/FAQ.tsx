import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AppName from "@/components/AppName";
import Breadcrumb from "@/components/ui/breadcrumb";
import RelatedContent from "@/components/RelatedContent";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqSections = [
    {
      title: "General Information",
      questions: [
        {
          q: "What is iSchedulEDU and how does it help teachers?",
          a: "iSchedulEDU is a comprehensive school schedule generator app designed specifically for teachers and educators. It helps teachers create custom schedules, handle emergency schedule changes, manage A/B rotations, and generate equal-time lesson plans in under 2 minutes. The app is perfect for fire drills, assemblies, weather delays, early dismissals, and substitute teacher scenarios. iSchedulEDU eliminates the need for manual time calculations and provides intelligent equal time division algorithms."
        },
        {
          q: "Who is iSchedulEDU designed for in the education sector?",
          a: "iSchedulEDU is tailored for elementary school teachers, middle school teachers, substitute teachers, school administrators, curriculum coordinators, and education professionals who need a quick and reliable tool to manage and generate abbreviated schedules. The app is specifically optimized for classroom environments where schedule disruptions are common."
        },
        {
          q: "How can iSchedulEDU improve classroom management and scheduling?",
          a: "iSchedulEDU simplifies the process of creating and managing abbreviated schedules by allowing you to input preset events (like lunch or elective periods) and generate equal class durations automatically. It also provides features like saving and naming schedules, Universal Link sharing, QR code support, and PDF export. This ensures you spend less time on developing an abbreviated schedule and more time focusing on your students and curriculum delivery."
        },
        {
          q: "What makes iSchedulEDU different from other teacher scheduling apps?",
          a: "iSchedulEDU is specifically designed for educational environments with intelligent equal time division algorithms, comprehensive emergency schedule management, seamless sharing across different user types, and deep integration with modern iOS features like AlarmKit. The app understands the unique challenges of elementary and middle school education, including fire drill disruptions, assembly interruptions, weather delays, and substitute teacher scenarios."
        }
      ]
    },
    {
      title: "Technical Support",
      questions: [
        {
          q: "What should I do if the app crashes or doesn't work properly?",
          a: "Please contact support via the email ischeduledu@gmail.com"
        },
        {
          q: "How do I report a bug or provide feedback?",
          a: "Please contact support via the email ischeduledu@gmail.com"
        },
        {
          q: "How can I contact support?",
          a: "Please contact support via the email ischeduledu@gmail.com"
        }
      ]
    },
    {
      title: "Account and Privacy",
      questions: [
        {
          q: "Do I need an account to use iSchedulEDU?",
          a: "No, you do not need an account to use iSchedulEDU. The app is designed to be straightforward and user-friendly, allowing you to create and manage schedules without the need for registration or login."
        },
        {
          q: "How does iSchedulEDU handle my data?",
          a: "iSchedulEDU is committed to ensuring your data privacy and security. The app stores your schedules locally on your device, meaning that your data is not uploaded to any servers or cloud storage. This ensures that your information remains private and secure."
        },
        {
          q: "What permissions does iSchedulEDU require?",
          a: "iSchedulEDU requires access to your device's storage to save schedules locally and to your notifications to set alarms for class end times. These permissions are solely for the functionality of the app and are not used for any other purposes."
        }
      ]
    },
    {
      title: "Sharing and Exporting",
      questions: [
        {
          q: "Can I create printable schedules from iSchedulEDU?",
          a: "Yes! iSchedulEDU generates printable schedules that you can post in your classroom, share with administrators, or keep for documentation. The app creates clean, professional layouts perfect for any emergency situation."
        },
        {
          q: "Does it support QR code sharing or PDFs?",
          a: "Absolutely! iSchedulEDU supports multiple sharing methods: Universal Links for app users and non-app users, QR codes for app users only, text messages, and PDF export for professional documentation. Universal Links automatically import schedules for app users or show web versions for non-app users."
        },
        {
          q: "How do I share my schedule with substitute teachers?",
          a: "You can share schedules via Universal Links (works for everyone), QR codes (app users only), text messages, or PDF export. Universal Links are perfect for substitute teachers as they automatically import the schedule if they have the app, or show a web version if they don't."
        }
      ]
    },
    {
      title: "Emergency Scheduling",
      questions: [
        {
          q: "How fast can I create an emergency schedule with iSchedulEDU?",
          a: "Most teachers create emergency schedules in under 2 minutes with iSchedulEDU. Simply input your start time, end time, and any fixed events, then let the app handle the math. No manual calculations needed! The app's intelligent equal time division algorithms ensure fair distribution of remaining instructional time."
        },
        {
          q: "What if a fire drill disrupts my classroom schedule?",
          a: "iSchedulEDU is perfect for fire drill disruptions! Just input your new start time and the app will automatically redistribute your remaining time into equal class periods. No more panic about lost instructional time. The app handles odd time divisions by making most periods equal and adjusting only the last period."
        },
        {
          q: "Can I handle assembly interruptions and special events?",
          a: "Yes! When assemblies eat up your morning, simply set your new start time and iSchedulEDU will create a balanced schedule that gives equal time to all your subjects for the remaining hours. The app is designed to handle any type of schedule disruption including weather delays, early dismissals, and special events."
        },
        {
          q: "How does iSchedulEDU handle weather delays and early dismissals?",
          a: "iSchedulEDU excels at weather delay and early dismissal scenarios. Input your new start or end time, and the app automatically creates a balanced schedule with equal time periods. The intelligent algorithm ensures maximum fairness while accounting for the reduced instructional time."
        }
      ]
    },
    {
      title: "Equal Time Division",
      questions: [
        {
          q: "How does iSchedulEDU handle odd time divisions?",
          a: "When perfect equal division isn't possible, iSchedulEDU makes the first periods equal and adjusts the last period to handle any remaining minutes. This ensures maximum fairness while accounting for odd time divisions."
        },
        {
          q: "What if I have 307 minutes to divide into 5 periods?",
          a: "iSchedulEDU would create 4 periods of 61 minutes each, and the last period would be 63 minutes. This approach ensures most periods are equal while handling the remainder intelligently. The algorithm prioritizes fairness and equal distribution across the majority of periods."
        },
        {
          q: "How does the equal time division algorithm work for different scenarios?",
          a: "iSchedulEDU's equal time division algorithm is designed to handle any scheduling scenario. For fire drills, it redistributes remaining time equally. For weather delays, it adjusts the entire day proportionally. For early dismissals, it compresses the schedule while maintaining equal periods. The algorithm adapts to the specific disruption type."
        },
        {
          q: "Can I manually adjust the equal time periods?",
          a: "Yes! While iSchedulEDU creates intelligent equal divisions automatically, you can always make manual adjustments if you need to prioritize certain subjects or accommodate special activities."
        }
      ]
    },
    {
      title: "Advanced Features and Technology",
      questions: [
        {
          q: "What sharing options does iSchedulEDU provide for teachers?",
          a: "iSchedulEDU supports multiple sharing methods: Universal Links work for both app users and non-app users (app users get direct import, others see web versions), QR codes for app users only, text messages with schedule details, and PDF export for professional documentation and classroom posting. This ensures compatibility with any sharing scenario."
        },
        {
          q: "How does iSchedulEDU help with substitute teacher scenarios?",
          a: "iSchedulEDU is perfect for substitute teacher handoffs. Universal Links automatically import schedules for substitute teachers who have the app, or show web versions for those who don't. This ensures smooth transitions regardless of the substitute's technical setup and provides professional documentation."
        },
        {
          q: "What iOS features does iSchedulEDU integrate with?",
          a: "iSchedulEDU integrates with modern iOS features including AlarmKit for enhanced alarm functionality with Live Activities, Universal Links for seamless sharing, QR code scanning for instant imports, and PDF generation for professional documentation. The app is optimized for iOS 17.6+ and iPadOS 17.6+."
        },
        {
          q: "How does iSchedulEDU ensure data privacy and security?",
          a: "iSchedulEDU is committed to data privacy and security. The app stores schedules locally on your device, meaning your data is never uploaded to servers or cloud storage. This ensures your information remains private and secure while maintaining full functionality."
        }
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ - iSchedulEDU | Emergency Schedule Generator for Teachers</title>
        <meta name="description" content="Get answers to common questions about iSchedulEDU. Learn how to create emergency schedules, share with substitute teachers, handle fire drills, and manage equal time divisions for your classroom." />
        <meta name="keywords" content="teacher schedule FAQ, emergency schedule questions, substitute teacher sharing, fire drill schedule, equal time division, classroom scheduling app" />
        <meta property="og:title" content="FAQ - iSchedulEDU | Emergency Schedule Generator for Teachers" />
        <meta property="og:description" content="Get answers to common questions about iSchedulEDU. Learn how to create emergency schedules, share with substitute teachers, handle fire drills, and manage equal time divisions for your classroom." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ischeduledu.app/faq" />
        <link rel="canonical" href="https://ischeduledu.app/faq" />
        
        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqSections.flatMap(section => 
              section.questions.map(q => ({
                "@type": "Question",
                "name": q.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": q.a
                }
              }))
            )
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
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Breadcrumb 
              items={[
                { label: "FAQ", href: "/faq", current: true }
              ]} 
            />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">Find answers to common questions about <AppName /></p>
            <p className="text-sm text-gray-500 mt-2">Emergency scheduling, substitute teacher sharing, fire drill management, and equal time division for teachers</p>
          </div>
          
          <div className="space-y-6">
            {faqSections.map((section, idx) => (
              <Card key={idx} className="mb-6">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {section.questions.map((item, qIdx) => (
                    <div key={qIdx} className="mb-6 last:mb-0">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{item.q}</h3>
                      <p className="text-gray-600">{item.a}</p>
                      {qIdx < section.questions.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Related Content Section */}
      <RelatedContent currentPage="faq" />
      
    </div>
    </>
  );
};

export default FAQ;
