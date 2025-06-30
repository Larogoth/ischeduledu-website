
import { Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#0FA0CE] to-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
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
              className="inline-block"
            >
              <Button size="lg" className="bg-white text-[#0FA0CE] hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Download className="w-5 h-5 mr-2" />
                Download Free Now
              </Button>
            </a>
          </div>

          <div className="flex justify-center">
            <img
              src="/lovable-uploads/53195535-6434-4fc8-abce-a78ac1dc6f99.png"
              alt="iSchedulEDU Daily Schedule View"
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
