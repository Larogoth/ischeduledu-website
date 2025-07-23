import { useState } from "react";
import { ChevronLeft, ChevronRight, Play, Zap, Calendar, Share2 } from "lucide-react";

const Screenshots = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const screenshots = [
    {
      src: "/lovable-uploads/ischeduledu-saved-schedules-management-interface.png",
      alt: "iSchedulEDU saved schedules management interface showing organized school timetables for teachers and administrators",
      title: "Smart Schedule Management",
      description: "Organize and access all your schedules in one place. Never lose track of your timetables again.",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      src: "/lovable-uploads/ischeduledu-daily-notifications-setup-screen.png",
      alt: "iSchedulEDU daily schedule notifications setup screen for class period alerts and reminders for educators",
      title: "Smart Notifications",
      description: "Get timely reminders for class changes and important schedule updates throughout your day.",
      icon: <Zap className="w-6 h-6" />
    },
    {
      src: "/lovable-uploads/ischeduledu-daily-timeline-schedule-view.png",
      alt: "iSchedulEDU daily timeline view displaying complete school day schedule with class periods and break times",
      title: "Timeline View",
      description: "See your entire day at a glance with our intuitive timeline interface.",
      icon: <Play className="w-6 h-6" />
    },
    {
      src: "/lovable-uploads/ischeduledu-rotating-block-schedule-calendar.png",
      alt: "iSchedulEDU rotating block schedule calendar managing A-day B-day alternating class periods for schools",
      title: "Rotating Schedules",
      description: "Handle A/B day rotations and complex schedule patterns with ease.",
      icon: <Calendar className="w-6 h-6" />
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section aria-labelledby="screenshots-title" className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#0FA0CE]/10 dark:bg-[#0FA0CE]/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>📱 App Preview</span>
          </div>
          <h2 id="screenshots-title" className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            See iSchedulEDU in Action
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Experience the intuitive interface that makes schedule management effortless for teachers
          </p>
        </div>

        {/* Enhanced carousel - optimized for mobile */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center w-full">
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="z-20 bg-background/80 hover:bg-background rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110 border border-border mr-2"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-foreground" />
            </button>
            {/* Main screenshot display - mobile optimized */}
            <div className="relative bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-4 md:p-8 shadow-2xl border border-gray-100 dark:border-gray-700 flex-1">
              <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-12">
                {/* Screenshot - smaller on mobile */}
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0FA0CE]/20 to-blue-500/20 rounded-2xl md:rounded-3xl blur-xl"></div>
                    <img
                      src={screenshots[activeIndex].src}
                      alt={screenshots[activeIndex].alt}
                      className="relative z-10 w-48 md:w-64 h-auto rounded-xl md:rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
                      width="192"
                      height="416"
                    />
                  </div>
                </div>
                {/* Feature description - more compact on mobile */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 dark:from-[#0FA0CE]/20 dark:to-blue-500/20 text-[#0FA0CE] px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6 h-8 md:h-10">
                    <div className="flex items-center justify-center h-full w-6 md:w-8">
                      {/* Icon size is always w-6 h-6 for visual balance */}
                      {screenshots[activeIndex].icon}
                    </div>
                    <span className="font-semibold text-sm md:text-base">{screenshots[activeIndex].title}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 md:mb-4">
                    {screenshots[activeIndex].title}
                  </h3>
                  <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-6 md:mb-8">
                    {screenshots[activeIndex].description}
                  </p>
                  {/* Feature availability note - no CTA button */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4">
                    <p className="text-sm text-foreground/80">
                      <span className="font-semibold text-green-600 dark:text-green-400">✓</span> Available in your free trial
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="z-20 bg-background/80 hover:bg-background rounded-full p-2 md:p-3 shadow-lg transition-all duration-300 hover:scale-110 border border-border ml-2"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-foreground" />
            </button>
          </div>
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-[#0FA0CE] scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to screenshot ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 dark:from-[#0FA0CE]/20 dark:to-blue-500/20 rounded-2xl p-8 max-w-4xl mx-auto border border-[#0FA0CE]/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Transform Your Schedule Management?
            </h3>
            <p className="text-lg text-foreground/80 mb-6">
              Join hundreds of teachers who've already simplified their daily scheduling with iSchedulEDU
            </p>
            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              <img 
                src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                alt="Download iSchedulEDU on the App Store" 
                className="w-[280px] h-[94px] object-contain dark:invert"
                width="280"
                height="94"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
