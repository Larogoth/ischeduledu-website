
export interface Testimonial {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
  isAppStoreReview?: boolean;
  version?: string;
  location?: string;
}

// Hardcoded App Store reviews for better AEO, SEO, and GEO
const hardcodedReviews: Testimonial[] = [
  {
    id: 1,
    title: "So useful",
    name: "Llos123",
    content: "This is going to make schedule modifications so easy!",
    stars: 5,
    isAppStoreReview: true,
    version: "1.0.5",
    location: "United States"
  },
  {
    id: 2,
    title: "Easy and Helpful",
    name: "momma30000000",
    content: "The app is so easy to use and so helpful to instantly create abbreviated schedules in a few taps! It would be helpful for all educators!",
    stars: 5,
    isAppStoreReview: true,
    version: "1.2.24",
    location: "United States"
  },
  {
    id: 3,
    title: "Excellent!",
    name: "Brooke0315w",
    content: "As a teacher, schedule disruptions are inevitable—whether it's an assembly, a special program, or testing, something always seems to throw off our regular routine. I would normally manually adjust our schedule on paper, making sure time was divided equally among four classes. But I can do it much more quickly with the app. The interface is user-friendly, allowing me to quickly input available time and the number of classes, and it automatically generates an alternate schedule that makes sense for everyone. I highly recommend for teachers juggling multiple classes and frequent schedule changes!",
    stars: 5,
    isAppStoreReview: true,
    version: "1.6.1",
    location: "United States"
  }
];

export const getTestimonials = async (): Promise<Testimonial[]> => {
  // Return hardcoded reviews immediately for better performance and SEO
  return hardcodedReviews;
};

export { hardcodedReviews as testimonials };
