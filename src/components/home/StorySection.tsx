
import { Clock, Users, Lightbulb, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StorySection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-[#0FA0CE]/10 dark:bg-[#0FA0CE]/20 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Story Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <span>👨‍🏫 The Story Behind iSchedulEDU</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
            Built by a Teacher, for Teachers
          </h2>
          
          <div className="bg-gradient-to-br from-white to-blue-50/50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700 text-left">
            <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0FA0CE] to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-foreground mb-4">From Classroom Chaos to Digital Solution</h3>
                
                {/* Break up the long text into digestible paragraphs */}
                <div className="space-y-4 text-foreground/80">
                  <p className="text-lg leading-relaxed">
                    "As an elementary math teacher, I became the go-to person in my grade level whenever our schedule would deviate from our regular routine."
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    "I'd have to work around schedule changes for things like MAP testing, 4-H events, grade-level parties, RTI days, and assemblies."
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    "I had been wanting to create an app of my own for a while but never could come up with the right idea. One day I got the idea to see if I could automate the process of generating schedules with evenly distributed times and began the journey to what is now iSchedulEDU."
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    "What started as a personal solution has now helped hundreds of teachers handle their own schedule emergencies with confidence."
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full font-semibold">
                <span>✓</span>
                <span>Teacher-tested since day one</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How iSchedulEDU Works
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Plan ahead for announced events or handle last-minute emergencies with equal ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-white font-bold text-lg mb-4 shadow-lg">
                  1
                </div>
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-[#0FA0CE] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Set Your Parameters</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Enter your start time, end time, and any fixed events like lunch or assemblies. Create custom schedules for planned events or handle emergencies.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-white font-bold text-lg mb-4 shadow-lg">
                  2
                </div>
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Lightbulb className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Create & Customize</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Auto-generate evenly distributed schedules, or customize times for any scenario.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full text-white font-bold text-lg mb-4 shadow-lg">
                  3
                </div>
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Rocket className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Share & Save</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      Save your schedule, set smart notifications, and share with colleagues via QR code, PDF, or link.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Process Arrow for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#0FA0CE] to-blue-600"></div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-600"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
