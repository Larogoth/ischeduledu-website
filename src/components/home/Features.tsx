
import { Clock, Calendar, Share2, Bell, LayoutGrid, Settings } from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  imageUrl 
}: { 
  icon: React.ElementType;
  title: string; 
  description: string;
  imageUrl?: string;
}) => (
  <div className="flex flex-col md:flex-row gap-6 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="md:w-1/2">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-blue-50 rounded-full mr-3">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
    
    {imageUrl && (
      <div className="md:w-1/2">
        <img 
          src={imageUrl} 
          alt={title} 
          className="rounded-lg shadow-sm w-full h-auto object-cover"
        />
      </div>
    )}
  </div>
);

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          Simple Solutions for Busy Teachers
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Designed specifically for educators who need quick, reliable scheduling tools
        </p>
        
        <div className="grid grid-cols-1 gap-8">
          <FeatureCard
            icon={Clock}
            title="Generate Schedules in Minutes"
            description="Simply enter your start and end times, and iSchedulEDU will automatically create perfectly-timed periods that fit your day. No more manual calculations or adjustments."
            imageUrl="/lovable-uploads/99aa0220-3f06-4237-97d0-1829aa8487b5.png"
          />
          
          <FeatureCard
            icon={Calendar}
            title="Manage A/B & Rotating Schedules"
            description="Easily keep track of which rotation day it is. iSchedulEDU handles complex schedule rotations so you always know what's coming next."
            imageUrl="/lovable-uploads/900bfec1-1999-467d-872a-7be015674168.png"
          />
          
          <FeatureCard
            icon={Bell}
            title="Smart Notifications & Reminders"
            description="Get gentle alerts when it's time to transition between activities. Choose which events need alerts and which don't."
            imageUrl="/lovable-uploads/75200545-4ea3-40be-90f7-7448e464ef66.png"
          />
          
          <FeatureCard
            icon={Share2}
            title="Easy Schedule Sharing"
            description="Share your schedule with colleagues, substitutes, or students via QR code or text message. Everyone stays on the same page."
            imageUrl="/lovable-uploads/28317119-fd83-41b2-b877-3b195a794b2a.png"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
