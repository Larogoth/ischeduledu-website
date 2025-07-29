
import { Zap, DollarSign, Palette, HeadphonesIcon } from "lucide-react";

const WhyChooseUs = () => {
  const advantages = [
    {
      icon: <Zap className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />,
      title: "Lightning Fast",
      description: "Generate complex schedules in under 10 seconds"
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-500 dark:text-green-400" />,
      title: "One-Time Purchase",
      description: "4 free schedules, then just $4.99 - no subscriptions!"
    },
    {
      icon: <Palette className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
      title: "Beautiful Design",
      description: "Clean, intuitive interface designed by a teacher"
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
      title: "Teacher Support",
      description: "Built and supported by a fellow educator"
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-foreground mb-4">
            What Makes Us Different
          </h3>
          <p className="text-xl text-foreground/70">
            Built by a teacher who understands the challenges you face
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-background rounded-full shadow-lg mb-6 border border-border">
                {advantage.icon}
              </div>
              <h4 className="text-xl font-bold text-foreground mb-3">
                {advantage.title}
              </h4>
              <p className="text-foreground/70">
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
