
import { Button } from "@/components/ui/button";

const StickyNavigation = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img
            src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
            alt="iSchedulEDU Logo"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-bold text-lg text-gray-900">iSchedulEDU</span>
        </div>
        
        <a 
          href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
          target="_blank" 
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-80"
        >
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <span>Download Now</span>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default StickyNavigation;
