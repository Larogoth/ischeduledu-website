
import TestimonialCard from "@/components/TestimonialCard";
import Header from "@/components/home/Header";
import Pricing from "@/components/home/Pricing";
import Screenshots from "@/components/home/Screenshots";
import Footer from "@/components/home/Footer";
import StorySection from "@/components/home/StorySection";
import StickyNavigation from "@/components/home/StickyNavigation";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect } from "react";
import type { Testimonial } from "@/data/testimonials";
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
    <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-14 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-[#0FA0CE]/5 dark:bg-[#0FA0CE]/10 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl translate-x-1/2"></div>
      
      {/* 1. Navigation & Hero - Clear value proposition */}
      <StickyNavigation />
      <Header />
      
      {/* 2. Story & How It Works - Builds trust and explains process */}
      <StorySection />
      
      {/* 3. App Preview - Show the product in action */}
      <Screenshots />
      
      {/* 4. Social Proof - Real results from real teachers */}
      {reviews.length > 0 && (
        <section aria-labelledby="testimonials-title" className="py-20 bg-gradient-to-b from-white to-[#F5F9FF] dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          {/* Enhanced background decorations */}
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#0FA0CE]/10 dark:bg-[#0FA0CE]/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-[#0FA0CE]/5 to-blue-500/5 dark:from-[#0FA0CE]/10 dark:to-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg">
                <span>⭐ Real Teacher Reviews</span>
              </div>
              <h2 id="testimonials-title" className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
                Why Teachers Choose iSchedulEDU
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-8">
                See what educators are saying about their experience with iSchedulEDU
              </p>
              
              {/* Focused social proof stats */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0FA0CE] mb-2">5.0★</div>
                  <div className="text-sm text-foreground/60">App Store Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Hundreds</div>
                  <div className="text-sm text-foreground/60">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2 min</div>
                  <div className="text-sm text-foreground/60">Setup Time</div>
                </div>
              </div>
              
              {import.meta.env.DEV && isLoadingReviews && (
                <span className="text-sm text-foreground/40 block mt-2">(Loading reviews...)</span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
          </div>
        </section>
      )}

      {/* 5. Pricing & Final CTA - Clear offer and action */}
      <Pricing />
      
      {/* 6. Footer */}
      <Footer />
    </main>
  );
};

export default Index;
