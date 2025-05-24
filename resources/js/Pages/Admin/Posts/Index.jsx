import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

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
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            activeCategory === category ||
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
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-sm">
                            <div className="p-5">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Posts</h2>
                                    <Link
                                        href={route('posts.create')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Create Post
                                    </Link>
                                </div>

                                {flash?.message && (
                                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                                        {flash.message}
                                    </div>
                                )}

                                {/* Category Filter */}
                                <CategoryFilter 
                                    activeCategory={activeCategory}
                                    categories={allCategories}
                                />

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                    {filteredPosts.map((post) => (
                                        <div key={post.id} className="border rounded-md overflow-hidden">
                                            {post.photo && (
                                                <div className="h-48 overflow-hidden">
                                                    <img
                                                        src={`/storage/posts/${post.photo}`}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="text-lg font-semibold">{post.title}</h3>
                                                    {post.category && (
                                                        <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                            {post.category}
                                                        </span>
                                                    )}
                                                </div>
                                                {post.tags && post.tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 mt-1 mb-2">
                                                        {post.tags.map(tag => (
                                                            <span 
                                                                key={tag.id} 
                                                                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                                                            >
                                                                {tag.title}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-gray-600 mt-2 line-clamp-3">{post.description}</p>

                                                <div className="mt-4 flex space-x-2">
                                                    <Link
                                                        href={route('posts.edit', post.id)}
                                                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(post.id)}
                                                        disabled={isDeleting}
                                                        className={`px-3 py-1 rounded-md ${
                                                            isDeleting 
                                                                ? 'bg-gray-400 cursor-not-allowed' 
                                                                : 'bg-red-500 hover:bg-red-600'
                                                        } text-white`}
                                                    >
                                                        {isDeleting ? 'Deleting...' : 'Delete'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {filteredPosts.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        {activeCategory 
                                            ? `No posts found in category "${activeCategory}"` 
                                            : "No posts available. Create one now!"
                                        }
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