
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Download, Star, Users } from "lucide-react";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";
import TestimonialCard from "@/components/TestimonialCard";
import AppName from "@/components/AppName";
import Footer from "@/components/home/Footer";

const IndexAlt = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(fallbackTestimonials);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoadingReviews(true);
      try {
        const fetchedReviews = await getTestimonials();
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
    <div className="min-h-screen bg-white pt-14">
      {/* 1. Sticky navigation/offer */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
              alt="iSchedulEDU Logo"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-bold text-lg text-gray-900">iSchedulEDU</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Version A</span>
            </Link>
            
            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
            >
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <span>Download Now</span>
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Hero section */}
      <section className="bg-gradient-to-b from-[#E6F3FF] to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
              Create School Schedules In Seconds
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Stop wasting time calculating class periods. iSchedulEDU automatically generates perfect schedules for regular days or special events.
            </p>
            
            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity mb-10"
            >
              <img 
                src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                alt="Download iSchedulEDU on the App Store" 
                className="w-[245px] h-[82px] object-contain"
              />
            </a>

            <div className="relative rounded-xl overflow-hidden shadow-xl mx-auto max-w-sm md:max-w-lg">
              <img 
                src="/lovable-uploads/27066ff3-0092-4675-b437-60f4d60369d1.png" 
                alt="iSchedulEDU App Demo" 
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social proof logos */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center text-gray-600 mb-3">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-medium">Trusted by educators across the country</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 items-center text-gray-400">
              <p className="font-semibold text-gray-500">Over 2,000+ active users</p>
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-2 text-gray-600">App Store Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Relatable pain points */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Sound Familiar?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Spending hours on schedule calculations
              </h3>
              <p className="text-gray-600">
                You're spending valuable prep time manually calculating period times for early dismissals, assemblies, and other irregular days.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Coping with constant disruptions
              </h3>
              <p className="text-gray-600">
                Weather delays, special events, and testing days constantly disrupt your carefully planned schedule, requiring last-minute changes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Managing rotating schedules
              </h3>
              <p className="text-gray-600">
                Keeping track of A/B days or multi-week rotation schedules feels like you need a separate calendar just for your schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Easy-to-implement features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Simple Solutions for Better School Days
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            iSchedulEDU gives you the tools to handle any schedule change with confidence
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 h-fit">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Instant Schedule Generation
                </h3>
                <p className="text-gray-600">
                  Input your start and end times, and iSchedulEDU automatically calculates perfectly timed periods, handling special events like lunch and electives.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 h-fit">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  One-Touch Schedule Sharing
                </h3>
                <p className="text-gray-600">
                  Share your schedules instantly with colleagues and students via QR codes or text messages, keeping everyone in sync without confusion.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 h-fit">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Smart Rotation Management
                </h3>
                <p className="text-gray-600">
                  Easily manage A/B or complex rotating schedules with built-in calendar tracking that remembers which day comes next, even after breaks.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 bg-blue-100 rounded-full p-3 h-fit">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Timely Class Notifications
                </h3>
                <p className="text-gray-600">
                  Set automatic notifications for class end times, ensuring smooth transitions without constantly watching the clock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            What Educators Are Saying
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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

      {/* 7. Use cases */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How Educators Use iSchedulEDU
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Elementary School Teachers
              </h3>
              <p className="text-gray-600 mb-4">
                Create reliable daily routines and easily adjust for early dismissals, assemblies, and special activity days without disrupting educational flow.
              </p>
              <div className="flex items-center text-blue-600">
                <img 
                  src="/lovable-uploads/99aa0220-3f06-4237-97d0-1829aa8487b5.png" 
                  alt="Elementary School Schedule" 
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Middle & High School Administrators
              </h3>
              <p className="text-gray-600 mb-4">
                Manage complex block schedules, A/B rotations, and quickly communicate schedule changes to entire departments during testing or special events.
              </p>
              <div className="flex items-center text-blue-600">
                <img 
                  src="/lovable-uploads/900bfec1-1999-467d-872a-7be015674168.png" 
                  alt="High School Schedule" 
                  className="rounded-lg shadow-md w-full h-48 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Small, achievable wins */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            Real Results With iSchedulEDU
          </h2>
          <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Our users report tangible improvements in their daily teaching experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-500 font-bold text-4xl mb-2">85%</div>
              <p className="text-gray-700">Less time spent on schedule planning and adjustments</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-500 font-bold text-4xl mb-2">92%</div>
              <p className="text-gray-700">Report smoother transitions between classes and activities</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-blue-500 font-bold text-4xl mb-2">78%</div>
              <p className="text-gray-700">Reduced stress when dealing with unexpected schedule changes</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your School Day?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of educators who are saving time and reducing stress with iSchedulEDU
          </p>
          
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mb-8 hover:opacity-90 transition-opacity"
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 text-lg py-6">
              <Download className="mr-2 h-5 w-5" />
              <span>Download Now</span>
            </Button>
          </a>
          
          <p className="text-sm text-blue-200">
            Start with 4 Free Sessions • No Credit Card Required
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndexAlt;
