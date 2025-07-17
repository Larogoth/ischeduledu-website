
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Star, User, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { isEnglish, translateText } from "@/utils/translation";

interface TestimonialCardBProps {
  title: string;
  name: string;
  content: string;
  stars: number;
  isAppStoreReview?: boolean;
}

const TestimonialCardB = ({ title, name, content, stars, isAppStoreReview }: TestimonialCardBProps) => {
  const [translatedTitle, setTranslatedTitle] = useState<string>("");
  const [translatedContent, setTranslatedContent] = useState<string>("");
  const [isTranslated, setIsTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const needsTranslation = !isEnglish(title) || !isEnglish(content);

  const handleTranslate = async () => {
    if (isTranslating) return;
    
    if (isTranslated) {
      setIsTranslated(false);
      return;
    }
    
    setIsTranslating(true);
    try {
      const [titleTranslation, contentTranslation] = await Promise.all([
        !isEnglish(title) ? translateText(title) : Promise.resolve(title),
        !isEnglish(content) ? translateText(content) : Promise.resolve(content)
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

  // Check if content is long enough to need expansion (roughly 4 lines of text)
  const isLongContent = displayContent.length > 200;

  return (
    <Card className="h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-[#0FA0CE]/40 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Quote className="h-6 w-6 text-[#0FA0CE] opacity-60" />
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
              {isTranslating ? "Translating..." : isTranslated ? "Show Original" : "Translate"}
            </Button>
          </div>
        )}
        
        <h3 className={`text-lg font-bold mb-3 text-gray-900 dark:text-gray-100 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {displayTitle}
        </h3>
        
        <blockquote className={`mb-4 leading-relaxed text-sm ${
          isExpanded ? '' : 'line-clamp-4'
        } text-gray-700 dark:text-gray-300`}>
          "{displayContent}"
        </blockquote>
        
        {/* Expand/Collapse button for long content */}
        {isLongContent && (
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant="ghost"
            size="sm"
            className="text-[#0FA0CE] hover:text-[#0FA0CE]/80 hover:bg-[#0FA0CE]/10 dark:hover:bg-[#0FA0CE]/20 mb-4 p-2 h-8"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-3 h-3 mr-1" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3 mr-1" />
                Read More
              </>
            )}
          </Button>
        )}
        
        <footer className="border-t border-gray-100 dark:border-gray-700 pt-4 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-500 dark:text-gray-300" />
            </div>
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{name}</p>
          </div>
        </footer>
        
        {/* App Store badge on its own line at bottom right */}
        {isAppStoreReview && (
          <div className="flex justify-end mt-3">
            <span className="bg-[#0FA0CE] text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              App Store
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialCardB;
