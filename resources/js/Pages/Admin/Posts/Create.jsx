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
            const selectedTagIds = new Set(data.tags.map(tag => tag.id));
            const seenTitles = new Set();
            
            const filteredTags = tags.filter(tag => {
                const isMatch = tag.title.toLowerCase().includes(query.toLowerCase());
                const isNotSelected = !selectedTagIds.has(tag.id);
                const isNotDuplicate = !seenTitles.has(tag.title.toLowerCase());
                
                if (isMatch && isNotSelected && isNotDuplicate) {
                    seenTitles.add(tag.title.toLowerCase());
                    return true;
                }
                return false;
            });
            
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
            <div className="pl-64 bg-slate-50 min-h-screen">
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Create Post" />

                    <div className="py-8">
                        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-xl rounded-xl">
                                <div className="p-8">
                                    {/* Header Section */}
                                    <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
                                            <p className="mt-1 text-sm text-gray-600">Add a new post to your blog</p>
                                        </div>
                                        <Link
                                            href={route('posts.index')}
                                            className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-sm text-gray-700 tracking-wide hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Back to Posts
                                        </Link>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {/* Main Content Section */}
                                        <div className="grid grid-cols-1 gap-8">
                                            <div>
                                                <InputLabel htmlFor="title" value="Title" className="text-base" />
                                                <TextInput
                                                    id="title"
                                                    type="text"
                                                    className="mt-2 block w-full rounded-lg"
                                                    value={data.title}
                                                    onChange={(e) => setData('title', e.target.value)}
                                                    placeholder="Enter post title"
                                                    required
                                                />
                                                <InputError message={errors.title} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="description" value="Description" className="text-base" />
                                                <TextArea
                                                    id="description"
                                                    className="mt-2 block w-full rounded-lg"
                                                    value={data.description}
                                                    onChange={(e) => setData('description', e.target.value)}
                                                    placeholder="Write your post content here..."
                                                    rows={8}
                                                />
                                                <InputError message={errors.description} className="mt-2" />
                                            </div>

                                            {/* Photo Upload Section */}
                                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                                <InputLabel htmlFor="photo" value="Featured Image" className="text-base" />
                                                <p className="mt-1 text-sm text-gray-500">Add a cover image to your post</p>
                                                <div className="mt-4">
                                                    <input
                                                        id="photo"
                                                        type="file"
                                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                                                        onChange={handlePhotoChange}
                                                        accept="image/*"
                                                    />
                                                    <InputError message={errors.photo} className="mt-2" />
                                                </div>

                                                {photoPreview && (
                                                    <div className="mt-4">
                                                        <div className="relative w-full md:w-1/2 aspect-video overflow-hidden rounded-lg border border-gray-200">
                                                            <img
                                                                src={photoPreview}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Post Settings Section */}
                                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                                <h3 className="text-lg font-medium text-gray-900 mb-4">Post Settings</h3>
                                                <div className="space-y-4">
                                                    <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.sticky}
                                                            onChange={(e) => setData('sticky', e.target.checked)}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                        <div>
                                                            <span className="block text-sm font-medium text-gray-900">Sticky Post</span>
                                                            <span className="block text-xs text-gray-500 mt-0.5">Pin this post to the top of the blog</span>
                                                        </div>
                                                    </label>

                                                    <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.published}
                                                            onChange={(e) => setData('published', e.target.checked)}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                        <div>
                                                            <span className="block text-sm font-medium text-gray-900">Published</span>
                                                            <span className="block text-xs text-gray-500 mt-0.5">Make this post visible to readers</span>
                                                        </div>
                                                    </label>

                                                    <label className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.featured}
                                                            onChange={(e) => setData('featured', e.target.checked)}
                                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                        />
                                                        <div>
                                                            <span className="block text-sm font-medium text-gray-900">Featured Post</span>
                                                            <span className="block text-xs text-gray-500 mt-0.5">Highlight this post in featured sections</span>
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>

                                            {/* Tags Section */}
                                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                                <InputLabel htmlFor="tags" value="Tags" className="text-base" />
                                                <p className="mt-1 text-sm text-gray-500">Add relevant tags to help readers find your post</p>
                                                
                                                <div className="mt-4">
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        {data.tags.map(tag => (
                                                            <div key={tag.id} 
                                                                className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full px-3 py-1 text-sm font-medium">
                                                                <span>{tag.title}</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveTag(tag.id)}
                                                                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    
                                                    <div className="relative">
                                                        <TextInput
                                                            id="tags"
                                                            type="text"
                                                            className="block w-full rounded-lg"
                                                            value={searchTag}
                                                            onChange={handleTagSearch}
                                                            placeholder="Search and add tags..."
                                                        />
                                                        
                                                        {tagSuggestions.length > 0 && (
                                                            <ul className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
                                                                {tagSuggestions.map(tag => (
                                                                    <li
                                                                        key={tag.id}
                                                                        onClick={() => handleSelectTag(tag)}
                                                                        className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 flex items-center"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                                                                        </svg>
                                                                        {tag.title}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                </div>
                                                <InputError message={errors.tags} className="mt-2" />
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                                            <Link
                                                href={route('posts.index')}
                                                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-sm text-gray-700 tracking-wide hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                                            >
                                                Cancel
                                            </Link>
                                            <PrimaryButton 
                                                className="px-6" 
                                                disabled={processing}
                                            >
                                                {processing ? 'Creating...' : 'Create Post'}
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