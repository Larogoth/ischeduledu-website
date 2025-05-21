
import { Clock, Heart, UserCheck, Shuffle, MessageSquare } from "lucide-react";
import AppName from "@/components/AppName";
import { Button } from "@/components/ui/button";

const FeatureSection = ({ icon: Icon, title, items }: { 
  icon: React.ComponentType<any>;
  title: string;
  items: string[];
}) => (
  <div className="text-left space-y-6">
    <div className="flex items-center gap-2">
      <Icon className="h-6 w-6 text-blue-500" />
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-green-500 mr-2">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => {
  return (
    <section aria-labelledby="pricing-title" className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
      <div className="container mx-auto px-4 text-center">
        <h2 id="pricing-title" className="text-3xl font-bold mb-4 text-gray-900">
          Start Free, Upgrade When Ready
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Try <AppName size="md" className="inline" /> risk-free with 4 free sessions to see how much time you'll save
        </p>
        
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="space-y-8">
            <div className="text-2xl font-bold text-blue-600 mb-4">
              <span>Start with 4 Free Sessions</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <a 
                href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                  alt="Download iSchedulEDU on the App Store" 
                  className="w-[185px] h-[62px] object-contain"
                />
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureSection
                icon={Clock}
                title="Time-Saving Focus"
                items={[
                  "Spend more time with students, less time on creating schedules",
                  "Create schedules in minutes",
                  "Quick adjustments for unexpected changes"
                ]}
              />

              <FeatureSection
                icon={Heart}
                title="Stress Reduction"
                items={[
                  "Eliminate last-minute scheduling scrambles",
                  "Peace of mind with error-free schedules",
                  "Always know your next class timing"
                ]}
              />

              <FeatureSection
                icon={UserCheck}
                title="Professional Impact"
                items={[
                  "Run your classes with confidence",
                  "Maintain educational momentum with smooth transitions"
                ]}
              />

              <FeatureSection
                icon={Shuffle}
                title="Flexibility Benefits"
                items={[
                  "Adapt to school events without disruption",
                  "Quick response to weather delays"
                ]}
              />

              <FeatureSection
                icon={MessageSquare}
                title="Communication Value"
                items={[
                  "Keep everyone on the same page",
                  "Instant schedule updates for your whole team"
                ]}
              />
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 italic">
                Note: Early adopters who purchased before January 01, 2025 have lifetime access - restore your purchase anytime through the app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
