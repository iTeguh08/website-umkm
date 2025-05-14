import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';
import Sidebar from '@/Components/Sidebar';

export default function Edit({ auth, tag }) {
    const { data, setData, tag: submitForm, processing, errors, reset } = useForm({
        title: tag.title || '',
        description: tag.description || '',
        photo: null,
        _method: 'PUT',
    });

    const [photoPreview, setPhotoPreview] = useState(tag.photo ? `/storage/tags/${tag.photo}` : null);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitForm(route('tags.update', tag.id), {
            preserveScroll: true,
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
        }
    };

    return (
        <>
            <Sidebar />
            <div className="pl-64 bg-gray-50 min-h-screen">

                <AuthenticatedLayout user={auth.user}>
                    <Head title="Edit Tag" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">Edit Tag</h2>
                                        <Link
                                            href={route('tags.index')}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                        >
                                            Back to Tags
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
                                                required
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
                                                    <div className="h-48 w-full md:w-1/2 overflow-hidden rounded-md">
                                                        <img
                                                            src={photoPreview}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-end">
                                            <PrimaryButton className="ml-4" disabled={processing}>
                                                Update Tag
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