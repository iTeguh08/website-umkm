import React, { useState } from "react";
import { useForm, router, usePage, Link } from "@inertiajs/react";

const Search = () => {
    const { filters } = usePage().props;
    const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    const [jenisUsaha, setJenisUsaha] = useState(filters?.jenis_usaha || "");
    const [bidangUsaha, setBidangUsaha] = useState(filters?.bidang_usaha || "");

    const clearAllFields = () => {
        setSearchQuery("");
        setJenisUsaha("");
        setBidangUsaha("");
        
        router.get(
            route("homepage"),
            { search: "", jenis_usaha: "", bidang_usaha: "" },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["products", "filters"],
            }
        );
    };

    const jenisUsahaOptions = [
        { value: "mikro", label: "Mikro" },
        { value: "kecil", label: "Kecil" },
        { value: "menengah", label: "Menengah" },
    ];

    const bidangUsahaOptions = [
        { value: "kuliner", label: "Kuliner" },
        { value: "fashion", label: "Fashion" },
        { value: "jasa", label: "Jasa" },
        { value: "pertanian", label: "Pertanian" },
        { value: "kreatif", label: "Kreatif" },
    ];

    const handleSearch = (query = searchQuery) => {
        router.get(
            route("homepage"),
            {
                search: query,
                jenis_usaha: jenisUsaha,
                bidang_usaha: bidangUsaha,
            },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["products", "filters"],
            }
        );
    };

    const handlePopularSearch = (tag) => {
        setSearchQuery(tag);
        handleSearch(tag);
    };

    return (
        <section className="transition-shadow duration-300">
            <div className="max-w-5xl mx-auto px-4 pt-4">
                <div className="text-center mb-4"></div>

                <div className="mb-8">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center rounded-2xl md:rounded-full border-2 border-gray-200 hover:border-blue-400 focus-within:border-blue-500 transition-colors overflow-hidden">
                        <div className="flex-grow p-2 md:p-0">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="Cari jenis usaha..."
                                className="w-full px-4 py-3.5 md:pl-5 text-gray-800 placeholder-gray-400 bg-transparent border-0 focus:ring-0 focus:outline-none"
                            />
                        </div>

                        <div className="flex flex-row items-center">
                            <div className="relative px-2 py-2 md:py-0">
                                <select
                                    value={jenisUsaha}
                                    onChange={(e) => setJenisUsaha(e.target.value)}
                                    className="w-full md:w-auto py-2.5 px-2 pr-8 bg-transparent text-gray-700 text-sm font-medium border-0 focus:ring-0 focus:outline-none appearance-none cursor-pointer hover:text-gray-900 transition-colors"
                                >
                                    <option value="">Jenis Usaha</option>
                                    {jenisUsahaOptions.map((option) => (
                                        <option key={option.value} value={option.value} className="text-gray-800">
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative px-2 py-2 md:py-0">
                                <select
                                    value={bidangUsaha}
                                    onChange={(e) => setBidangUsaha(e.target.value)}
                                    className="w-full md:w-auto py-2.5 px-2 pr-8 bg-transparent text-gray-700 text-sm font-medium border-0 focus:ring-0 focus:outline-none appearance-none cursor-pointer hover:text-gray-900 transition-colors"
                                >
                                    <option value="">Bidang Usaha</option>
                                    {bidangUsahaOptions.map((option) => (
                                        <option key={option.value} value={option.value} className="text-gray-800">
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {(searchQuery || jenisUsaha || bidangUsaha) && (
                                <button
                                    onClick={clearAllFields}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors mr-1"
                                    title="Hapus pencarian"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}

                            <button
                                onClick={() => handleSearch()}
                                className="ml-1 p-3 mr-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors w-11 h-11 flex items-center justify-center"
                                aria-label="Cari"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 pb-4">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                    <span className="text-gray-600 text-sm">
                        Pencarian populer:
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                        {[
                            "Percetakan",
                            "Laundry",
                            "Cargo",
                            "Warung",
                            "Toko Souvenir",
                        ].map((tag, index) => (
                            <button
                                key={index}
                                onClick={() => handlePopularSearch(tag)}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm px-3 py-1.5 rounded-full transition duration-200"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Global styles to remove any focus rings on the search elements */}
            <style jsx global>{`
                .focus\\:outline-none:focus {
                    outline: none !important;
                    box-shadow: none !important;
                }

                .focus\\:ring-0:focus {
                    --tw-ring-shadow: 0 0 #0000 !important;
                    box-shadow: var(--tw-ring-inset) 0 0 0
                        calc(0px + var(--tw-ring-offset-width))
                        var(--tw-ring-color) !important;
                }

                .focus\\:border-0:focus {
                    border-color: transparent !important;
                }

                select {
                    box-shadow: none !important;
                }
            `}</style>
        </section>
    );
};

export default Search;