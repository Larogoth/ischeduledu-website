import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Navigation = ({ baseUrl }: { baseUrl: string }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <img
          src={`${baseUrl}lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png`}
          alt="iSchedulEDU Logo"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default Navigation;