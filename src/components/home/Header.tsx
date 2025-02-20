
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-24 text-center animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-[#0FA0CE] opacity-5 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <img
          src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
          alt="iSchedulEDU App Logo - School Schedule Generator Application"
          className="mx-auto w-32 h-32 mb-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          width="128"
          height="128"
        />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
        iSchedulEDU
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
        Create custom or abbreviated schedules for your school day quickly and easily
      </p>
      <a 
        href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block hover:opacity-80 transition-opacity"
        aria-label="Download iSchedulEDU on the App Store"
      >
        <img 
          src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
          alt="Download iSchedulEDU on the App Store" 
          className="w-[245px] h-[82px] object-contain"
          width="245"
          height="82"
        />
      </a>
    </header>
  );
};

export default Header;
