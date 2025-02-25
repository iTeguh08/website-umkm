// src/components/Search.jsx
import React, { useState } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [businessField, setBusinessField] = useState('');

    const handleSearch = () => {
        // Handle search logic here
    };

    return (
        <section className="py-12 text-center">
            <div className="max-w-3xl mx-auto">
                <input
                    type="text"
                    placeholder="Cari jenis usaha..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-between mt-4">
                    <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Jenis Usaha</option>
                        <option value="type1">Type 1</option>
                        <option value="type2">Type 2</option>
                    </select>
                    <select
                        value={businessField}
                        onChange={(e) => setBusinessField(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Bidang Usaha</option>
                        <option value="field1">Field 1</option>
                        <option value="field2">Field 2</option>
                    </select>
                    <button
                        onClick={handleSearch}
                        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </div>
                <div className="mt-4">
                    <span className="text-gray-600">Pencarian populer:</span>
                    <div className="flex flex-wrap mt-2">
                        {['percetakan', 'laundry', 'cargo', 'warung', 'toko bunga'].map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2 cursor-pointer hover:bg-gray-300">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Search;