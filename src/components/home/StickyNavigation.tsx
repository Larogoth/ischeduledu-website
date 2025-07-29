
import { Button } from "@/components/ui/button";
import { Download, Sparkles, Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const StickyNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);
  const guidesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (guidesRef.current && !guidesRef.current.contains(event.target as Node)) {
        setIsGuidesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "Emergency Scheduling", href: "/emergency-scheduling" },
    { name: "Equal Time Planning", href: "/equal-time-planning" },
    { name: "Shareable Plans", href: "/shareable-plans" },
    { name: "Guides", href: "/guides", hasDropdown: true },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "/faq" }
  ];

  const guideItems = [
    { name: "Emergency Schedule Guide", href: "/emergency-schedule-guide" },
    { name: "Custom Schedule Guide", href: "/custom-schedule-guide" },
    { name: "Rotating Schedule Guide", href: "/rotating-schedule-guide" }
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm shadow-lg border-b border-[#0FA0CE]/20 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/lovable-uploads/ischeduledu-app-logo-elementary-teacher-schedule-planner.png"
              alt="iSchedulEDU school scheduling app logo for teachers and educational institutions"
              className="w-10 h-10 object-contain"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          <span className="font-bold text-xl text-foreground">iSchedulEDU</span>
          <span className="hidden sm:inline-block bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Teacher's Choice
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {navigationItems.slice(0, 6).map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div className="relative" ref={guidesRef}>
                    <button
                      onClick={() => setIsGuidesOpen(!isGuidesOpen)}
                      className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-[#0FA0CE] transition-colors duration-200"
                    >
                      {item.name}
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isGuidesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isGuidesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-background/95 backdrop-blur-sm border border-[#0FA0CE]/20 rounded-lg shadow-lg z-50">
                        <div className="py-2">
                          {guideItems.map((guide) => (
                            <Link
                              key={guide.name}
                              to={guide.href}
                              className="block px-4 py-2 text-sm text-foreground/80 hover:text-[#0FA0CE] hover:bg-[#0FA0CE]/10 transition-colors duration-200"
                              onClick={() => setIsGuidesOpen(false)}
                            >
                              {guide.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-[#0FA0CE] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <ThemeToggle />
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-all duration-300 hover:scale-105"
          >
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 hover:from-[#0D8CB6] hover:to-blue-700 shadow-lg hover:shadow-xl text-white font-semibold px-4 py-2 gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download Free</span>
              <span className="sm:hidden">Get App</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-foreground hover:text-[#0FA0CE] transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-[#0FA0CE]/20">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-4">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsGuidesOpen(!isGuidesOpen)}
                        className="flex items-center justify-between w-full text-sm font-medium text-foreground/80 hover:text-[#0FA0CE] transition-colors duration-200 py-2"
                      >
                        {item.name}
                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isGuidesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isGuidesOpen && (
                        <div className="ml-4 mt-2 space-y-2">
                          {guideItems.map((guide) => (
                            <Link
                              key={guide.name}
                              to={guide.href}
                              className="block text-sm text-foreground/60 hover:text-[#0FA0CE] transition-colors duration-200 py-1"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {guide.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-sm font-medium text-foreground/80 hover:text-[#0FA0CE] transition-colors duration-200 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-[#0FA0CE]/20">
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-[#0FA0CE] to-blue-600 hover:from-[#0D8CB6] hover:to-blue-700 shadow-lg hover:shadow-xl text-white font-semibold px-4 py-2 gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Free
                  </Button>
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default StickyNavigation;
