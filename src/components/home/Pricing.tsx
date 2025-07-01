
import { Clock, Heart, UserCheck, Shuffle, MessageSquare, Star, CheckCircle } from "lucide-react";
import AppName from "@/components/AppName";

const FeatureSection = ({ icon: Icon, title, items }: { 
  icon: React.ComponentType<any>;
  title: string;
  items: string[];
}) => (
  <div className="text-left space-y-4 p-6 bg-gradient-to-br from-white to-blue-50/50 rounded-xl border border-blue-100 hover:border-[#0FA0CE]/30 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-lg">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
          <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => {
  return (
    <section aria-labelledby="pricing-title" className="py-16 bg-gradient-to-b from-white to-[#F5F9FF] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#0FA0CE]/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4" />
            <span>Built by a Teacher</span>
          </div>
          
          <h2 id="pricing-title" className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Transform Your School Day with <AppName size="xl" className="inline text-[#0FA0CE]" />
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop wasting time on manual schedule creation. Start your transformation today!
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-[#0FA0CE]/20 relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0FA0CE] to-blue-600"></div>
          
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-lg font-bold mb-4 shadow-lg animate-pulse">
                <span>🎉 Start with 4 FREE Sessions</span>
              </div>
              <p className="text-gray-600">Then just $4.99 one-time purchase • No subscriptions</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureSection
                icon={Clock}
                title="Save Hours Weekly"
                items={[
                  "Create schedules in under 2 minutes",
                  "Quick adjustments for unexpected changes",
                  "More time for what matters: teaching"
                ]}
              />

              <FeatureSection
                icon={Heart}
                title="Reduce Daily Stress"
                items={[
                  "No more last-minute scheduling panic",
                  "Always know your next class timing",
                  "Peace of mind with error-free schedules"
                ]}
              />

              <FeatureSection
                icon={UserCheck}
                title="Look Professional"
                items={[
                  "Run classes with complete confidence",
                  "Impress administrators with organization",
                  "Maintain smooth educational flow"
                ]}
              />

              <FeatureSection
                icon={Shuffle}
                title="Handle Any Change"
                items={[
                  "Weather delays? No problem",
                  "Special events handled instantly",
                  "Always stay flexible and prepared"
                ]}
              />

              <FeatureSection
                icon={MessageSquare}
                title="Keep Everyone Informed"
                items={[
                  "Share updates with your entire team",
                  "QR codes for instant communication",
                  "Never leave anyone confused"
                ]}
              />

              <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#0FA0CE]/10 to-blue-600/10 rounded-xl p-6 border-2 border-[#0FA0CE]/30 relative">
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-12">
                  NO SUBSCRIPTIONS
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Teacher's Promise</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  As a fellow educator, I believe in <strong>simple, affordable pricing</strong>. One purchase, lifetime access - no monthly fees!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
