import React from 'react';
import { Link } from '@inertiajs/react';

const BusinessShowcase = ({ products }) => {
    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((product, index) => (
                    <div key={product.id} className="rounded-lg overflow-hidden">
                        {product.images.length > 0 && (<img src={`/storage/${product.images[0].image_path ?? ''}`} alt={product.nama_usaha} className="w-full aspect-video object-cover" />)}
                        <div className="pt-4">
                            <h3 className="text-lg font-semibold">{product.nama_usaha}</h3>
                            <p className="text-gray-600">{product.description}</p>
                            <div className="flex space-x-2 mt-2">
                            <Link href={route('product.detail', product.id)} className="ml-auto text-blue-600 text-sm font-medium">
                                DETAIL
                            </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BusinessShowcase;