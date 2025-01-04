import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
import TestimonialList from "@/components/testimonials/TestimonialList";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: number;
  title: string;
  name: string;
  content: string;
  stars: number;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication status immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
        return;
      }
      setSession(session);
      checkAdminStatus(session.user.id);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/login');
        return;
      }
      setSession(session);
      checkAdminStatus(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminStatus = async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (!profile || profile.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    setIsAdmin(true);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      navigate('/login');
    }
  };

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setTestimonials(data || []);
  };

  useEffect(() => {
    if (isAdmin) {
      fetchTestimonials();
    }
  }, [isAdmin]);

  if (!session || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Testimonials</h1>
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Home
            </Button>
            <Button variant="destructive" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TestimonialForm onTestimonialAdded={fetchTestimonials} />
          <TestimonialList 
            testimonials={testimonials} 
            onTestimonialDeleted={fetchTestimonials} 
          />
        </div>
      </div>
    </div>
  );
};

export default AdminTestimonials;