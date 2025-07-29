import { Helmet } from "react-helmet-async";
import AppName from "@/components/AppName";
import StickyNavigation from "@/components/home/StickyNavigation";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const StrategyReview = () => {
  return (
    <>
      <Helmet>
        <title>Strategy Review - iSchedulEDU</title>
        <meta name="description" content="Business strategy and market positioning analysis for iSchedulEDU educational technology." />
        <meta property="og:title" content="Strategy Review - iSchedulEDU" />
        <meta property="og:description" content="Business strategy and market positioning analysis for iSchedulEDU educational technology." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ischeduledu.app/strategy-review" />
        <link rel="canonical" href="https://ischeduledu.app/strategy-review" />
      </Helmet>

                                <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-14">
               <StickyNavigation />
               <div className="container mx-auto px-4 py-16">
                 <div className="max-w-4xl mx-auto">
                   {/* Breadcrumb Navigation */}
                   <div className="mb-8">
                     <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                       <Link 
                         to="/" 
                         className="hover:text-[#0FA0CE] transition-colors duration-200 flex items-center gap-1 font-medium"
                       >
                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                           <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                         </svg>
                         Home
                       </Link>
                       <ChevronRight className="w-4 h-4" />
                       <span className="text-gray-900 dark:text-gray-100 font-semibold">Strategy Review</span>
                     </nav>
                   </div>
                   
                   <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                     Strategy Review - <AppName />
                   </h1>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Business Strategy & Market Positioning
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                iSchedulEDU's strategic approach focuses on addressing the unique scheduling challenges 
                faced by elementary and middle school teachers through intelligent automation and 
                emergency scenario management.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Market Position
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    iSchedulEDU competes in the educational technology market against general scheduling 
                    apps like Google Calendar, Microsoft Outlook, and specialized teacher tools. Our unique 
                    positioning focuses on emergency scheduling scenarios that other apps don't address.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Competitive Advantages
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Unlike general scheduling apps, iSchedulEDU specializes in emergency scenarios like 
                    fire drills, weather delays, and substitute teacher situations. Our equal-time 
                    distribution algorithms ensure fair instructional time allocation.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Target Audience Analysis
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Primary competitors target general productivity users, while iSchedulEDU specifically 
                    serves elementary and middle school teachers who need quick, reliable emergency 
                    scheduling solutions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Value Proposition
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    iSchedulEDU provides teachers with intelligent emergency scheduling tools that handle 
                    complex time distribution scenarios in under 2 minutes. Our proprietary algorithms 
                    ensure equal instructional time while maintaining schedule flexibility.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Growth Strategy
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Focus on teacher community adoption through word-of-mouth marketing, educational 
                technology conferences, and partnerships with school districts. Expansion into additional 
                educational scenarios and platform development.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Success Metrics
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Teacher adoption rates, schedule generation accuracy, user satisfaction scores, and 
                    educational institution partnerships. Current metrics show high teacher satisfaction 
                    and growing user base.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Future Development
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Continued focus on emergency scheduling excellence while expanding into additional 
                    educational technology solutions that support teacher productivity and student success.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/"
                className="inline-flex items-center px-6 py-3 bg-[#0FA0CE] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StrategyReview; 