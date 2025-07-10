
const Screenshots = () => {
  return (
    <section aria-labelledby="screenshots-title" className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <h2 id="screenshots-title" className="text-4xl font-bold text-center mb-16 text-gray-900">More Features to Explore</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {[
            {
              src: "/lovable-uploads/28317119-fd83-41b2-b877-3b195a794b2a.png",
              alt: "iSchedulEDU saved schedules management interface showing organized school timetables for teachers"
            },
            {
              src: "/lovable-uploads/75200545-4ea3-40be-90f7-7448e464ef66.png",
              alt: "iSchedulEDU daily schedule notifications setup screen for class period alerts and reminders"
            },
            {
              src: "/lovable-uploads/53195535-6434-4fc8-abce-a78ac1dc6f99.png",
              alt: "iSchedulEDU daily timeline view displaying complete school day schedule with class periods and times"
            },
            {
              src: "/lovable-uploads/900bfec1-1999-467d-872a-7be015674168.png",
              alt: "iSchedulEDU rotating block schedule calendar managing A-day B-day alternating class periods for schools"
            }
          ].map((image, index) => (
            <div
              key={index}
              className="transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl rounded-xl w-full max-w-[180px] md:max-w-[220px]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-offset-2"
                loading="lazy"
                width="220"
                height="476"
                tabIndex={0}
              />
              <p className="text-xs md:text-sm text-gray-900 mt-2 text-center px-2">
                {image.alt}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-900 max-w-3xl mx-auto">
            Experience the full power of iSchedulEDU with features like rotating block schedules, 
            daily notifications, and easy schedule sharing. Perfect for teachers and administrators 
            managing complex school timetables.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Screenshots;
