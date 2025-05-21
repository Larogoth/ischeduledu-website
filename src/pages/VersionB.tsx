
import TestimonialCard from "@/components/TestimonialCard";
import WhyTeachersChoose from "@/components/WhyTeachersChoose";
import Footer from "@/components/home/Footer";
import StickyNavigation from "@/components/home/StickyNavigation";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

const VersionB = () => {
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
      {/* Sticky Navigation */}
      <StickyNavigation />
      
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-10 md:pb-16 bg-gradient-to-b from-[#E6F3FF] to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Create Perfect School Schedules in Seconds
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6">
                The easiest way for teachers to create, manage, and share custom class schedules and abbreviated day plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full">
                    Download Now
                  </Button>
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <img 
                src="/lovable-uploads/iphone-generated.png"
                alt="iSchedulEDU App Interface" 
                className="mx-auto rounded-lg shadow-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Social Proof */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-lg text-gray-600 mb-6">Trusted by educators across the country</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-blue-600">4.8/5</p>
              <p className="text-sm text-gray-500">Average App Store Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-blue-600">2000+</p>
              <p className="text-sm text-gray-500">Happy Teachers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pain Points */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Problems We Solve</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Constantly Changing Schedules</h3>
              <p className="text-gray-700">No more struggling with last-minute schedule changes, assemblies, or special events that disrupt your teaching day.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Time-Consuming Manual Calculations</h3>
              <p className="text-gray-700">Stop wasting precious prep time calculating class periods for abbreviated schedules or A/B rotations.</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Schedule Sharing Difficulties</h3>
              <p className="text-gray-700">Eliminate the hassle of communicating schedule changes to students, substitutes, or colleagues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Solutions for Daily Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Custom Schedule Creator</h3>
              <p className="text-gray-700">Generate balanced class schedules in seconds. Simply enter your available time and number of periods.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">A/B Rotation Manager</h3>
              <p className="text-gray-700">Easily set up and track alternating day schedules without confusion.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">QR Sharing</h3>
              <p className="text-gray-700">Share your schedules instantly via QR code or text message with students, colleagues, or substitutes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      {reviews.length > 0 && (
        <section aria-labelledby="testimonials-title" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 id="testimonials-title" className="text-3xl font-bold text-center mb-12 text-gray-900">
              What Teachers Are Saying
              {import.meta.env.DEV && isLoadingReviews && (
                <span className="text-sm text-gray-400 block mt-2">(Loading reviews...)</span>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.slice(0, 3).map((review) => (
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

      {/* 6. Use Cases */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Teachers Use iSchedulEDU</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Elementary School Teachers</h3>
              <p className="text-gray-700">Create visual schedules for young learners, easily accommodate specials classes, and adjust for early dismissal days.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Middle & High School Teachers</h3>
              <p className="text-gray-700">Manage block scheduling, A/B rotations, and quickly adjust for special events and testing days.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Results Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">The iSchedulEDU Difference</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">85%</p>
              <p className="text-gray-700 mt-2">Less time spent on schedule planning</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">3x</p>
              <p className="text-gray-700 mt-2">Faster schedule adjustments for special events</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">100%</p>
              <p className="text-gray-700 mt-2">Accurate period distributions</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Final CTA */}
      <section className="py-16 bg-gradient-to-b from-[#E6F3FF] to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Simplify Your School Scheduling?</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Join thousands of teachers who are saving time and reducing stress with iSchedulEDU.
          </p>
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Download Now
            </Button>
          </a>
        </div>
      </section>

      <WhyTeachersChoose />
      <Footer />
    </div>
  );
};

export default VersionB;
