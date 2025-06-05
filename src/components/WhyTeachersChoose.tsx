
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Share2, Bell, LayoutGrid, Settings } from "lucide-react";

const FeatureCard = ({ icon, title, description, bulletPoints }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  bulletPoints?: string[];
}) => (
  <Card className="text-left p-6 hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-[#E6F3FF] rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-800 mb-4">{description}</p>
      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="list-disc list-inside text-gray-800 space-y-2">
          {bulletPoints.map((point, index) => (
            <li key={index} className="ml-4">{point}</li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

const WhyTeachersChoose = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Teachers Choose iSchedulEDU</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-blue-600" />}
            title="Simplifies Schedule Adjustments"
            description="Handle last-minute changes due to early dismissals, special events, or weather delays with ease. Generate abbreviated schedules that automatically adjust class durations while preserving key events like lunch and electives."
          />
          <FeatureCard
            icon={<Calendar className="h-6 w-6 text-blue-600" />}
            title="Keeps Rotating Schedules on Track"
            description="Manage A/B or multi-day rotation schedules effortlessly. iSchedulEDU recalculates schedules instantly, ensuring you always know what day it is and which classes to prepare for—without relying on paper calendars."
          />
          <FeatureCard
            icon={<Share2 className="h-6 w-6 text-blue-600" />}
            title="Reliable Schedule Sharing"
            description="Communicate schedule changes quickly via QR code or text. Keep substitute teachers, students, and colleagues in sync effortlessly."
          />
          <FeatureCard
            icon={<Bell className="h-6 w-6 text-blue-600" />}
            title="Smart Transition Alerts"
            description="Built-in alerts for class and event end times mean no more clock-watching. Choose which events need an alarm for smooth transitions without unnecessary interruptions."
          />
          <FeatureCard
            icon={<LayoutGrid className="h-6 w-6 text-blue-600" />}
            title="Clear Visual Overview"
            description="See your full day at a glance with our 12 AM–12 AM time grid. Visualize and adjust schedules easily with a complete view of your day at your fingertips."
          />
          <FeatureCard
            icon={<Settings className="h-6 w-6 text-blue-600" />}
            title="Flexibility Without Complexity"
            description="Managing schedule changes shouldn't be difficult. iSchedulEDU gives you complete control:"
            bulletPoints={[
              "Assign custom schedules to specific days with simple toggles",
              "Set up recurring schedule alerts for weekly routines",
              "Customize alarms for each event based on importance"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyTeachersChoose;
