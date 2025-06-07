
import { Clock, Heart, UserCheck, Shuffle, MessageSquare } from "lucide-react";
import AppName from "@/components/AppName";

const FeatureSection = ({ icon: Icon, title, items }: { 
  icon: React.ComponentType<any>;
  title: string;
  items: string[];
}) => (
  <div className="text-left space-y-6">
    <div className="flex items-center gap-2">
      <Icon className="h-6 w-6 text-app-primary" />
      <h3 className="text-xl font-semibold text-app-primary">{title}</h3>
    </div>
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start">
          <span className="text-app-accent mr-2 font-bold">✓</span>
          <span className="text-app-secondary">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => {
  return (
    <section aria-labelledby="pricing-title" className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 id="pricing-title" className="text-4xl font-bold mb-6 text-app-primary">
          Transform Your School Day with <AppName size="xl" className="inline" />
        </h2>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="space-y-8">
            <div className="text-2xl font-bold text-app-primary">
              <span>Start with 4 Free Sessions</span>
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

            <div className="mt-8 p-4 bg-app-background-secondary rounded-lg">
              <p className="text-sm text-app-muted italic">
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
