feat: Implement comprehensive SEO improvements and navigation enhancements

## SEO Optimizations
- Fix meta description length (reduced from 218 to 155 characters)
- Enhance title with keywords: "Teacher Schedule App | Emergency Schedule Generator | Equal Time Lesson Planning"
- Expand keywords meta tag with additional educational terms
- Update Open Graph tags for consistency
- Add relevant external links to CompetitorAnalysis and StrategyReview pages
- Remove irrelevant educational resource links from StorySection

## Navigation Improvements
- Add BackToTop component to all pages for better user experience
- Add Footer component to missing pages (PrivacyPolicy, ImportSchedule, BlogPost)
- Ensure consistent navigation across all pages
- Remove awkward internal links from Header component (footer links suffice for SEO)

## Technical Enhancements
- Create reusable BackToTop component with smooth scrolling
- Implement proper dark mode styling across all pages
- Add comprehensive internal linking through footer navigation
- Maintain clean user experience while optimizing for search engines

## Files Modified
- src/components/BackToTop.tsx (new)
- src/pages/Index.tsx (SEO meta tags, BackToTop)
- src/pages/IndexB.tsx (BackToTop)
- src/pages/FAQ.tsx (BackToTop)
- src/pages/Features.tsx (BackToTop)
- src/pages/About.tsx (BackToTop)
- src/pages/Blog.tsx (BackToTop)
- src/pages/EmergencyScheduling.tsx (BackToTop)
- src/pages/EqualTimePlanning.tsx (BackToTop)
- src/pages/ShareablePlans.tsx (BackToTop)
- src/pages/PrivacyPolicy.tsx (Footer, BackToTop)
- src/pages/ImportSchedule.tsx (Footer, BackToTop)
- src/pages/BlogPost.tsx (Footer, BackToTop)
- src/components/home/Header.tsx (remove internal links)
- src/components/home/StorySection.tsx (remove irrelevant external links)
- src/pages/CompetitorAnalysis.tsx (add relevant external links)
- src/pages/StrategyReview.tsx (add relevant external links)

## SEO Score Impact
Expected improvement from 72/100 to 80+ with these optimizations:
- Fixed meta description length issue
- Added keywords to title and description
- Resolved missing internal links (footer provides this)
- Verified proper H1/H2 structure
- Added relevant external links for authority building 