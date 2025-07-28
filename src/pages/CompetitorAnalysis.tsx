import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { CheckCircle, XCircle, Star, Download, Smartphone, Clock, Share2, Bell, QrCode, Calendar, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer';

const CompetitorAnalysis: React.FC = () => {
  const competitors = [
    {
      name: "iSchedulEDU",
      type: "Emergency Schedule Generator",
      rating: 5.0,
      downloads: "171+",
      price: "Free with Premium",
      platform: "iOS & iPadOS",
      strengths: [
        "Emergency schedule generation in 2 minutes",
        "A/B rotation management",
        "QR code sharing",
        "Visual timeline view",
        "Daily notifications",
        "Equal time division algorithm",
        "Fire drill & weather delay support",
        "Substitute teacher scenarios",
        "Universal links sharing",
        "PDF export capabilities"
      ],
      weaknesses: [],
      targetAudience: "Teachers, Educators, School Administrators",
      uniqueFeatures: [
        "Intelligent equal time division",
        "Emergency scenario optimization",
        "iOS-native AlarmKit integration",
        "Universal link sharing",
        "Real-time schedule generation"
      ],
      isOurApp: true
    },
    {
      name: "Planbook",
      type: "General Lesson Planning",
      rating: 4.2,
      downloads: "500K+",
      price: "$14.99/year",
      platform: "Web, iOS, Android",
      strengths: [
        "Comprehensive lesson planning",
        "Standards alignment",
        "Grade book integration",
        "Resource sharing",
        "Long-term planning"
      ],
      weaknesses: [
        "No emergency schedule features",
        "Complex for quick changes",
        "Expensive subscription",
        "Not designed for schedule disruptions",
        "Limited mobile optimization"
      ],
      targetAudience: "Teachers, School Districts",
      uniqueFeatures: [
        "Standards-based planning",
        "District-wide implementation",
        "Advanced reporting"
      ],
      isOurApp: false
    },
    {
      name: "TeacherKit",
      type: "Classroom Management",
      rating: 4.0,
      downloads: "200K+",
      price: "Free with Premium",
      platform: "iOS, Android",
      strengths: [
        "Student behavior tracking",
        "Grade management",
        "Attendance tracking",
        "Parent communication",
        "Seating charts"
      ],
      weaknesses: [
        "No schedule generation",
        "Limited emergency features",
        "Complex interface",
        "Not focused on scheduling",
        "Overkill for simple needs"
      ],
      targetAudience: "Teachers, School Administrators",
      uniqueFeatures: [
        "Behavior tracking",
        "Parent portal",
        "Attendance management"
      ],
      isOurApp: false
    },
    {
      name: "Google Calendar",
      type: "General Calendar",
      rating: 4.5,
      downloads: "1B+",
      price: "Free",
      platform: "All Platforms",
      strengths: [
        "Universal availability",
        "Integration with Google Workspace",
        "Collaborative features",
        "Cross-platform sync",
        "Free to use"
      ],
      weaknesses: [
        "No education-specific features",
        "Manual schedule creation",
        "No equal time division",
        "Not designed for emergency scenarios",
        "Limited sharing options for schools"
      ],
      targetAudience: "General Users",
      uniqueFeatures: [
        "Google Workspace integration",
        "Real-time collaboration",
        "Extensive third-party support"
      ],
      isOurApp: false
    },
    {
      name: "Microsoft Outlook",
      type: "Email & Calendar",
      rating: 4.3,
      downloads: "500M+",
      price: "Subscription",
      platform: "All Platforms",
      strengths: [
        "Professional email integration",
        "Meeting scheduling",
        "Resource booking",
        "Enterprise features",
        "Security compliance"
      ],
      weaknesses: [
        "Not education-focused",
        "Complex for simple scheduling",
        "No emergency schedule features",
        "Expensive licensing",
        "Overkill for teachers"
      ],
      targetAudience: "Business Users",
      uniqueFeatures: [
        "Enterprise security",
        "Advanced email features",
        "Resource management"
      ],
      isOurApp: false
    }
  ];

  const marketAnalysis = {
    totalMarket: "$2.5B",
    growthRate: "12% annually",
    keyTrends: [
      "Mobile-first solutions",
      "Emergency preparedness",
      "Teacher productivity tools",
      "Real-time collaboration",
      "AI-powered automation"
    ],
    opportunities: [
      "Emergency schedule generation",
      "Teacher-specific features",
      "Mobile optimization",
      "Quick deployment",
      "Cost-effective solutions"
    ]
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
            <span className="text-gray-900 dark:text-gray-100 font-semibold">Competitor Analysis</span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Competitive Landscape Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            How iSchedulEDU compares to other educational scheduling and planning tools in the market
          </p>
        </div>

        {/* Market Overview */}
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-600" />
              Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">{marketAnalysis.totalMarket}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Market Size</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{marketAnalysis.growthRate}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Annual Growth Rate</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">5</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Key Competitors</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Key Market Trends</h3>
                <ul className="space-y-2">
                  {marketAnalysis.keyTrends.map((trend, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {trend}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Market Opportunities</h3>
                <ul className="space-y-2">
                  {marketAnalysis.opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {opportunity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competitor Comparison */}
        <div className="space-y-8">
          {competitors.map((competitor, index) => (
            <Card key={index} className={`shadow-lg ${competitor.isOurApp ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">
                      {competitor.name}
                      {competitor.isOurApp && (
                        <Badge className="ml-2 bg-blue-600">Our App</Badge>
                      )}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-semibold">{competitor.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{competitor.downloads}</p>
                      <p className="text-xs text-gray-500">Downloads</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{competitor.price}</p>
                      <p className="text-xs text-gray-500">Price</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-4 h-4" />
                    {competitor.platform}
                  </span>
                  <span>{competitor.type}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Strengths */}
                  <div>
                    <h4 className="font-semibold mb-3 text-green-700 dark:text-green-400 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {competitor.strengths.map((strength, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  {competitor.weaknesses.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-red-700 dark:text-red-400 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Weaknesses
                      </h4>
                      <ul className="space-y-2">
                        {competitor.weaknesses.map((weakness, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                            <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Unique Features */}
                  <div>
                    <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-400 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Unique Features
                    </h4>
                    <ul className="space-y-2">
                      {competitor.uniqueFeatures.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2">
                          <Star className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Target Audience</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{competitor.targetAudience}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Competitive Advantages */}
        <Card className="mt-12 shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="text-white">iSchedulEDU Competitive Advantages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Speed</h4>
                <p className="text-sm opacity-90">Create emergency schedules in under 2 minutes</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Teacher-Focused</h4>
                <p className="text-sm opacity-90">Designed specifically for educational scenarios</p>
              </div>
              <div className="text-center">
                <QrCode className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Easy Sharing</h4>
                <p className="text-sm opacity-90">QR codes and universal links for instant sharing</p>
              </div>
              <div className="text-center">
                <Bell className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Smart Notifications</h4>
                <p className="text-sm opacity-90">Automated alerts for schedule changes</p>
              </div>
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Emergency Ready</h4>
                <p className="text-sm opacity-90">Optimized for fire drills, weather delays, assemblies</p>
              </div>
              <div className="text-center">
                <Smartphone className="w-12 h-12 mx-auto mb-3 text-blue-200" />
                <h4 className="font-semibold mb-2">Mobile First</h4>
                <p className="text-sm opacity-90">Native iOS and iPadOS experience</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Card className="bg-white dark:bg-gray-800 shadow-lg">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                Experience the Difference
              </h2>
              <p className="text-xl mb-6 text-gray-600 dark:text-gray-300">
                Join thousands of teachers who choose iSchedulEDU for emergency schedule generation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('https://apps.apple.com/us/app/ischeduledu/id6504114850', '_blank')}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download iSchedulEDU
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white/10 border-gray-300 text-gray-700 hover:bg-gray-100 backdrop-blur-sm"
                  onClick={() => window.open('https://ischeduledu.app', '_blank')}
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CompetitorAnalysis; 