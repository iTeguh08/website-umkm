import React, { useState } from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function Index({ auth }) {
    const { posts: initialPosts, flash } = usePage().props;
    const [posts, setPosts] = useState(initialPosts);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = (postId) => {
        if (!confirm('Are you sure you want to delete this post?')) {
            return;
        }

        setIsDeleting(true);
        
        router.delete(route('posts.destroy', postId), {
            preserveScroll: true, // Mencegah scroll ke atas
            onSuccess: () => {
                // Update daftar posts setelah penghapusan
                setPosts(posts.filter(post => post.id !== postId));
            },
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
                    <div className="max-w-7xl mx-auto sm:p-6 lg:p-8 ">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-sm">
                            <div className="p-5 bg-white border-b border-gray-200">
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

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts.map((post) => (
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
                                                <h3 className="text-lg font-semibold">{post.title}</h3>
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

                                {posts.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        No posts available. Create one now!
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