import React, { useState, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselStyles = `
    .slick-arrow {
        width: 48px;
        height: 48px;
        z-index: 20;
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0.9;
        background: rgba(255, 255, 255, 0.9) !important;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .slick-arrow:hover {
        background: rgba(255, 255, 255, 1) !important;
        transform: scale(1.1);
    }
    .slick-arrow:before {
        display: none;
    }
    .slick-prev {
        left: 25px;
    }
    .slick-next {
        right: 25px;
    }
    .slick-arrow:after {
        content: '';
        width: 10px;
        height: 10px;
        border: 2px solid #1a1a1a;
        border-width: 0 2px 2px 0;
        display: inline-block;
        transition: transform 0.2s ease;
    }
    .slick-prev:after {
        transform: rotate(135deg);
        margin-left: 4px;
    }
    .slick-next:after {
        transform: rotate(-45deg);
        margin-right: 4px;
    }
    .thumbnail-container::-webkit-scrollbar {
        height: 6px;
    }
    .thumbnail-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
    }
    .thumbnail-container::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 10px;
    }
    .thumbnail-container::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;

const ProductDetail = () => {
    const { product } = usePage().props;
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const capitalizeFirstLetter = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => setCurrentSlide(next),
        afterChange: (current) => setCurrentSlide(current),
        prevArrow: (
            <button className="absolute left-2 top-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
        ),
        nextArrow: (
            <button className="absolute right-2 top-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        ),
        customPaging: (i) => (
            <div
                className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${
                    i === currentSlide ? "bg-blue-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
            ></div>
        ),
        appendDots: (dots) => (
            <div className="absolute bottom-4">
                <ul className="flex justify-center items-center space-x-2">{dots}</ul>
            </div>
        ),
    };

    const handleThumbnailClick = (index) => {
        setCurrentSlide(index);
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <style>{carouselStyles}</style>
            <Header />

            <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
                <Link
                    href={route("homepage")}
                    className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 group transition-colors duration-300"
                >
                    <svg
                        className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    <span className="font-medium">Kembali ke Beranda</span>
                </Link>

                <div className="bg-white rounded-md shadow-sm p-6 mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left column - Image Carousel */}
                        <div className="relative">
                            {product.images && product.images.length > 0 ? (
                                product.images.length === 1 ? (
                                    <div className="outline-none mb-1 rounded-xl overflow-hidden shadow-lg">
                                        <img
                                            src={`/storage/${product.images[0].image_path}`}
                                            alt={`${product.nama_usaha} - 1`}
                                            className="w-full h-[480px] object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="rounded-xl overflow-hidden shadow-lg">
                                        <Slider ref={sliderRef} {...settings}>
                                            {product.images.map((image, index) => (
                                                <div
                                                    key={index}
                                                    className="outline-none"
                                                >
                                                    <img
                                                        src={`/storage/${image.image_path}`}
                                                        alt={`${product.nama_usaha} - ${index + 1}`}
                                                        className="w-full h-[480px] object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                )
                            ) : (
                                <div className="w-full h-[480px] bg-gray-100 rounded-xl flex items-center justify-center">
                                    <span className="text-gray-400 flex flex-col items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Tidak ada gambar tersedia
                                    </span>
                                </div>
                            )}

                            {product.images && product.images.length > 1 && (
                                <div className="flex mt-6 space-x-3 overflow-x-auto pb-4 px-2 thumbnail-container">
                                    {product.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`thumbnail-button flex-shrink-0`}
                                        >
                                            <button
                                                onClick={() => handleThumbnailClick(index)}
                                                className={`w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                                                    index === currentSlide
                                                        ? "ring-2 ring-blue-500 opacity-100"
                                                        : "opacity-60 hover:opacity-100"
                                                }`}
                                            >
                                                <img
                                                    src={`/storage/${image.image_path}`}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right column - Business details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.nama_usaha}
                                </h1>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {product.bidang_usaha && (
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                            {capitalizeFirstLetter(product.bidang_usaha)}
                                        </span>
                                    )}
                                    {product.jenis_usaha && (
                                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                                            {capitalizeFirstLetter(product.jenis_usaha)}
                                        </span>
                                    )}
                                </div>
                                <div className="prose prose-lg max-w-none text-gray-600">
                                    <div dangerouslySetInnerHTML={{
                                        __html: product.description || 
                                        "<p>Informasi detail tentang usaha ini belum tersedia.</p>"
                                    }} />
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-md p-4 space-y-4">
                                <div className="flex items-center text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Buka operasional senin-jumat (08:00-17:00)</span>
                                </div>

                                <div className="flex items-center text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>{product.email || 'Email tidak tersedia'}</span>
                                </div>

                                <div className="flex items-center text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>{product.telephone || 'Nomor telepon tidak tersedia'}</span>
                                </div>

                                {product.website && (
                                    <div className="flex items-center text-gray-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                        <a href={product.website} target="_blank" rel="noopener noreferrer" 
                                           className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                                            {product.website}
                                        </a>
                                    </div>
                                )}

                                <div className="flex items-center text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <span className="font-medium">Rating 4.5/5.0</span>
                                    <span className="text-sm text-gray-500 ml-2">(50 ulasan)</span>
                                </div>
                            </div>

                            <div className="flex items-center p-4 bg-blue-50 rounded-md">
                                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-500">Tahun Berdiri</span>
                                    <span className="block text-lg font-semibold text-gray-900">2014</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-md shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Lokasi UMKM
                        </h2>
                    </div>
                    <div className="mb-4 text-center text-gray-600">
                        {product.lokasi || 'Alamat lengkap tidak tersedia'}
                    </div>
                    <div className="rounded-xl overflow-hidden">
                        <iframe
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://www.google.com/maps?q=${product.latitude},${product.longitude}&hl=es;z=14&output=embed`}
                        ></iframe>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetail;
