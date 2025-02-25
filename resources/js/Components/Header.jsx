// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="sticky top-0 bg-white shadow-md p-4 flex justify-between items-center">
            <div className="flex items-center">
                <img src="/path/to/logo.png" alt="UMKM Kapal Logo" className="h-8 w-8 mr-2" />
                <span className="text-lg font-bold">UMKM KAPAL</span>
            </div>
            <nav className="flex space-x-4">
                <Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
            </nav>
            <div className="flex items-center space-x-2">
                <img src="/path/to/messianic-logo.png" alt="Messianic Logo" className="h-6 w-6" />
                <img src="/path/to/bpom-logo.png" alt="BPOM Logo" className="h-6 w-6" />
                <img src="/path/to/partner-logo.png" alt="Partner Logo" className="h-6 w-6" />
            </div>
        </header>
    );
};

export default Header;