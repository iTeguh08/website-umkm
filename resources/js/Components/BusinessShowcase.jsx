import React from 'react';
import { Link } from '@inertiajs/react';

const BusinessShowcase = ({ products }) => {
    const productList = Array.isArray(products) ? products : [];
    
    if (productList.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-600 text-lg">Tidak ada produk yang ditemukan</p>
            </div>
        );
    }

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {productList.map((product) => (
                    product && product.id && (
                        <div 
                            key={product.id} 
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                        >
                            <Link href={route('product.detail', product.id)}>
                                {product.images?.[0]?.image_path && (
                                    <img 
                                        src={`/storage/${product.images[0].image_path}`} 
                                        alt={product.nama_usaha} 
                                        className="aspect-[16/9] object-cover"
                                    />
                                )}
                            </Link>
                            <div className="p-6">
                                <Link 
                                    href={route('product.detail', product.id)} 
                                    className="block text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                    {product.nama_usaha}
                                </Link>
                                <div 
                                    className="text-gray-600 mt-2 line-clamp-2"
                                    dangerouslySetInnerHTML={{ __html: product.description || '' }}
                                />
                                <div className="mt-4">
                                    <Link 
                                        href={route('product.detail', product.id)} 
                                        className="text-blue-600 text-sm font-medium hover:underline hover:text-blue-700 transition-colors"
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