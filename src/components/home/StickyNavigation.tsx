
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";

const StickyNavigation = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-b border-[#0FA0CE]/20 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
              alt="iSchedulEDU Logo"
              className="w-10 h-10 rounded-full ring-2 ring-[#0FA0CE]/30"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          <span className="font-bold text-xl text-gray-900">iSchedulEDU</span>
          <span className="hidden sm:inline-block bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            #1 Teacher Tool
          </span>
        </div>
        
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
    </div>
  );
};

export default StickyNavigation;
