
import TestimonialCard from "@/components/TestimonialCard";
import WhyTeachersChoose from "@/components/WhyTeachersChoose";
import Header from "@/components/home/Header";
import Pricing from "@/components/home/Pricing";
import Screenshots from "@/components/home/Screenshots";
import Footer from "@/components/home/Footer";
import GenerationProcess from "@/components/home/GenerationProcess";
import StickyNavigation from "@/components/home/StickyNavigation";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/data/testimonials";
import { Download, Users, Clock } from "lucide-react";

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
    <div className="min-h-screen bg-white pt-14 relative overflow-hidden">
      {/* 60% - Dominant neutral backgrounds with subtle accents */}
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-slate-50 rounded-full blur-3xl -translate-x-1/2 opacity-30"></div>
      <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl translate-x-1/2 opacity-20"></div>
      
      <StickyNavigation />
      <Header />
      <GenerationProcess />
      
      {/* Enhanced Call-to-Action Section - 10% accent color for maximum conversion */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Save Hours Every Week?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Join the hundreds of teachers who've already transformed their scheduling workflow
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center gap-3 text-white">
                <Users className="w-6 h-6 text-orange-200" />
                <span className="text-lg font-semibold">Hundreds of Teachers</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Clock className="w-6 h-6 text-orange-200" />
                <span className="text-lg font-semibold">Hours Saved Weekly</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Download className="w-6 h-6 text-orange-200" />
                <span className="text-lg font-semibold">4 Free Sessions</span>
              </div>
            </div>

            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              <img 
                src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400" 
                alt="Download iSchedulEDU on the App Store" 
                className="w-[300px] h-[100px] object-contain"
                width="300"
                height="100"
              />
            </a>
          </div>
        </div>
      </section>

      <Pricing />
      <WhyTeachersChoose />
      
      {/* 30% secondary color for testimonials section */}
      {reviews.length > 0 && (
        <section aria-labelledby="testimonials-title" className="py-16 bg-gradient-to-b from-[#0FA0CE]/5 to-[#0FA0CE]/10 relative">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#0FA0CE]/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-[#0FA0CE]/15 rounded-full blur-xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <span>⭐ Real Teacher Reviews</span>
              </div>
              <h2 id="testimonials-title" className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                What Teachers Are Saying
              </h2>
              <p className="text-xl text-gray-700">
                Don't just take our word for it - see why educators love iSchedulEDU
              </p>
              {import.meta.env.DEV && isLoadingReviews && (
                <span className="text-sm text-gray-500 block mt-2">(Loading reviews...)</span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reviews.map((review) => (
                <TestimonialCard
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
      )}

      <Screenshots />
      <Footer />
    </div>
  );
};

export default Index;
