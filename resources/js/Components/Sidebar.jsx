import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const Sidebar = () => {
    const { url } = usePage();
    const [openSections, setOpenSections] = useState(['UMKM', 'MANAGEMENT']);

    const toggleSection = (section) => {
        setOpenSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const navigation = [
        {
            section: 'UMKM',
            items: [
                { name: 'jenis-usaha', label: 'Jenis Usaha', href: '/admin/dashboard/jenis-usaha', icon: 'tag' },
                { name: 'bidang-usaha', label: 'Bidang Usaha', href: '/admin/dashboard/bidang-usaha', icon: 'briefcase' },
                { name: 'product', label: 'Product', href: route('products.index', undefined, false), icon: 'building' }
            ]
        },
        {
            section: 'MANAGEMENT',
            items: [
                { name: 'tag', label: 'Tags', href: route('tags.index', undefined, false), icon: 'tag' },
                { name: 'post', label: 'Posts', href: route('posts.index', undefined, false), icon: 'document' }
            ]
        }
    ];

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30 font-sans flex flex-col">
            <div className="flex h-[65px] items-center justify-center px-6 border-b border-gray-200">
                <Link href="/">
                    <img src="/umkmKapal.png" alt="Logo" className="h-12 w-auto" />
                </Link>
            </div>
            <nav className="flex-1 overflow-y-auto py-6 px-2 space-y-6">
                {navigation.map((group) => (
                    <div key={group.section} className="mb-2">
                        <button
                            onClick={() => toggleSection(group.section)}
                            className="flex items-center justify-between w-full px-3 py-2 text-base font-semibold text-gray-600 hover:text-blue-700 tracking-wide uppercase"
                        >
                            <span>{group.section}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${openSections.includes(group.section) ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={openSections.includes(group.section) ? "mt-1 space-y-1" : "hidden"}>
                            {group.items.map((item) => {
                                const isActive = item.href === '/' ? url === '/' : url.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center px-4 py-2 rounded-lg transition font-medium text-base space-x-3 ${
                                            isActive
                                                ? 'bg-blue-50 text-blue-700 font-bold'
                                                : 'text-gray-500 hover:bg-gray-100 hover:text-blue-600'
                                        }`}
                                    >
                                        <span className="inline-block w-5 h-5">
                                            {/* Replace with actual SVG icons as needed */}
                                            <i className={`icon-${item.icon}`}></i>
                                        </span>
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;