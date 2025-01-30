import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/TestimonialCard";
import Features from "@/components/Features";
import { Download, Mail, Twitter, Facebook, CheckCircle2 } from "lucide-react";
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
          
          {/* Problem Statement */}
          <h2 className="text-2xl text-red-600 font-semibold mb-4">
            Tired of Spending Hours Creating School Schedules?
          </h2>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
            Create Perfect School Schedules in Minutes, Not Hours
          </h1>
          
          {/* Value Proposition */}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            iSchedulEDU helps educators save 3+ hours per week on schedule management while reducing scheduling errors by 95%
          </p>

          {/* Value Stack */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" />
                <span>Create any schedule in under 2 minutes</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" />
                <span>Automatic class duration calculations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" />
                <span>Share instantly with staff & students</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" />
                <span>Never miss a class transition</span>
              </div>
            </div>
          </div>

          {/* Risk Reversal + CTA */}
          <div className="bg-blue-50 p-8 rounded-2xl mb-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Try It Free - No Risk!</h3>
            <p className="text-lg mb-6">Get 4 complete sessions to test every feature. No credit card required.</p>
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
          </div>
        </header>

        {/* Social Proof Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Trusted by 1000+ Educators</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-4xl font-bold text-blue-600 mb-2">3+ hrs</h3>
                <p className="text-gray-600">Saved per week on scheduling</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-4xl font-bold text-blue-600 mb-2">95%</h3>
                <p className="text-gray-600">Reduction in scheduling errors</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-4xl font-bold text-blue-600 mb-2">4.8/5</h3>
                <p className="text-gray-600">Average App Store rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Keep existing Features section */}
        <Features />

        {/* Keep existing Testimonials section */}
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

        {/* Keep existing Screenshots section */}
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

      {/* Keep existing Footer */}
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
