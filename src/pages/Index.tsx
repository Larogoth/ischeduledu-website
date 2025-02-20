
import TestimonialCard from "@/components/TestimonialCard";
import WhyTeachersChoose from "@/components/WhyTeachersChoose";
import Header from "@/components/home/Header";
import Pricing from "@/components/home/Pricing";
import Screenshots from "@/components/home/Screenshots";
import Footer from "@/components/home/Footer";
import GenerationProcess from "@/components/home/GenerationProcess";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

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
    <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] to-white">
      <Header />
      <GenerationProcess />
      <Pricing />
      <WhyTeachersChoose />
      
      {reviews.length > 0 && (
        <section aria-labelledby="testimonials-title" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 id="testimonials-title" className="text-4xl font-bold text-center mb-16 text-gray-900">
              What Users Are Saying
              {import.meta.env.DEV && isLoadingReviews && (
                <span className="text-sm text-gray-400 block mt-2">(Loading reviews...)</span>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="transform hover:-translate-y-2 transition-transform duration-300">
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

      <Screenshots />
      <Footer />
    </div>
  );
};

export default Index;
