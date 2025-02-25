import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import JenisUsaha from './Components/JenisUsaha';
import BidangUsaha from './Components/BidangUsaha';
import DaftarUsaha from './Components/DaftarUsaha';
import Badges from './Components/Badges';
import Pages from './Components/Pages';

const DashboardUMKM = () => {
    const { currentPage } = usePage().props;

    const renderComponent = () => {
        switch (currentPage) {
            case 'jenis-usaha':
                return <JenisUsaha />;
            case 'bidang-usaha':
                return <BidangUsaha />;
            case 'daftar-usaha':
                return <DaftarUsaha />;
            case 'badges':
                return <Badges />;
            case 'pages':
                return <Pages />;
            default:
                return <JenisUsaha />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Admin Dashboard" />
            <Sidebar />
            <div className="pl-64">
                {renderComponent()}
            </div>
        </div>
    );
};

export default DashboardUMKM;