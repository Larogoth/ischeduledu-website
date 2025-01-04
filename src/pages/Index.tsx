import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TestimonialCard from "@/components/TestimonialCard";
import { useEffect, useState } from "react";
import Features from "@/components/Features";
import { Download, Mail, X, Facebook } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
  created_at: string;
}

const Index = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const baseUrl = import.meta.env.MODE === 'development' ? '/' : '/ischeduledu-website/';

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials:', error);
        return;
      }

      setTestimonials(data || []);
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] to-white">
      <header className="container mx-auto px-4 py-24 text-center animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-[#0FA0CE] opacity-5 rounded-full blur-3xl transform -translate-y-1/2"></div>
          <img
            src={`${baseUrl}lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png`}
            alt="iSchedulEDU Logo"
            className="mx-auto w-32 h-32 mb-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
          iSchedulEDU
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
          Create abbreviated schedules for your school day quickly and easily
        </p>
        <Button
          size="lg"
          className="bg-[#0FA0CE] hover:bg-[#0D8CB6] text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          onClick={() => window.open("https://apps.apple.com/us/app/ischeduledu/id6504114850", "_blank")}
        >
          <Download className="mr-2" />
          Download on the App Store
        </Button>
      </header>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Try Before You Buy</h2>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <p className="text-xl mb-6 text-gray-700">
              iSchedulEDU is now free-to-try for 4 in-app sessions.
            </p>
            <p className="text-xl mb-6 text-gray-700">
              Once the trial ends, unlock the app forever for a small, one-time fee.
            </p>
            <p className="text-sm text-gray-500 italic">
              Note: Anyone who purchased the app prior to January 01, 2025 is considered a grandfathered user and can restore full access by clicking "Restore Purchases" within the app.
            </p>
          </div>
        </div>
      </section>

      <Features />

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">What Users Are Saying</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                  <TestimonialCard
                    title={testimonial.title}
                    name={testimonial.name}
                    content={testimonial.content}
                    stars={testimonial.stars}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Screenshots Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">See it in Action</h2>
          <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
            {[
              {
                src: `${baseUrl}lovable-uploads/6c266668-5642-4712-9338-9675b98e1a6d.png`,
                alt: "Schedule Input Screen"
              },
              {
                src: `${baseUrl}lovable-uploads/6a72f919-7ce6-40ea-9c79-6427f39d32ac.png`,
                alt: "Generated Schedule Screen"
              },
              {
                src: `${baseUrl}lovable-uploads/ad95bed2-74c4-4fde-8699-d7ab121a81fb.png`,
                alt: "Saved Schedules Screen"
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
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6">
            {/* Social Media Links */}
            <div className="flex space-x-6">
              <a
                href="https://x.com/ischeduledu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0FA0CE] transition-colors"
              >
                <X className="h-6 w-6" />
              </a>
              <a
                href="https://www.facebook.com/share/15dGQKa8ha/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0FA0CE] transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>

            {/* Contact Support Button */}
            <a
              href="mailto:ischeduledu@gmail.com"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-transparent border-white text-white hover:bg-white hover:text-gray-900 transition-colors h-10 px-4 py-2 border"
            >
              <Mail className="h-4 w-4" />
              Contact Support
            </a>

            {/* Copyright and Links */}
            <div className="text-center">
              <p className="mb-6 text-gray-300">© 2024 iSchedulEDU. All rights reserved.</p>
              <div className="flex justify-center gap-6">
                <Link to="/privacy-policy">
                  <Button variant="link" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </Button>
                </Link>
                <Link to="/faq">
                  <Button variant="link" className="text-gray-300 hover:text-white transition-colors">
                    Support
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
