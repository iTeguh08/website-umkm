import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import Header from '@/Components/Header';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom CSS for carousel arrows
const carouselStyles = `
    .slick-arrow {
        width: 40px;
        height: 40px;
        z-index: 20;
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0.7;
        background: rgba(0, 0, 0, 0.4);
    }
    .slick-arrow:hover {
        background: rgba(0, 0, 0, 0.7);
        transform: scale(1.1);
        opacity: 1;
    }
    .slick-prev {
        left: 10px;
    }
    .slick-next {
        right: 10px;
    }
    .slick-arrow:before {
        display: none;
    }
`;

const ProductDetail = () => {
    const { product } = usePage().props;
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentSlide(next),
        prevArrow: (
            <button className="slick-arrow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        ),
        nextArrow: (
            <button className="slick-arrow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        ),
        customPaging: (i) => (
            <div className={`w-2 h-2 mx-1 rounded-full transition-all ${i === currentSlide ? 'bg-gray-800 w-4' : 'bg-gray-400'}`}></div>
        ),
        appendDots: dots => (
            <div className="">
                <ul className="flex justify-center align-center">{dots}</ul>
            </div>
        )
    };

    return (
        <div>
            <style>{carouselStyles}</style>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column - Image Carousel */}
                        <div className="relative">
                            {product.images && product.images.length > 0 ? (
                                <Slider {...settings}>
                                    {product.images.map((image, index) => (
                                        <div key={index} className="outline-none mb-1">
                                            <img 
                                                src={`/storage/${image.image_path}`} 
                                                alt={`${product.nama_usaha} - ${index + 1}`}
                                                className="w-full h-96 object-cover rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <span className="text-gray-500">Tidak ada gambar tersedia</span>
                                </div>
                            )}
                            
                            {/* Thumbnail Navigation */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex mt-8 space-x-2 overflow-x-auto pb-2">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentSlide(index)}
                                            className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${
                                                index === currentSlide ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
                                            }`}
                                        >
                                            <img
                                                src={`/storage/${image.image_path}`}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>{product.telephone}</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <span>www.website.com</span>
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