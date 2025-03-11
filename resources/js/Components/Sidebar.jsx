import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

const Sidebar = () => {
    const { currentPage } = usePage().props;
    const [openSections, setOpenSections] = useState(['UMKM', 'MANAGEMENT']);

    useEffect(() => {
        const section = currentPage.includes('badges') || currentPage.includes('pages') ? 'MANAGEMENT' : 'UMKM';
        if (!openSections.includes(section)) {
            setOpenSections([...openSections, section]);
        }
    }, [currentPage]);

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
                { name: 'daftar-usaha', label: 'Daftar Usaha', href: '/admin/dashboard/daftar-usaha', icon: 'building' }
            ]
        },
        {
            section: 'MANAGEMENT',
            items: [
                { name: 'badges', label: 'Badges', href: '/admin/dashboard/badges', icon: 'badge' },
                { name: 'pages', label: 'Pages', href: '/admin/dashboard/pages', icon: 'document' }
            ]
        }
    ];

    return (
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-30">
            <div className="flex h-16 items-center px-6 border-b border-gray-200">
                <Link href="/" className="flex items-center space-x-3">
                    <img src="/umkmKapal.png" alt="Logo" className="h-8 w-auto" />
                    <span className="text-xs font-semibold text-gray-900">Dashboard CMS UMKM</span>
                </Link>
            </div>
            <div className="p-4">
                {navigation.map((group) => (
                    <div key={group.section} className="mb-4">
                        <button
                            onClick={() => toggleSection(group.section)}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                            <span>{group.section}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${openSections.includes(group.section) ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <div className={`mt-1 space-y-1 ${openSections.includes(group.section) ? 'block' : 'hidden'}`}>
                            {group.items.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        flex items-center px-8 py-2 text-sm rounded-lg
                                        transition-colors duration-150 ease-in-out
                                        ${currentPage === item.name
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <span className="truncate">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;