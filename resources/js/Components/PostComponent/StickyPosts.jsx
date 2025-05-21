import React from 'react';
import { Link } from '@inertiajs/react';

const StickyPosts = ({ stickyPosts = [] }) => {
    if (!stickyPosts?.length) return null;

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center mb-8">
                    <div className="h-10 w-1 bg-blue-600 rounded-full mr-4"></div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Postingan Penting
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stickyPosts.map((post) => (
                        <div
                            key={post.id}
                            className="group relative aspect-square rounded-md overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500"
                        >
                            <img
                                src={`/storage/posts/${post.photo}`}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            <div className="absolute top-4 right-4 z-10">
                                <span className="inline-flex items-center px-3 py-1 rounded-2xl text-xs font-semibold bg-red-500 text-gray-100 shadow-lg">
                                    PENTING
                                </span>
                            </div>

                            {post.tags?.length > 0 && (
                                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                                    {post.tags.slice(0, 2).map((tag) => (
                                        <span
                                            key={tag.id}
                                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                        >
                                            {tag.title}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="absolute inset-0 p-6 text-white flex flex-col justify-end">
                                <div className="flex items-center text-sm text-white/80 mb-2">
                                    <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span>
                                        {new Date(post.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                                    <Link
                                        href={`/posts/${post.id}`}
                                        className="hover:underline"
                                    >
                                        {post.title}
                                    </Link>
                                </h3>

                                <p className="text-white/90 mb-4 line-clamp-2 text-sm">
                                    {post.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                                    <div className="flex items-center">
                                        {post.user?.avatar ? (
                                            <img
                                                className="h-8 w-8 rounded-full border-2 border-white/50 mr-2"
                                                src={`/storage/${post.user.avatar}`}
                                                alt={post.user.name}
                                            />
                                        ) : (
                                            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/50">
                                                <span className="text-white font-medium">
                                                    {post.user?.name?.charAt(0) || 'A'}
                                                </span>
                                            </div>
                                        )}
                                        <span className="ml-2 text-sm font-medium text-white">
                                            {post.user?.name || 'Admin'}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/posts/${post.id}`}
                                        className="inline-flex items-center text-white font-medium hover:text-blue-200 text-sm"
                                    >
                                        Baca Selengkapnya
                                        <svg
                                            className="ml-1 w-4 h-4"
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
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StickyPosts;
