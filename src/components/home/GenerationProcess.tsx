
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
      image: "/lovable-uploads/25b49ccf-1f94-4b40-a2df-b3a033f39666.png",
      title: "Start Your Schedule",
      description: "Choose between creating a custom schedule or generating one automatically"
    },
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

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Generate a Schedule in Seconds
        </h2>
        <p className="text-xl text-gray-700 text-center mb-12 max-w-2xl mx-auto">
          Quick and easy process to create the perfect schedule for your school day
        </p>
        
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
    </section>
  );
};

export default GenerationProcess;
