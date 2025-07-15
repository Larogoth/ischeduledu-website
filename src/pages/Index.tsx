

import Header from "@/components/home/Header";
import Pricing from "@/components/home/Pricing";
import Screenshots from "@/components/home/Screenshots";
import Footer from "@/components/home/Footer";
import StorySection from "@/components/home/StorySection";
import StickyNavigation from "@/components/home/StickyNavigation";
import ReviewsSection from "@/components/home/ReviewsSection";
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
      <ReviewsSection reviews={reviews} isLoadingReviews={isLoadingReviews} />

      {/* 5. Pricing & Final CTA - Clear offer and action */}
      <Pricing />
      
      {/* 6. Footer */}
      <Footer />
    </main>
  );
};

export default Index;
