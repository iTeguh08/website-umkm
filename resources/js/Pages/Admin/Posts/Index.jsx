import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function Index({ auth }) {
    const { posts, flash } = usePage().props;
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Posts" />
            <Sidebar />
            <div className="py-12 pl-64">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
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
                                                <Link
                                                    href={route('posts.destroy', post.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                                                    onClick={(e) => {
                                                        if (!confirm('Are you sure you want to delete this post?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Link>
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
            </div>
        </AuthenticatedLayout>
    );
}