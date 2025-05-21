import React from 'react';
import { Link } from '@inertiajs/react';

const FeaturedPostsCarousel = ({ 
    featuredPosts = [], 
    currentSlide, 
    onSlideChange 
}) => {
    if (!featuredPosts?.length) return null;

    const handlePrev = (e) => {
        e.preventDefault();
        const newSlide = (currentSlide - 1 + featuredPosts.length) % featuredPosts.length;
        onSlideChange(newSlide);
    };

    const handleNext = (e) => {
        e.preventDefault();
        const newSlide = (currentSlide + 1) % featuredPosts.length;
        onSlideChange(newSlide);
    };

    const goToSlide = (index) => {
        onSlideChange(index);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="bg-white rounded-md shadow-xl overflow-hidden">
                <div className="relative">
                    <div className="md:flex md:items-stretch">
                        <div className="md:w-1/2 relative h-72 md:h-[350px] lg:h-[370px]">
                            {featuredPosts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className={`absolute inset-0 transition-opacity duration-500 ${
                                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                                >
                                    {post.photo && (
                                        <img
                                            className="w-full h-full object-cover"
                                            src={`/storage/posts/${post.photo}`}
                                            alt={post.title}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="p-8 md:w-1/2 md:flex md:flex-col">
                            <div>
                                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                                    {featuredPosts[currentSlide]?.tags?.[0]?.title || 'Artikel'}
                                </div>
                                <Link
                                    href={`/posts/${featuredPosts[currentSlide]?.id}`}
                                    className="block mt-1 text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                    {featuredPosts[currentSlide]?.title}
                                </Link>
                                <p className="mt-4 text-gray-600 line-clamp-3">
                                    {featuredPosts[currentSlide]?.description}
                                </p>

                                <div className="mt-6">
                                    <Link
                                        href={`/posts/${featuredPosts[currentSlide]?.id}`}
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Baca Selengkapnya
                                        <svg
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-medium">
                                            {featuredPosts[currentSlide]?.user?.name?.charAt(0) || 'A'}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                        {featuredPosts[currentSlide]?.user?.name || 'Admin'}
                                    </p>
                                    <div className="flex space-x-1 text-sm text-gray-500">
                                        <time dateTime={featuredPosts[currentSlide]?.created_at}>
                                            {new Date(featuredPosts[currentSlide]?.created_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                        <span aria-hidden="true">&middot;</span>
                                        <span>5 min read</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {featuredPosts.length > 1 && (
                        <div className="flex justify-between absolute bottom-4 left-4 right-4">
                            <button
                                onClick={handlePrev}
                                className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                                aria-label="Previous slide"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                            <div className="flex space-x-2">
                                {featuredPosts.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={handleNext}
                                className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                                aria-label="Next slide"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeaturedPostsCarousel;
