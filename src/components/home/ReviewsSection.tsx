
import TestimonialCardB from "@/components/TestimonialCardB";
import type { Testimonial } from "@/data/testimonials";

interface ReviewsSectionProps {
  reviews: Testimonial[];
  isLoadingReviews: boolean;
}

const ReviewsSection = ({ reviews, isLoadingReviews }: ReviewsSectionProps) => {
  if (reviews.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>⭐ Real App Store Reviews</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Teachers Are Saying
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it - hear from educators using iSchedulEDU daily
          </p>
          {import.meta.env.DEV && isLoadingReviews && (
            <span className="text-sm text-gray-400 block mt-2">(Loading reviews...)</span>
          )}
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
