
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GenerationProcess = () => {
  const steps = [
    {
      image: "/lovable-uploads/99aa0220-3f06-4237-97d0-1829aa8487b5.png",
      title: "Set Your Parameters",
      description: "Enter your schedule details including start time, end time, and any pre-set events like lunch or electives"
    },
    {
      image: "/lovable-uploads/27066ff3-0092-4675-b437-60f4d60369d1.png",
      title: "Review Generated Schedule",
      description: "See your automatically generated class periods with perfect timing"
    },
    {
      image: "/lovable-uploads/5c2b9336-dc95-4680-8d7f-c66087acbd47.png",
      title: "Customize Events",
      description: "Personalize each event with custom colors and notification settings"
    }
  ];

  const customSteps = [
    {
      image: "/lovable-uploads/3a4efc3e-4e22-4e25-af6f-2c157fcb7a8e.png",
      title: "Name Your Schedule & Add Events",
      description: "Give your schedule a name and start adding your custom events"
    },
    {
      image: "/lovable-uploads/ba0a9b4b-cc7c-4dec-9265-f1a15dcbc09e.png",
      title: "Configure Each Event",
      description: "Set event name, times, alerts, and choose custom colors"
    },
    {
      image: "/lovable-uploads/1a30f786-7c58-4bba-ae60-0328a33c5615.png",
      title: "Review Your Schedule",
      description: "See all your events laid out with their custom settings"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Two Ways to Create Your Perfect Schedule
        </h2>
        <p className="text-xl text-gray-700 text-center mb-16 max-w-2xl mx-auto">
          Choose between quick auto-generation or full custom creation
        </p>
        
        <div className="space-y-20">
          {/* Auto-Generation Process */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              Quick Schedule Generation
            </h3>
            <div className="max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {steps.map((step, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full object-contain"
                            style={{ height: '600px' }}
                          />
                          <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">
                              {step.title}
                            </h3>
                            <p className="text-gray-600">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 -translate-x-1/2" />
                <CarouselNext className="right-0 translate-x-1/2" />
              </Carousel>
            </div>
          </div>

          {/* Custom Creation Process */}
          <div>
            <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              Custom Schedule Creation
            </h3>
            <div className="max-w-xs mx-auto sm:max-w-sm md:max-w-md lg:max-w-lg relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {customSteps.map((step, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full object-contain"
                            style={{ height: '600px' }}
                          />
                          <div className="p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2 text-gray-900">
                              {step.title}
                            </h3>
                            <p className="text-gray-600">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-0 -translate-x-1/2" />
                <CarouselNext className="right-0 translate-x-1/2" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenerationProcess;
