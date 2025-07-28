

import Header from "@/components/home/Header";
import Pricing from "@/components/home/Pricing";
import Screenshots from "@/components/home/Screenshots";
import Footer from "@/components/home/Footer";
import StorySection from "@/components/home/StorySection";
import StickyNavigation from "@/components/home/StickyNavigation";
import ReviewsSection from "@/components/home/ReviewsSection";
import { testimonials } from "@/data/testimonials";
import type { Testimonial } from "@/data/testimonials";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const reviews: Testimonial[] = testimonials;

  return (
    <>
      <Helmet>
        <title>iSchedulEDU - Emergency Schedule Generator for Teachers | Create Equal Time Schedules in 2 Minutes</title>
        <meta name="description" content="iSchedulEDU helps teachers create emergency schedules and equal time lesson plans in under 2 minutes. Perfect for fire drills, assemblies, weather delays, and substitute teachers. Free to start." />
        <meta name="keywords" content="teacher schedule app, emergency schedule generator, equal time lesson planning, fire drill schedule, substitute teacher schedule, classroom scheduling app" />
        <meta property="og:title" content="iSchedulEDU - Emergency Schedule Generator for Teachers" />
        <meta property="og:description" content="Create emergency schedules and equal time lesson plans in under 2 minutes. Perfect for fire drills, assemblies, weather delays, and substitute teachers." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ischeduledu.app" />
        <meta property="og:image" content="https://ischeduledu.app/lovable-uploads/ischeduledu-app-logo-elementary-teacher-schedule-planner.png" />
        <link rel="canonical" href="https://ischeduledu.app" />
        
        {/* App Store Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            "name": "iSchedulEDU",
            "description": "Emergency schedule generator for teachers",
            "applicationCategory": "EducationApplication",
            "operatingSystem": "iOS",
            "url": "https://apps.apple.com/us/app/ischeduledu/id6504114850",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
        
        {/* Reviews Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "iSchedulEDU",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "iOS",
            "url": "https://apps.apple.com/us/app/ischeduledu/id6504114850",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "ratingCount": "171",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": reviews.map(review => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": review.name
              },
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": review.stars.toString(),
                "bestRating": "5",
                "worstRating": "1"
              },
              "reviewBody": review.content,
              "reviewAspect": "Overall",
              "datePublished": new Date().toISOString().split('T')[0]
            }))
          })}
        </script>
      </Helmet>
      
      <main className="min-h-screen bg-gradient-to-b from-[#E6F3FF] via-white to-[#F0F8FF] dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 pt-14 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="fixed top-1/4 left-0 w-96 h-96 bg-[#0FA0CE]/5 dark:bg-[#0FA0CE]/10 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="fixed bottom-1/4 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl translate-x-1/2"></div>
      
      {/* 1. Navigation & Hero - Clear value proposition */}
      <StickyNavigation />
      <Header />
      
      {/* 2. Story & How It Works - Builds trust and explains process */}
      <StorySection />
      
      {/* 3. App Preview - Show the product in action */}
      <Screenshots />
      
      {/* 4. Social Proof - Real results from real teachers */}
      <ReviewsSection reviews={reviews} isLoadingReviews={false} />

      {/* 5. Pricing & Final CTA - Clear offer and action */}
      <Pricing />
      
      {/* 6. Footer */}
      <Footer />
    </main>
    </>
  );
};

export default Index;
