
import { fetchAppStoreReviews } from "@/utils/appStoreReviews";

export interface Testimonial {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
  isAppStoreReview?: boolean;
}

// Keeping the original testimonials as fallback
const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    title: "Easy and Helpful",
    name: "momma30000000",
    content: "The app is so easy to use and so helpful to instantly create abbreviated schedules in a few taps!  It would be helpful for all educators!",
    stars: 5,
    isAppStoreReview: false
  },
  {
    id: 2,
    title: "So useful",
    name: "Llos123",
    content: "This is going to make schedule modifications so easy!",
    stars: 5,
    isAppStoreReview: false
  }
];

const MINIMUM_STARS = 4; // Only show reviews with 4 or more stars

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const appStoreReviews = await fetchAppStoreReviews();
    const processedAppStoreReviews = appStoreReviews
      .filter(review => review.stars >= MINIMUM_STARS) // Filter reviews by minimum stars
      .map(review => ({
        ...review,
        isAppStoreReview: true
      }));
    
    return processedAppStoreReviews.length > 0 ? processedAppStoreReviews : fallbackTestimonials;
  } catch (error) {
    console.error("Error getting testimonials:", error);
    return fallbackTestimonials;
  }
};

export { fallbackTestimonials as testimonials };
