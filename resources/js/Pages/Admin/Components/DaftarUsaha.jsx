import React, { useState } from 'react';
import CrudModal from '@/Components/CrudModal';
import GenericForm from '@/Components/GenericForm';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

const DaftarUsaha = () => {
    const { products } = usePage().props; // Get products from page props
    const { data, setData, post, put, processing, errors, reset } = useForm({
        nama_usaha: '',
        lokasi: '',
        email: '',
        telephone: '',
        image: null
    });

    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null,
        data: null
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const openModal = (type, modalData = null) => {
        setModalState({ isOpen: true, type, data: modalData });
        if (modalData) {
            setData(modalData);
            if (modalData.image) {
                setImagePreview(modalData.image);
            }
        } else {
            reset();
            setImagePreview(null);
        }
    };

    const closeModal = () => {
        setModalState({ isOpen: false, type: null, data: null });
        setImagePreview(null);
        reset();
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('nama_usaha', data.nama_usaha);
        formData.append('lokasi', data.lokasi);
        formData.append('email', data.email);
        formData.append('telephone', data.telephone);
        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        if (modalState.type === 'create') {
            // First close the modal immediately
            setModalState({ isOpen: false, type: null, data: null });
            
            // Then submit the form
            post('/admin/dashboard/daftar-usaha', formData, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    // Reset form data after successful submission
                    reset();
                    setImagePreview(null);
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Submission errors:', errors);
                    // Reopen modal if there are errors
                    setModalState({ isOpen: true, type: 'create', data: null });
                }
            });
        } else if (modalState.type === 'edit' && modalState.data?.id) {
            // Same approach for edit - close first, then submit
            setModalState({ isOpen: false, type: null, data: null });
            
            router.post(`/admin/dashboard/daftar-usaha/${modalState.data.id}`, {
                _method: 'PUT',
                ...Object.fromEntries(formData)
            }, {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setImagePreview(null);
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Update errors:', errors);
                    // Reopen modal with edit data if there are errors
                    setModalState({ isOpen: true, type: 'edit', data: modalState.data });
                }
            });
        }
    };

    const handleDelete = (id) => {
        router.delete(`/admin/dashboard/daftar-usaha/${id}`, {
            onSuccess: () => {
                closeModal();
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Delete errors:', errors);
            },
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const fields = [
        { name: 'nama_usaha', label: 'Nama Usaha' },
        { name: 'lokasi', label: 'Lokasi' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'telephone', label: 'Telephone', type: 'tel' },
        { name: 'image', label: 'Gambar', type: 'file' }
    ];

    return (
        <>
            <header className="bg-white shadow-sm">
                <div className="flex justify-between items-center px-8 py-6">
                    <h1 className="text-2xl font-semibold text-gray-900">Daftar Usaha</h1>
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
                                        <th className="w-[30%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Usaha</th>
                                        <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                                        <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telephone</th>
                                        <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products && products.length > 0 ? (
                                        products
                                            .filter(product => 
                                                searchQuery === '' || 
                                                product.nama_usaha.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                product.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                product.email.toLowerCase().includes(searchQuery.toLowerCase())
                                            )
                                            .map(product => (
                                                <tr key={product.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.nama_usaha}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.lokasi}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.telephone}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                                                        <button
                                                            onClick={() => openModal('view', product)}
                                                            className="p-1.5 text-green-600 hover:bg-green-50 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => openModal('edit', product)}
                                                            className="p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => openModal('delete', product)}
                                                            className="p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                                                Tidak ada data usaha yang tersedia
                                            </td>
                                        </tr>
                                    )}
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
                    modalState.type === 'create' ? 'Tambah Usaha Baru' :
                        modalState.type === 'edit' ? 'Edit Usaha' :
                            modalState.type === 'view' ? 'Lihat Detail Usaha' :
                                modalState.type === 'delete' ? 'Hapus Usaha' : ''
                }
                showImage={modalState.type === 'view'}
                maxWidth={modalState.type === 'view' ? '4xl' : '2xl'}
            >
                {modalState.type === 'delete' ? (
                    <div className="space-y-4">
                        <p>Apakah kamu yakin ingin menghapus "{modalState.data?.nama_usaha}"?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => handleDelete(modalState.data?.id)}
                                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ) : modalState.type === 'view' ? (
                    <>
                        <div className="space-y-4">
                            {modalState.data?.image && (
                                <img
                                    src={modalState.data.image}
                                    alt="Preview"
                                    className="w-full h-auto rounded-lg object-cover"
                                />
                            )}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Usaha</label>
                                <p className="mt-1 text-sm text-gray-900">{modalState.data?.nama_usaha}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Lokasi</label>
                                <p className="mt-1 text-sm text-gray-900">{modalState.data?.lokasi}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <p className="mt-1 text-sm text-gray-900">{modalState.data?.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Telephone</label>
                                <p className="mt-1 text-sm text-gray-900">{modalState.data?.telephone}</p>
                        </div>
                        </div>
                    </>
                ) : (
                    <GenericForm
                        fields={fields}
                        onSubmit={handleSubmit}
                        onClose={closeModal}
                        initialData={modalState.data || {}}
                        handleImageChange={handleImageChange}
                        imagePreview={imagePreview}
                        processing={processing}
                        errors={errors}
                        data={data}
                        setData={setData}
                    />
                )}
            </CrudModal>
        </>
    );
};

export default DaftarUsaha;