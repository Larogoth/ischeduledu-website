
import { ArrowRight, Clock, Download } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const StepCard = ({ number, title, description, image, isLast = false }: {
  number: number;
  title: string;
  description: string;
  image: string;
  isLast?: boolean;
}) => (
  <div className="flex flex-col items-center text-center relative">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-[#0FA0CE]/10 rounded-2xl blur-xl"></div>
      <img
        src={image}
        alt={title}
        className="relative z-10 w-48 h-auto rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        width="192"
        height="416"
      />
    </div>
    <div className="bg-[#0FA0CE] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg mb-4">
      {number}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700 max-w-xs leading-relaxed">{description}</p>
    
    {!isLast && (
      <div className="hidden lg:block absolute -right-12 top-1/2 transform -translate-y-1/2">
        <ArrowRight className="w-6 h-6 text-[#0FA0CE]" />
      </div>
    )}
  </div>
);

const GenerationProcess = () => {
  const { t } = useTranslation();

  const steps = [
    {
      title: t('generation.steps.input.title'),
      description: t('generation.steps.input.description'),
      image: "/lovable-uploads/99aa0220-3f06-4237-97d0-1829aa8487b5.png"
    },
    {
      title: t('generation.steps.generate.title'),
      description: t('generation.steps.generate.description'),
      image: "/lovable-uploads/27066ff3-0092-4675-b437-60f4d60369d1.png"
    },
    {
      title: t('generation.steps.share.title'),
      description: t('generation.steps.share.description'),
      image: "/lovable-uploads/5c2b9336-dc95-4680-8d7f-c66087acbd47.png"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F8FBFF] relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-[#0FA0CE]/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-blue-500/5 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('generation.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('generation.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8 max-w-5xl mx-auto relative">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              image={step.image}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        <div className="text-center mt-16">
          <a 
            href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0FA0CE] to-blue-600 hover:from-[#0D8CB6] hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <Download className="w-5 h-5" />
            {t('pricing.free.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default GenerationProcess;
