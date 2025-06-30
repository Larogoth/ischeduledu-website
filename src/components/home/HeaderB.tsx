
import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeaderB = () => {
  return (
    <section className="bg-gradient-to-b from-[#E6F3FF] to-white py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-6">
              <Star className="w-4 h-4 fill-current" />
              <span>5.0★ App Store Rating</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Create School Schedules in 
              <span className="text-[#0FA0CE]"> Seconds</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Generate perfect class schedules for early dismissals, delays, and special events. 
              Trusted by hundreds of teachers to handle unexpected schedule changes quickly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a 
                href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block transform hover:scale-105 transition-all duration-300"
              >
                <img 
                  src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                  alt="Download iSchedulEDU on the App Store" 
                  className="w-[200px] h-auto"
                  width="200"
                  height="59"
                />
              </a>
              
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold border-2 border-gray-300 hover:border-[#0FA0CE] hover:text-[#0FA0CE]">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>iOS & iPadOS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#0FA0CE] rounded-full"></div>
                <span>No Ads</span>
              </div>
            </div>
          </div>

          {/* Right side - Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-[#0FA0CE]/20 rounded-3xl blur-2xl transform rotate-6"></div>
              <img
                src="/lovable-uploads/99aa0220-3f06-4237-97d0-1829aa8487b5.png"
                alt="iSchedulEDU App Interface - Easy Schedule Generation"
                className="relative z-10 w-80 h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                width="320"
                height="693"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderB;
