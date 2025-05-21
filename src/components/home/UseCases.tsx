
import { Check } from "lucide-react";

const UseCaseCard = ({
  title,
  description,
  benefits,
}: {
  title: string;
  description: string;
  benefits: string[];
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
    <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <ul className="space-y-2">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

const UseCases = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          How Teachers Use iSchedulEDU
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Perfect for all educators, from elementary to high school
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UseCaseCard
            title="Elementary Teachers"
            description="Manage your classroom with flexible, color-coded schedules that adapt to your school's special events."
            benefits={[
              "Create special schedules for assemblies and early dismissals",
              "Balance time between different subjects easily",
              "Set reminders for specials and lunch periods"
            ]}
          />
          
          <UseCaseCard
            title="Middle School Teachers"
            description="Keep track of rotating block schedules and different class periods throughout the week."
            benefits={[
              "Manage A/B day rotations without confusion",
              "Quick abbreviated schedules for testing days",
              "Timeline view to see your entire day at once"
            ]}
          />
          
          <UseCaseCard
            title="High School Educators"
            description="Handle complex schedules with multiple preps and varying period lengths across different days."
            benefits={[
              "Set up different schedules for different days",
              "Create custom event alerts for labs and extended sessions", 
              "Share schedules with students and colleagues"
            ]}
          />
        </div>
        
        <div className="mt-12 bg-blue-50 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold text-center mb-6">Quick Wins with iSchedulEDU</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <span className="font-bold text-blue-600">1</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Download the app</h4>
                <p className="text-sm text-gray-600">Get started in seconds with a free account</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <span className="font-bold text-blue-600">2</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Create your first schedule</h4>
                <p className="text-sm text-gray-600">Use the guided setup to build your daily routine</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <span className="font-bold text-blue-600">3</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Save hours every week</h4>
                <p className="text-sm text-gray-600">Enjoy a more organized classroom immediately</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
