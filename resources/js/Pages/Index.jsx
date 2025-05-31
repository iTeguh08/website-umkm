import React from "react";
import { usePage, Link } from "@inertiajs/react";
import Header from '@/Components/Header';
import Hero from '@/Components/ProductComponent/Hero';
import Search from '@/Components/ProductComponent/Search';
import BusinessShowcase from '@/Components/ProductComponent/BusinessShowcase';
import Footer from '@/Components/Footer';

const Index = () => {
    const { products = [], filters = {} } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Hero />
            <Search filters={filters} />
            <BusinessShowcase products={products.data || products} />
            
            {/* Pagination */}
            {products.links && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="text-sm text-gray-700">
                            Menampilkan {products.from || 0} sampai {products.to || 0} dari {products.total || 0} data
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                            {products.links.map((link, index) => {
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
                                        {link.label === "&laquo; Previous" ? (
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
                                        ) : link.label === "Next &raquo;" ? (
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
                </div>
            )}
            
            <Footer />
        </div>
    );
};

export default Index;