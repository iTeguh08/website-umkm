import React, { useState, useEffect, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Hero from "@/Components/PostComponent/Hero";
import StickyPosts from "@/Components/PostComponent/StickyPosts";
import CategoryFilter from "@/Components/PostComponent/CategoryFilter";
import FeaturedPostsCarousel from "@/Components/PostComponent/FeaturedPostsCarousel";
import PostsGrid from "@/Components/PostComponent/PostsGrid";
import NewsletterSection from "@/Components/PostComponent/NewsletterSection";

const PostIndex = ({
    posts,
    pagination,
    activeCategory,
    categories,
    featuredPosts,
    stickyPosts = [],
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const intervalRef = useRef(null);

    // Function to reset the auto-advance interval
    const resetAutoAdvance = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        
        if (featuredPosts?.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
            }, 10000);
        }
    };

    // Auto-advance slides for featured posts
    useEffect(() => {
        resetAutoAdvance();
        
        // Cleanup interval on component unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [featuredPosts?.length]);

    // Handle slide change from carousel
    const handleSlideChange = (newSlide) => {
        setCurrentSlide(newSlide);
        resetAutoAdvance();
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Head title="Blog & Artikel" />
            <Header />
            
            <Hero />
            
            <StickyPosts stickyPosts={stickyPosts} />
            
            <CategoryFilter 
                activeCategory={activeCategory} 
                categories={categories} 
            />
            
            <FeaturedPostsCarousel 
                featuredPosts={featuredPosts} 
                currentSlide={currentSlide}
                onSlideChange={handleSlideChange}
            />
            
            <PostsGrid 
                posts={posts} 
                pagination={pagination} 
            />
            
            <NewsletterSection />
            
            <Footer />

            <style jsx global>{`
                /* Hide scrollbar for Chrome, Safari and Opera */
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }

                /* Hide scrollbar for IE, Edge and Firefox */
                .scrollbar-hide {
                    -ms-overflow-style: none; /* IE and Edge */
                    scrollbar-width: none; /* Firefox */
                }
            `}</style>
        </div>
    );
};

export default PostIndex;
