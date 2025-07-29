
import { Clock, Heart, UserCheck, Shuffle, MessageSquare, Star, CheckCircle } from "lucide-react";
import AppName from "@/components/AppName";

const FeatureSection = ({ icon: Icon, title, items }: { 
  icon: React.ComponentType<any>;
  title: string;
  items: string[];
}) => (
  <div className="text-left space-y-4 p-6 bg-gradient-to-br from-background to-blue-50/50 dark:to-blue-950/50 rounded-xl border border-blue-100 dark:border-blue-900/30 hover:border-[#0FA0CE]/30 transition-all duration-300 hover:shadow-lg">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-lg">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h4 className="text-lg font-semibold text-foreground">{title}</h4>
    </div>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
          <span className="text-foreground/70 text-sm leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Pricing = () => {
  return (
    <section aria-labelledby="pricing-title" className="py-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#0FA0CE]/10 dark:bg-[#0FA0CE]/15 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="w-4 h-4" />
            <span>Built by a Teacher</span>
          </div>
          
          <h3 id="pricing-title" className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Transform Your School Day with <AppName size="xl" className="inline text-[#0FA0CE]" />
          </h3>
          
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Plan custom schedules for announced events or handle unexpected changes instantly!
          </p>
        </div>

        <div className="max-w-6xl mx-auto bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-500 border border-[#0FA0CE]/20 relative overflow-hidden mb-16">
          {/* Enhanced gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600"></div>
          
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-bold mb-6 shadow-lg animate-pulse">
                <span>🎉 Start with 4 FREE Sessions</span>
              </div>
              <div className="space-y-2">
                <p className="text-foreground/90 font-semibold">Then just $4.99 one-time purchase</p>
                <p className="text-sm text-foreground/70">No subscriptions • No hidden fees • Lifetime access</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureSection
                icon={Clock}
                title="Fast & Flexible Scheduling"
                items={[
                  "Custom schedules for planned events",
                  "Emergency solutions in under 2 minutes",
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
                  "Plan ahead for announced events",
                  "Last-minute changes handled instantly",
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

              <div className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#0FA0CE]/10 to-blue-600/10 dark:from-[#0FA0CE]/5 dark:to-blue-600/5 rounded-xl p-6 border-2 border-[#0FA0CE]/30 relative">
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold transform rotate-12">
                  NO SUBSCRIPTIONS
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4">💡 Teacher's Promise</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  As a fellow educator, I believe in <strong>simple, affordable pricing</strong>. One purchase, lifetime access - no monthly fees!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section - Conversion Climax */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span>🚨 Emergency Ready</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Don't Get Caught Unprepared Again
              </h3>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
                The next time your principal announces a last-minute schedule change, you'll be the teacher who has it handled in 2 minutes while others are still scrambling.
              </p>
              
              <div className="bg-white/10 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                <p className="text-lg font-semibold mb-4">Join hundreds of prepared teachers:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">5.0★</div>
                    <div className="text-sm text-blue-200">App Store</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2 min</div>
                    <div className="text-sm text-blue-200">Setup</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">$4.99</div>
                    <div className="text-sm text-blue-200">One-time</div>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl"
              >
                <img 
                  src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400" 
                  alt="Download iSchedulEDU on the App Store" 
                  className="w-[300px] h-[100px] object-contain"
                  width="300"
                  height="100"
                />
              </a>
              
              <p className="text-sm text-blue-200 mt-4">
                Start with 4 free sessions • No credit card required
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
