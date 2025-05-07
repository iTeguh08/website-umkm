import React, { useState, useEffect } from 'react';
import { useForm, router, usePage, Link } from "@inertiajs/react";

const Search = () => {
    const [businessField, setBusinessField] = useState('');
    const [location, setLocation] = useState('');
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
            setSearchQuery(e.target.value);
            router.get(
                route("homepage"),
                { search: e.target.value },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ["products", "filters"],
                }
            );
    };

    return (
        <section className="sticky top-0 z-10 bg-white transition-shadow duration-300">
            <div className="max-w-5xl mx-auto px-4 py-4 shadow-sm">
                <div className="text-center mb-4">
                </div>
                
                <form onSubmit={handleSearch} className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-md p-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama usaha..."
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div className="relative flex-1">
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Lokasi</option>
                                <option value="jakarta">Jakarta</option>
                                <option value="bandung">Bandung</option>
                                <option value="surabaya">Surabaya</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        
                        <div className="relative flex-1">
                            <select
                                value={businessField}
                                onChange={(e) => setBusinessField(e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Semua Kategori</option>
                                <option value="makanan">Makanan & Minuman</option>
                                <option value="fashion">Fashion</option>
                                <option value="jasa">Jasa</option>
                                <option value="kerajinan">Kerajinan Tangan</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
                        >
                            Cari
                        </button>
                    </div>
                </form>

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