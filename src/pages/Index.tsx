
import TestimonialCard from "@/components/TestimonialCard";
import WhyTeachersChoose from "@/components/WhyTeachersChoose";
import Header from "@/components/home/Header";
import Pricing from "@/components/home/Pricing";
import Screenshots from "@/components/home/Screenshots";
import Footer from "@/components/home/Footer";
import GenerationProcess from "@/components/home/GenerationProcess";
import StickyNavigation from "@/components/home/StickyNavigation";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect } from "react";
import type { Testimonial } from "@/data/testimonials";
import { Download, Users, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] pt-14 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-[#0FA0CE]/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2"></div>
      
      <StickyNavigation />
      <Header />
      
      {/* Pain Point Section - Emotional Clarity */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 border-y border-red-100">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Stop the Last-Minute Schedule Panic
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-red-500 text-4xl font-bold mb-2">😰</div>
                <h3 className="font-semibold text-gray-900 mb-2">The 7:30 AM Call</h3>
                <p className="text-gray-700">"We have a 2-hour delay today" - and you have 10 minutes to figure out new class times</p>
              </div>
              <div className="text-center">
                <div className="text-red-500 text-4xl font-bold mb-2">⏰</div>
                <h3 className="font-semibold text-gray-900 mb-2">Manual Math Stress</h3>
                <p className="text-gray-700">Calculating period times while coffee is still brewing and students are asking questions</p>
              </div>
              <div className="text-center">
                <div className="text-red-500 text-4xl font-bold mb-2">😵</div>
                <h3 className="font-semibold text-gray-900 mb-2">Everyone's Confused</h3>
                <p className="text-gray-700">Students, subs, and colleagues all asking "What time is Period 3?"</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-[#0FA0CE]">
              <p className="text-lg text-gray-700 font-medium">
                <strong>Sound familiar?</strong> You're not alone. Over 300 teachers have already escaped this chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Preview - Visual Trust */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <CheckCircle className="w-4 h-4" />
                <span>The 30-Second Solution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                From Panic to Peace in 30 Seconds
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Get the delay announcement</h3>
                    <p className="text-gray-700">7:30 AM: "2-hour delay today"</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Open iSchedulEDU</h3>
                    <p className="text-gray-700">Tap the app, enter new start time</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-[#0FA0CE]/10 rounded-lg">
                  <div className="bg-[#0FA0CE] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Share with everyone</h3>
                    <p className="text-gray-700">QR code instantly sends schedule to all staff</p>
                  </div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl border border-yellow-300">
                  <p className="text-yellow-800 font-semibold text-center">
                    ✨ Coffee is still hot, and everyone knows the new schedule
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#0FA0CE] to-blue-600 rounded-2xl blur-xl opacity-30"></div>
                  <img
                    src="/lovable-uploads/99aa0220-3f06-4237-97d0-1829aa8487b5.png"
                    alt="iSchedulEDU solving your scheduling problems instantly"
                    className="relative z-10 w-80 h-auto rounded-2xl shadow-2xl"
                    width="320"
                    height="693"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Urgency - Conversion Cues */}
      <section className="py-16 bg-gradient-to-r from-[#0FA0CE] to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Join 300+ Teachers Who Never Panic Anymore
              </h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">300+</div>
                  <div className="text-blue-100">Teachers Using Daily</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">5.0★</div>
                  <div className="text-blue-100">Perfect App Store Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">0</div>
                  <div className="text-blue-100">Scheduling Panic Attacks</div>
                </div>
              </div>
              
              <div className="bg-white/20 rounded-xl p-6 mb-8">
                <p className="text-white text-lg font-medium mb-4">
                  "I used to dread delay announcements. Now I actually smile when I hear them because I know I'll have the new schedule ready before my first cup of coffee is finished."
                </p>
                <p className="text-blue-200">— Sarah M., High School Teacher</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full text-lg font-bold animate-pulse">
                <span>🎉 Start with 4 FREE schedules</span>
              </div>
              <p className="text-blue-100 text-lg">No credit card • No risk • Instant download</p>
            </div>

            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl mb-8"
            >
              <img 
                src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400" 
                alt="Download iSchedulEDU on the App Store" 
                className="w-[300px] h-[100px] object-contain"
                width="300"
                height="100"
              />
            </a>
            
            <div className="text-blue-100 text-sm">
              ⚡ Downloaded and running in under 60 seconds
            </div>
          </div>
        </div>
      </section>

      <GenerationProcess />
      <Pricing />
      <WhyTeachersChoose />
      
      {reviews.length > 0 && (
        <section aria-labelledby="testimonials-title" className="py-16 bg-gradient-to-b from-white to-[#F8FBFF] relative">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#0FA0CE]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <span>⭐ Real Teacher Reviews</span>
              </div>
              <h2 id="testimonials-title" className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                What Teachers Are Saying
              </h2>
              <p className="text-xl text-gray-600">
                Don't just take our word for it - see why educators love iSchedulEDU
              </p>
              {import.meta.env.DEV && isLoadingReviews && (
                <span className="text-sm text-gray-400 block mt-2">(Loading reviews...)</span>
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
