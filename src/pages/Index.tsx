import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Clock, Share2, Bell } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#E6F3FF]">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <img
          src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
          alt="iSchedulEDU Logo"
          className="mx-auto w-32 h-32 mb-8 rounded-full"
        />
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          iSchedulEDU
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Create abbreviated schedules for your school day quickly and easily
        </p>
        <Button
          size="lg"
          className="bg-[#0FA0CE] hover:bg-[#0D8CB6] text-white px-8 py-6 text-lg"
          onClick={() => window.open("https://apps.apple.com/app/ischedulEDU", "_blank")}
        >
          <Download className="mr-2" />
          Download on the App Store
        </Button>
      </header>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Clock />}
              title="Equal Class Duration"
              description="Automatically generate schedules with equal class lengths"
            />
            <FeatureCard
              icon={<Share2 />}
              title="Easy Sharing"
              description="Share schedules via QR codes or text"
            />
            <FeatureCard
              icon={<Bell />}
              title="Class Alerts"
              description="Set automatic alerts for class end times"
            />
            <FeatureCard
              icon={<Download />}
              title="Save Schedules"
              description="Save and manage multiple schedules"
            />
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-16 bg-[#F5F9FF]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">See it in Action</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <img
              src="/lovable-uploads/6c266668-5642-4712-9338-9675b98e1a6d.png"
              alt="Schedule Input Screen"
              className="w-64 rounded-xl shadow-lg"
            />
            <img
              src="/lovable-uploads/6a72f919-7ce6-40ea-9c79-6427f39d32ac.png"
              alt="Generated Schedule Screen"
              className="w-64 rounded-xl shadow-lg"
            />
            <img
              src="/lovable-uploads/ad95bed2-74c4-4fde-8699-d7ab121a81fb.png"
              alt="Saved Schedules Screen"
              className="w-64 rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">© 2024 iSchedulEDU. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <Button variant="link" className="text-white">
              Privacy Policy
            </Button>
            <Button variant="link" className="text-white">
              Support
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="text-center p-6">
    <CardContent className="pt-6">
      <div className="mb-4 inline-block p-3 bg-[#E6F3FF] rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

export default Index;