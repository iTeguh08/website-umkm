import React, { useState, useEffect } from 'react';
import { useForm, router, usePage, Link } from "@inertiajs/react";

const Search = () => {
    const { filters } = usePage().props;
    const [searchQuery, setSearchQuery] = useState(filters?.search || "");

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== filters?.search) {
                router.get(
                    route("homepage"),
                    { search: searchQuery },
                    {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true
                    }
                );
            }
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("homepage"),
            { search: searchQuery },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["products", "filters"],
            }
        );
    };

    return (
        <section className="sticky top-0 z-10 bg-white transition-shadow duration-300">
            <div className="max-w-5xl mx-auto px-4 py-4">
                <div className="text-center mb-4">
                </div>
                
                <div className="mb-8">
                    <div className="flex items-center bg-white rounded-full border border-gray-500">
                        <div className="flex-grow pl-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari jenis usaha..."
                                className="w-full py-3 focus:outline-none text-gray-600 border-0"
                            />
                        </div>
                        
                        <div className="py-3 px-1">
                            <div className="flex items-center">
                                <select
                                    className="focus:outline-none appearance-none bg-white text-gray-600 border-0"
                                >
                                    <option value="">Jenis Usaha</option>
                                    <option value="jakarta">Jakarta</option>
                                    <option value="bandung">Bandung</option>
                                    <option value="surabaya">Surabaya</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="py-3 px-1">
                            <div className="flex items-center">
                                <select
                                    className="focus:outline-none appearance-none bg-white text-gray-600 border-0"
                                >
                                    <option value="">Bidang Usaha</option>
                                    <option value="jakarta">Jakarta</option>
                                    <option value="bandung">Bandung</option>
                                    <option value="surabaya">Surabaya</option>
                                </select>
                            </div>
                        </div>
                        
                        <button
                            onClick={handleSearch}
                            className="ml-2 p-3 mr-4"
                        >
                            <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex flex-wrap justify-center items-center gap-2">
                        <span className="text-gray-600 text-sm">Pencarian populer:</span>
                        {['Percetakan', 'Laundry', 'Cargo', 'Warung', 'Toko Bunga'].map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => setSearchQuery(tag)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-full transition duration-200"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Search;