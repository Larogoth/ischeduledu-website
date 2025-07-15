

import Header from "@/components/home/HeaderB";
import TrustSection from "@/components/home/TrustSection";
import FeaturesHighlight from "@/components/home/FeaturesHighlight";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ReviewsSection from "@/components/home/ReviewsSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/home/Footer";
import StickyNavigation from "@/components/home/StickyNavigation";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

const IndexB = () => {
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
    <div className="min-h-screen bg-white pt-14 relative overflow-hidden">
      <StickyNavigation />
      <Header />
      <TrustSection />
      <FeaturesHighlight />
      <WhyChooseUs />
      <ReviewsSection reviews={reviews} isLoadingReviews={isLoadingReviews} />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default IndexB;
