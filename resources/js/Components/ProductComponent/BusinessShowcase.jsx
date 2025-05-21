import React from "react";
import { Link } from "@inertiajs/react";

const BusinessShowcase = ({ products }) => {
    const productList = Array.isArray(products) ? products : [];

    if (productList.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-600 text-lg">
                    Tidak ada produk yang ditemukan
                </p>
            </div>
        );
    }

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {productList.map(
                    (product) =>
                        product &&
                        product.id && (
                            <div
                                key={product.id}
                                className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
                            >
                                <Link
                                    href={route("product.detail", product.id)}
                                    className="block overflow-hidden"
                                >
                                    {product.images?.[0]?.image_path ? (
                                        <img
                                            src={`/storage/${product.images[0].image_path}`}
                                            alt={product.nama_usaha}
                                            className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-48 sm:h-56 bg-white flex items-center justify-center text-gray-400">
                                            <svg
                                                className="w-12 h-12"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1}
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </Link>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {product.jenis_usaha && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-800">
                                                {product.jenis_usaha}
                                            </span>
                                        )}
                                        {product.bidang_usaha && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-green-100 text-green-800">
                                                {product.bidang_usaha}
                                            </span>
                                        )}
                                    </div>
                                    <Link
                                        href={route(
                                            "product.detail",
                                            product.id
                                        )}
                                        className="block text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors mb-1"
                                    >
                                        {product.nama_usaha}
                                    </Link>

                                    <div className="flex-1">
                                        <div
                                            className="text-gray-600 text-sm leading-relaxed line-clamp-2"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    product.description
                                                        ?.length > 200
                                                        ? `${product.description.substring(
                                                              0,
                                                              200
                                                          )}...`
                                                        : product.description ||
                                                          "Tidak ada deskripsi",
                                            }}
                                        />
                                    </div>

                                    <div className="mt-4 pt-4">
                                        <Link
                                            href={route(
                                                "product.detail",
                                                product.id
                                            )}
                                            className="inline-flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors group-has-link"
                                        >
                                            Lihat Detail
                                            <svg
                                                className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                )}
            </div>
        </section>
    );
};

export default BusinessShowcase;
