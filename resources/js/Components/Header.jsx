import React from 'react';
import { Link } from '@inertiajs/react';

const Header = () => {
    return (
        <header className="sticky top-0 bg-white shadow-md p-4 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                        <img src="/umkmKapal.png" alt="UMKM Kapal Logo" className="h-18 w-24 scale-125" />
                    </Link>
                </div>

                <nav className="flex items-center space-x-6">
                    {/* <Link href={route('about')} className="text-gray-700 hover:text-gray-900 font-medium">
                        About Us
                    </Link>
                    <Link href={route('contact')} className="text-gray-700 hover:text-gray-900 font-medium">
                        Contact Us
                    </Link> */}
                </nav>
                        
                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Powered by</span>
                    <div className="flex items-center space-x-3">
                        <img src="/messianic.png" alt="Messianic Logo" className="h-8" />
                        <img src="/rockKapal.png" alt="BPOM Logo" className="h-8" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;