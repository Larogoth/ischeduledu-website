
import { Link } from "react-router-dom";
import { Sparkles, Download } from "lucide-react";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-20 text-center animate-fade-in relative overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0FA0CE]/10 via-transparent to-blue-500/5 rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="absolute top-10 left-1/4 w-20 h-20 bg-blue-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-[#0FA0CE]/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10">
        {/* Badge with sparkle effect */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Sparkles className="w-4 h-4" />
          <span>Loved by Teachers Everywhere</span>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#0FA0CE] opacity-10 rounded-full blur-3xl transform -translate-y-1/2"></div>
          <img
            src="/lovable-uploads/ischededu-app-logo-teacher-scheduling-software.png"
            alt="iSchedulEDU - school schedule generator app logo for teachers, administrators, and educational institutions"
            className="mx-auto w-36 h-36 mb-8 rounded-full shadow-2xl hover:scale-110 transition-all duration-500 ring-4 ring-white ring-opacity-50"
            width="144"
            height="144"
          />
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight font-euclid bg-gradient-to-r from-gray-900 via-[#0FA0CE] to-gray-900 bg-clip-text text-transparent">
          iSchedulEDU
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
          Create custom or abbreviated schedules for your school day 
          <span className="text-[#0FA0CE] font-bold"> quickly and easily</span>
        </p>

        {/* Enhanced CTA with urgency */}
        <div className="space-y-4 mb-8">
          <p className="text-lg text-gray-700 font-semibold">
            Join <span className="text-[#0FA0CE] font-bold">hundreds</span> of teachers handling unexpected schedule changes quickly!
          </p>
          
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-offset-2"
            aria-label="Download iSchedulEDU school schedule generator app on the App Store for iOS and iPadOS"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0FA0CE] to-blue-600 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img 
              src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
              alt="Download iSchedulEDU school schedule generator app on Apple App Store for teachers and educators" 
              className="w-[280px] h-[94px] object-contain relative z-10"
              width="280"
              height="94"
            />
          </a>
        </div>

        {/* Social proof badges - improved mobile layout */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Free to Start</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse sm:hidden"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-500"></div>
            <span>iOS and iPadOS Compatible</span>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse sm:hidden"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0FA0CE] rounded-full animate-pulse delay-1000"></div>
            <span>Teacher Tested</span>
            <div className="w-2 h-2 bg-[#0FA0CE] rounded-full animate-pulse sm:hidden"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
