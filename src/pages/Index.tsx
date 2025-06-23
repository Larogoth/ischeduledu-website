
import TestimonialCard from "@/components/TestimonialCard";
import WhyTeachersChoose from "@/components/WhyTeachersChoose";
import Header from "@/components/home/Header";
import Pricing from "@/components/home/Pricing";
import Screenshots from "@/components/home/Screenshots";
import Footer from "@/components/home/Footer";
import GenerationProcess from "@/components/home/GenerationProcess";
import StickyNavigation from "@/components/home/StickyNavigation";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/data/testimonials";
import { Download, Users, Clock, Sparkles, Star, CheckCircle } from "lucide-react";

const Index = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(fallbackTestimonials);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoadingReviews(true);
      try {
        console.log("Starting to fetch reviews...");
        const fetchedReviews = await getTestimonials();
        console.log("Fetched reviews:", fetchedReviews);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    loadReviews();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced animated background with multiple gradient layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#E6F3FF] via-white to-[#F0F8FF] -z-10"></div>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/5 rounded-full blur-3xl animate-pulse duration-4000 -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-l from-blue-500/8 to-[#0FA0CE]/6 rounded-full blur-3xl animate-pulse duration-6000 translate-x-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/5 to-blue-400/5 rounded-full blur-2xl animate-pulse duration-8000 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="relative z-10 pt-14">
        <StickyNavigation />
        
        {/* Enhanced Header with immersive experience */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-transparent backdrop-blur-sm"></div>
          <Header />
        </div>

        {/* Enhanced Generation Process with better visual separation */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F8FBFF]/80 to-white/90 backdrop-blur-sm"></div>
          <GenerationProcess />
        </div>
        
        {/* Enhanced Call-to-Action Section with modern glassmorphism */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0FA0CE] via-blue-600 to-indigo-700"></div>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
          
          {/* Animated background elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse duration-3000"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/15 rounded-full blur-lg animate-pulse duration-5000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-emerald-400/20 rounded-full blur-md animate-pulse duration-4000"></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 hover:bg-white/25 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>Join the Teacher Revolution</span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                Ready to Save 
                <span className="block bg-gradient-to-r from-yellow-300 via-emerald-300 to-blue-300 bg-clip-text text-transparent">
                  Hours Every Week?
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                Transform your teaching workflow and reclaim your precious time with our intelligent scheduling solution
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { icon: Users, label: "Hundreds of Teachers", sublabel: "Already transformed" },
                  { icon: Clock, label: "Hours Saved Weekly", sublabel: "More time for teaching" },
                  { icon: Download, label: "4 Free Sessions", sublabel: "No commitment needed" }
                ].map((item, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                    <item.icon className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white mb-1">{item.label}</h3>
                    <p className="text-blue-200 text-sm">{item.sublabel}</p>
                  </div>
                ))}
              </div>

              <a 
                href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-block transform hover:scale-110 transition-all duration-500 focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-blue-600 rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-2 group-hover:bg-white/15 transition-all duration-300">
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400" 
                    alt="Download iSchedulEDU on the App Store" 
                    className="w-[300px] h-[100px] object-contain"
                    width="300"
                    height="100"
                  />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Enhanced Pricing with better visual flow */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#F8FBFF]/70 to-white/95 backdrop-blur-sm"></div>
          <Pricing />
        </div>

        {/* Enhanced Why Teachers Choose with modern cards */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-[#F0F8FF]/80 to-white/90 backdrop-blur-sm"></div>
          <WhyTeachersChoose />
        </div>
        
        {/* Enhanced Testimonials Section */}
        {reviews.length > 0 && (
          <section aria-labelledby="testimonials-title" className="py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#F8FBFF] via-white to-[#F0F8FF]"></div>
            
            {/* Floating background elements */}
            <div className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-r from-[#0FA0CE]/5 to-blue-500/5 rounded-full blur-2xl animate-pulse duration-6000"></div>
            <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-gradient-to-l from-emerald-400/8 to-blue-400/5 rounded-full blur-xl animate-pulse duration-4000"></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-16 animate-fade-in">
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Star className="w-5 h-5 text-yellow-300" />
                  <span>Real Teacher Reviews</span>
                </div>
                
                <h2 id="testimonials-title" className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 tracking-tight">
                  What Teachers Are 
                  <span className="block bg-gradient-to-r from-[#0FA0CE] to-blue-600 bg-clip-text text-transparent">
                    Saying
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto font-light">
                  Don't just take our word for it - see why educators love iSchedulEDU
                </p>
                
                {import.meta.env.DEV && isLoadingReviews && (
                  <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600 mt-4">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading reviews...</span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {reviews.map((review, index) => (
                  <div key={review.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <TestimonialCard
                      title={review.title}
                      name={review.name}
                      content={review.content}
                      stars={review.stars}
                      isAppStoreReview={review.isAppStoreReview}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Enhanced Screenshots with better integration */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-[#F5F9FF]/80 to-white/95 backdrop-blur-sm"></div>
          <Screenshots />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
