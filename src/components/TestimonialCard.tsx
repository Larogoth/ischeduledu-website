
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Star } from "lucide-react";
import { useState } from "react";
import { isEnglish, translateText } from "@/utils/translation";

interface TestimonialCardProps {
  title: string;
  name: string;
  content: string;
  stars: number;
  isAppStoreReview?: boolean;
  version?: string;
  location?: string;
}

const TestimonialCard = ({ title, name, content, stars, isAppStoreReview, version, location }: TestimonialCardProps) => {
  const [translatedTitle, setTranslatedTitle] = useState<string>("");
  const [translatedContent, setTranslatedContent] = useState<string>("");
  const [isTranslated, setIsTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const needsTranslation = !isEnglish(title) || !isEnglish(content);

  const handleTranslate = async () => {
    if (isTranslating) return;
    
    // If already translated, toggle back to original
    if (isTranslated) {
      setIsTranslated(false);
      return;
    }
    
    setIsTranslating(true);
    try {
      const [titleTranslation, contentTranslation] = await Promise.all([
        !isEnglish(title) ? translateText(title, 'en') : Promise.resolve(title),
        !isEnglish(content) ? translateText(content, 'en') : Promise.resolve(content)
      ]);
      
      setTranslatedTitle(titleTranslation);
      setTranslatedContent(contentTranslation);
      setIsTranslated(true);
    } catch (error) {
      console.error('Failed to translate:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const displayTitle = isTranslated && translatedTitle ? translatedTitle : title;
  const displayContent = isTranslated && translatedContent ? translatedContent : content;

  return (
    <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-950/30 border border-blue-100 dark:border-blue-900/30 hover:border-[#0FA0CE]/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0FA0CE] to-blue-600"></div>
      <CardContent className="pt-8 pb-6 px-6">
        <div className="flex justify-between items-start mb-6">
          <Quote className="h-8 w-8 text-[#0FA0CE] opacity-80" />
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < stars ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
        
        {needsTranslation && (
          <div className="mb-4">
            <Button
              onClick={handleTranslate}
              variant="outline"
              size="sm"
              disabled={isTranslating}
              className="text-xs"
            >
              {isTranslating ? "Translating..." : isTranslated ? "Show Original" : "Translate to English"}
            </Button>
          </div>
        )}
        
        <h3 className="text-xl font-bold mb-3 text-foreground">{displayTitle}</h3>
        <blockquote className="text-foreground/80 mb-6 leading-relaxed font-medium italic">
          "{displayContent}"
        </blockquote>
        
        <footer className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-bold text-foreground">— {name}</p>
            {isAppStoreReview && (
              <span className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                App Store ⭐
              </span>
            )}
          </div>
          
          {/* App Store Review Metadata */}
          {isAppStoreReview && (version || location) && (
            <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
              {version && <span>📱 v{version}</span>}
              {location && <span>🌍 {location}</span>}
            </div>
          )}
          
          {import.meta.env.DEV && (
            <p className="text-xs text-foreground/50 mt-2">
              Source: {isAppStoreReview ? 'App Store Review' : 'Local Testimonial'}
            </p>
          )}
        </footer>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
