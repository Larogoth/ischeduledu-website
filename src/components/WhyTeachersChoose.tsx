
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, Share2, Bell, LayoutGrid, Settings } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const FeatureCard = ({ icon, title, description, bulletPoints }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  bulletPoints?: string[];
}) => (
  <Card className="text-left p-6 hover:shadow-lg transition-shadow">
    <CardContent className="pt-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-[#E6F3FF] rounded-full">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-900 mb-4">{description}</p>
      {bulletPoints && bulletPoints.length > 0 && (
        <ul className="list-disc list-inside text-gray-900 space-y-2">
          {bulletPoints.map((point, index) => (
            <li key={index} className="ml-4">{point}</li>
          ))}
        </ul>
      )}
    </CardContent>
  </Card>
);

const WhyTeachersChoose = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">{t('whyTeachers.title')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-blue-700" />}
            title={t('whyTeachers.simplifySchedule.title')}
            description={t('whyTeachers.simplifySchedule.description')}
          />
          <FeatureCard
            icon={<Calendar className="h-6 w-6 text-blue-700" />}
            title={t('whyTeachers.rotatingSchedules.title')}
            description={t('whyTeachers.rotatingSchedules.description')}
          />
          <FeatureCard
            icon={<Share2 className="h-6 w-6 text-blue-700" />}
            title={t('whyTeachers.reliableSharing.title')}
            description={t('whyTeachers.reliableSharing.description')}
          />
          <FeatureCard
            icon={<Bell className="h-6 w-6 text-blue-700" />}
            title={t('whyTeachers.smartAlerts.title')}
            description={t('whyTeachers.smartAlerts.description')}
          />
          <FeatureCard
            icon={<LayoutGrid className="h-6 w-6 text-blue-700" />}
            title={t('whyTeachers.visualOverview.title')}
            description={t('whyTeachers.visualOverview.description')}
          />
          <FeatureCard
            icon={<Settings className="h-6 w-6 text-blue-700" />}
            title={t('whyTeachers.flexibility.title')}
            description={t('whyTeachers.flexibility.description')}
            bulletPoints={t('whyTeachers.flexibility.bullets') as string[]}
          />
        </div>
      </div>
    </section>
  );
};

export default WhyTeachersChoose;
