import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import JenisUsaha from './Components/JenisUsaha';
import BidangUsaha from './Components/BidangUsaha';
import Index from './Products/Index';
import Badges from './Components/Badges';
import Pages from './Components/Pages';
import Sidebar from '@/Components/Sidebar';

const DashboardUMKM = () => {
    const { currentPage } = usePage().props;

    const renderComponent = () => {
        switch (currentPage) {
            case 'jenis-usaha':
                return <JenisUsaha />;
            case 'bidang-usaha':
                return <BidangUsaha />;
            case 'index':
                return <Index />;
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