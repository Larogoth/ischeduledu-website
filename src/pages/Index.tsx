
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AppName from "@/components/AppName";
import TestimonialCard from "@/components/TestimonialCard";
import StickyNavigation from "@/components/home/StickyNavigation";
import PainPoints from "@/components/home/PainPoints";
import Features from "@/components/home/Features";
import UseCases from "@/components/home/UseCases";
import Footer from "@/components/home/Footer";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
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
    <div className="min-h-screen bg-white">
      <StickyNavigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-[#E6F3FF] to-white">
        <div className="container mx-auto px-4 text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight font-euclid">
              Create School Schedules <span className="text-blue-600">In Minutes</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-xl mx-auto md:mx-0">
              iSchedulEDU helps teachers quickly create custom or abbreviated schedules for your school day without the hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label="Download iSchedulEDU on the App Store"
              >
                <img 
                  src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                  alt="Download iSchedulEDU on the App Store" 
                  className="w-[185px] h-[62px] object-contain"
                />
              </a>
              <p className="text-sm text-gray-600 self-end mb-2">4 Free Sessions Included</p>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#0FA0CE] opacity-5 rounded-full blur-3xl"></div>
              <img
                src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
                alt="iSchedulEDU App Preview"
                className="max-w-xs relative z-10"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="py-10 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600 mb-6">Trusted by educators from:</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-70">
            <img src="/lovable-uploads/ad95bed2-74c4-4fde-8699-d7ab121a81fb.png" alt="School District Logo" className="h-12 object-contain" />
            <img src="/lovable-uploads/b3edc48b-4c4c-4ccb-ba9e-876c17ee2cd0.png" alt="Education Association Logo" className="h-12 object-contain" />
            <img src="/lovable-uploads/bc8e3985-c051-4af2-a5fc-afcefeb6ddae.png" alt="Teacher's Network Logo" className="h-12 object-contain" />
          </div>
        </div>
      </section>
      
      {/* Pain Points */}
      <PainPoints />
      
      {/* Features */}
      <Features />
      
      {/* Testimonials */}
      {reviews.length > 0 && (
        <section aria-labelledby="testimonials-title" className="py-16 bg-gradient-to-b from-white to-[#F5F9FF]">
          <div className="container mx-auto px-4">
            <h2 id="testimonials-title" className="text-3xl font-bold text-center mb-4 text-gray-900">
              Real Results for Real Teachers
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              See how iSchedulEDU is transforming daily scheduling for educators around the world
            </p>
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
      
      {/* Use Cases */}
      <UseCases />
      
      {/* Final CTA */}
      <section className="py-20 bg-[#0FA0CE] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your School Day?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of teachers who are saving time and reducing stress with <AppName size="md" className="text-white" />.
          </p>
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400" 
              alt="Download iSchedulEDU on the App Store" 
              className="w-[185px] h-[62px] object-contain"
            />
          </a>
          <p className="mt-4 text-sm text-white/80">Start with 4 free sessions. No credit card required.</p>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
