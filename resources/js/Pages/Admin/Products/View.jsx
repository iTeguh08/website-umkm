import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";

export default function View({ product }) {
    const [image] = useState(product.images || []);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("page");

    return (
        <>
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

                            {/* Image Gallery */}
                            <div className="p-4">
                                {image.length > 0 &&
                                    image.map((image) => (
                                        <div
                                            key={image.id}
                                            className="relative"
                                        >
                                            <img
                                                src={`/storage/${image.image_path}`}
                                                alt="Product"
                                                className="w-full object-cover rounded"
                                            />
                                        </div>
                                    ))}
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
                                        dangerouslySetInnerHTML={{ __html: product?.description || "No description provided" }}
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
