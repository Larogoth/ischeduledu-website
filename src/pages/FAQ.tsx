import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AppName from "@/components/AppName";
import { useEffect } from "react";

const FAQ = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqSections = [
    {
      title: "General Information",
      questions: [
        {
          q: "What is iSchedulEDU?",
          a: "iSchedulEDU is a dynamic scheduling app designed specifically for educators in middle school and elementary. It allows you to create abbreviated schedules with equal classes quickly and easily, eliminating the need for manual time calculations. Whether you need to adjust for special events or unexpected changes, iSchedulEDU helps you with creating these abbreviated schedules easily and efficiently."
        },
        {
          q: "Who is iSchedulEDU for?",
          a: "iSchedulEDU is tailored to middle school and elementary school teachers who need a quick and reliable tool to manage and generate abbreviated schedules."
        },
        {
          q: "How can iSchedulEDU help me with scheduling?",
          a: "iSchedulEDU simplifies the process of creating and managing abbreviated schedules by allowing you to input preset events (like lunch or elective periods) and generate equal class durations automatically. It also provides features like saving and naming schedules, as well as sharing schedules. This ensures you spend less time on developing an abbreviated schedule and more time focusing on your students."
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
          q: "How fast can I create an emergency schedule?",
          a: "Most teachers create emergency schedules in under 2 minutes. Simply input your start time, end time, and any fixed events, then let the app handle the math. No manual calculations needed!"
        },
        {
          q: "What if a fire drill disrupts my schedule?",
          a: "iSchedulEDU is perfect for fire drill disruptions! Just input your new start time and the app will automatically redistribute your remaining time into equal class periods. No more panic about lost instructional time."
        },
        {
          q: "Can I handle assembly interruptions?",
          a: "Yes! When assemblies eat up your morning, simply set your new start time and iSchedulEDU will create a balanced schedule that gives equal time to all your subjects for the remaining hours."
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
          q: "What if I have 305 minutes to divide into 5 periods?",
          a: "The app would create 4 periods of 60 minutes each, and the last period would be 65 minutes. This approach ensures most periods are equal while handling the remainder intelligently."
        },
        {
          q: "Can I manually adjust the equal time periods?",
          a: "Yes! While iSchedulEDU creates intelligent equal divisions automatically, you can always make manual adjustments if you need to prioritize certain subjects or accommodate special activities."
        }
      ]
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600">Find answers to common questions about <AppName /></p>
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
    </div>
  );
};

export default FAQ;
