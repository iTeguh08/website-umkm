// resources/js/Pages/Index.jsx
import React from 'react';
import Header from '@/Components/Header';
import Hero from '@/Components/Hero';
import Search from '@/Components/Search';
import BusinessShowcase from '@/Components/BusinessShowcase';

const Index = () => {
    return (
        <div>
            <Header />
            <Hero />
            <Search />
            <BusinessShowcase />
        </div>
    );
};

export default Index;