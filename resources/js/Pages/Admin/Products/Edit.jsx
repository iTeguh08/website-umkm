import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, product }) {
    const { data, setData, post: submitForm, processing, errors, reset } = useForm({
        nama_usaha: product.nama_usaha || '',
        lokasi: product.lokasi || '',
        email: product.email || '',
        telephone: product.telephone || '',
        image: null,
        _method: 'PUT',
    });

    const [imagePreview, setImagePreview] = useState(product.image ? `/storage/products/${product.image}` : null);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitForm(route('products.update', product.id), {
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        console.log('LEWAT: handleImageChange ', data)
    };

    return (
        <>
            <Sidebar />
            <div className="pl-64">
                <AuthenticatedLayout user={auth.user}>
                    <Head nama_usaha="Edit Product" />

                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>
                                        <Link
                                            href={route('products.index')}
                                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                        >
                                            Back to Products
                                        </Link>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <InputLabel htmlFor="nama_usaha" value="Nama Usaha" />
                                            <TextInput
                                                id="nama_usaha"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.nama_usaha}
                                                onChange={(e) => setData('nama_usaha', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.nama_usaha} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="lokasi" value="Location" />
                                            <TextInput
                                                id="lokasi"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.lokasi}
                                                onChange={(e) => setData('lokasi', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.lokasi} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="email" value="Email" />
                                            <TextInput
                                                id="email"
                                                type="email"
                                                className="mt-1 block w-full"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.email} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="telephone" value="Telephone" />
                                            <TextInput
                                                id="telephone"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.telephone}
                                                onChange={(e) => setData('telephone', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.telephone} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="image" value="Image (Optional)" />
                                            <input
                                                id="image"
                                                type="file"
                                                className="mt-1 block w-full"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                            <InputError message={errors.image} className="mt-2" />

                                            {imagePreview && (
                                                <div className="mt-4">
                                                    <div className="h-48 w-full md:w-1/2 overflow-hidden rounded-md">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Preview"
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-end">
                                            <PrimaryButton className="ml-4" disabled={processing}>
                                                Update Product
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