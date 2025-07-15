import { Download, X } from "lucide-react";
import { useState } from "react";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 mb-1">Get iSchedulEDU Free</h3>
            <p className="text-sm text-gray-600 mb-3">Start with 4 free sessions</p>
            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Download Now</span>
            </a>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close floating CTA"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingCTA; 