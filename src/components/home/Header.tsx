
import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-20 text-center animate-fade-in relative overflow-hidden bg-white">
      {/* 60% - Clean white background with subtle accents */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-slate-100/20 rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="absolute top-10 left-1/4 w-20 h-20 bg-[#0FA0CE]/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-slate-200/50 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10">
        {/* 10% - Accent color for badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Sparkles className="w-4 h-4" />
          <span>Loved by Teachers Everywhere</span>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#0FA0CE]/10 rounded-full blur-3xl transform -translate-y-1/2"></div>
          <img
            src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
            alt="iSchedulEDU App Logo - School Schedule Generator Application"
            className="mx-auto w-36 h-36 mb-8 rounded-full shadow-2xl hover:scale-110 transition-all duration-500 ring-4 ring-white ring-opacity-50"
            width="144"
            height="144"
          />
        </div>

        {/* 30% - Brand color for title accent */}
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight font-euclid">
          i<span className="text-[#0FA0CE]">Schedule</span>EDU
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-800 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
          Create custom or abbreviated schedules for your school day 
          <span className="text-[#0FA0CE] font-bold"> quickly and easily</span>
        </p>

        {/* Enhanced CTA with 10% accent color */}
        <div className="space-y-4 mb-8">
          <p className="text-lg text-gray-700 font-semibold">
            Join <span className="text-[#0FA0CE] font-bold">hundreds</span> of teachers already saving time!
          </p>
          
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-offset-2 bg-gradient-to-r from-orange-500 to-red-500 p-2"
            aria-label="Download iSchedulEDU on the App Store"
          >
            <img 
              src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400" 
              alt="Download iSchedulEDU on the App Store" 
              className="w-[280px] h-[94px] object-contain relative z-10"
              width="280"
              height="94"
            />
          </a>
        </div>

        {/* 60% - Neutral social proof with 30% brand accent */}
        <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Free to Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0FA0CE] rounded-full animate-pulse delay-500"></div>
            <span>iOS and iPadOS Compatible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-1000"></div>
            <span>Teacher Tested</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
