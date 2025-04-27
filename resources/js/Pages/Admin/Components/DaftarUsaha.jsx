import React, { useState, useEffect, useRef } from 'react';
import CrudModal from "@/Components/CrudModal";
import GenericForm from "@/Components/GenericForm";
import { useForm, router, usePage, Link } from "@inertiajs/react";
import { Inertia } from '@inertiajs/inertia'; // Pastikan Anda mengimpor Inertia

const DaftarUsaha = () => {
    const { products, filters } = usePage().props; // Get products from page props
    const { data, setData, post, put, processing, errors, reset } = useForm({
        nama_usaha: "",
        lokasi: "",
        email: "",
        telephone: "",
        image: null,
        existing_image: null,
    });

    const [modalState, setModalState] = useState({
        isOpen: false,
        type: null,
        data: null,
    });

    const [searchQuery, setSearchQuery] = useState(filters?.search || "");
    const [imagePreview, setImagePreview] = useState(null);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isSubmitting) {
            const timer = setTimeout(() => {
                setIsSubmitting(false);
            }, 2000); // Reset after 2 seconds
            return () => clearTimeout(timer);
        }
    }, [isSubmitting]);

    const openModal = (type, modalData = null) => {
        setModalState({ isOpen: true, type, data: modalData });
        if (modalData) {
            setData({
                nama_usaha: modalData.nama_usaha || "",
                lokasi: modalData.lokasi || "",
                email: modalData.email || "",
                telephone: modalData.telephone || "",
                image: null,
                existing_image: modalData.image || null,
            });
            setImagePreview(modalData.image || null);
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

    useEffect(() => {
        console.log('Modal state changed:', modalState);
    }, [modalState]);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("nama_usaha", data.nama_usaha);
        formData.append("lokasi", data.lokasi);
        formData.append("email", data.email);
        formData.append("telephone", data.telephone);
    
        if (data.image instanceof File) {
            formData.append("image", data.image);
        }
    
        setIsSubmitting(true);
    
        const submitMethod = modalState.type === "create" ? Inertia.post : Inertia.put; // Pastikan Anda menggunakan Inertia.post atau Inertia.put
        const url = modalState.type === "create"
            ? "/admin/dashboard/daftar-usaha"
            : `/admin/dashboard/daftar-usaha/${modalState.data?.id}`;
    
        submitMethod(url, formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (response) => {
                console.log("Form submitted successfully", response); // Tambahkan logging di sini
                setIsSubmitting(false);
                reset();
                setImagePreview(null);
                setModalState({ isOpen: false, type: null, data: null }); // Pastikan modal tertutup
            },
            onError: (errors) => {
                console.error("Form submission error", errors); // Tambahkan logging di sini
                setIsSubmitting(false);
            }
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            router.delete(`/admin/dashboard/daftar-usaha/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                }
            });
        }
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
        } else {
            setData('image', null);
            // Jika dalam mode edit, kembalikan ke gambar yang ada
            if (modalState.type === "edit" && data.existing_image) {
                setImagePreview(data.existing_image);
            } else {
                setImagePreview(null);
            }
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        router.get(
            "/admin/dashboard/daftar-usaha",
            { search: e.target.value },
            {
                preserveState: true,
                preserveScroll: true,
                only: ["products", "filters"],
            }
        );
    };

    const fields = [
        { name: "nama_usaha", label: "Nama Usaha" },
        { name: "lokasi", label: "Lokasi" },
        { name: "email", label: "Email", type: "email" },
        { name: "telephone", label: "Telephone", type: "tel" },
        { name: "image", label: "Gambar", type: "file" },
    ];

    return (
        <>
            <header className="bg-white shadow-sm font-sans border-b border-gray-100">
                <div className="flex justify-between items-center px-8 py-6">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-800 leading-tight">
                            DAFTAR USAHA
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="relative w-64">
                            <input
                                type="text"
                                placeholder="Cari nama usaha..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <svg
                                className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <button
                            onClick={() => openModal("create")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors duration-150"
                        >
                            Tambah Baru
                        </button>
                    </div>
                </div>
            </header>
            <main className="p-8">
                <div className="bg-white shadow">
                    <div className="p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="w-[30%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nama Usaha
                                        </th>
                                        <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Lokasi
                                        </th>
                                        <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="w-[20%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Telephone
                                        </th>
                                        <th className="w-[10%] px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.data.length > 0 ? (
                                        products.data.map((product) => (
                                            <tr key={product.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {product.nama_usaha}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {product.lokasi}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {product.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {product.telephone}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                                                    <button
                                                        onClick={() =>
                                                            openModal(
                                                                "view",
                                                                product
                                                            )
                                                        }
                                                        className="p-1.5 pl-0 text-green-600 hover:bg-green-50 transition-colors"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openModal(
                                                                "edit",
                                                                product
                                                            )
                                                        }
                                                        className="p-1.5 text-blue-600 hover:bg-blue-50 transition-colors"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            openModal(
                                                                "delete",
                                                                product
                                                            )
                                                        }
                                                        className="p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <svg
                                                            className="w-5 h-5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 text-center text-sm text-gray-500"
                                            >
                                                {searchQuery
                                                    ? "Tidak ada data usaha yang ditemukan"
                                                    : "Tidak ada data usaha yang tersedia"}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-700">
                        Menampilkan {products.from} sampai {products.to} dari{" "}
                        {products.total} data
                    </div>
                    <div className="flex items-center space-x-2">
                        {products.links.map((link, index) => {
                            // Skip rendering if no URL (disabled links)
                            if (!link.url) return null;
                            return (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-1 rounded-md ${
                                        link.active
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }`}
                                >
                                    {link.label === "Previous" ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    ) : link.label === "Next" ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    ) : (
                                        <span
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>

            <CrudModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                title={
                    modalState.type === "create"
                        ? "Tambah Usaha Baru"
                        : modalState.type === "edit"
                        ? "Edit Usaha"
                        : modalState.type === "view"
                        ? "Lihat Detail Usaha"
                        : modalState.type === "delete"
                        ? "Hapus Usaha"
                        : ""
                }
                showImage={modalState.type === "view"}
                maxWidth={
                    modalState.type === "edit" || modalState.type === "create"
                        ? "500px"
                        : modalState.type === "view"
                        ? "46dvw"
                        : modalState.type === "delete"
                        ? "400px"
                        : undefined
                }
            >
                {modalState.type === "delete" && (
                    <div
                        className="p-8 text-center"
                        style={{
                            fontFamily:
                                "'Inter', 'Nunito', 'Poppins', sans-serif",
                        }}
                    >
                        {modalState.data?.image && (
                            <img
                                src={modalState.data.image}
                                alt={`Gambar usaha ${modalState.data?.nama_usaha}`}
                                className="mx-auto mb-6 max-h-40 rounded shadow border object-cover"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src =
                                        "/images/no-image.png";
                                }}
                                style={{ background: "#f3f4f6" }}
                            />
                        )}
                        <h2 className="text-2xl font-bold mb-4 text-red-700">
                            Hapus Usaha?
                        </h2>
                        <p className="mb-6 text-gray-700">
                            Apakah Anda yakin ingin menghapus usaha{" "}
                            <span className="font-semibold text-red-700">
                                {modalState.data?.nama_usaha}
                            </span>
                            ?<br />
                            Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={closeModal}
                                className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() =>
                                    modalState.data?.id &&
                                    handleDelete(modalState.data.id)
                                }
                                className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 shadow transition"
                                disabled={processing}
                            >
                                {processing ? "Menghapus..." : "Hapus"}
                            </button>
                        </div>
                    </div>
                )}
                {modalState.type === "view" && (
                    <div
                        style={{
                            fontFamily:
                                "'Inter', 'Nunito', 'Poppins', sans-serif",
                        }}
                    >
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                            {modalState.data?.image && (
                                <img
                                    src={modalState.data.image}
                                    alt="Usaha"
                                    className="w-full max-w-xs rounded shadow border object-cover mb-6 md:mb-0"
                                    style={{ background: "#f3f4f6" }}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src =
                                            "/images/no-image.png";
                                    }}
                                />
                            )}
                            <div className="grid grid-cols-1 gap-y-3 w-full">
                                <div>
                                    <div className="text-gray-500 text-sm font-semibold mb-1">
                                        Nama Usaha
                                    </div>
                                    <div className="text-base font-medium text-gray-900">
                                        {modalState.data?.nama_usaha}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm font-semibold mb-1">
                                        Lokasi
                                    </div>
                                    <div className="text-base font-medium text-gray-900">
                                        {modalState.data?.lokasi}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm font-semibold mb-1">
                                        Email
                                    </div>
                                    <div className="text-base font-medium text-gray-900">
                                        {modalState.data?.email}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-sm font-semibold mb-1">
                                        Telephone
                                    </div>
                                    <div className="text-base font-medium text-gray-900">
                                        {modalState.data?.telephone}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {(modalState.type === "edit" ||
                    modalState.type === "create") && (
                    <GenericForm
                        fields={fields}
                        data={data}
                        setData={setData}
                        errors={errors}
                        handleSubmit={handleSubmit}
                        handleImageChange={handleImageChange}
                        imagePreview={imagePreview}
                        processing={isSubmitting}
                        onClose={closeModal} // Pastikan ini ada
                    />
                )}
            </CrudModal>
        </>
    );
};

export default DaftarUsaha;
