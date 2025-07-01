
import TestimonialCard from "@/components/TestimonialCard";
import WhyTeachersChoose from "@/components/WhyTeachersChoose";
import Header from "@/components/home/Header";
import Pricing from "@/components/home/Pricing";
import Screenshots from "@/components/home/Screenshots";
import Footer from "@/components/home/Footer";
import GenerationProcess from "@/components/home/GenerationProcess";
import StickyNavigation from "@/components/home/StickyNavigation";
import LanguageSelector from "@/components/LanguageSelector";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect } from "react";
import type { Testimonial } from "@/data/testimonials";
import { Download, Users, Clock } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const Index = () => {
  const [reviews, setReviews] = useState<Testimonial[]>(fallbackTestimonials);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const { t, isLoading: isTranslationLoading } = useTranslation();

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoadingReviews(true);
      try {
        console.log("Starting to fetch reviews...");
        const fetchedReviews = await getTestimonials();
        console.log("Fetched reviews:", fetchedReviews);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }
    };
    loadReviews();
  }, []);

  // Update document title and meta description when translations load
  useEffect(() => {
    if (!isTranslationLoading) {
      document.title = t('meta.title');
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', t('meta.description'));
      }
    }
  }, [t, isTranslationLoading]);

  if (isTranslationLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0FA0CE] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] pt-14 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-[#0FA0CE]/5 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2"></div>
      
      {/* Language selector - made more prominent */}
      <div className="fixed top-4 right-4 z-[100]">
        <LanguageSelector />
      </div>
      
      <StickyNavigation />
      <Header />
      <GenerationProcess />
      
      {/* Enhanced Call-to-Action Section */}
      <section className="py-16 bg-gradient-to-r from-[#0FA0CE] to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {t('cta.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center gap-3 text-white">
                <Users className="w-6 h-6 text-blue-200" />
                <span className="text-lg font-semibold">{t('cta.stats.teachers')}</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Clock className="w-6 h-6 text-blue-200" />
                <span className="text-lg font-semibold">{t('cta.stats.timeSaved')}</span>
              </div>
              <div className="flex items-center gap-3 text-white">
                <Download className="w-6 h-6 text-blue-200" />
                <span className="text-lg font-semibold">{t('cta.stats.freeSessions')}</span>
              </div>
            </div>

            <a 
              href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-3xl"
            >
              <img 
                src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/white/en-us?releaseDate=1718150400" 
                alt={t('header.downloadAlt')}
                className="w-[300px] h-[100px] object-contain"
                width="300"
                height="100"
              />
            </a>
          </div>
        </div>
      </section>

      <Pricing />
      <WhyTeachersChoose />
      
      {reviews.length > 0 && (
        <section aria-labelledby="testimonials-title" className="py-16 bg-gradient-to-b from-white to-[#F8FBFF] relative">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-[#0FA0CE]/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <span>⭐ {t('testimonials.badge')}</span>
              </div>
              <h2 id="testimonials-title" className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                {t('testimonials.title')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('testimonials.subtitle')}
              </p>
              {import.meta.env.DEV && isLoadingReviews && (
                <span className="text-sm text-gray-400 block mt-2">{t('testimonials.loading')}</span>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {reviews.map((review) => (
                <TestimonialCard
                  key={review.id}
                  title={review.title}
                  name={review.name}
                  content={review.content}
                  stars={review.stars}
                  isAppStoreReview={review.isAppStoreReview}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Screenshots />
      <Footer />
    </div>
  );
};

export default Index;
