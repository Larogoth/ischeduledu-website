
const TrustSection = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">Trusted by educators across the country</p>
        </div>
        
        <div className="flex justify-center items-center gap-8 opacity-60">
          {/* Placeholder for client logos - can be replaced with actual logos */}
          <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
            School District
          </div>
          <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
            Education Dept
          </div>
          <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
            Teachers Union
          </div>
          <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
            Education Co.
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            * Placeholder logos - actual client logos can be added here
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
