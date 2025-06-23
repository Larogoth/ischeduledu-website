
import { Sparkles, Download, Star, CheckCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-24 text-center relative overflow-hidden">
      {/* Enhanced multi-layer background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0FA0CE]/5 via-transparent to-blue-500/5 rounded-[50px] blur-3xl transform -translate-y-1/4"></div>
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/15 to-[#0FA0CE]/10 rounded-full blur-2xl animate-pulse duration-4000"></div>
      <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-gradient-to-l from-[#0FA0CE]/20 to-blue-500/15 rounded-full blur-xl animate-pulse duration-6000"></div>
      
      <div className="relative z-10 animate-fade-in">
        {/* Enhanced badge with glassmorphism */}
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0FA0CE]/10 to-blue-600/10 backdrop-blur-md border border-[#0FA0CE]/20 text-gray-800 px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#0FA0CE]/15 hover:to-blue-600/15">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-[#0FA0CE]" />
            <div className="absolute inset-0 w-5 h-5 bg-[#0FA0CE]/20 rounded-full blur-sm animate-pulse"></div>
          </div>
          <span className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 bg-clip-text text-transparent font-bold">
            Loved by Teachers Everywhere
          </span>
        </div>

        {/* Enhanced app icon with multiple effects */}
        <div className="relative mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0FA0CE]/20 to-blue-600/20 rounded-full blur-3xl transform scale-150"></div>
          <div className="relative mx-auto w-40 h-40 group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <img
              src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
              alt="iSchedulEDU App Logo - School Schedule Generator Application"
              className="relative mx-auto w-40 h-40 rounded-full shadow-2xl hover:scale-110 transition-all duration-500 ring-4 ring-white/50 ring-offset-4 ring-offset-transparent hover:ring-[#0FA0CE]/30"
              width="160"
              height="160"
            />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        {/* Enhanced main heading with gradient text and better typography */}
        <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight font-euclid leading-none">
            <span className="block bg-gradient-to-br from-gray-900 via-[#0FA0CE] to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
              iSchedulEDU
            </span>
          </h1>
          
          <div className="relative max-w-4xl mx-auto mb-12">
            <p className="text-2xl md:text-3xl lg:text-4xl text-gray-800 leading-relaxed font-medium">
              Create custom or abbreviated schedules for your school day 
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 bg-clip-text text-transparent font-bold"> quickly and easily</span>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-full opacity-30"></div>
              </span>
            </p>
          </div>
        </div>

        {/* Enhanced social proof section */}
        <div className="space-y-8 mb-12 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-md border border-gray-200/50 px-6 py-3 rounded-full shadow-lg">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-bold text-gray-800">
              Join <span className="text-[#0FA0CE]">hundreds</span> of teachers already saving time!
            </span>
          </div>
          
          {/* Enhanced App Store button */}
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-block overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-600/50 focus:ring-offset-4"
            aria-label="Download iSchedulEDU on the App Store"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0FA0CE]/20 via-blue-600/15 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-emerald-400/10 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <img 
              src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
              alt="Download iSchedulEDU on the App Store" 
              className="relative z-10 w-[320px] h-[107px] object-contain"
              width="320"
              height="107"
            />
          </a>
        </div>

        {/* Enhanced feature badges with better animations */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-sm animate-fade-in" style={{ animationDelay: '800ms' }}>
          {[
            { color: "emerald", label: "Free to Start", delay: "0ms" },
            { color: "blue", label: "iOS & iPadOS", delay: "200ms" },
            { color: "[#0FA0CE]", label: "Teacher Tested", delay: "400ms" }
          ].map((badge, index) => (
            <div 
              key={index}
              className="group flex items-center gap-3 bg-white/40 backdrop-blur-sm border border-gray-200/50 px-4 py-2 rounded-full hover:bg-white/60 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: badge.delay }}
            >
              <div className={`w-3 h-3 bg-${badge.color}-500 rounded-full animate-pulse group-hover:scale-110 transition-transform duration-300`}></div>
              <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
