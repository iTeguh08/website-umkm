import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

// Format date helper function
const formatDate = (dateString) => {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
};

// Import the CategoryFilter component
const CategoryFilter = ({ activeCategory, categories }) => {
    const allCategories = ["Semua", ...categories.filter((cat) => cat !== "Semua")];

    const handleCategoryChange = (category) => {
        router.get(
            "/admin/posts",
            {
                category: category === "Semua" ? null : category,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <div className="mb-6">
            <div className="flex flex-wrap gap-2">
                {allCategories.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category ||
                                (category === "Semua" && !activeCategory)
                                ? "bg-blue-600 text-white shadow-md"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default function Index({ auth, all_categories = [] }) {
    const { posts: allPosts, flash, filters = {} } = usePage().props;
    const [isDeleting, setIsDeleting] = useState(false);
    const activeCategory = filters?.category || null;

    // Use the categories passed from the backend
    const allCategories = ["Semua", ...all_categories];

    // Filter posts based on active category
    const filteredPosts = activeCategory && activeCategory !== "Semua"
        ? allPosts.filter(post =>
            post.tags?.some(tag => tag.title === activeCategory)
        )
        : allPosts;

    const handleDelete = (postId) => {
        if (!confirm('Are you sure you want to delete this post?')) {
            return;
        }

        setIsDeleting(true);

        router.delete(route('posts.destroy', postId), {
            preserveScroll: true,
            onFinish: () => {
                setIsDeleting(false);
            }
        });
    };

    return (
        <>
            <Head title="Posts" />
            <Sidebar />
            <div className="pl-64">
                <AuthenticatedLayout user={auth.user}>
                    <div className="max-w-7xl mx-auto sm:p-6 lg:p-8">
                        <div className="bg-white overflow-hidden shadow-lg rounded-xl">
                            <div className="p-6">
                                {/* Header Section */}
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Posts</h2>
                                        <p className="mt-1 text-sm text-gray-600">Manage your blog posts and articles</p>
                                    </div>
                                    <Link
                                        href={route('posts.create')}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm tracking-wide hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Create Post
                                    </Link>
                                </div>

                                {flash?.message && (
                                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {flash.message}
                                    </div>
                                )}

                                <CategoryFilter
                                    activeCategory={activeCategory}
                                    categories={allCategories}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredPosts.map((post) => (
                                        <div key={post.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
                                            {/* Status Badges */}
                                            <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border-b border-slate-200">
                                                {post.published && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-400/20">
                                                        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        Published
                                                    </span>
                                                )}
                                                {post.featured && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700 ring-1 ring-inset ring-indigo-400/20">
                                                        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-indigo-500"></span>
                                                        Featured
                                                    </span>
                                                )}
                                                {post.sticky && (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-400/20">
                                                        <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-amber-500"></span>
                                                        Sticky
                                                    </span>
                                                )}
                                            </div>

                                            {/* Featured Image with Overlay */}
                                            {post.photo && (
                                                <div className="relative h-48 overflow-hidden group">
                                                    <img
                                                        src={`/storage/posts/${post.photo}`}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                                </div>
                                            )}

                                            <div className="p-5">
                                                {/* Category */}
                                                {post.category && (
                                                    <div className="mb-3">
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-400/20">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                                                            </svg>
                                                            {post.category}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Timestamp with enhanced visibility */}
                                                <div className="flex items-center space-x-4 text-xs font-medium mb-3">
                                                    <div className="flex items-center text-gray-600">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                        <span>Created: {formatDate(post.created_at)}</span>
                                                    </div>
                                                    {post.updated_at && post.updated_at !== post.created_at && (
                                                        <div className="flex items-center text-gray-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                            <span>Updated: {formatDate(post.updated_at)}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Tags with enhanced visibility */}
                                                {post.tags && post.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {post.tags.map(tag => (
                                                            <span
                                                                key={tag.id}
                                                                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 hover:bg-blue-100 transition-colors duration-200"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                                                                </svg>
                                                                {tag.title}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Title & Description */}
                                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                                    {post.description}
                                                </p>

                                                {/* Action Buttons with enhanced visibility */}
                                                <div className="flex items-center space-x-3">
                                                    <Link
                                                        href={route('posts.edit', post.id)}
                                                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 active:bg-amber-200 transition-colors duration-200"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                        </svg>
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        disabled={isDeleting}
                                                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                                            isDeleting
                                                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                                                : "text-rose-700 bg-rose-50 hover:bg-rose-100 active:bg-rose-200"
                                                        }`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                        {isDeleting ? "Deleting..." : "Delete"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Empty State with enhanced visibility */}
                                {filteredPosts.length === 0 && (
                                    <div className="text-center py-12 px-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                            {activeCategory
                                                ? `No posts found in category "${activeCategory}"`
                                                : "No posts available"}
                                        </h3>
                                        <p className="mt-2 text-gray-600">Get started by creating your first blog post</p>
                                        <div className="mt-6">
                                            <Link
                                                href={route('posts.create')}
                                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 shadow-md hover:shadow-lg"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Create New Post
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </>
    );
}