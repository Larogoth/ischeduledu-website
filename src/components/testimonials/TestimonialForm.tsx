import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TestimonialFormProps {
  onTestimonialAdded: () => void;
}

const TestimonialForm = ({ onTestimonialAdded }: TestimonialFormProps) => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(5);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('testimonials')
      .insert([{ title, name, content, stars }]);
    
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
      description: "Testimonial added successfully!",
    });
    
    setTitle("");
    setName("");
    setContent("");
    setStars(5);
    onTestimonialAdded();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Add New Testimonial</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Review Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter review title"
          />
        </div>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Reviewer Name
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter reviewer name"
          />
        </div>

        <div>
          <label htmlFor="stars" className="block text-sm font-medium mb-2">
            Rating (out of 5 stars)
          </label>
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-6 w-6 cursor-pointer ${
                  index < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setStars(index + 1)}
              />
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Review Content
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Enter review content"
            className="min-h-[150px]"
          />
        </div>
        
        <Button type="submit" className="w-full">
          Add Testimonial
        </Button>
      </form>
    </div>
  );
};

export default TestimonialForm;