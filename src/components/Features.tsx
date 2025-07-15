import { Card, CardContent } from "@/components/ui/card";
import { Clock, Share2, Bell, Download } from "lucide-react";

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <Card className="text-center p-6 bg-background border-border">
    <CardContent className="pt-6">
      <div className="mb-4 inline-block p-3 bg-[#E6F3FF] dark:bg-[#0FA0CE]/10 rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </CardContent>
  </Card>
);

const Features = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Clock className="text-[#0FA0CE]" />}
            title="Equal Class Duration"
            description="Automatically generate schedules with equal class lengths"
          />
          <FeatureCard
            icon={<Share2 className="text-[#0FA0CE]" />}
            title="Easy Sharing"
            description="Share schedules via QR codes or text"
          />
          <FeatureCard
            icon={<Bell className="text-[#0FA0CE]" />}
            title="Class Alerts"
            description="Set automatic alerts for class end times"
          />
          <FeatureCard
            icon={<Download className="text-[#0FA0CE]" />}
            title="Save Schedules"
            description="Save and manage multiple schedules"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;