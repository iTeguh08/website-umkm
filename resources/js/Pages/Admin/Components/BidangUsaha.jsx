// resources/js/Pages/Admin/Components/BidangUsaha.jsx
import React, { useState } from 'react';
import CrudModal from '@/Components/CrudModal';
import GenericForm from '@/Components/GenericForm';

const BidangUsaha = () => {
    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null,
        data: null
    });

    const [searchQuery, setSearchQuery] = useState('');

    const openModal = (type, data = null) => {
        setModalState({ isOpen: true, type, data });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, type: null, data: null });
    };

    const handleSubmit = (data) => {
        console.log('Form submitted:', data);
        closeModal();
    };

    const fields = [
        { name: 'name', label: 'Nama' },
        { name: 'description', label: 'Deskripsi', type: 'textarea' }
    ];

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="flex justify-between items-center px-8 py-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Bidang Usaha</h1>
                    <button
                        onClick={() => openModal('create')}
                        className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150"
                    >
                        Tambah Baru
                    </button>
                </div>
            </header>

            <main className="p-8">
                <div className="bg-white shadow">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="relative w-64">
                                <input
                                    type="text"
                                    placeholder="Cari..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="w-[25%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="w-[25%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="w-[25%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Digunakan</th>
                                        <th className="w-[25%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Jasa</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8 perusahaan</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                                            <button
                                                onClick={() => openModal('edit', {
                                                    id: 1,
                                                    name: 'Jasa',
                                                    used: '8 perusahaan'
                                                })}
                                                className="p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => openModal('delete', { id: 1, name: 'Jasa' })}
                                                className="p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <CrudModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={
                    modalState.type === 'create' ? 'Tambah Bidang Usaha Baru' :
                        modalState.type === 'edit' ? 'Edit Bidang Usaha' :
                            modalState.type === 'delete' ? 'Hapus Bidang Usaha' : ''
                }
            >
                {modalState.type === 'delete' ? (
                    <div className="space-y-4">
                        <p>Apakah kamu yakin ingin menghapus "{modalState.data?.name}"?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleSubmit({ id: modalState.data?.id })}
                                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ) : (
                    <GenericForm
                        fields={fields}
                        onSubmit={handleSubmit}
                        onClose={closeModal}
                        initialData={modalState.data || {}}
                    />
                )}
            </CrudModal>
        </>
    );
};

export default BidangUsaha;