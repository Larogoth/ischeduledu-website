
import { Link } from "react-router-dom";
import { Mail, Facebook } from "lucide-react";
import XLogo from "@/components/XLogo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <nav className="flex space-x-6" aria-label="Social media links">
            <a
              href="https://x.com/ischeduledu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0FA0CE] transition-colors"
              aria-label="Follow us on X (formerly Twitter)"
            >
              <XLogo />
            </a>
            <a
              href="https://www.facebook.com/share/15dGQKa8ha/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0FA0CE] transition-colors"
              aria-label="Follow us on Facebook"
            >
              <Facebook className="h-6 w-6" />
            </a>
          </nav>

          <a
            href="mailto:ischeduledu@gmail.com"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-colors h-10 px-4 py-2 border"
            aria-label="Contact Support via Email"
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </a>

          <div className="text-center">
            <p className="mb-6 text-gray-300">© 2024 iSchedulEDU. All rights reserved.</p>
            <nav className="flex justify-center gap-6" aria-label="Footer navigation">
              <Link 
                to="/privacy-policy" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-300 hover:text-white transition-colors"
              >
                Support
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
