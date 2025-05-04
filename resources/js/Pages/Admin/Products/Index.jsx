import React, { useState, useEffect, useRef } from "react";
import { useForm, router, usePage, Link } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia"; // Pastikan Anda mengimpor Inertia
import DeleteButton from "@/Components/DeleteButton";
import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Index = () => {
    const { products, filters } = usePage().props; // Get products from page props
    const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    const [showPreview, setShowPreview] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        router.get(
            route("products.index"),
            { search: e.target.value },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["products", "filters"],
            }
        );
    };

    const handleImageClick = (imageUrl) => {
        setPreviewImage(imageUrl);
        setIsAnimating(true);
        setTimeout(() => {
            setShowPreview(true);
        }, 100); // Small delay for animation
    };

    const handleClosePreview = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setShowPreview(false);
            setPreviewImage(null);
        }, 100); // Small delay for animation
    };

    const queryString = window.location.search;

    // Buat objek URLSearchParams dari query string
    const urlParams = new URLSearchParams(queryString);

    // Ambil nilai parameter 'page'
    const page = urlParams.get("page");

    return (
        <>
            <Sidebar />
            <div className="pl-64">
                <AuthenticatedLayout>
                    <header className="bg-white shadow-sm font-sans border-b border-gray-100">
                        <div className="flex justify-between items-center px-8 py-6">
                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-gray-800 leading-tight">
                                    DAFTAR USAHA
                                </h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari nama usaha..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <svg
                                        className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <Link
                                    href={route("products.create", {
                                        page: page || 1,
                                    })}
                                >
                                    <button className="px-4 py-2 bg-[#04de16] text-white rounded-lg font-semibold shadow hover:bg-green-500 transition-colors duration-150">
                                        Tambah Baru +
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </header>
                    <main className="p-8">
                        <div className="bg-white shadow">
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="w-[30%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Gambar
                                                </th>
                                                <th className="w-[30%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nama Usaha
                                                </th>
                                                <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Lokasi
                                                </th>
                                                <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Telephone
                                                </th>
                                                <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {products?.data?.length > 0 ? (
                                                products.data.map((product) => (
                                                    <tr key={product.id}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {product.images && product.images.length > 0 && (
                                                                <div
                                                                    className="relative cursor-pointer"
                                                                    onClick={() =>
                                                                        handleImageClick(
                                                                            `/storage/${product.images[0].image_path}`
                                                                        )
                                                                    }
                                                                >
                                                                    <img
                                                                        src={`/storage/${product.images[0].image_path}`}
                                                                        alt={product.nama_usaha}
                                                                        className="w-12 h-12 object-cover rounded"
                                                                    />
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {product.nama_usaha}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {product.lokasi}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {product.email}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                            {product.telephone}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                                                            <Link
                                                                href={route(
                                                                    "products.edit",
                                                                    {
                                                                        product:
                                                                            product.id,
                                                                        page:
                                                                            page ||
                                                                            1,
                                                                    }
                                                                )}
                                                            >
                                                                <button className="p-1.5 text-blue-600 hover:bg-blue-50 transition-colors">
                                                                    <svg
                                                                        className="w-5 h-5"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "products.show",
                                                                    {
                                                                        product:
                                                                            product.id,
                                                                        page:
                                                                            page ||
                                                                            1,
                                                                    }
                                                                )}
                                                            >
                                                                <button className="p-1.5 text-gray-400 hover:bg-gray-50 transition-colors">
                                                                    <svg
                                                                        className="w-5 h-5"
                                                                        fill="none"
                                                                        viewBox="0 0 24 24"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                        />
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth="2"
                                                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                        />
                                                                    </svg>
                                                                </button>
                                                            </Link>
                                                            <DeleteButton
                                                                productId={
                                                                    product.id
                                                                }
                                                            />
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                                    >
                                                        {searchQuery
                                                            ? "Tidak ada data usaha yang ditemukan"
                                                            : "Tidak ada data usaha yang tersedia"}
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* Pagination */}
                        <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-gray-700">
                                Menampilkan {products.from} sampai {products.to}{" "}
                                dari {products.total} data
                            </div>
                            <div className="flex items-center space-x-2">
                                {products.links.map((link, index) => {
                                    // Skip rendering if no URL (disabled links)
                                    if (!link.url) return null;
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-1 rounded-md ${
                                                link.active
                                                    ? "bg-blue-600 text-white"
                                                    : "text-gray-700 hover:bg-gray-100"
                                            }`}
                                        >
                                            {link.label === "Previous" ? (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 19l-7-7 7-7"
                                                    />
                                                </svg>
                                            ) : link.label === "Next" ? (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            ) : (
                                                <span
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </main>
                </AuthenticatedLayout>
            </div>
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <div className="fixed inset-0 bg-black" style={{
                    opacity: showPreview ? 0.5 : 0,
                    transition: 'opacity 0.1s cubic-bezier(0.1, 0, 0.1, 0.1)'
                }}>
                </div>
                <div 
                    className="bg-white rounded-sm shadow-xl max-w-4xl max-h-[90vh] overflow-auto relative pointer-events-auto"
                    style={{
                        transform: showPreview ? 'scale(1)' : 'scale(0.90)',
                        opacity: showPreview ? 1 : 0,
                        transition: 'all 0.05s',
                        willChange: 'transform, opacity',
                        transformOrigin: 'center center'
                    }}
                >
                    {showPreview && (
                        <>
                            <button
                                onClick={handleClosePreview}
                                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                            <div className="p-10">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Index;
