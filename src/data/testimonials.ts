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
    title: "Great App for Teachers",
    name: "Sarah Johnson",
    content: "This app has made creating schedules so much easier. It's intuitive and saves me so much time!",
    stars: 5
  },
  {
    id: 2,
    title: "Perfect for School Administration",
    name: "Michael Chen",
    content: "We use iSchedulEDU for all our special schedules. It's been a game-changer for our staff.",
    stars: 5
  },
  {
    id: 3,
    title: "Highly Recommended",
    name: "Emily Rodriguez",
    content: "Simple to use and very reliable. Exactly what we needed for our school.",
    stars: 4
  }
];