import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/TestimonialCard";
import Features from "@/components/Features";
import { Download, Mail, Twitter, Facebook } from "lucide-react";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

const Index = () => {
  const baseUrl = import.meta.env.MODE === 'development' ? '/' : '/ischeduledu-website/';
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
    <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] to-white">
      <main>
        <header className="container mx-auto px-4 py-24 text-center animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 bg-[#0FA0CE] opacity-5 rounded-full blur-3xl transform -translate-y-1/2"></div>
            <img
              src={`${baseUrl}lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png`}
              alt="iSchedulEDU Logo - School Schedule Generator App"
              className="mx-auto w-32 h-32 mb-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            iSchedulEDU
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Create abbreviated schedules for your school day quickly and easily
          </p>
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
              alt="Download on the App Store" 
              className="w-[245px] h-[82px] object-contain"
            />
          </a>
        </header>

        <section aria-labelledby="pricing-title" className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
          <div className="container mx-auto px-4 text-center">
            <h2 id="pricing-title" className="text-4xl font-bold mb-6 text-gray-900">Risk-Free Trial: Experience the Power of iSchedulEDU</h2>
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="space-y-6">
                <div className="text-2xl font-bold text-blue-600">
                  <span>4 Free Sessions to Transform Your Scheduling</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="text-left space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">How It Helps You:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Save hours of manual schedule creation
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Eliminate scheduling mistakes
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        Share schedules instantly with staff
                      </li>
                    </ul>
                  </div>
                  
                  <div className="text-left space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">Our Promise:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">→</span>
                        Focus on teaching, not scheduling
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">→</span>
                        Simple one-time purchase after trial
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">→</span>
                        Lifetime access - no subscriptions
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 italic">
                    Note: Early adopters who purchased before January 01, 2025 have lifetime access - restore your purchase anytime through the app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Features />

        {reviews.length > 0 && (
          <section aria-labelledby="testimonials-title" className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 id="testimonials-title" className="text-4xl font-bold text-center mb-16 text-gray-900">
                What Users Are Saying
                {import.meta.env.DEV && isLoadingReviews && (
                  <span className="text-sm text-gray-400 block mt-2">(Loading reviews...)</span>
                )}
              </h2>
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

        <section aria-labelledby="screenshots-title" className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
          <div className="container mx-auto px-4">
            <h2 id="screenshots-title" className="text-4xl font-bold text-center mb-16 text-gray-900">See it in Action</h2>
            <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
              {[
                {
                  src: `${baseUrl}lovable-uploads/iphone-input.png`,
                  alt: "iSchedulEDU Schedule Input Screen - Create your school schedule"
                },
                {
                  src: `${baseUrl}lovable-uploads/iphone-generated.png`,
                  alt: "iSchedulEDU Generated Schedule Screen - View your generated schedule"
                },
                {
                  src: `${baseUrl}lovable-uploads/iphone-saved.png`,
                  alt: "iSchedulEDU Saved Schedules Screen - Access your saved schedules"
                }
              ].map((image, index) => (
                <div
                  key={index}
                  className="transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl rounded-xl"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-64 rounded-xl shadow-lg"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12" role="contentinfo">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            <nav className="flex space-x-6" aria-label="Social media links">
              <a
                href="https://x.com/ischeduledu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0FA0CE] transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/share/15dGQKa8ha/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0FA0CE] transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </nav>

            <a
              href="mailto:ischeduledu@gmail.com"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-colors h-10 px-4 py-2 border"
              aria-label="Contact Support via Email"
            >
              <Mail className="h-4 w-4" />
              Contact Support
            </a>

            <div className="text-center">
              <p className="mb-6 text-gray-300">© 2024 iSchedulEDU. All rights reserved.</p>
              <nav className="flex justify-center gap-6" aria-label="Footer navigation">
                <Button variant="link" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Button>
                <Button variant="link" className="text-gray-300 hover:text-white transition-colors">
                  Support
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
