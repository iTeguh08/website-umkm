import React, { useState } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function Index({ auth }) {
    const { tags, flash } = usePage().props;
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Inisialisasi useForm untuk penghapusan
    const { delete: destroy, processing } = useForm();

    // Fungsi untuk menangani penghapusan
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this tag?')) {
            destroy(route('tags.destroy', id), {
                preserveScroll: true, // Mencegah scroll ke atas
                preserveState: true,  // Menjaga state halaman
                onSuccess: () => {
                    // Opsional: Tambahkan logika setelah sukses, misalnya notifikasi
                },
            });
        }
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);
        if (query.length > 0) {
            const filteredTags = tags.filter(tag => tag.title.toLowerCase().includes(query.toLowerCase()));
            setSuggestions(filteredTags);
        } else {
            setSuggestions([]);
        }
    };

    const handleSelectTag = (tag) => {
        setSearch(tag.title);
        setSuggestions([]);
        // You can now send this tag to PostController or handle it as needed
    };

    return (
        <>
            <Head title="Tags" />
            <Sidebar />
            <div className="pl-64">
                <AuthenticatedLayout user={auth.user}>
                    <div className="max-w-7xl mx-auto sm:p-6 lg:p-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-sm">
                            <div className="p-5 bg-white border-b border-gray-200">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Tags</h2>
                                    <Link
                                        href={route('tags.create')}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Create Tag
                                    </Link>
                                </div>

                                {flash?.message && (
                                    <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
                                        {flash.message}
                                    </div>
                                )}

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={handleSearchChange}
                                        placeholder="Search Tags..."
                                        className="border p-2 rounded-md w-full"
                                    />
                                    {suggestions.length > 0 && (
                                        <ul className="border rounded-md mt-2">
                                            {suggestions.map(suggestion => (
                                                <li
                                                    key={suggestion.id}
                                                    onClick={() => handleSelectTag(suggestion)}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {suggestion.title}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tags.map((tag) => (
                                        <div key={tag.id} className="border rounded-md overflow-hidden">
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold">{tag.title}</h3>

                                                <div className="mt-4 flex space-x-2">
                                                    <Link
                                                        href={route('tags.edit', tag.id)}
                                                        className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(tag.id)}
                                                        disabled={processing}
                                                        className={`px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                                                            processing ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {tags.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        No tags available. Create one now!
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