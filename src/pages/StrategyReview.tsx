import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Target, TrendingUp, Users, Smartphone, Clock, Share2, Bell, QrCode, Calendar, Award, Lightbulb, BarChart3, Globe, Zap, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer';

const StrategyReview: React.FC = () => {
  const strategyData = {
    marketPosition: {
      primary: "Emergency Schedule Generator for Teachers",
      secondary: "Mobile-first educational scheduling solution",
      target: "K-12 Teachers and School Administrators",
      niche: "Emergency and abbreviated schedule creation"
    },
    valueProposition: {
      core: "Create emergency schedules in under 2 minutes",
      benefits: [
        "Eliminates manual time calculations",
        "Ensures equal time distribution",
        "Handles all emergency scenarios",
        "Provides instant sharing capabilities",
        "Reduces teacher stress during disruptions"
      ],
      differentiation: [
        "Teacher-specific design",
        "Emergency scenario optimization",
        "Intelligent equal time division",
        "iOS-native experience",
        "Real-time generation"
      ]
    },
    marketStrategy: {
      segments: [
        {
          name: "Elementary Teachers",
          size: "2.8M teachers",
          needs: ["Simple interface", "Quick generation", "Visual schedules"],
          approach: "Focus on ease of use and visual appeal"
        },
        {
          name: "Middle School Teachers",
          size: "1.2M teachers",
          needs: ["A/B rotations", "Complex schedules", "Sharing features"],
          approach: "Emphasize rotation management and sharing"
        },
        {
          name: "School Administrators",
          size: "500K administrators",
          needs: ["District-wide solutions", "Reporting", "Compliance"],
          approach: "Develop enterprise features and analytics"
        }
      ],
      channels: [
        "App Store optimization",
        "Teacher communities",
        "Educational conferences",
        "Social media marketing",
        "Word-of-mouth referrals"
      ]
    },
    competitiveAdvantages: [
      {
        title: "Emergency-First Design",
        description: "Built specifically for fire drills, weather delays, and schedule disruptions",
        icon: Zap,
        impact: "High"
      },
      {
        title: "Intelligent Algorithms",
        description: "Advanced equal time division that handles complex scenarios",
        icon: Lightbulb,
        impact: "High"
      },
      {
        title: "iOS Native Experience",
        description: "Optimized for iPhone and iPad with native iOS features",
        icon: Smartphone,
        impact: "Medium"
      },
      {
        title: "Instant Sharing",
        description: "QR codes and universal links for immediate schedule distribution",
        icon: Share2,
        impact: "Medium"
      },
      {
        title: "Teacher Community Focus",
        description: "Designed by teachers for teachers with real classroom needs",
        icon: Users,
        impact: "High"
      },
      {
        title: "Free Entry Point",
        description: "4 free generations to try before premium features",
        icon: Award,
        impact: "Medium"
      }
    ],
    growthStrategy: {
      phases: [
        {
          phase: "Phase 1: Foundation",
          duration: "6 months",
          goals: [
            "Establish core user base",
            "Refine emergency features",
            "Build teacher community",
            "Gather user feedback"
          ],
          metrics: ["10K downloads", "4.5+ App Store rating", "500 active users"]
        },
        {
          phase: "Phase 2: Expansion",
          duration: "12 months",
          goals: [
            "Add advanced features",
            "Expand to Android",
            "Develop school partnerships",
            "Implement analytics"
          ],
          metrics: ["50K downloads", "4.7+ rating", "5K active users"]
        },
        {
          phase: "Phase 3: Scale",
          duration: "18 months",
          goals: [
            "Enterprise features",
            "District-wide deployments",
            "International expansion",
            "Advanced integrations"
          ],
          metrics: ["200K downloads", "4.8+ rating", "25K active users"]
        }
      ]
    },
    riskAnalysis: {
      risks: [
        {
          risk: "Competition from established players",
          probability: "Medium",
          impact: "High",
          mitigation: "Focus on emergency scenarios and teacher-specific features"
        },
        {
          risk: "Platform dependency on iOS",
          probability: "Low",
          impact: "Medium",
          mitigation: "Develop Android version and web platform"
        },
        {
          risk: "Market saturation",
          probability: "Low",
          impact: "Medium",
          mitigation: "Continuous innovation and feature development"
        },
        {
          risk: "User acquisition costs",
          probability: "Medium",
          impact: "Medium",
          mitigation: "Focus on organic growth and teacher communities"
        }
      ]
    },
    successMetrics: {
      user: ["Daily active users", "Session duration", "Feature adoption", "User retention"],
      business: ["Revenue growth", "Customer acquisition cost", "Lifetime value", "Churn rate"],
      product: ["App Store rating", "Crash rate", "Performance metrics", "User satisfaction"]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link 
              to="/" 
              className="hover:text-[#0FA0CE] transition-colors duration-200 flex items-center gap-1 font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-gray-100 font-semibold">Strategy Review</span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Strategic Review & Market Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Comprehensive analysis of iSchedulEDU's market position, competitive advantages, and growth strategy
          </p>
        </div>

        {/* Market Position */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-600" />
              Market Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Primary Position</h3>
                <p className="text-lg font-medium text-blue-600 mb-2">{strategyData.marketPosition.primary}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{strategyData.marketPosition.secondary}</p>
                
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Target Market</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{strategyData.marketPosition.target}</p>
                <Badge variant="secondary">{strategyData.marketPosition.niche}</Badge>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Value Proposition</h3>
                <p className="text-lg font-medium text-green-600 mb-3">{strategyData.valueProposition.core}</p>
                <ul className="space-y-2">
                  {strategyData.valueProposition.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competitive Advantages */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-green-600" />
              Competitive Advantages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {strategyData.competitiveAdvantages.map((advantage, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <advantage.icon className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">{advantage.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{advantage.description}</p>
                  <Badge variant={advantage.impact === "High" ? "default" : "secondary"}>
                    {advantage.impact} Impact
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Strategy */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-600" />
              Market Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Target Segments</h3>
                <div className="space-y-4">
                  {strategyData.marketStrategy.segments.map((segment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{segment.name}</h4>
                        <Badge variant="outline">{segment.size}</Badge>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Key Needs:</p>
                        <ul className="text-sm text-gray-600 dark:text-gray-400">
                          {segment.needs.map((need, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                              {need}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Approach:</span> {segment.approach}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Distribution Channels</h3>
                <div className="space-y-3">
                  {strategyData.marketStrategy.channels.map((channel, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth Strategy */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Growth Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {strategyData.growthStrategy.phases.map((phase, index) => (
                <div key={index} className="border rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{phase.phase}</h3>
                    <Badge variant="outline">{phase.duration}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Goals</h4>
                      <ul className="space-y-2">
                        {phase.goals.map((goal, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Success Metrics</h4>
                      <ul className="space-y-2">
                        {phase.metrics.map((metric, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <BarChart3 className="w-4 h-4 text-blue-500" />
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-orange-600" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {strategyData.riskAnalysis.risks.map((risk, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{risk.risk}</h4>
                    <div className="flex gap-2">
                      <Badge variant={risk.probability === "High" ? "destructive" : risk.probability === "Medium" ? "default" : "secondary"}>
                        {risk.probability} Probability
                      </Badge>
                      <Badge variant={risk.impact === "High" ? "destructive" : risk.impact === "Medium" ? "default" : "secondary"}>
                        {risk.impact} Impact
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="font-medium">Mitigation:</span> {risk.mitigation}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Metrics */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              Success Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">User Metrics</h4>
                <ul className="space-y-2">
                  {strategyData.successMetrics.user.map((metric, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Users className="w-4 h-4 text-blue-500" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Business Metrics</h4>
                <ul className="space-y-2">
                  {strategyData.successMetrics.business.map((metric, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Product Metrics</h4>
                <ul className="space-y-2">
                  {strategyData.successMetrics.product.map((metric, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Smartphone className="w-4 h-4 text-purple-500" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Execute This Strategy?
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Join the thousands of teachers already using iSchedulEDU for emergency schedule generation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => window.open('https://apps.apple.com/us/app/ischeduledu/id6504114850', '_blank')}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download iSchedulEDU
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white/10 border-white text-white hover:bg-white hover:text-blue-600 backdrop-blur-sm"
                  onClick={() => window.open('https://ischeduledu.app', '_blank')}
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* External links for SEO - Hidden from navigation */}
      <div className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Educational Technology & Business Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <a 
                href="https://www.apple.com/business/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0FA0CE] hover:text-blue-600 font-medium transition-colors block"
              >
                Apple Business
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Enterprise iOS solutions</p>
            </div>
            <div className="text-center">
              <a 
                href="https://www.microsoft.com/en-us/microsoft-365/education" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0FA0CE] hover:text-blue-600 font-medium transition-colors block"
              >
                Microsoft 365 Education
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Educational productivity tools</p>
            </div>
            <div className="text-center">
              <a 
                href="https://workspace.google.com/education/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0FA0CE] hover:text-blue-600 font-medium transition-colors block"
              >
                Google Workspace Education
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Collaborative learning tools</p>
            </div>
            <div className="text-center">
              <a 
                href="https://www.edweek.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0FA0CE] hover:text-blue-600 font-medium transition-colors block"
              >
                Education Week
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Education industry insights</p>
            </div>
            <div className="text-center">
              <a 
                href="https://www.edsurge.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0FA0CE] hover:text-blue-600 font-medium transition-colors block"
              >
                EdSurge
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Educational technology news</p>
            </div>
            <div className="text-center">
              <a 
                href="https://www.nea.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0FA0CE] hover:text-blue-600 font-medium transition-colors block"
              >
                National Education Association
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Teacher advocacy and resources</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

// Helper component for checkmark icon
const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

export default StrategyReview; 