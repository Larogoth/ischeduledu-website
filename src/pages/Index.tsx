import TestimonialCard from "@/components/TestimonialCard";
import WhyTeachersChoose from "@/components/WhyTeachersChoose";
import Header from "@/components/home/Header";
import Pricing from "@/components/home/Pricing";
import Screenshots from "@/components/home/Screenshots";
import Footer from "@/components/home/Footer";
import GenerationProcess from "@/components/home/GenerationProcess";
import StickyNavigation from "@/components/home/StickyNavigation";
import BenefitsSection from "@/components/home/BenefitsSection";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect } from "react";
import type { Testimonial } from "@/data/testimonials";
import { Download, Users, Clock } from "lucide-react";
import { useState } from "react";

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
    <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] pt-14 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-[#0FA0CE]/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2"></div>
      
      <StickyNavigation />
      <Header />
      <BenefitsSection />
      <GenerationProcess />
      
      {/* Enhanced Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-r from-[#0FA0CE] to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for Schedule Emergencies?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join the hundreds of teachers who are prepared for unexpected schedule changes
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center gap-3 text-white">
                <Users className="w-6 h-6 text-blue-200" />
                <span className="text-lg font-semibold">Hundreds of Teachers</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Clock className="w-6 h-6 text-blue-200" />
                <span className="text-lg font-semibold">Quick Relief in Emergencies</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Download className="w-6 h-6 text-blue-200" />
                <span className="text-lg font-semibold">4 Free Sessions</span>
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
          </div>
        </div>
      </section>

      <Pricing />
      <WhyTeachersChoose />
      
      {reviews.length > 0 && (
        <section aria-labelledby="testimonials-title" className="py-20 bg-gradient-to-b from-white to-[#F8FBFF] relative overflow-hidden">
          {/* Enhanced background decorations */}
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#0FA0CE]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#0FA0CE]/5 to-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <span>⭐ 5/5 Rating from Real Teachers</span>
              </div>
              <h2 id="testimonials-title" className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Teachers Love iSchedulEDU
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Join hundreds of educators who've transformed their daily scheduling experience
              </p>
              
              {/* Social proof stats */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0FA0CE] mb-2">Hundreds</div>
                  <div className="text-sm text-gray-600">Active Teachers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">5★</div>
                  <div className="text-sm text-gray-600">App Store Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2min</div>
                  <div className="text-sm text-gray-600">Average Setup Time</div>
                </div>
              </div>
              
              {import.meta.env.DEV && isLoadingReviews && (
                <span className="text-sm text-gray-400 block mt-2">(Loading reviews...)</span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {reviews.map((review) => (
                <TestimonialCard
                  key={review.id}
                  title={review.title}
                  name={review.name}
                  content={review.content}
                  stars={review.stars}
                  isAppStoreReview={review.isAppStoreReview}
                />
              ))}
            </div>

            {/* Enhanced CTA after testimonials */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 rounded-3xl p-8 max-w-4xl mx-auto border border-[#0FA0CE]/20">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Ready to Join These Happy Teachers?
                </h3>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Start with 4 free sessions and experience the difference iSchedulEDU makes in your daily teaching routine
                </p>
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl"
                >
                  <img 
                    src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                    alt="Download iSchedulEDU on the App Store" 
                    className="w-[280px] h-[94px] object-contain"
                    width="280"
                    height="94"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <Screenshots />
      <Footer />
    </main>
  );
};

export default Index;
