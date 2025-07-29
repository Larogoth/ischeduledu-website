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
      image: "/lovable-uploads/ischeduledu-schedule-setup-parameters-screen.png",
      title: "Set Your Parameters",
      description: "Enter your schedule details including start time, end time, and any pre-set events like lunch or electives",
      alt: "iSchedulEDU schedule parameter setup screen showing start time, end time, and lunch period configuration for teachers and school administrators"
    },
    {
      image: "/lovable-uploads/ischeduledu-generated-class-schedule-display.png",
      title: "Review Generated Schedule",
      description: "See your automatically generated class periods with perfect timing",
      alt: "iSchedulEDU generated class schedule display showing perfectly timed school periods and breaks for educational institutions"
    },
    {
      image: "/lovable-uploads/ischeduledu-schedule-customization-colors-notifications.png",
      title: "Customize Events",
      description: "Personalize each event with custom colors and notification settings",
      alt: "iSchedulEDU schedule customization interface with color coding and notification settings for class periods and school events"
    }
  ];

  const customSteps = [
    {
      image: "/lovable-uploads/ischeduledu-custom-schedule-creation-naming.png",
      title: "Name Your Schedule & Add Events",
      description: "Give your schedule a name and start adding your custom events",
      alt: "iSchedulEDU custom schedule creation screen for naming and adding school events manually for educational planning"
    },
    {
      image: "/lovable-uploads/ischeduledu-event-configuration-times-alerts.png",
      title: "Configure Each Event",
      description: "Set event name, times, alerts, and choose custom colors",
      alt: "iSchedulEDU event configuration interface showing time settings, alerts, and color customization options for school schedules"
    },
    {
      image: "/lovable-uploads/ischeduledu-final-schedule-review-custom-events.png",
      title: "Review Your Schedule",
      description: "See all your events laid out with their custom settings",
      alt: "iSchedulEDU final schedule review showing completed custom school timetable with color-coded events for teachers"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-[#F5F9FF] dark:to-blue-950/30">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl font-bold text-center mb-4 text-foreground">
          Two Ways to Create Your Perfect Schedule
        </h3>
        <p className="text-xl text-foreground/70 text-center mb-16 max-w-2xl mx-auto">
          Choose between quick auto-generation or full custom creation
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Auto-Generation Process */}
          <div>
            <h4 className="text-2xl font-semibold text-center mb-8 text-foreground">
              Quick Schedule Generation
            </h4>
            <div className="max-w-xs mx-auto sm:max-w-sm md:max-w-md relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {steps.map((step, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="bg-background rounded-xl shadow-lg overflow-hidden border border-border">
                          <div className="max-w-[180px] md:max-w-[260px] mx-auto">
                            <img
                              src={step.image}
                              alt={step.alt}
                              className="w-full object-contain"
                              style={{ height: '450px' }}
                            />
                          </div>
                          <div className="p-6 text-center">
                            <h5 className="text-xl font-semibold mb-2 text-foreground">
                              {step.title}
                            </h5>
                            <p className="text-foreground/70">
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
            <h4 className="text-2xl font-semibold text-center mb-8 text-foreground">
              Custom Schedule Creation
            </h4>
            <div className="max-w-xs mx-auto sm:max-w-sm md:max-w-md relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {customSteps.map((step, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1">
                        <div className="bg-background rounded-xl shadow-lg overflow-hidden border border-border">
                          <div className="max-w-[180px] md:max-w-[260px] mx-auto">
                            <img
                              src={step.image}
                              alt={step.alt}
                              className="w-full object-contain"
                              style={{ height: '450px' }}
                            />
                          </div>
                          <div className="p-6 text-center">
                            <h5 className="text-xl font-semibold mb-2 text-foreground">
                              {step.title}
                            </h5>
                            <p className="text-foreground/70">
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
