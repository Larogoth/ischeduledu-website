import { Clock, Shield, Zap, Users, Star, CheckCircle } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-[#0FA0CE]" />,
      title: "Save Hours Every Week",
      description: "Create schedules in under 2 minutes instead of spending hours manually adjusting timetables.",
      color: "from-blue-50 to-blue-100"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Emergency Ready",
      description: "Handle unexpected schedule changes instantly. Never panic about last-minute adjustments again.",
      color: "from-green-50 to-green-100"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      title: "Lightning Fast",
      description: "Generate professional schedules in seconds with our intelligent automation system.",
      color: "from-yellow-50 to-yellow-100"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Teacher-Tested",
      description: "Built by a teacher, for teachers. Every feature is designed with real classroom needs in mind.",
      color: "from-purple-50 to-purple-100"
    },
    {
      icon: <Star className="w-8 h-8 text-orange-500" />,
      title: "5★ App Store Rating",
      description: "Join hundreds of satisfied teachers who've transformed their daily scheduling experience.",
      color: "from-orange-50 to-orange-100"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
      title: "Free to Start",
      description: "Try 4 sessions completely free. No credit card required, no hidden fees.",
      color: "from-emerald-50 to-emerald-100"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#0FA0CE]/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <span>🚀 Why Choose iSchedulEDU</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Transform Your Teaching Day
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference that intelligent scheduling makes in your daily routine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${benefit.color} rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {benefit.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl border-0 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-white/10 dark:bg-white/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
                Join hundreds of teachers who've already simplified their daily scheduling with iSchedulEDU
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl"
                >
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400" 
                    alt="Download iSchedulEDU on the App Store" 
                    className="w-[280px] h-[94px] object-contain"
                    width="280"
                    height="94"
                  />
                </a>
                
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-2 text-sm text-white/90 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span>Free to start</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <Star className="w-4 h-4 text-yellow-300 fill-current" />
                    <span>5★ App Store Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection; 