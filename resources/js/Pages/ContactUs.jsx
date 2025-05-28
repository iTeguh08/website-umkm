import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Footer from "@/Components/Footer";

export default function Contact() {
    return (
        <div className="min-h-screen flex flex-col">
            <AuthenticatedLayout
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Hubungi Kami
                    </h2>
                }
            >
                <Head title="Hubungi Kami" />
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
                                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                                Hubungi Kami
                                            </h1>
                                            <p className="text-xl text-gray-600">
                                                Kami siap membantu Anda dengan segala
                                                pertanyaan atau masukan
                                            </p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-12">
                                            <div>
                                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                                    Kirim Pesan
                                                </h2>
                                                <form className="space-y-6">
                                                    <div>
                                                        <label
                                                            htmlFor="name"
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                        >
                                                            Nama Lengkap
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Nama Anda"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="email"
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                        >
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="email@contoh.com"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="subject"
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                        >
                                                            Subjek
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id="subject"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Subjek pesan"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label
                                                            htmlFor="message"
                                                            className="block text-sm font-medium text-gray-700 mb-1"
                                                        >
                                                            Pesan
                                                        </label>
                                                        <textarea
                                                            id="message"
                                                            rows="4"
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                                            placeholder="Tulis pesan Anda di sini..."
                                                        ></textarea>
                                                    </div>
                                                    <div>
                                                        <button
                                                            type="submit"
                                                            className="w-full bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                                                        >
                                                            Kirim Pesan
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                                    Informasi Kontak
                                                </h2>
                                                <div className="space-y-6">
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                                                            <svg
                                                                className="h-6 w-6 text-blue-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                />
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="ml-4">
                                                            <h3 className="text-lg font-medium text-gray-900">
                                                                Alamat
                                                            </h3>
                                                            <p className="mt-1 text-gray-600">
                                                                Jl. Contoh No. 123{" "}
                                                                <br />
                                                                Jakarta Selatan, 12345{" "}
                                                                <br />
                                                                Indonesia
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                                                            <svg
                                                                className="h-6 w-6 text-green-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="ml-4">
                                                            <h3 className="text-lg font-medium text-gray-900">
                                                                Telepon
                                                            </h3>
                                                            <p className="mt-1 text-gray-600">
                                                                +62 123 4567 890 <br />
                                                                +62 987 6543 210
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                                                            <svg
                                                                className="h-6 w-6 text-purple-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="ml-4">
                                                            <h3 className="text-lg font-medium text-gray-900">
                                                                Email
                                                            </h3>
                                                            <p className="mt-1 text-gray-600">
                                                                info@umkmmarketplace.com{" "}
                                                                <br />
                                                                support@umkmmarketplace.com
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start">
                                                        <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-full">
                                                            <svg
                                                                className="h-6 w-6 text-yellow-600"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            </svg>
                                                        </div>
                                                        <div className="ml-4">
                                                            <h3 className="text-lg font-medium text-gray-900">
                                                                Jam Operasional
                                                            </h3>
                                                            <p className="mt-1 text-gray-600">
                                                                Senin - Jumat: 09:00 -
                                                                17:00 WIB <br />
                                                                Sabtu: 09:00 - 14:00 WIB{" "}
                                                                <br />
                                                                Minggu & Hari Libur:
                                                                Tutup
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-8">
                                                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                                                        Ikuti Kami
                                                    </h3>
                                                    <div className="flex space-x-4">
                                                        <a
                                                            href="#"
                                                            className="text-gray-500 hover:text-blue-600 transition-colors"
                                                        >
                                                            <span className="sr-only">
                                                                Facebook
                                                            </span>
                                                            <svg
                                                                className="h-6 w-6"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </a>
                                                        <a
                                                            href="#"
                                                            className="text-gray-500 hover:text-blue-400 transition-colors"
                                                        >
                                                            <span className="sr-only">
                                                                Twitter
                                                            </span>
                                                            <svg
                                                                className="h-6 w-6"
                                                                fill="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                        </svg>
                                                    </a>
                                                    <a
                                                        href="#"
                                                        className="text-gray-500 hover:text-pink-600 transition-colors"
                                                    >
                                                        <span className="sr-only">
                                                            Instagram
                                                        </span>
                                                        <svg
                                                            className="h-6 w-6"
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </a>
                                                    </div>
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
