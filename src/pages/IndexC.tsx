import StickyNavigation from "@/components/home/StickyNavigation";
import Footer from "@/components/home/Footer";
import AppStoreButton from "@/components/home/AppStoreButton";
import { Download, Star } from "lucide-react";

const IndexC = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-tr from-[#e5f9ff] via-[#fdf6fb] to-[#caf0f8] text-gray-800 animate-fade-in">
      <StickyNavigation />
      {/* Hero Section */}
      <header className="flex flex-col flex-1 items-center justify-center text-center pt-24 md:pt-32 pb-12 relative z-10">
        {/* Conversion-optimized background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-tr from-[#0FA0CE]/20 to-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-50px] right-0 w-96 h-64 bg-gradient-to-br from-[#0FA0CE]/10 to-pink-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <img
            src="/lovable-uploads/6bccc818-bd50-4f4a-ad6e-ebf8c4736a68.png"
            alt="iSchedulEDU App Logo"
            className="mx-auto w-28 h-28 md:w-40 md:h-40 rounded-3xl shadow-2xl border-4 border-white mb-8 animate-scale-in"
          />

          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white font-bold text-base mb-8 shadow-lg">
            <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            Featured by Educators
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#0FA0CE] via-blue-600 to-gray-900 text-transparent bg-clip-text mb-6 tracking-tight drop-shadow">
            Effortless Schedules. <span className="text-blue-600">Zero Stress.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-8 max-w-xl mx-auto leading-snug">
            Create, share, and update school schedules in <span className="text-[#0FA0CE] font-bold">seconds</span>. Focus on teaching—let iSchedulEDU handle the rest!
          </p>

          {/* CTA: Download on App Store */}
          <div className="flex flex-col items-center gap-6 mt-8">
            <AppStoreButton variant="dark" className="w-[270px] animate-scale-in" />
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-gray-700 text-base font-medium mb-2">
              <Download className="w-5 h-5 text-blue-500" />
              <span>4 FREE Sessions &mdash; No Card Needed!</span>
            </div>
            <div className="text-xs text-gray-500">Only on iOS &amp; iPadOS</div>
          </div>
        </div>
      </header>

      {/* Conversion badge row */}
      <div className="max-w-3xl mx-auto mb-12 flex flex-col md:flex-row gap-4 justify-center items-center text-center">
        <div className="px-4 py-2 bg-green-100 rounded-full text-green-900 font-medium flex items-center gap-2 shadow">
          <Star className="w-4 h-4 text-green-500" /> Rated 4.9 by Teachers
        </div>
        <div className="px-4 py-2 bg-blue-100 rounded-full text-blue-900 font-medium flex items-center gap-2 shadow">
          <span>1000+ Downloads</span>
        </div>
        <div className="px-4 py-2 bg-pink-100 rounded-full text-pink-900 font-medium flex items-center gap-2 shadow">
          <span>No Subscription Required</span>
        </div>
      </div>

      {/* Minimal feature highlights, to keep focus on CTA */}
      <section className="max-w-4xl mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-2">
        <div className="bg-white/80 rounded-2xl p-6 shadow hover:shadow-xl border border-blue-50 transition group">
          <h3 className="text-xl font-bold mb-2 text-[#0FA0CE]">Instant Schedules</h3>
          <p className="text-gray-700 text-base">Create any custom or abbreviated school schedule in just one tap.</p>
        </div>
        <div className="bg-white/80 rounded-2xl p-6 shadow hover:shadow-xl border border-blue-50 transition group">
          <h3 className="text-xl font-bold mb-2 text-[#0FA0CE]">Share with Staff</h3>
          <p className="text-gray-700 text-base">Send your schedule to teachers via QR code, link, or AirDrop.</p>
        </div>
        <div className="bg-white/80 rounded-2xl p-6 shadow hover:shadow-xl border border-blue-50 transition group">
          <h3 className="text-xl font-bold mb-2 text-[#0FA0CE]">No More Mistakes</h3>
          <p className="text-gray-700 text-base">Beautiful, accurate schedules—every time, in just seconds.</p>
        </div>
      </section>

      {/* Second CTA */}
      <div className="text-center mt-10 mb-20">
        <AppStoreButton variant="dark" className="w-[270px] animate-scale-in" />
        <div className="mt-2 text-xs text-gray-500">Download now - 4 free uses!</div>
      </div>

      <Footer />
    </div>
  );
};

export default IndexC;
