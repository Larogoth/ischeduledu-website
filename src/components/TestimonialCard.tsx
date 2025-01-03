import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  content: string;
}

const TestimonialCard = ({ name, content }: TestimonialCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <Quote className="h-8 w-8 text-gray-400 mb-4" />
        <blockquote className="text-lg mb-4">{content}</blockquote>
        <footer className="text-sm font-medium text-gray-600">
          — {name}
        </footer>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;