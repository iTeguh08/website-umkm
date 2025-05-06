import React from 'react';
import { Link } from '@inertiajs/react';

const BusinessShowcase = ({ products }) => {
    // Ensure products is an array before mapping
    const productList = Array.isArray(products) ? products : [];
    
    if (productList.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Tidak ada produk yang ditemukan</p>
            </div>
        );
    }

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {productList.map((product) => (
                    product && product.id && (
                        <div key={product.id} className="rounded-lg overflow-hidden">
                            <Link href={route('product.detail', product.id)}>
                                {product.images?.[0]?.image_path && (
                                    <img 
                                        src={`/storage/${product.images[0].image_path}`} 
                                        alt={product.nama_usaha} 
                                        className="w-full aspect-video object-cover hover:opacity-90 transition-opacity"
                                    />
                                )}
                            </Link>
                            <div className="pt-4">
                                <Link href={route('product.detail', product.id)} className="hover:text-blue-600">
                                    <h3 className="text-lg font-semibold">{product.nama_usaha}</h3>
                                </Link>
                                <p className="text-gray-600">{product.description}</p>
                                <div className="flex space-x-2 mt-2">
                                    <Link 
                                        href={route('product.detail', product.id)} 
                                        className="ml-auto text-blue-600 text-sm font-medium hover:underline"
                                    >
                                        DETAIL
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </section>
    );
};

export default BusinessShowcase;