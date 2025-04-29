import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function View({ product }) {
    return (
        <>
            <Sidebar />
            <div className="pl-64">
                <AuthenticatedLayout title={product.nama_usaha}>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <div className="mb-6 flex justify-between items-center">
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">{product.nama_usaha}</h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Added on {new Date(product.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Link
                                            href={route('products.index')}
                                            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                        >
                                            Back to products
                                        </Link>
                                    </div>

                                    {product.image && (
                                        <div className="mb-6">
                                            <div className="rounded-lg overflow-hidden max-h-96">
                                                <img
                                                    src={`/storage/products/${product.image}`}
                                                    alt={product.nama_usaha}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Location</h3>
                                            <p className="text-gray-600">{product.lokasi}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Email</h3>
                                            <p className="text-gray-600">{product.email}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-700">Telephone</h3>
                                            <p className="text-gray-600">{product.telephone}</p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-end space-x-3">
                                        <Link
                                            href={route('products.edit', product.id)}
                                            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600"
                                        >
                                            Edit product
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </>
    );
}