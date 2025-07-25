
import { Link } from "react-router-dom";
import { Sparkles, Download, Users, Clock, Star, CheckCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-16 md:py-24 text-center animate-fade-in relative overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0FA0CE]/10 via-transparent to-blue-500/5 dark:from-[#0FA0CE]/5 dark:to-blue-500/2 rounded-full blur-3xl transform -translate-y-1/2"></div>
      <div className="absolute top-10 left-1/4 w-20 h-20 bg-blue-400/20 dark:bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-16 h-16 bg-[#0FA0CE]/30 dark:bg-[#0FA0CE]/15 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10">
        {/* Enhanced Badges Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Sparkles className="w-4 h-4" />
            <span>Trusted by Teachers Worldwide</span>
          </div>
          <a
            href="https://peerpush.net/p/ischeduledu"
            target="_blank"
            rel="noopener"
            className="flex items-center"
          >
            <img
              src="https://peerpush.net/p/ischeduledu/badge"
              alt="iSchedulEDU badge"
              className="h-8 sm:h-[60px]"
            />
          </a>
        </div>

        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#0FA0CE] opacity-10 dark:opacity-5 rounded-full blur-3xl transform -translate-y-1/2"></div>
          <img
            src="/lovable-uploads/ischeduledu-app-logo-elementary-teacher-schedule-planner.png"
            alt="iSchedulEDU - school schedule generator app logo for teachers, administrators, and educational institutions"
            className="mx-auto w-32 h-32 md:w-40 md:h-40 mb-8 object-contain"
            width="160"
            height="160"
          />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight font-euclid bg-gradient-to-r from-foreground via-[#0FA0CE] to-foreground bg-clip-text text-transparent">
          iSchedulEDU
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-8 max-w-4xl mx-auto leading-relaxed font-medium">
          Plan ahead with custom schedules or handle last-minute changes 
          <span className="text-[#0FA0CE] font-bold"> in under 2 minutes</span>
        </p>

        {/* Enhanced value proposition */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center justify-center gap-3 text-foreground/80">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="font-semibold">Free to Start</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-foreground/80">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-semibold">2-Minute Setup</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-foreground/80">
              <div className="p-2 bg-[#0FA0CE]/10 dark:bg-[#0FA0CE]/20 rounded-full">
                <Users className="w-5 h-5 text-[#0FA0CE]" />
              </div>
              <span className="font-semibold">Teacher-Tested</span>
            </div>
          </div>
        </div>

        {/* Enhanced CTA with urgency */}
        <div className="space-y-6 mb-12">
          <div className="bg-gradient-to-r from-[#0FA0CE] via-blue-600 to-indigo-700 dark:from-[#0FA0CE] dark:via-blue-600 dark:to-indigo-800 rounded-3xl p-8 md:p-10 max-w-4xl mx-auto shadow-2xl border-0 relative overflow-hidden transform hover:scale-105 transition-all duration-300">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 dark:from-white/5 dark:via-white/3 dark:to-white/5"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#0FA0CE] via-blue-500 to-indigo-600"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <span>🚨 Emergency Ready</span>
              </div>
              
              <p className="text-xl md:text-2xl text-white font-bold mb-3">
                📅 <span className="text-yellow-300 font-bold">Always Prepared:</span> Plan ahead or handle changes instantly!
              </p>
              <p className="text-lg text-white/90 max-w-3xl mx-auto">
                Create custom schedules for announced events or tackle last-minute emergencies with confidence
              </p>
            </div>
          </div>
          
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
              className="w-[280px] h-[94px] object-contain relative z-10 dark:invert"
              width="280"
              height="94"
            />
          </a>
        </div>

        {/* Enhanced social proof */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-foreground/60 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 bg-blue-500 dark:bg-blue-400 rounded-full border-2 border-background"></div>
              <div className="w-6 h-6 bg-green-500 dark:bg-green-400 rounded-full border-2 border-background"></div>
              <div className="w-6 h-6 bg-purple-500 dark:bg-purple-400 rounded-full border-2 border-background"></div>
            </div>
            <span className="font-medium">Teachers Worldwide Trust Us</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="font-medium">5/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
            <span className="font-medium">iOS & iPadOS Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
