
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
    console.log("🎯 Starting getTestimonials function...");
    console.log("🎯 MINIMUM_STARS:", MINIMUM_STARS);
    
    const appStoreReviews = await fetchAppStoreReviews();
    console.log("📋 Raw app store reviews received:", appStoreReviews);
    console.log("📋 Number of raw reviews:", appStoreReviews.length);
    
    const processedAppStoreReviews = appStoreReviews
      .filter(review => {
        const meetsMinimum = review.stars >= MINIMUM_STARS;
        console.log(`⭐ Review "${review.title}" has ${review.stars} stars, meets minimum (${MINIMUM_STARS}):`, meetsMinimum);
        return meetsMinimum;
      })
      .map(review => ({
        ...review,
        isAppStoreReview: true
      }));
    
    console.log("✅ Filtered app store reviews (4+ stars):", processedAppStoreReviews);
    console.log("📊 Number of filtered reviews:", processedAppStoreReviews.length);
    
    const result = processedAppStoreReviews.length > 0 ? processedAppStoreReviews : fallbackTestimonials;
    console.log("🎯 Final result (using App Store or fallback):", processedAppStoreReviews.length > 0 ? "APP STORE REVIEWS" : "FALLBACK TESTIMONIALS");
    console.log("📝 Final testimonials:", result);
    
    return result;
  } catch (error) {
    console.error("❌ Error getting testimonials:", error);
    console.log("🔄 Falling back to hardcoded testimonials");
    return fallbackTestimonials;
  }
};

export { fallbackTestimonials as testimonials };
