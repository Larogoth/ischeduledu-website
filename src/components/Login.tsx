import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#E6F3FF] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <img
          src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
          alt="iSchedulEDU Logo"
          className="mx-auto w-24 h-24 mb-6 rounded-full"
        />
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to iSchedulEDU</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#0FA0CE',
                  brandAccent: '#0D8CB6',
                }
              }
            }
          }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Login;