
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const StickyNavigation = () => {
  const { t } = useTranslation();

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-b border-[#0FA0CE]/20 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-full">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="relative flex-shrink-0">
            <img
              src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
              alt="iSchedulEDU Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-[#0FA0CE]/30"
            />
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-white" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-bold text-lg sm:text-xl text-gray-900 truncate block">iSchedulEDU</span>
            <span className="hidden md:inline-block bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold mt-1">
              {t('navigation.teachersChoice')}
            </span>
          </div>
        </div>
        
        <a 
          href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
          target="_blank" 
          rel="noopener noreferrer"
          className="transition-all duration-300 hover:scale-105 flex-shrink-0"
        >
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 hover:from-[#0D8CB6] hover:to-blue-700 shadow-lg hover:shadow-xl text-white font-semibold px-2 sm:px-4 py-2 gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{t('navigation.downloadFree')}</span>
            <span className="sm:hidden">{t('navigation.getApp')}</span>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default StickyNavigation;
