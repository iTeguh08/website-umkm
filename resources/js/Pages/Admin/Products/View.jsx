import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom CSS for carousel arrows
const carouselStyles = `
    .slick-arrow {
        width: 4%;
        height: 6.5%;
        z-index: 20;
        border-radius: 50%;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        opacity: 0.7;
    }
    .slick-arrow:hover {
        background: rgba(0, 0, 0, 0.7);
        opacity: 1;
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
        margin-left: 3px;
        margin-right: 3px;
        content: '';
        width: 11px;
        height: 11px;
        border: 3px solid white;
        border-width: 0 2px 2px 0;
        display: inline-block;
        transition: transform 0.2s ease;
    }
    .slick-prev:after {
        transform: rotate(135deg);
        margin-right: -1px;
    }
    .slick-next:after {
        transform: rotate(-45deg);
        margin-left: -1px;
    }
`;

export default function View({ product }) {
    const [images] = useState(product.images || []);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("page");

    // react-slick settings for the carousel
    const settings = {
        dots: true,
        infinite: images.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        arrows: true,
        prevArrow: (
            <button className="absolute left-2 top-1/2 z-10 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300">
                &#10094;
            </button>
        ),
        nextArrow: (
            <button className="absolute right-2 top-1/2 z-10 bg-gray-800/80 hover:bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg transition-all duration-300">
                &#10095;
            </button>
        ),
        appendDots: (dots) => (
            <div>
                <ul className="flex justify-center space-x-2">{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <div className="mt-3 w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-600 cursor-pointer transition duration-300" />
        ),
    };

    return (
        <>
            <style>{carouselStyles}</style>
            <Sidebar />
            <div className="pl-64 bg-gray-50 min-h-screen">
                <AuthenticatedLayout
                    title={product?.nama_usaha || "Product Details"}
                >
                    <div className="container mx-auto p-4">
                        <div className="bg-white shadow-xl rounded-sm overflow-hidden">
                            <div className="bg-gray-400 p-5 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {product?.nama_usaha || "Product"}
                                    </h2>
                                    <p className="text-sm text-white/80 mt-1">
                                        Added on{" "}
                                        {product?.created_at
                                            ? new Date(
                                                  product.created_at
                                              ).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                                <Link
                                    href={route("products.index", { page })}
                                    className="px-6 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition duration-300"
                                >
                                    Back
                                </Link>
                            </div>

                            {/* Image Carousel */}
                            <div className="p-8 relative group">
                                {images.length > 0 ? (
                                    <div className="relative">
                                        <Slider {...settings}>
                                            {images.map((image) => (
                                                <div
                                                    key={image.id}
                                                    className="relative"
                                                >
                                                    <img
                                                        src={`/storage/${image.image_path}`}
                                                        alt={
                                                            product?.nama_usaha ||
                                                            "Product"
                                                        }
                                                        className="aspect-[16/9] w-full object-cover rounded-lg"
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 p-12 bg-gray-100 rounded-lg">
                                        No images available
                                    </div>
                                )}
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg">
                                    {[
                                        {
                                            label: "Location",
                                            value: product?.lokasi || "N/A",
                                        },
                                        {
                                            label: "Email",
                                            value: product?.email || "N/A",
                                        },
                                        {
                                            label: "Telephone",
                                            value: product?.telephone || "N/A",
                                        },
                                    ].map((detail, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                                        >
                                            <h3 className="text-sm font-semibold text-gray-600 mb-2">
                                                {detail.label}
                                            </h3>
                                            <p className="text-gray-800 font-medium">
                                                {detail.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                                        Description
                                    </h3>
                                    <div
                                        className="prose max-w-none"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                product?.description ||
                                                "No description provided",
                                        }}
                                    />
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <Link
                                        href={route(
                                            "products.edit",
                                            product?.id
                                        )}
                                        className="px-4 py-2 bg-[#5b9cff] text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300"
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
