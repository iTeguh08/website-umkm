import React from "react";
import { usePage } from "@inertiajs/react";
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
            <Footer />
        </div>
    );
};

export default Index;