import React, { useState, useEffect, useRef } from "react";
import { useForm, router, usePage, Link } from "@inertiajs/react";
import Header from '@/Components/Header';
import Hero from '@/Components/Hero';
import Search from '@/Components/Search';
import BusinessShowcase from '@/Components/BusinessShowcase';

const Index = () => {
    // const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    // const [showPreview, setShowPreview] = useState(false);
    // const [previewImage, setPreviewImage] = useState(null);
    // const [isAnimating, setIsAnimating] = useState(false);
    const { products = [], filters = {} } = usePage().props;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="px-1">
                <Hero />
                <Search filters={filters} />
                <BusinessShowcase products={products.data || products} />
            </main>
        </div>
    );
};

export default Index;