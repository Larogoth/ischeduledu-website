import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import TestimonialCard from "@/components/TestimonialCard";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
}

interface TestimonialListProps {
  testimonials: Testimonial[];
  onTestimonialDeleted: () => void;
}

const TestimonialList = ({ testimonials, onTestimonialDeleted }: TestimonialListProps) => {
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Success",
      description: "Testimonial deleted successfully!",
    });
    
    onTestimonialDeleted();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Existing Testimonials</h2>
      <div className="space-y-4">
        {testimonials.length === 0 ? (
          <p className="text-gray-500">No testimonials yet.</p>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative">
              <TestimonialCard
                title={testimonial.title}
                name={testimonial.name}
                content={testimonial.content}
                stars={testimonial.stars}
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => handleDelete(testimonial.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialList;