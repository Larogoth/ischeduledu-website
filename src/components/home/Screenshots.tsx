
const Screenshots = () => {
  return (
    <section aria-labelledby="screenshots-title" className="py-20 bg-gradient-to-b from-white to-[#F5F9FF]">
      <div className="container mx-auto px-4">
        <h2 id="screenshots-title" className="text-4xl font-bold text-center mb-16 text-gray-900">Experience iSchedulEDU in Action</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {[
            {
              src: "/lovable-uploads/200d9b16-92c1-4ec3-aa24-584072b0cdb1.png",
              alt: "iSchedulEDU Schedule Generator - Create custom school schedules with flexible start and end times"
            },
            {
              src: "/lovable-uploads/b93434c2-d5af-4b8b-96d7-1f09f8c3abba.png",
              alt: "iSchedulEDU Generated Schedule View - Review your automatically generated class periods and events"
            },
            {
              src: "/lovable-uploads/88b88a71-f341-4d17-9270-8ad773044011.png",
              alt: "iSchedulEDU Event Editor - Customize class period colors and notifications"
            },
            {
              src: "/lovable-uploads/28317119-fd83-41b2-b877-3b195a794b2a.png",
              alt: "iSchedulEDU Schedule Management - Organize and access all your saved school schedules"
            },
            {
              src: "/lovable-uploads/bc8e3985-c051-4af2-a5fc-afcefeb6ddae.png",
              alt: "iSchedulEDU Block Schedule Example - View detailed class blocks with study halls and lunch periods"
            },
            {
              src: "/lovable-uploads/75200545-4ea3-40be-90f7-7448e464ef66.png",
              alt: "iSchedulEDU Schedule Alerts - Set up daily notifications for your class schedule"
            },
            {
              src: "/lovable-uploads/53195535-6434-4fc8-abce-a78ac1dc6f99.png",
              alt: "iSchedulEDU Daily Timeline View - See your complete school day schedule at a glance"
            },
            {
              src: "/lovable-uploads/900bfec1-1999-467d-872a-7be015674168.png",
              alt: "iSchedulEDU Rotating Schedule Calendar - Manage A/B and rotating block schedules with ease"
            }
          ].map((image, index) => (
            <div
              key={index}
              className="transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl rounded-xl w-full max-w-[320px]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-xl shadow-lg"
                loading="lazy"
                width="320"
                height="692"
              />
              <p className="text-sm text-gray-600 mt-2 text-center px-4">
                {image.alt}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
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
