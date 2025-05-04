import React, { useState, useEffect, useRef } from "react";
import { useForm, router, usePage, Link } from "@inertiajs/react";
import Header from '@/Components/Header';
import Hero from '@/Components/Hero';
import Search from '@/Components/Search';
import BusinessShowcase from '@/Components/BusinessShowcase';

const Index = () => {
    const { products} = usePage().props; // Get products from page props
    // const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    // const [showPreview, setShowPreview] = useState(false);
    // const [previewImage, setPreviewImage] = useState(null);
    // const [isAnimating, setIsAnimating] = useState(false);
    console.log('lewat 1', products)
    return (
        <div>
            <Header />
            <Hero />
            <Search />
            <BusinessShowcase products={products}/>
        </div>
    );
};

export default Index;