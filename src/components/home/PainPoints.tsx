
import { Clock, Frown, PieChart, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PainPoint = ({ 
  icon: Icon, 
  title, 
  description 
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
    <CardContent className="p-6">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <div className="bg-blue-50 p-3 rounded-full mb-4">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </CardContent>
  </Card>
);

const PainPoints = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          Challenges Every Teacher Faces
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          If these scheduling struggles sound familiar, you're not alone
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <PainPoint 
            icon={Clock}
            title="Last-Minute Changes"
            description="Assemblies, early dismissals, and weather delays create scheduling chaos that take precious time to reorganize."
          />
          
          <PainPoint 
            icon={Frown}
            title="Schedule Stress"
            description="Feeling overwhelmed when you need to quickly adjust class times while preserving important events like lunch."
          />
          
          <PainPoint 
            icon={PieChart}
            title="Complex Rotations"
            description="Keeping track of A/B days or multi-day rotations becomes confusing, especially after breaks or disruptions."
          />
          
          <PainPoint 
            icon={AlertCircle}
            title="Transition Uncertainty"
            description="Constantly checking the clock during instruction, worried about missing transition times or running over schedule."
          />
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
