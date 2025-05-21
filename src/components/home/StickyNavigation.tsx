
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppName from "@/components/AppName";

const StickyNavigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/07298253-7ed5-44d1-90a3-8e480663108b.png" 
            alt="iSchedulEDU Logo" 
            className="w-8 h-8"
          />
          <AppName size="md" />
        </Link>
        
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link>
          <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy</Link>
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Download App
          </a>
        </nav>

        <a 
          href="https://apps.apple.com/us/app/ischeduledu/id6504114850" 
          target="_blank" 
          rel="noopener noreferrer"
          className="md:hidden bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
        >
          Download
        </a>
      </div>
    </header>
  );
};

export default StickyNavigation;
