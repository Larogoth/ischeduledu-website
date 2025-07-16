
import { CheckCircle } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Schedule Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join hundreds of teachers who've already saved hours every week with iSchedulEDU
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>4 Free Schedules</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Works Offline</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              <img 
                src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400" 
                alt="Download iSchedulEDU school schedule generator app on Apple App Store - free scheduling tool for teachers" 
                className="w-[300px] h-[100px] object-contain"
                width="300"
                height="100"
              />
            </a>
          </div>

          <div className="flex justify-center">
            <img
              src="/lovable-uploads/ischededu-daily-timeline-schedule-view.png"
              alt="iSchedulEDU daily school schedule timeline view showing complete class periods and break times for teachers and administrators"
              className="w-64 h-auto rounded-xl shadow-2xl"
              width="256"
              height="555"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
