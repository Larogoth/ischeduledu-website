
import { Download, Star, Check, Zap } from "lucide-react";
import StickyNavigation from "@/components/home/StickyNavigation";
import Footer from "@/components/home/Footer";
import TestimonialCard from "@/components/TestimonialCard";
import AppStoreButton from "@/components/home/AppStoreButton";
import { getTestimonials, testimonials as fallbackTestimonials } from "@/data/testimonials";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/data/testimonials";

const IndexB = () => {
    const [reviews, setReviews] = useState<Testimonial[]>(fallbackTestimonials);

    useEffect(() => {
        getTestimonials().then(setReviews).catch(console.error);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pt-14">
            <StickyNavigation />

            {/* Hero Section */}
            <header className="relative text-center py-24 md:py-32 px-4 bg-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-[#E6F3FF] -z-10"></div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#0FA0CE]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tighter">
                        The Smartest Way to Plan Your School Day.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
                        iSchedulEDU creates perfect abbreviated & custom schedules in seconds. Stop wasting time, start teaching smarter.
                    </p>
                    <div className="flex flex-col items-center gap-y-4">
                        <AppStoreButton />
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>4 Free Sessions &bull; No Credit Card Required</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
                <div className="container mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4">Why You'll Love iSchedulEDU</h2>
                    <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Spend less time planning and more time making a difference.</p>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center p-6">
                            <Zap className="w-12 h-12 text-[#0FA0CE] mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Instant Schedules</h3>
                            <p className="text-gray-600">Generate any schedule type—delayed opening, early dismissal, or special assembly—in under a minute.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <Check className="w-12 h-12 text-green-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Error-Free & Professional</h3>
                            <p className="text-gray-600">Eliminate mistakes and present clear, professional schedules to staff and administrators.</p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6">
                            <Download className="w-12 h-12 text-blue-500 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Share with Ease</h3>
                            <p className="text-gray-600">Instantly share schedules via QR code, text, or email, keeping everyone in the loop.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {reviews.length > 0 && (
                <section className="py-20 px-4 bg-gray-50">
                    <div className="container mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold mb-4">Loved by Teachers Like You</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {reviews.slice(0, 3).map((review) => (
                                <TestimonialCard
                                    key={review.id}
                                    title={review.title}
                                    name={review.name}
                                    content={review.content}
                                    stars={review.stars}
                                    isAppStoreReview={review.isAppStoreReview}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}
            
            {/* Final CTA */}
            <section className="bg-gradient-to-r from-[#0FA0CE] to-blue-600 text-white py-20 px-4">
                <div className="container mx-auto text-center max-w-3xl">
                    <h2 className="text-4xl font-bold mb-4">Ready to Reclaim Your Time?</h2>
                    <p className="text-xl opacity-90 mb-8">
                        Download iSchedulEDU today and experience the future of school scheduling. Your first 4 schedules are on us!
                    </p>
                    <AppStoreButton variant='light' />
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default IndexB;
