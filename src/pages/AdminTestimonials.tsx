import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, Star } from "lucide-react";
import TestimonialCard from "@/components/TestimonialCard";
import { supabase } from "@/integrations/supabase/client";
import Login from "@/components/Login";

interface Testimonial {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
  date: string;
}

const AdminTestimonials = () => {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(5);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const storedTestimonials = JSON.parse(localStorage.getItem("testimonials") || "[]");
    setTestimonials(storedTestimonials);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTestimonial = {
      id: Date.now(),
      title,
      name,
      content,
      stars,
      date: new Date().toISOString()
    };
    
    const updatedTestimonials = [...testimonials, newTestimonial];
    localStorage.setItem("testimonials", JSON.stringify(updatedTestimonials));
    setTestimonials(updatedTestimonials);
    
    toast({
      title: "Success",
      description: "Testimonial added successfully!",
    });
    
    setTitle("");
    setName("");
    setContent("");
    setStars(5);
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

  if (!session) {
    return <Login />;
  }

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
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonials;
