
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import AppName from "@/components/AppName";

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Effective Date: 06/05/2024</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="space-y-8">
              <p className="text-gray-600">
                Thank you for using <AppName />. This Privacy Policy explains how we collect, use, and protect your information when you use our application.
              </p>

              {sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  <div className="space-y-2">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-gray-600">
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
    </div>
  );
};

export default PrivacyPolicy;
