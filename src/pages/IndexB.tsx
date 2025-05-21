
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/TestimonialCard";
import Footer from "@/components/home/Footer";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";
import { Check, ChevronDown, MessageSquare, Award, FileText } from "lucide-react";
import AppName from "@/components/AppName";

// Navigation component specific to Version B
const StickyNavigationB = () => {
  return (
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
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">Version A</Link>
          <Link to="/version-b" className="text-sm font-bold text-blue-600">Version B</Link>
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
  );
};

// Hero Section
const Hero = () => {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-[#E6F3FF] to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Custom School Schedules in Seconds
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Create abbreviated or custom schedules for your school day quickly and easily
            </p>
            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600">Trusted by teachers nationwide</span>
            </div>
            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mb-8 inline-block"
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-base px-6 py-6 h-auto">
                Download Now
              </Button>
            </a>
          </div>
          <div className="flex-1 relative">
            <div className="w-full max-w-md mx-auto bg-black/5 rounded-xl p-2 shadow-lg">
              <img
                src="/lovable-uploads/28317119-fd83-41b2-b877-3b195a794b2a.png"
                alt="iSchedulEDU App Interface"
                className="w-full rounded-lg shadow-inner"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-blue-600/80 flex items-center justify-center">
                  <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Social Proof
const SocialProof = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-gray-600 mb-8">Trusted by educators across the country</h3>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-400 font-medium">School 1</span>
          </div>
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-400 font-medium">School 2</span>
          </div>
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-400 font-medium">School 3</span>
          </div>
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-gray-400 font-medium">School 4</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Pain Points
const PainPoints = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Common Scheduling Challenges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <MessageSquare className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Last-Minute Schedule Changes</h3>
            <p className="text-gray-600">
              Weather delays, assemblies, and special events constantly disrupt your carefully planned day.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <MessageSquare className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Time-Consuming Calculations</h3>
            <p className="text-gray-600">
              Manually recalculating class times for abbreviated schedules takes valuable preparation time away.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <MessageSquare className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Communication Breakdowns</h3>
            <p className="text-gray-600">
              Ensuring everyone has the latest schedule changes is frustrating and prone to errors.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Features
const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Simple Solutions for Busy Educators</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          iSchedulEDU streamlines your scheduling process with these easy-to-use features
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-blue-600" />
              </span>
              Quick Schedule Generation
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Create abbreviated schedules in seconds</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Equal class time distribution</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Preserve essential periods like lunch</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-blue-600" />
              </span>
              Seamless Sharing
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Share via QR code or text</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Keep colleagues and students updated</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Simple instructions for substitutes</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="bg-blue-100 p-2 rounded-full mr-3">
                <Check className="h-5 w-5 text-blue-600" />
              </span>
              Smart Notifications
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Optional alerts for class transitions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Customizable notification settings</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Never lose track of time again</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button className="bg-blue-600 hover:bg-blue-700">
              Download Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

// Testimonials
const TestimonialSection = ({ testimonials }: { testimonials: Testimonial[] }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Success Stories</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          See how iSchedulEDU has transformed the way educators manage their day
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.slice(0, 2).map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
              <FileText className="h-6 w-6 text-blue-500 mb-4" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`h-4 w-4 ${
                      index < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <h3 className="text-xl font-semibold mb-2">{testimonial.title}</h3>
              <blockquote className="text-gray-600 mb-6 italic">"{testimonial.content}"</blockquote>
              <p className="text-gray-800 font-medium">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Use Cases
const UseCases = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">How Educators Use iSchedulEDU</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Real solutions for real classroom scenarios
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img 
                src="/lovable-uploads/53195535-6434-4fc8-abce-a78ac1dc6f99.png" 
                alt="Daily Timeline View" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Early Dismissal Days</h3>
              <p className="text-gray-600">
                Quickly adjust schedules for weather-related early dismissals while keeping class times proportional.
              </p>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img 
                src="/lovable-uploads/900bfec1-1999-467d-872a-7be015674168.png" 
                alt="Block Schedule Management" 
                className="object-cover w-full h-full" 
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Block Schedule Management</h3>
              <p className="text-gray-600">
                Easily track rotating A/B schedules and manage block periods with automatic calculations.
              </p>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
              <img 
                src="/lovable-uploads/75200545-4ea3-40be-90f7-7448e464ef66.png" 
                alt="Schedule Alerts" 
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Assembly & Event Days</h3>
              <p className="text-gray-600">
                Seamlessly incorporate special events into your daily schedule with automatic notifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Results Section
const ResultsSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Real Results for Teachers</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Small changes that make a big difference in your classroom
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Award className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Save 30+ Minutes</h3>
            <p className="text-gray-600">
              Eliminate manual schedule calculations and reclaim your planning time with automated scheduling.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Award className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Reduce Stress</h3>
            <p className="text-gray-600">
              No more last-minute schedule scrambles when unexpected changes occur. Always be prepared.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Award className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Start Free</h3>
            <p className="text-gray-600">
              Begin with 4 free sessions and see how iSchedulEDU transforms your classroom management.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Final CTA
const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your school scheduling?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of educators who are saving time and reducing stress with iSchedulEDU's smart scheduling solutions.
          </p>
          
          <div className="mb-8">
            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto shadow-lg">
                Download Now
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
          
          <p className="text-sm opacity-80 max-w-md mx-auto">
            Start with 4 free sessions. Early adopters who purchased before January 01, 2025 have lifetime access.
          </p>
        </div>
      </div>
    </section>
  );
};

// Main Page Component
const IndexB = () => {
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
    <div className="min-h-screen pt-16">
      <StickyNavigationB />
      <Hero />
      <SocialProof />
      <PainPoints />
      <Features />
      <TestimonialSection testimonials={reviews} />
      <UseCases />
      <ResultsSection />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default IndexB;
