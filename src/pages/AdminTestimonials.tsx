import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import TestimonialCard from "@/components/TestimonialCard";

interface Testimonial {
  id: number;
  name: string;
  content: string;
  date: string;
}

const AdminTestimonials = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedTestimonials = JSON.parse(localStorage.getItem("testimonials") || "[]");
    setTestimonials(storedTestimonials);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add new testimonial
    const newTestimonial = {
      id: Date.now(),
      name,
      content,
      date: new Date().toISOString()
    };
    
    const updatedTestimonials = [...testimonials, newTestimonial];
    localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));
    setTestimonials(updatedTestimonials);
    
    toast({
      title: "Success",
      description: "Testimonial added successfully!",
    });
    
    setName("");
    setContent("");
  };

  const handleDelete = (id: number) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));
    setTestimonials(updatedTestimonials);
    
    toast({
      title: "Success",
      description: "Testimonial deleted successfully!",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Testimonials</h1>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Testimonial Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Add New Testimonial</h2>
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

          {/* Existing Testimonials */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Existing Testimonials</h2>
            <div className="space-y-4">
              {testimonials.length === 0 ? (
                <p className="text-gray-500">No testimonials yet.</p>
              ) : (
                testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="relative">
                    <TestimonialCard
                      name={testimonial.name}
                      content={testimonial.content}
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
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonials;
