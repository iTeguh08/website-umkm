import React from 'react';
import { Link } from '@inertiajs/react';

const PostsGrid = ({ posts = [], pagination = {} }) => {
    const { current_page: currentPage, last_page: lastPage } = pagination;

    if (!posts?.length) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-gray-600">Tidak ada postingan yang ditemukan.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Artikel Terbaru</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.length > 0 &&
                    posts
                        .filter((post) => !post.sticky)
                        .map((post) => (
                            <div
                                key={post.id}
                                className="group bg-white rounded-md shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
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
                                            {post.tags
                                                ?.slice(0, 2)
                                                .map((tag) => (
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
                                        <Link href={`/posts/${post.id}`} className="hover:underline">
                                            {post.title}
                                        </Link>
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
            
            {lastPage > 1 && (
                <div className="flex justify-center mt-10">
                    <nav className="flex items-center space-x-1">
                        {currentPage > 1 && (
                            <Link
                                href={`/posts?page=${currentPage - 1}`}
                                className="px-3 py-1 rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                                preserveScroll
                            >
                                Previous
                            </Link>
                        )}

                        <span className="px-3 py-1 text-gray-700">
                            Halaman {currentPage} dari {lastPage || 1}
                        </span>

                        {currentPage < lastPage && (
                            <Link
                                href={`/posts?page=${currentPage + 1}`}
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
    );
};

export default PostsGrid;
