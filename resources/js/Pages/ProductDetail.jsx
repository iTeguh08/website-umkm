import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Header from '@/Components/Header';

const ProductDetail = () => {
    const { product } = usePage().props;

    return (
        <div>
            <Header />
            
            <div className="max-w-7xl mx-auto px-4 py-4">
                <Link 
                    href={route('homepage')}
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Beranda
                </Link>
            
                <div className="py-4">
                    <div className="flex flex-col justify-center md:flex-row gap-8">
                        {/* Navigation tabs */}
                        <div className="flex mb-6 border-b">
                            <Link href="#" className="px-4 py-2 font-medium">Perusahaan</Link>
                            <Link href="#" className="px-4 py-2 font-medium">Produk</Link>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column - Image */}
                        <div>
                            {product.images && product.images.length > 0 ? (
                                <img 
                                    src={`/storage/${product.images[0].image_path}`} 
                                    alt={product.nama_usaha} 
                                    className="w-full h-auto rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">No image available</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Right column - Business details */}
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{product.nama_usaha}</h1>
                            <div 
                                className="prose max-w-none text-gray-700 mb-6"
                                dangerouslySetInnerHTML={{ 
                                    __html: product.description || "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>"
                                }}
                            />
                            
                            <div className="mb-4">
                                <p className="text-gray-700">Buka operasional senin-jumat (08:00-17:00)</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Alamat : {product.lokasi}</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>{product.email}</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                    <span>www.website.com</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>{product.telephone}</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <span>Rating 4.5</span>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Jasa</span>
                                    <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">Cargo</span>
                                </div>
                                
                                <div className="flex items-center mt-4">
                                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md mr-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <span>Didirikan pada tahun 2014</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;