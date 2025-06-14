
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface TestimonialCardProps {
  title: string;
  name: string;
  content: string;
  stars: number;
  isAppStoreReview?: boolean;
}

const TestimonialCard = ({ title, name, content, stars, isAppStoreReview }: TestimonialCardProps) => {
  return (
    <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 hover:border-[#0FA0CE]/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0FA0CE] to-blue-600"></div>
      <CardContent className="pt-8 pb-6 px-6">
        <div className="flex justify-between items-start mb-6">
          <Quote className="h-8 w-8 text-[#0FA0CE] opacity-80" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <blockquote className="text-gray-700 mb-6 leading-relaxed font-medium italic">
          "{content}"
        </blockquote>
        
        <footer className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-900">— {name}</p>
            {isAppStoreReview && (
              <span className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                App Store ⭐
              </span>
            )}
          </div>
          {import.meta.env.DEV && (
            <p className="text-xs text-gray-500 mt-2">
              Source: {isAppStoreReview ? 'App Store Review' : 'Local Testimonial'}
            </p>
          )}
        </footer>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
