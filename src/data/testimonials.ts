export interface Testimonial {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
}

export const testimonials: Testimonial[] = [
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
