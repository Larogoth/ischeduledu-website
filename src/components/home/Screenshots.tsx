
import { useTranslation } from "@/hooks/useTranslation";

const Screenshots = () => {
  const { t } = useTranslation();

  return (
    <section aria-labelledby="screenshots-title" className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <h2 id="screenshots-title" className="text-4xl font-bold text-center mb-16 text-gray-900">{t('features.moreFeatures')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {[
            {
              src: "/lovable-uploads/28317119-fd83-41b2-b877-3b195a794b2a.png",
              alt: t('features.scheduleManagement')
            },
            {
              src: "/lovable-uploads/75200545-4ea3-40be-90f7-7448e464ef66.png",
              alt: t('features.scheduleAlerts')
            },
            {
              src: "/lovable-uploads/53195535-6434-4fc8-abce-a78ac1dc6f99.png",
              alt: t('features.dailyTimeline')
            },
            {
              src: "/lovable-uploads/900bfec1-1999-467d-872a-7be015674168.png",
              alt: t('features.rotatingSchedule')
            }
          ].map((image, index) => (
            <div
              key={index}
              className="transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl rounded-xl w-full max-w-[180px] md:max-w-[220px]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-offset-2"
                loading="lazy"
                width="220"
                height="476"
                tabIndex={0}
              />
              <p className="text-xs md:text-sm text-gray-900 mt-2 text-center px-2">
                {image.alt}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-900 max-w-3xl mx-auto">
            {t('features.experienceText')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
