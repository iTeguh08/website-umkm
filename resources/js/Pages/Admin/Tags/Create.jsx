import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Sidebar from '@/Components/Sidebar';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tags.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Sidebar />
            <div className="pl-64 bg-gray-50 min-h-screen">
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Create Tag" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">Create New Tag</h2>
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
                                        <div className="flex items-center justify-end">
                                            <PrimaryButton className="ml-4" disabled={processing}>
                                                Create Tag
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