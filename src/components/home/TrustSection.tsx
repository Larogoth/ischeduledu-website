
const TrustSection = () => {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-gray-600 font-medium">Trusted by educators across the country</p>
        </div>
        
        <div className="flex justify-center items-center gap-8 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0FA0CE] mb-1">161</div>
            <div className="text-sm text-gray-600">Downloads</div>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0FA0CE] mb-1">5.0★</div>
            <div className="text-sm text-gray-600">App Store Rating</div>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#0FA0CE] mb-1">100%</div>
            <div className="text-sm text-gray-600">Teacher Built</div>
          </div>
        </div>
        
        <div className="flex justify-center items-center gap-8 opacity-60">
          {/* Placeholder for representative user groups */}
          <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
            School District
          </div>
          <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
            Teachers
          </div>
          <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
            Educators
          </div>
          <div className="bg-gray-300 h-12 w-32 rounded flex items-center justify-center text-gray-600 text-sm font-medium">
            App Store
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Built by a teacher for teachers nationwide
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
