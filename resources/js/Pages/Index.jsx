import React from "react";
import { usePage } from "@inertiajs/react";
import Header from '@/Components/Header';
import Hero from '@/Components/Hero';
import Search from '@/Components/Search';
import BusinessShowcase from '@/Components/BusinessShowcase';

const Index = () => {
    const { products = [], filters = {} } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Hero />
            <Search filters={filters} />
            <BusinessShowcase products={products.data || products} />
            
            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} UMKM Marketplace. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Index;