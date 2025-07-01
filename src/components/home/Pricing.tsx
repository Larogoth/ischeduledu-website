
import { Check, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

const Pricing = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-b from-[#F8FBFF] to-white relative overflow-hidden">
      <div className="absolute top-10 left-1/3 w-20 h-20 bg-[#0FA0CE]/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-10 right-1/3 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2 border-gray-200 hover:border-[#0FA0CE]/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {t('pricing.free.title')}
              </CardTitle>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {t('pricing.free.price')}
              </div>
              <p className="text-gray-600">{t('pricing.free.description')}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-4 mb-8">
                {(t('pricing.free.features') as string[]).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 text-lg font-semibold">
                  <Download className="w-5 h-5 mr-2" />
                  {t('pricing.free.cta')}
                </Button>
              </a>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-[#0FA0CE] hover:border-[#0FA0CE] transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0FA0CE] to-blue-600"></div>
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Popular
              </div>
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {t('pricing.pro.title')}
              </CardTitle>
              <div className="text-4xl font-bold text-[#0FA0CE] mb-2">
                {t('pricing.pro.price')}
              </div>
              <p className="text-gray-600">{t('pricing.pro.description')}</p>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-4 mb-8">
                {(t('pricing.pro.features') as string[]).map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-gradient-to-r from-[#0FA0CE] to-blue-600 hover:from-[#0D8CB6] hover:to-blue-700 text-white py-3 text-lg font-semibold">
                  <Download className="w-5 h-5 mr-2" />
                  {t('pricing.pro.cta')}
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 font-medium">{t('pricing.note')}</p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
