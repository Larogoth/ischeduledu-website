import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, Calendar, Tag } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AppName from "@/components/AppName";
import RelatedContent from "@/components/RelatedContent";
import Footer from "@/components/home/Footer";
import StickyNavigation from "@/components/home/StickyNavigation";
import { Helmet } from "react-helmet-async";

const Blog = () => {
  const blogPosts = [
    {
      id: "best-apps-classroom-schedule-changes-2025",
      title: "Best Apps for Classroom Schedule Changes in 2025",
      excerpt: "Discover the top tools teachers are using to handle unexpected schedule disruptions and create emergency lesson plans.",
      readTime: "5 min read",
      category: "Teacher Tools",
      date: "2025-07-25",
      featured: true
    },
    {
      id: "instantly-replan-school-day-teacher",
      title: "How to Instantly Replan Your School Day as a Teacher",
      excerpt: "When assemblies, fire drills, or weather delays throw your schedule off, here's how to adapt quickly and keep students engaged.",
      readTime: "4 min read",
      category: "Classroom Management",
      date: "2025-07-24"
    },
    {
      id: "tools-elementary-teacher-last-minute-scheduling",
      title: "Tools Every Elementary Teacher Needs for Last-Minute Scheduling",
      excerpt: "Essential apps and strategies for creating emergency schedules when your day gets interrupted unexpectedly.",
      readTime: "6 min read",
      category: "Elementary Education",
      date: "2025-07-23"
    },
    {
      id: "fire-drill-schedule-disruption",
      title: "Fire Drill Just Ruined Your Schedule? Here's How to Recover",
      excerpt: "Real strategies from experienced teachers on handling unexpected interruptions and maintaining classroom flow.",
      readTime: "3 min read",
      category: "Emergency Planning",
      date: "2025-07-22"
    },
    {
      id: "substitute-teacher-schedule-sharing",
      title: "The Ultimate Guide to Sharing Schedules with Substitute Teachers",
      excerpt: "Best practices for creating and sharing emergency schedules that substitute teachers can follow easily.",
      readTime: "7 min read",
      category: "Substitute Teaching",
      date: "2025-07-20"
    },
    {
      id: "weather-delay-schedule-planning",
      title: "How to Prepare Weather Delay Schedules in Advance: The Smart Teacher's Guide",
      excerpt: "Smart teachers prepare weather delay schedules in advance. Learn how to create 1-hour and 2-hour delay schedules that you can instantly activate when delays are announced.",
      readTime: "7 min read",
      category: "Proactive Planning",
      date: "2025-07-21"
    },
    {
      id: "assembly-interruption-classroom-management",
      title: "When Assemblies Eat Up Your Morning: Quick Schedule Adjustments",
      excerpt: "How to rebalance your entire day when special events disrupt your carefully planned schedule.",
      readTime: "4 min read",
      category: "Classroom Management",
      date: "2025-07-19"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Teacher Blog | iSchedulEDU - Emergency Scheduling & Classroom Management Tips</title>
        <meta name="description" content="Read expert tips on emergency scheduling, classroom management, and teacher tools. Learn how to handle fire drills, weather delays, and substitute teacher handoffs with confidence." />
        <meta name="keywords" content="teacher blog, emergency scheduling, classroom management, fire drill schedule, weather delay planning, substitute teacher tips, teacher tools" />
        <meta property="og:title" content="Teacher Blog | iSchedulEDU - Emergency Scheduling & Classroom Management Tips" />
        <meta property="og:description" content="Read expert tips on emergency scheduling, classroom management, and teacher tools. Learn how to handle fire drills, weather delays, and substitute teacher handoffs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ischeduledu.app/blog" />
        <link rel="canonical" href="https://ischeduledu.app/blog" />
        
        {/* Blog Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "iSchedulEDU Teacher Blog",
            "description": "Expert tips on emergency scheduling, classroom management, and teacher tools",
            "url": "https://ischeduledu.app/blog",
            "publisher": {
              "@type": "Organization",
              "name": "iSchedulEDU"
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "datePublished": post.date,
              "url": `https://ischeduledu.app/blog/${post.id}`
            }))
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <StickyNavigation />
        <div className="pt-20">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Header with Navigation */}
              <div className="mb-8">
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Home
                </Link>
              </div>

              {/* Hero Section */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <Tag className="w-4 h-4" />
                  Teacher Resources & Tips
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Teacher Blog
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Expert tips on emergency scheduling, classroom management, and teacher tools. 
                  Learn how to handle fire drills, weather delays, and substitute teacher handoffs with confidence.
                </p>
              </div>

              {/* Featured Post */}
              {blogPosts.filter(post => post.featured).map((post) => (
                <div key={post.id} className="mb-16">
                  <div className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 border border-[#0FA0CE]/20 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-gray-500">{post.category}</span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                      <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h2>
                    <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-[#0FA0CE] hover:text-blue-700 font-semibold"
                    >
                      Read Full Article
                      <ChevronLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                </div>
              ))}

              {/* All Posts Grid */}
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Latest Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.filter(post => !post.featured).map((post) => (
                    <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{post.category}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 mb-3">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{post.excerpt}</p>
                        <Link 
                          to={`/blog/${post.id}`}
                          className="inline-flex items-center gap-2 text-[#0FA0CE] hover:text-blue-700 font-semibold text-sm"
                        >
                          Read More
                          <ChevronLeft className="w-4 h-4 rotate-180" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <Card className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 border-[#0FA0CE]/20">
                  <CardContent className="py-12">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      Ready to Try <AppName />?
                    </h3>
                    <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                      Download the app and experience the difference that intelligent scheduling makes in your daily routine.
                    </p>
                    <a 
                      href="https://apps.apple.com/us/app/ischeduledu/id6504114850?itscg=30200&itsct=apps_box_badge" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block transform hover:scale-105 transition-all duration-300"
                    >
                      <img 
                        src="https://toolbox.marketingtools.apple.com/api/v2/badges/download-on-the-app-store/black/en-us?releaseDate=1718150400" 
                        alt="Download iSchedulEDU on the App Store" 
                        className="h-16"
                      />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Content Section */}
      <RelatedContent currentPage="blog" />
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Blog; 