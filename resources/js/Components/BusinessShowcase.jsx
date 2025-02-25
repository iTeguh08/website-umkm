// src/components/BusinessShowcase.jsx
import React from 'react';

const BusinessShowcase = () => {
    const categories = [
        { name: 'Shipping/Logistics', image: '/path/to/shipping.jpg' },
        { name: 'Manufacturing/Textile', image: '/path/to/manufacturing.jpg' },
        { name: 'Retail/Small Shops', image: '/path/to/retail.jpg' },
    ];

    return (
        <section className="py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                    <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BusinessShowcase;