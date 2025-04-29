import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function View({ product }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    useEffect(() => {
        if (product.image) {
            const imageUrl = `/storage/products/${product.image}`;
            const image = new Image();
            image.src = imageUrl;

            image.onload = () => {
                // Show loading animation for at least 1 second
                setTimeout(() => {
                    setImagePreview(imageUrl);
                    setIsInitialLoading(false);
                }, 1000);
            };

            image.onerror = () => {
                setIsInitialLoading(false);
            };
        } else {
            setIsInitialLoading(false);
        }
    }, [product.image]);

    const queryString = window.location.search;

    // Buat objek URLSearchParams dari query string
    const urlParams = new URLSearchParams(queryString);

    // Ambil nilai parameter 'page'
    const page = urlParams.get("page");
    return (
        <>
            <Sidebar />
            <div className="pl-64 bg-gray-50 min-h-screen">
                <AuthenticatedLayout title={product.nama_usaha}>
                    <div className="container mx-auto p-4">
                        <div className="bg-white shadow-xl rounded-sm overflow-hidden">
                            <div className="bg-gray-400 p-5 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{product.nama_usaha}</h2>
                                    <p className="text-sm text-white/80 mt-1">
                                        Added on {new Date(product.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <Link
                                    href={route('products.index', { page })}
                                    className="px-6 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition duration-300"
                                >
                                    Back
                                </Link>
                            </div>

                            {imagePreview ? (
                                <div className="m-8">
                                    <div className="w-full aspect-[16/9] overflow-hidden rounded-lg">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-full object-cover transition duration-300 hover:scale-105"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="m-8">
                                    <div className="w-full aspect-[16/9] overflow-hidden rounded-lg">
                                        {(isInitialLoading || isUploading) && (
                                            <div className="flex items-center justify-center h-full bg-gray-100">
                                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#5b9cff]"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg">
                                    {[
                                        { label: 'Location', value: product.lokasi },
                                        { label: 'Email', value: product.email },
                                        { label: 'Telephone', value: product.telephone }
                                    ].map((detail, index) => (
                                        <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                            <h3 className="text-sm font-semibold text-gray-600 mb-2">{detail.label}</h3>
                                            <p className="text-gray-800 font-medium">{detail.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Link
                                        href={route('products.edit', product.id)}
                                        className="px-4 py-2 bg-[#5b9cff] text-white rounded-md shadow-md hover:from-gray-600 hover:to-gray-700 transition duration-300"
                                    >
                                        Edit Product
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </>
    );
}