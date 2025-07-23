import { Clock, Share2, Calendar } from "lucide-react";

const FeaturesHighlight = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-[#0FA0CE]" />,
      title: "Instant Schedule Generation",
      description: "Create abbreviated schedules for early dismissals and delays in seconds, not minutes.",
      image: "/lovable-uploads/ischeduledu-generated-class-schedule-display.png",
      alt: "iSchedulEDU instant schedule generation showing quick creation of abbreviated school schedules for delays and early dismissals"
    },
    {
      icon: <Calendar className="w-8 h-8 text-[#0FA0CE]" />,
      title: "Smart Rotating Schedules",
      description: "Handle A/B day rotations and multi-day cycles effortlessly with automatic tracking.",
      image: "/lovable-uploads/ischeduledu-rotating-block-schedule-calendar.png",
      alt: "iSchedulEDU rotating block schedule calendar managing A-day B-day alternating periods for schools with automatic tracking"
    },
    {
      icon: <Share2 className="w-8 h-8 text-[#0FA0CE]" />,
      title: "Easy Schedule Sharing",
      description: "Share schedules instantly via QR codes or text - perfect for substitute teachers.",
      image: "/lovable-uploads/ischeduledu-schedule-customization-colors-notifications.png",
      alt: "iSchedulEDU schedule sharing interface with QR code generation for easy distribution to substitute teachers and staff"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Teachers Love iSchedulEDU
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stop spending hours manually adjusting schedules. Let iSchedulEDU handle the math while you focus on teaching.
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className={`flex justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-[#0FA0CE]/10 rounded-2xl blur-xl"></div>
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="relative z-10 w-64 h-auto rounded-xl shadow-lg"
                    width="256"
                    height="555"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesHighlight;
