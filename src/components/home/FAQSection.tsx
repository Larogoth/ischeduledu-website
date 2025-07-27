
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is iSchedulEDU free to use?",
      answer: "Yes! iSchedulEDU offers 4 free schedule generations to get you started. After that, it's a simple one-time purchase of $4.99 - no subscriptions or monthly fees!"
    },
    {
      question: "How long does it take to set up a schedule?",
      answer: "Creating a new schedule takes less than 2 minutes! Simply enter your start time, end time, any fixed events like lunch, and iSchedulEDU automatically generates perfectly timed class periods."
    },
    {
      question: "Can I use this for rotating block schedules?",
      answer: "Absolutely! iSchedulEDU handles A/B day rotations, multi-day cycles, and complex rotating schedules with ease. You can set up different schedules for different days and the app will track which schedule to use."
    },
    {
      question: "What devices does iSchedulEDU work on?",
      answer: "iSchedulEDU is available for iPhone and iPad running iOS 14 or later. The app is optimized for both phone and tablet use, making it perfect for classroom or home planning."
    },
    {
      question: "Can I share schedules with other teachers?",
      answer: "Yes! You can easily share schedules via Universal Links, QR codes, or text messages. Universal Links work for everyone - app users get direct import, non-app users see web versions. This is especially helpful for substitute teachers or when communicating schedule changes to colleagues."
    },
    {
      question: "Do I need an internet connection to use the app?",
      answer: "Once downloaded, iSchedulEDU works completely offline. You only need internet access for sharing schedules or downloading the app initially."
    }
  ];

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-foreground/70">
            Everything you need to know about iSchedulEDU
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-[#0FA0CE] transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/70 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
