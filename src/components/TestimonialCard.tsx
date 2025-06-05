
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
    <Card className="h-full">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
              }`}
            />
          ))}
        </div>
        <blockquote className="text-lg mb-4 text-gray-800">{content}</blockquote>
        <footer className="text-sm font-medium">
          <p className="text-gray-800">— {name}</p>
          {import.meta.env.DEV && (
            <p className="text-xs text-gray-600 mt-1">
              Source: {isAppStoreReview ? 'App Store Review' : 'Local Testimonial'}
            </p>
          )}
        </footer>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
