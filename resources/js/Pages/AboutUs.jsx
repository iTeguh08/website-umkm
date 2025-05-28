import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";

export default function AboutUs() {
    return (
        <div className="min-h-screen flex flex-col">
            <AuthenticatedLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tentang Kami
                    </h2>
                }
            >
                <Head title="Tentang Kami" />
                <div className="flex-grow">
                    <div className="container px-6 pt-4">
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
                    </div>
                    <div className="">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 bg-white border-b border-gray-200">
                                    <div className="max-w-4xl mx-auto">
                                        <div className="text-center mb-12">
                                            <h1 className="text-4xl font-bold text-gray-900 mb-6">
                                                Tentang UMKM Marketplace
                                            </h1>
                                            <p className="text-xl text-gray-600">
                                                Menghubungkan pelaku UMKM dengan
                                                pelanggan di seluruh Indonesia
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-12 mb-16">
                                            <div>
                                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                                    Visi Kami
                                                </h2>
                                                <p className="text-gray-600 mb-6">
                                                    Menjadi platform terdepan dalam
                                                    memberdayakan pelaku UMKM Indonesia
                                                    untuk berkembang dan bersaing di era
                                                    digital.
                                                </p>
                                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                                    Misi Kami
                                                </h2>
                                                <ul className="space-y-3 text-gray-600">
                                                    <li className="flex items-start">
                                                        <svg
                                                            className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                        <span>
                                                            Menyediakan wadah digital
                                                            yang mudah digunakan oleh
                                                            pelaku UMKM
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <svg
                                                            className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                        <span>
                                                            Meningkatkan visibilitas
                                                            produk UMKM ke pasar yang
                                                            lebih luas
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <svg
                                                            className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                        <span>
                                                            Memberikan edukasi dan
                                                            pelatihan pengembangan
                                                            bisnis digital
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start">
                                                        <svg
                                                            className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </svg>
                                                        <span>
                                                            Membangun ekosistem yang
                                                            mendukung pertumbuhan UMKM
                                                            berkelanjutan
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="rounded-lg overflow-hidden">
                                                <img
                                                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                                    alt="Tim UMKM Marketplace"
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-8 rounded-lg">
                                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
                                                Nilai-nilai Kami
                                            </h2>
                                            <div className="grid md:grid-cols-3 gap-8">
                                                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <svg
                                                            className="w-8 h-8 text-blue-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                        Inklusif
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        Kami membuka kesempatan yang
                                                        sama bagi semua pelaku UMKM dari
                                                        berbagai latar belakang.
                                                    </p>
                                                </div>
                                                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <svg
                                                            className="w-8 h-8 text-green-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                        Terpercaya
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        Kejujuran dan transparansi
                                                        menjadi landasan utama dalam
                                                        setiap interaksi.
                                                    </p>
                                                </div>
                                                <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                                                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                        <svg
                                                            className="w-8 h-8 text-purple-600"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                                        Inovatif
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        Terus berinovasi untuk
                                                        memberikan solusi terbaik bagi
                                                        perkembangan UMKM.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
            <Footer />
        </div>
    );
}
