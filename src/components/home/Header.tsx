
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container mx-auto px-4 py-24 text-center animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-[#0FA0CE] opacity-5 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <img
          src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
          alt="iSchedulEDU Logo - School Schedule Generator App"
          className="mx-auto w-32 h-32 mb-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
        iSchedulEDU
      </h1>
      <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
        Create custom and abbreviated schedules for your school day with ease
      </p>

      <img 
        src="/lovable-uploads/200d9b16-92c1-4ec3-aa24-584072b0cdb1.png"
        alt="iSchedulEDU Schedule Generator Interface"
        className="w-48 md:w-64 mx-auto rounded-xl shadow-lg mb-8"
        loading="eager"
      />

      <a 
        href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block hover:opacity-80 transition-opacity"
      >
        <img 
          src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
          alt="Download on the App Store" 
          className="w-[245px] h-[82px] object-contain"
        />
      </a>
    </header>
  );
};

export default Header;
