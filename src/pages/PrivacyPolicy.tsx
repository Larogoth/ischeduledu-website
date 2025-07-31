
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppName from "@/components/AppName";
import Footer from "@/components/home/Footer";
import BackToTop from "@/components/BackToTop";
import StickyNavigation from "@/components/home/StickyNavigation";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Information We Collect",
      content: [
        "Personal Information: iSchedulEDU does not collect any personal information such as your name, email address, or contact details.",
        "Usage Data: We collect data about how you use the app, such as the features you use and the actions you take within the app. This data is collected in an anonymized form and does not personally identify you.",
        "Device Information: We may collect information about your device, including the device model, operating system, and unique device identifiers."
      ]
    },
    {
      title: "2. How We Use Your Information",
      content: [
        "App Functionality: The information collected is used solely to ensure the proper functioning of the app and to improve your user experience.",
        "Data Storage: Your schedules and settings are stored locally on your device. We do not upload, share, or transmit your data to any external servers."
      ]
    },
    {
      title: "3. Data Security",
      content: [
        "We are committed to protecting your data. We use industry-standard security measures to safeguard your information. However, no method of transmission over the internet or electronic storage is completely secure, so we cannot guarantee its absolute security."
      ]
    },
    {
      title: "4. Data Sharing and Disclosure",
      content: [
        "We do not share, sell, or distribute your information to third parties. Your data remains private and secure within your device."
      ]
    },
    {
      title: "5. Third-Party Services",
      content: [
        "iSchedulEDU does not integrate with third-party services that would collect your information. However, the app may display ads from third-party advertisers. These advertisers may use cookies or other tracking technologies to collect information about your use of the app to provide targeted advertisements."
      ]
    },
    {
      title: "6. User Rights",
      content: [
        "Since we do not collect personal information, there are no personal data-related rights applicable, such as access, correction, deletion, or portability."
      ]
    },
    {
      title: "7. Changes to This Privacy Policy",
      content: [
        "We may update this Privacy Policy from time to time. Any changes will be posted within the app and will become effective immediately upon posting. We encourage you to review this Privacy Policy periodically."
      ]
    },
    {
      title: "8. Contact Us",
      content: [
        "If you have any questions or concerns about this Privacy Policy, please contact us at iSchedulEDU@gmail.com."
      ]
    },
    {
      title: "9. Acceptance of This Policy",
      content: [
        "By using iSchedulEDU, you signify your acceptance of this Privacy Policy. If you do not agree with this policy, please do not use the app."
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Privacy Policy - iSchedulEDU</title>
        <meta name="description" content="Read iSchedulEDU's privacy policy to understand how we protect your data and privacy when using our teacher scheduling app. Updated June 5, 2024." />
        <meta name="keywords" content="iSchedulEDU privacy policy, teacher app privacy, school schedule app data protection, educational software privacy" />
        <link rel="canonical" href="https://ischeduledu.app/privacy-policy" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="fixed top-1/4 left-0 w-96 h-96 bg-[#0FA0CE]/5 dark:bg-[#0FA0CE]/10 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl translate-x-1/2"></div>
        
        <StickyNavigation />
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 relative z-10">
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
                <span className="text-gray-900 dark:text-gray-100 font-semibold">Privacy Policy</span>
              </nav>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
              <p className="text-gray-600 dark:text-gray-300">Effective Date: 06/05/2024</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
              <div className="space-y-8">
                <p className="text-gray-600 dark:text-gray-300">
                  Thank you for using <AppName />. This Privacy Policy explains how we collect, use, and protect your information when you use our application.
                </p>

                {sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{section.title}</h2>
                    <div className="space-y-2">
                      {section.content.map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-gray-600 dark:text-gray-300">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
        
        {/* Back to Top Button */}
        <BackToTop />
      </div>
    </>
  );
};

export default PrivacyPolicy;
