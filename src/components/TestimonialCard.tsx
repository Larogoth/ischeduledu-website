
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
        <Quote className="h-8 w-8 text-app-muted mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-app-primary">{title}</h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < stars ? "fill-yellow-400 text-yellow-400" : "text-app-muted"
              }`}
            />
          ))}
        </div>
        <blockquote className="text-lg mb-4 text-app-secondary">{content}</blockquote>
        <footer className="text-sm font-medium">
          <p className="text-app-primary">— {name}</p>
          {import.meta.env.DEV && (
            <p className="text-xs text-app-muted mt-1">
              Source: {isAppStoreReview ? 'App Store Review' : 'Local Testimonial'}
            </p>
          )}
        </footer>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
