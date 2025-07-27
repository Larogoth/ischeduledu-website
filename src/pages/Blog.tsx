import { Link } from "react-router-dom";
import { ChevronLeft, Calendar, Clock, Users, AlertTriangle, Share2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AppName from "@/components/AppName";

const Blog = () => {
  const blogPosts = [
    {
      id: "best-apps-classroom-schedule-changes-2025",
      title: "Best Apps for Classroom Schedule Changes in 2025",
      excerpt: "Discover the top tools teachers are using to handle unexpected schedule disruptions and create emergency lesson plans.",
      readTime: "5 min read",
      category: "Teacher Tools",
      date: "2025-01-15",
      featured: true
    },
    {
      id: "instantly-replan-school-day-teacher",
      title: "How to Instantly Replan Your School Day as a Teacher",
      excerpt: "When assemblies, fire drills, or weather delays throw your schedule off, here's how to adapt quickly and keep students engaged.",
      readTime: "4 min read", 
      category: "Classroom Management",
      date: "2025-01-10"
    },
    {
      id: "tools-elementary-teacher-last-minute-scheduling",
      title: "Tools Every Elementary Teacher Needs for Last-Minute Scheduling",
      excerpt: "Essential apps and strategies for creating emergency schedules when your day gets interrupted unexpectedly.",
      readTime: "6 min read",
      category: "Elementary Education", 
      date: "2025-01-08"
    },
    {
      id: "fire-drill-schedule-disruption",
      title: "Fire Drill Just Ruined Your Schedule? Here's How to Recover",
      excerpt: "Real strategies from experienced teachers on handling unexpected interruptions and maintaining classroom flow.",
      readTime: "3 min read",
      category: "Emergency Planning",
      date: "2025-01-05"
    },
    {
      id: "substitute-teacher-schedule-sharing",
      title: "The Ultimate Guide to Sharing Schedules with Substitute Teachers",
      excerpt: "Best practices for creating and sharing emergency schedules that substitute teachers can follow easily.",
      readTime: "7 min read",
      category: "Substitute Teaching",
      date: "2025-01-03"
    },
    {
      id: "weather-delay-schedule-planning",
      title: "How to Prepare Weather Delay Schedules in Advance: The Smart Teacher's Guide",
      excerpt: "Smart teachers prepare weather delay schedules in advance. Learn how to create 1-hour and 2-hour delay schedules that you can instantly activate when delays are announced.",
      readTime: "7 min read",
      category: "Proactive Planning",
      date: "2025-01-24"
    },
    {
      id: "assembly-interruption-classroom-management",
      title: "When Assemblies Eat Up Your Morning: Quick Schedule Adjustments",
      excerpt: "How to rebalance your entire day when special events disrupt your carefully planned schedule.",
      readTime: "4 min read",
      category: "Classroom Management",
      date: "2025-01-01"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-gray-50 p-4 border-b">
        <Link to="/" className="inline-flex items-center text-primary hover:underline">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Teacher Resources & Tips</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert advice on classroom management, emergency scheduling, and making the most of your teaching day with <AppName />
            </p>
          </div>

          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map(post => (
            <Card key={post.id} className="mb-12 border-2 border-[#0FA0CE]/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#0FA0CE] text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <span className="text-sm text-gray-500">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                  {post.title}
                </CardTitle>
                <p className="text-lg text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-[#0FA0CE] hover:text-blue-700 font-semibold"
                  >
                    Read More
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </CardHeader>
            </Card>
          ))}

          {/* All Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-gray-500">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-[#0FA0CE] hover:text-blue-700 font-semibold text-sm"
                    >
                      Read More
                      <ChevronLeft className="h-3 w-3 rotate-180" />
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-[#0FA0CE]/10 to-blue-500/10 border-[#0FA0CE]/20">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Handle Any Schedule Emergency?
                </h3>
                <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                  Download <AppName /> and be prepared for any last-minute schedule changes
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
                    className="h-12"
                  />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog; 