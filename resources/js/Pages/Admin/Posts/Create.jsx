import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import Sidebar from '@/Components/Sidebar';

export default function Create({ auth }) {
    const { tags } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
        photo: null,
        tags: [],
        sticky: false,
        published: false,
        featured: false,
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [searchTag, setSearchTag] = useState('');
    const [tagSuggestions, setTagSuggestions] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('photo', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };

    const handleTagSearch = (e) => {
        const query = e.target.value;
        setSearchTag(query);
        
        if (query.length > 0) {
            const filteredTags = tags.filter(tag => 
                tag.title.toLowerCase().includes(query.toLowerCase()) && 
                !data.tags.some(selectedTag => selectedTag.id === tag.id)
            );
            setTagSuggestions(filteredTags);
        } else {
            setTagSuggestions([]);
        }
    };

    const handleSelectTag = (tag) => {
        setData('tags', [...data.tags, tag]);
        setSearchTag('');
        setTagSuggestions([]);
    };

    const handleRemoveTag = (tagId) => {
        setData('tags', data.tags.filter(tag => tag.id !== tagId));
    };

    console.log('errors', errors);
    
    return (
        <>
            <Sidebar />
            <div className="pl-64 bg-gray-50 min-h-screen">

                <AuthenticatedLayout user={auth.user}>
                    <Head title="Create Post" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">Create New Post</h2>
                                        <Link
                                            href={route('posts.index')}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                        >
                                            Back to Posts
                                        </Link>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <InputLabel htmlFor="title" value="Title" />
                                            <TextInput
                                                id="title"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.title} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="description" value="Description" />
                                            <TextArea
                                                id="description"
                                                className="mt-1 block w-full"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                rows={6}
                                            />
                                            <InputError message={errors.description} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="photo" value="Photo (Optional)" />
                                            <input
                                                id="photo"
                                                type="file"
                                                className="mt-1 block w-full"
                                                onChange={handlePhotoChange}
                                                accept="image/*"
                                            />
                                            <InputError message={errors.photo} className="mt-2" />

                                            {photoPreview && (
                                                <div className="mt-4">
                                                    <div className="w-full md:w-1/2 overflow-hidden rounded-md">
                                                        <img
                                                            src={photoPreview}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.sticky}
                                                        onChange={(e) => setData('sticky', e.target.checked)}
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                    <span className="text-sm text-gray-700">Sticky (Penting)</span>
                                                </label>
                                                <InputError message={errors.sticky} className="mt-2" />
                                            </div>

                                            <div>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.published}
                                                        onChange={(e) => setData('published', e.target.checked)}
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                    <span className="text-sm text-gray-700">Published (Tayang)</span>
                                                </label>
                                                <InputError message={errors.published} className="mt-2" />
                                            </div>

                                            <div>
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={data.featured}
                                                        onChange={(e) => setData('featured', e.target.checked)}
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    />
                                                    <span className="text-sm text-gray-700">Featured (Utama)</span>
                                                </label>
                                                <InputError message={errors.featured} className="mt-2" />
                                            </div>
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="tags" value="Tags" />
                                            <div className="mt-1">
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {data.tags.map(tag => (
                                                        <div key={tag.id} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                                            <span>{tag.title}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveTag(tag.id)}
                                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                                            >
                                                                &times;
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                                <TextInput
                                                    id="tags"
                                                    type="text"
                                                    className="block w-full"
                                                    value={searchTag}
                                                    onChange={handleTagSearch}
                                                    placeholder="Search for tags..."
                                                />
                                                {tagSuggestions.length > 0 && (
                                                    <ul className="border rounded-md mt-1 max-h-40 overflow-y-auto">
                                                        {tagSuggestions.map(tag => (
                                                            <li
                                                                key={tag.id}
                                                                onClick={() => handleSelectTag(tag)}
                                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                                            >
                                                                {tag.title}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                            <InputError message={errors.tags} className="mt-2" />
                                        </div>

                                        <div className="flex items-center justify-end">
                                            <PrimaryButton className="ml-4" disabled={processing}>
                                                Create Post
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </>
    );
}