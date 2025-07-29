import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Clock, Users, AlertTriangle, Share2, BookOpen, HelpCircle, Info, Calendar } from "lucide-react";

interface RelatedContentProps {
  currentPage: string;
  className?: string;
}

const RelatedContent: React.FC<RelatedContentProps> = ({ currentPage, className }) => {
  const relatedPages = {
    "emergency-scheduling": [
      {
        title: "Emergency Schedule Guide",
        description: "Step-by-step guide for creating emergency schedules",
        href: "/emergency-schedule-guide",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      },
      {
        title: "Equal Time Planning",
        description: "Create perfectly balanced schedules where every subject gets equal time",
        href: "/equal-time-planning",
        icon: <Clock className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Shareable Plans",
        description: "Create professional, shareable schedules that everyone can access instantly",
        href: "/shareable-plans",
        icon: <Share2 className="w-5 h-5 text-green-600" />
      }
    ],
    "equal-time-planning": [
      {
        title: "Emergency Scheduling",
        description: "Create emergency schedules instantly when disruptions occur",
        href: "/emergency-scheduling",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      },
      {
        title: "Shareable Plans",
        description: "Share your balanced schedules with colleagues and substitutes",
        href: "/shareable-plans",
        icon: <Share2 className="w-5 h-5 text-green-600" />
      },
      {
        title: "Features",
        description: "Explore advanced features for intelligent teacher scheduling",
        href: "/features",
        icon: <Info className="w-5 h-5 text-blue-600" />
      }
    ],
    "shareable-plans": [
      {
        title: "Emergency Scheduling",
        description: "Create emergency schedules that are easy to share",
        href: "/emergency-scheduling",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      },
      {
        title: "Equal Time Planning",
        description: "Create balanced schedules perfect for sharing",
        href: "/equal-time-planning",
        icon: <Clock className="w-5 h-5 text-blue-600" />
      },
      {
        title: "About",
        description: "Learn about our mission to help teachers with scheduling",
        href: "/about",
        icon: <Users className="w-5 h-5 text-green-600" />
      }
    ],
    "features": [
      {
        title: "Emergency Scheduling",
        description: "See our features in action with emergency schedule creation",
        href: "/emergency-scheduling",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      },
      {
        title: "Equal Time Planning",
        description: "Experience intelligent equal time division algorithms",
        href: "/equal-time-planning",
        icon: <Clock className="w-5 h-5 text-blue-600" />
      },
      {
        title: "FAQ",
        description: "Learn more about our features and capabilities",
        href: "/faq",
        icon: <HelpCircle className="w-5 h-5 text-purple-600" />
      }
    ],
    "about": [
      {
        title: "Features",
        description: "Explore the technical capabilities that make us different",
        href: "/features",
        icon: <Info className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Emergency Scheduling",
        description: "See our mission in action with emergency schedule tools",
        href: "/emergency-scheduling",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      },
      {
        title: "Blog",
        description: "Read about educational technology and teacher tools",
        href: "/blog",
        icon: <BookOpen className="w-5 h-5 text-green-600" />
      }
    ],
    "emergency-schedule-guide": [
      {
        title: "Custom Schedule Guide",
        description: "Learn how to create custom daily schedules",
        href: "/custom-schedule-guide",
        icon: <Calendar className="w-5 h-5 text-green-600" />
      },
      {
        title: "Rotating Schedule Guide",
        description: "Set up A/B day rotations and multi-day cycles",
        href: "/rotating-schedule-guide",
        icon: <ArrowRight className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Emergency Scheduling",
        description: "See emergency scheduling features in action",
        href: "/emergency-scheduling",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      }
    ],
    "rotating-schedule-guide": [
      {
        title: "Custom Schedule Guide",
        description: "Learn how to create custom daily schedules",
        href: "/custom-schedule-guide",
        icon: <Calendar className="w-5 h-5 text-green-600" />
      },
      {
        title: "Emergency Schedule Guide",
        description: "Step-by-step guide for creating emergency schedules",
        href: "/emergency-schedule-guide",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      },
      {
        title: "Features",
        description: "Explore all advanced scheduling features",
        href: "/features",
        icon: <Info className="w-5 h-5 text-blue-600" />
      }
    ],
    "custom-schedule-guide": [
      {
        title: "Emergency Schedule Guide",
        description: "Step-by-step guide for creating emergency schedules",
        href: "/emergency-schedule-guide",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      },
      {
        title: "Rotating Schedule Guide",
        description: "Set up A/B day rotations and multi-day cycles",
        href: "/rotating-schedule-guide",
        icon: <ArrowRight className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Shareable Plans",
        description: "Learn how to share your custom schedules",
        href: "/shareable-plans",
        icon: <Share2 className="w-5 h-5 text-green-600" />
      }
    ],
    "faq": [
      {
        title: "Emergency Schedule Guide",
        description: "Step-by-step guide for creating emergency schedules",
        href: "/emergency-schedule-guide",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      },
      {
        title: "Custom Schedule Guide",
        description: "Learn how to create custom daily schedules",
        href: "/custom-schedule-guide",
        icon: <Calendar className="w-5 h-5 text-green-600" />
      },
      {
        title: "Rotating Schedule Guide",
        description: "Set up A/B day rotations and multi-day cycles",
        href: "/rotating-schedule-guide",
        icon: <ArrowRight className="w-5 h-5 text-blue-600" />
      }
    ],
    "blog": [
      {
        title: "Emergency Scheduling",
        description: "Apply the tips from our blog to your emergency planning",
        href: "/emergency-scheduling",
        icon: <AlertTriangle className="w-5 h-5 text-red-600" />
      },
      {
        title: "Equal Time Planning",
        description: "Use our equal time planning tools for better schedules",
        href: "/equal-time-planning",
        icon: <Clock className="w-5 h-5 text-blue-600" />
      },
      {
        title: "Features",
        description: "Explore the advanced features we discuss in our blog",
        href: "/features",
        icon: <Info className="w-5 h-5 text-blue-600" />
      }
    ]
  };

  const currentRelatedPages = relatedPages[currentPage as keyof typeof relatedPages] || [];

  if (currentRelatedPages.length === 0) return null;

  return (
    <section className={`py-12 bg-transparent ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Related Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {currentRelatedPages.map((page, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    {page.icon}
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      {page.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {page.description}
                  </p>
                  <Link
                    to={page.href}
                    className="inline-flex items-center gap-2 text-[#0FA0CE] hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedContent; 