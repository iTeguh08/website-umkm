import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Sidebar from '@/Components/Sidebar';

export default function Index({ auth }) {
    const { dashboard, flash } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />
            <Sidebar />
            <div className="pl-64">
                <AuthenticatedLayout user={auth.user}>
                    DASHBOARD
                </AuthenticatedLayout>
            </div>
        </>
    );
}