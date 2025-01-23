import { fetchAppStoreReviews } from "@/utils/appStoreReviews";

export interface Testimonial {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
}

// Keeping the original testimonials as fallback
const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    title: "Easy and Helpful",
    name: "momma30000000",
    content: "The app is so easy to use and so helpful to instantly create abbreviated schedules in a few taps!  It would be helpful for all educators!",
    stars: 5
  },
  {
    id: 2,
    title: "So useful",
    name: "Llos123",
    content: "This is going to make schedule modifications so easy!",
    stars: 5
  }
];

export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const appStoreReviews = await fetchAppStoreReviews();
    return appStoreReviews.length > 0 ? appStoreReviews : fallbackTestimonials;
  } catch (error) {
    console.error("Error getting testimonials:", error);
    return fallbackTestimonials;
  }
};

export { fallbackTestimonials as testimonials };
