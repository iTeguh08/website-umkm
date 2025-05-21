import React from 'react';
import { router } from '@inertiajs/react';

const CategoryFilter = ({ activeCategory, categories }) => {
    const allCategories = ["Semua", ...categories.filter((cat) => cat !== "Semua")];

    const handleCategoryChange = (category) => {
        router.get(
            "/posts",
            {
                category: category === "Semua" ? null : category,
            },
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <div className="bg-white shadow-sm sticky top-20 z-20">
            <div className="container mx-auto px-4">
                <div className="flex justify-center overflow-x-auto scrollbar-hide">
                    <div className="flex space-x-4 py-4">
                        {allCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryChange(category)}
                                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === category ||
                                    (category === "Semua" && !activeCategory)
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;
