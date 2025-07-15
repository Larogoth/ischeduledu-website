
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCardB from "@/components/TestimonialCardB";
import type { Testimonial } from "@/data/testimonials";
import { Button } from "@/components/ui/button";

interface ReviewsSectionProps {
  reviews: Testimonial[];
  isLoadingReviews: boolean;
}

const ReviewsSection = ({ reviews, isLoadingReviews }: ReviewsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (reviews.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>⭐ Real App Store Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Teachers Are Saying
          </h2>
          <p className="text-lg md:text-xl text-foreground/70">
            Don't just take our word for it - hear from educators using iSchedulEDU daily
          </p>
          {isLoadingReviews && (
            <span className="text-sm text-foreground/40 block mt-2">(Loading reviews...)</span>
          )}
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex gap-3 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 87}%)` }}
              >
                {reviews.map((review, index) => (
                  <div 
                    key={review.id} 
                    className={`w-[87%] flex-shrink-0 pl-4 pr-1 transition-all duration-300 ${
                      index === currentIndex 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-60 scale-95'
                    }`}
                  >
                    <TestimonialCardB
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
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg border-gray-200"
              onClick={goToPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-lg border-gray-200"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#0FA0CE] scale-125" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
          
          {/* Review counter */}
          <p className="text-center text-sm text-foreground/60 mt-4">
            {currentIndex + 1} of {reviews.length} reviews
          </p>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.slice(0, 6).map((review) => (
            <TestimonialCardB
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
  );
};

export default ReviewsSection;
