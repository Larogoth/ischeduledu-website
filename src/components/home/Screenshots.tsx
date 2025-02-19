
const Screenshots = () => {
  return (
    <section aria-labelledby="screenshots-title" className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <h2 id="screenshots-title" className="text-4xl font-bold text-center mb-16 text-gray-900">See it in Action</h2>
        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
          {[
            {
              src: "/lovable-uploads/iphone-input.png",
              alt: "iSchedulEDU Schedule Input Screen - Create your school schedule"
            },
            {
              src: "/lovable-uploads/iphone-generated.png",
              alt: "iSchedulEDU Generated Schedule Screen - View your generated schedule"
            },
            {
              src: "/lovable-uploads/iphone-saved.png",
              alt: "iSchedulEDU Saved Schedules Screen - Access your saved schedules"
            }
          ].map((image, index) => (
            <div
              key={index}
              className="transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl rounded-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-64 rounded-xl shadow-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
