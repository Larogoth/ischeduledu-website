import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TestimonialCard from "@/components/TestimonialCard";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Features from "@/components/Features";
import { Download } from "lucide-react";

interface Testimonial {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
  date: string;
}

const Index = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const baseUrl = import.meta.env.MODE === 'development' ? '/' : '/ischeduledu-website/';

  useEffect(() => {
    const storedTestimonials = JSON.parse(localStorage.getItem("testimonials") || "[]");
    setTestimonials(storedTestimonials);
  }, []);

  return (
    <div className="min-h-screen bg-[#E6F3FF]">
      <Navigation baseUrl={baseUrl} />

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <img
          src={`${baseUrl}lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png`}
          alt="iSchedulEDU Logo"
          className="mx-auto w-32 h-32 mb-8 rounded-full"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          iSchedulEDU
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Create abbreviated schedules for your school day quickly and easily
        </p>
        <Button
          size="lg"
          className="bg-[#0FA0CE] hover:bg-[#0D8CB6] text-white px-8 py-6 text-lg"
          onClick={() => window.open("https://apps.apple.com/us/app/ischeduledu/id6504114850", "_blank")}
        >
          <Download className="mr-2" />
          Download on the App Store
        </Button>
      </header>

      {/* Pricing Section */}
      <section className="bg-[#F5F9FF] py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Try Before You Buy</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-6 shadow-md">
            <p className="text-lg mb-4">
              iSchedulEDU is now free-to-try for 4 in-app sessions.
            </p>
            <p className="text-lg mb-4">
              Once the trial ends, unlock the app forever for a small, one-time fee.
            </p>
            <p className="text-sm text-gray-600">
              Note: Anyone who purchased the app prior to January 01, 2025 is considered a grandfathered user and can restore full access by clicking "Restore Purchases" within the app.
            </p>
          </div>
        </div>
      </section>

      <Features />

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Users Are Saying</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  title={testimonial.title}
                  name={testimonial.name}
                  content={testimonial.content}
                  stars={testimonial.stars}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Screenshots Section */}
      <section className="py-16 bg-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">See it in Action</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <img
              src={`${baseUrl}lovable-uploads/6c266668-5642-4712-9338-9675b98e1a6d.png`}
              alt="Schedule Input Screen"
              className="w-64 rounded-xl shadow-lg"
            />
            <img
              src={`${baseUrl}lovable-uploads/6a72f919-7ce6-40ea-9c79-6427f39d32ac.png`}
              alt="Generated Schedule Screen"
              className="w-64 rounded-xl shadow-lg"
            />
            <img
              src={`${baseUrl}lovable-uploads/ad95bed2-74c4-4fde-8699-d7ab121a81fb.png`}
              alt="Saved Schedules Screen"
              className="w-64 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2024 iSchedulEDU. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <Link to="/privacy-policy">
              <Button variant="link" className="text-white">
                Privacy Policy
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="link" className="text-white">
                Support
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;