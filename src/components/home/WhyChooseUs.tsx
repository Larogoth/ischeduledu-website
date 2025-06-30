
import { Zap, DollarSign, Palette, HeadphonesIcon } from "lucide-react";

const WhyChooseUs = () => {
  const advantages = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Generate complex schedules in under 10 seconds"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      title: "Free to Start",
      description: "4 free schedule generations, then affordable pricing"
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-500" />,
      title: "Beautiful Design",
      description: "Clean, intuitive interface designed for educators"
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-blue-500" />,
      title: "Teacher Support",
      description: "Built by educators, supported by our education team"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Makes Us Different
          </h2>
          <p className="text-xl text-gray-600">
            We understand the unique challenges teachers face with schedule management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {advantage.title}
              </h3>
              <p className="text-gray-600">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
