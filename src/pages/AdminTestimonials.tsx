import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const AdminTestimonials = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get existing testimonials from localStorage
    const existingTestimonials = JSON.parse(localStorage.getItem("testimonials") || "[]");
    
    // Add new testimonial
    const newTestimonial = {
      id: Date.now(),
      name,
      content,
      date: new Date().toISOString()
    };
    
    // Save updated testimonials
    localStorage.setItem("testimonials", JSON.stringify([...existingTestimonials, newTestimonial]));
    
    // Show success message
    toast({
      title: "Success",
      description: "Testimonial added successfully!",
    });
    
    // Clear form
    setName("");
    setContent("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Add Testimonial</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
    </div>
  );
};

export default AdminTestimonials;