
const Screenshots = () => {
  return (
    <section aria-labelledby="screenshots-title" className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <h2 id="screenshots-title" className="text-4xl font-bold text-center mb-16 text-gray-900">More Features to Explore</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 justify-items-center">
          {[
            {
              src: "/lovable-uploads/ischededu-saved-schedules-management-interface.png",
              alt: "iSchedulEDU saved schedules management interface showing organized school timetables for teachers and administrators"
            },
            {
              src: "/lovable-uploads/ischededu-daily-notifications-setup-screen.png",
              alt: "iSchedulEDU daily schedule notifications setup screen for class period alerts and reminders for educators"
            },
            {
              src: "/lovable-uploads/ischededu-daily-timeline-schedule-view.png",
              alt: "iSchedulEDU daily timeline view displaying complete school day schedule with class periods and break times"
            },
            {
              src: "/lovable-uploads/ischededu-rotating-block-schedule-calendar.png",
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
