import React from 'react';
import { Link } from '@inertiajs/react';

const Sidebar = () => {
    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800">
            <div className="p-4 text-white">
                <h2 className="text-lg font-semibold">Admin Sidebar</h2>
                <ul className="mt-4">
                    <li className="mb-2">
                        <Link href={route('admin.dashboard', 'jenis-usaha')} className="text-gray-300 hover:text-white">Jenis Usaha</Link>
                    </li>
                    <li className="mb-2">
                        <Link href={route('admin.dashboard', 'bidang-usaha')} className="text-gray-300 hover:text-white">Bidang Usaha</Link>
                    </li>
                    <li className="mb-2">
                        <Link href={route('admin.dashboard', 'daftar-usaha')} className="text-gray-300 hover:text-white">Daftar Usaha</Link>
                    </li>
                    <li className="mb-2">
                        <Link href={route('admin.dashboard', 'badges')} className="text-gray-300 hover:text-white">Badges</Link>
                    </li>
                    <li className="mb-2">
                        <Link href={route('admin.dashboard', 'pages')} className="text-gray-300 hover:text-white">Pages</Link>
                    </li>
                    <li className="mb-2">
                        <Link href={route('admin.dashboard', 'products')} className="text-gray-300 hover:text-white">Products</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;