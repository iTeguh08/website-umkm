import React, { useState } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [businessField, setBusinessField] = useState('');

    const handleSearch = () => {
        // Handle search logic here
    };

    return (
        <section className="py-8 text-center">
            <div className="max-w-4xl mx-auto">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        placeholder="Cari jenis usaha..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-6 py-5 rounded-[30px] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-[400px] text-lg placeholder:text-gray-500"
                    />
                    <div className="absolute right-0 flex items-center space-x-4 mr-6">
                        <div className="relative">
                            <select
                                value={businessType}
                                onChange={(e) => setBusinessType(e.target.value)}
                                className="appearance-none p-2 pr-8 border-0 bg-transparent focus:outline-none focus:ring-0 text-gray-500 text-lg font-light"
                            >
                                <option value="">Jenis Usaha</option>
                                <option value="type1">Type 1</option>
                                <option value="type2">Type 2</option>
                            </select>
                        </div>
                        {/* <div className="w-px h-7 bg-gray-300"></div> */}
                        <div className="relative">
                            <select
                                value={businessField}
                                onChange={(e) => setBusinessField(e.target.value)}
                                className="appearance-none p-2 pr-8 border-0 bg-transparent focus:outline-none focus:ring-0 text-gray-500 text-lg font-light"
                            >
                                <option value="">Bidang Usaha</option>
                                <option value="field1">Field 1</option>
                                <option value="field2">Field 2</option>
                            </select>
                        </div>
                        {/* <div className="w-px h-7 bg-gray-300"></div> */}
                        <button
                            onClick={handleSearch}
                            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mt-6">
                    <div className="flex flex-wrap mt-2 justify-center items-center gap-3">
                        <span className="text-gray-600 text-base">Pencarian populer :</span>
                        {['percetakan', 'laundry', 'cargo', 'warung', 'toko bunga'].map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full cursor-pointer hover:bg-gray-300 text-base">
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