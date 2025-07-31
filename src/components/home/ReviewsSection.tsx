
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
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>⭐ Real App Store Reviews</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Users Are Saying
          </h3>
          <p className="text-lg md:text-xl text-foreground/70">
            Don't just take our word for it - hear from real users of iSchedulEDU
          </p>
          {isLoadingReviews && (
            <span className="text-sm text-foreground/40 block mt-2">(Loading reviews...)</span>
          )}
        </div>
        
        {/* Mobile Carousel */}
        <div className="block md:hidden px-4">
          <div className="flex items-center justify-center w-full max-w-md mx-auto relative">
            {/* Left Arrow */}
            {reviews.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                className="z-20 bg-background border-border shadow-lg hover:bg-background/80 mr-2"
                onClick={goToPrev}
                style={{ minWidth: 36, minHeight: 36 }}
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </Button>
            )}
            {/* Carousel Container with preview */}
            <div className="overflow-hidden rounded-lg flex-1">
              <div 
                className="flex gap-4 transition-transform duration-500 ease-out"
                style={{ 
                  transform: `translateX(calc(-${currentIndex} * (85% + 1rem)))`,
                }}
              >
                {reviews.map((review, index) => (
                  <div 
                    key={review.id} 
                    className="flex-shrink-0 transition-all duration-300"
                    style={{ width: '85%' }}
                  >
                    <div className={`transition-all duration-300 ${
                      index === currentIndex 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-50 scale-95'
                    }`}>
                      <TestimonialCardB
                        title={review.title}
                        name={review.name}
                        content={review.content}
                        stars={review.stars}
                        isAppStoreReview={review.isAppStoreReview}
                        version={review.version}
                        location={review.location}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Arrow */}
            {reviews.length > 1 && (
              <Button
                variant="outline"
                size="icon"
                className="z-20 bg-background border-border shadow-lg hover:bg-background/80 ml-2"
                onClick={goToNext}
                style={{ minWidth: 36, minHeight: 36 }}
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </Button>
            )}
          </div>
          {/* Mobile Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-[#0FA0CE] scale-125" : "bg-gray-300"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-foreground/60 mt-4">
            {currentIndex + 1} of {reviews.length} reviews
          </p>
        </div>
        
        {/* Desktop Carousel */}
        <div className="hidden md:block">
          <div className="flex items-center justify-center max-w-6xl mx-auto px-4 relative">
            {/* Left Arrow */}
            {reviews.length > 2 && (
              <Button
                variant="outline"
                size="icon"
                className="z-20 bg-background border-border shadow-lg hover:bg-background/80 mr-4"
                onClick={goToPrev}
                style={{ minWidth: 40, minHeight: 40 }}
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </Button>
            )}
            {/* Carousel Container with preview - Shows 2.2 cards */}
            <div className="overflow-hidden rounded-lg flex-1">
              <div 
                className="flex gap-6 lg:gap-8 transition-transform duration-500 ease-out"
                style={{ 
                  transform: `translateX(calc(-${currentIndex} * (45% + 1.5rem)))`, // Show 2.2 cards with preview
                }}
              >
                {reviews.map((review, index) => (
                  <div 
                    key={review.id} 
                    className="flex-shrink-0 transition-all duration-300"
                    style={{ width: '45%' }}
                  >
                    <div className={`transition-all duration-300 ${
                      (index >= currentIndex && index < currentIndex + 2)
                        ? 'opacity-100 scale-100' 
                        : 'opacity-70 scale-95'
                    }`}>
                      <TestimonialCardB
                        title={review.title}
                        name={review.name}
                        content={review.content}
                        stars={review.stars}
                        isAppStoreReview={review.isAppStoreReview}
                        version={review.version}
                        location={review.location}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Right Arrow */}
            {reviews.length > 2 && (
              <Button
                variant="outline"
                size="icon"
                className="z-20 bg-background border-border shadow-lg hover:bg-background/80 ml-4"
                onClick={goToNext}
                style={{ minWidth: 40, minHeight: 40 }}
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </Button>
            )}
          </div>
          {/* Desktop Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-[#0FA0CE]" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-foreground/60 mt-4">
            Showing {Math.min(2, reviews.length - currentIndex)} of {reviews.length} reviews
          </p>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
