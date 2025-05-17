import React, { useState, useEffect } from "react";
import { Head, Link, usePage, router } from "@inertiajs/react";
import Header from "@/Components/Header";

const PostIndex = ({
    posts,
    pagination,
    activeCategory,
    categories,
    featuredPosts,
}) => {
    const { current_page, last_page } = pagination;
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSlideChange = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
        }, 10000);

        return () => clearInterval(interval);
    }, [featuredPosts.length]);

    // Add 'Semua' to the categories array if it's not already there
    const allCategories = ["Semua", ...new Set(categories)].sort();

    const handleCategoryChange = (category) => {
        router.get(
            "/posts",
            {
                category: category,
            },
            {
                preserveScroll: true,
            }
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <Header />
            <Head title="Blog & Artikel" />

            {/* Hero Section with Animated Background */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-400 to-blue-600 text-white py-24">
                <div className="absolute inset-0 bg-grid-white/[0.05]" />
                <div className="relative container mx-auto px-4 text-center z-10">
                    <div className="inline-block px-4 py-1.5 mb-4 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full text-blue-100">
                        Artikel Terbaru
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                        Blog & Artikel
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Temukan informasi terbaru seputar UMKM, tips bisnis, dan
                        cerita inspiratif dari pelaku usaha.
                    </p>
                </div>

                {/* Animated Waves */}
                {/* <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                    <svg className="w-full h-16 text-blue-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512,64,583,67.3c104.4,6,202.2-28,296.07-61.07,40.92-14.26,81.31-29.54,123.08-42.17,11.77-3.63,24.16-6.26,36.84-4.06V0Z" className="fill-current opacity-25"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" className="fill-current opacity-50"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-current"></path>
                    </svg>
                </div> */}
            </div>

            {/* Category Filter - Updated to hide scrollbar but keep functionality */}
            <div className="bg-white shadow-sm sticky top-16 z-20">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto scrollbar-hide">
                        <div className="flex space-x-4 py-4">
                            {allCategories.slice(0, 8).map((category) => (
                                <button
                                    key={category}
                                    onClick={() =>
                                        handleCategoryChange(category)
                                    }
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                        activeCategory === category
                                            ? "bg-blue-600 text-white shadow-md"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="relative">
                        <div className="md:flex md:items-stretch">
                            {/* Image Container */}
                            <div className="md:w-1/2 relative h-60 md:h-[300px] lg:h-[350px]">
                                {featuredPosts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        className={`absolute inset-0 transition-opacity duration-500 ${
                                            index === currentSlide
                                                ? "opacity-100"
                                                : "opacity-0"
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

                            {/* Content Container */}
                            <div className="p-8 md:w-1/2 md:flex md:flex-col">
                                <div>
                                    <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
                                        {featuredPosts[currentSlide].tags?.[0]
                                            ?.title || "Artikel"}
                                    </div>
                                    <Link
                                        href={`/posts/${featuredPosts[currentSlide].id}`}
                                        className="block mt-1 text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                    >
                                        {featuredPosts[currentSlide].title}
                                    </Link>
                                    <p className="mt-3 text-gray-600 line-clamp-3">
                                        {
                                            featuredPosts[currentSlide]
                                                .description
                                        }
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-medium">
                                                {featuredPosts[
                                                    currentSlide
                                                ].user?.name?.charAt(0) || "A"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">
                                            {featuredPosts[currentSlide].user
                                                ?.name || "Admin"}
                                        </p>
                                        <div className="flex space-x-1 text-sm text-gray-500">
                                            <time
                                                dateTime={
                                                    featuredPosts[currentSlide]
                                                        .created_at
                                                }
                                            >
                                                {new Date(
                                                    featuredPosts[
                                                        currentSlide
                                                    ].created_at
                                                ).toLocaleDateString("id-ID", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </time>
                                            <span aria-hidden="true">
                                                &middot;
                                            </span>
                                            <span>5 min read</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slider Navigation */}
                        {featuredPosts.length > 1 && (
                            <div className="flex justify-between absolute bottom-4 left-4 right-4">
                                <button
                                    onClick={() =>
                                        handleSlideChange(
                                            (currentSlide -
                                                1 +
                                                featuredPosts.length) %
                                                featuredPosts.length
                                        )
                                    }
                                    className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
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
                                            onClick={() =>
                                                handleSlideChange(index)
                                            }
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                index === currentSlide
                                                    ? "bg-blue-600"
                                                    : "bg-gray-300"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={() =>
                                        handleSlideChange(
                                            (currentSlide + 1) %
                                                featuredPosts.length
                                        )
                                    }
                                    className="p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
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

            {/* Posts Grid */}
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Artikel Terbaru
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.slice(1).map((post) => (
                        <div
                            key={post.id}
                            className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            {post.photo && (
                                <div className="h-56 overflow-hidden">
                                    <img
                                        src={`/storage/posts/${post.photo}`}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-500 mb-3">
                                    <span>
                                        {new Date(
                                            post.created_at
                                        ).toLocaleDateString("id-ID", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </span>
                                    {post.tags?.length > 0 && (
                                        <span className="mx-2">•</span>
                                    )}
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags?.slice(0, 2).map((tag) => (
                                            <span
                                                key={tag.id}
                                                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                            >
                                                {tag.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-3">
                                    {post.description}
                                </p>
                                <Link
                                    href={`/posts/${post.id}`}
                                    className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center"
                                >
                                    Baca Selengkapnya
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-16">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-gray-900">
                            Belum ada artikel
                        </h3>
                        <p className="mt-1 text-gray-500">
                            Silakan kembali lagi nanti untuk melihat artikel
                            terbaru.
                        </p>
                    </div>
                ) : (
                    <div className="flex justify-center mt-10">
                        <nav className="flex items-center space-x-1">
                            {current_page > 1 && (
                                <Link
                                    href={`/posts?page=${current_page - 1}`}
                                    className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                                    preserveScroll
                                >
                                    Previous
                                </Link>
                            )}

                            <span className="px-3 py-1 text-gray-700">
                                Halaman {current_page} dari {last_page}
                            </span>

                            {current_page < last_page && (
                                <Link
                                    href={`/posts?page=${current_page + 1}`}
                                    className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                                    preserveScroll
                                >
                                    Next
                                </Link>
                            )}
                        </nav>
                    </div>
                )}
            </div>

            {/* Newsletter Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold mb-4">
                            Dapatkan Update Terbaru
                        </h2>
                        <p className="text-xl text-blue-100 mb-8">
                            Daftar newsletter kami untuk mendapatkan artikel
                            terbaru langsung ke email Anda
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Alamat email Anda"
                                className="flex-1 px-5 py-3 rounded-lg border-0 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-gray-900"
                            />
                            <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-medium px-6 py-3 rounded-lg transition-colors">
                                Berlangganan
                            </button>
                        </div>
                        <p className="text-sm text-blue-200 mt-3">
                            Kami menghormati privasi Anda. Berhenti berlangganan
                            kapan saja.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Tentang Kami
                            </h3>
                            <p className="text-gray-600">
                                Platform informasi dan inspirasi untuk
                                pengembangan UMKM di Indonesia.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Kategori
                            </h3>
                            <ul className="space-y-2">
                                {allCategories.slice(0, 5).map((category) => (
                                    <li key={category}>
                                        <button
                                            onClick={() =>
                                                handleCategoryChange(category)
                                            }
                                            className="text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Tautan Cepat
                            </h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/tentang-kami"
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        Tentang Kami
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/kebijakan-privasi"
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        Kebijakan Privasi
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/syarat-ketentuan"
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        Syarat & Ketentuan
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/kontak"
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        Kontak
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Ikuti Kami
                            </h3>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-blue-600 transition-colors"
                                >
                                    <span className="sr-only">Facebook</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-blue-400 transition-colors"
                                >
                                    <span className="sr-only">Twitter</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-pink-600 transition-colors"
                                >
                                    <span className="sr-only">Instagram</span>
                                    <svg
                                        className="h-6 w-6"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.976.045-1.505.207-1.858.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <p className="text-center text-gray-500 text-sm">
                            &copy; {new Date().getFullYear()} UMKM Marketplace.
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Add global style to hide scrollbars but keep functionality */}
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
