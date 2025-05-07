import React, { useState, useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Edit({ auth, product }) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("page");

    const {
        data,
        setData,
        post: submitForm,
        processing,
        errors,
        reset,
    } = useForm({
        nama_usaha: product.nama_usaha || "",
        lokasi: product.lokasi || "",
        email: product.email || "",
        telephone: product.telephone || "",
        images: [],
        description: product.description || "",
        page: page,
        _method: "PUT",
    });

    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const [existingImages, setExistingImages] = useState(product.images || []);
    const [isUploading, setIsUploading] = useState(false);
    const [loadingStates, setLoadingStates] = useState([]);
    const [existingImagesLoading, setExistingImagesLoading] = useState(
        new Array(product.images.length).fill(true)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append(`images[${i}]`, data.images[i]);
            }
        }
        submitForm(route("products.update", product.id), {
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsUploading(true);
        const currentImages = [...data.images];
        const newImages = [...currentImages, ...files];
        setData("images", newImages);

        const newLoadingStates = [...loadingStates];
        for (let i = 0; i < files.length; i++) {
            newLoadingStates.push(true);
        }
        setLoadingStates(newLoadingStates);

        const newPreviewUrls = [...imagePreviewUrls];
        let loadedCount = 0;

        files.forEach((file, index) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTimeout(() => {
                    newPreviewUrls.push(reader.result);
                    const updatedLoadingStates = [...loadingStates];
                    const currentIndex = currentImages.length + index;
                    updatedLoadingStates[currentIndex] = false;
                    setLoadingStates(updatedLoadingStates);
                    loadedCount++;
                    if (loadedCount === files.length) {
                        setImagePreviewUrls(newPreviewUrls);
                        setIsUploading(false);
                    }
                }, 100 + (index * 50));
            };
            reader.onerror = () => {
                console.error("Error reading file:", file.name);
                const updatedLoadingStates = [...loadingStates];
                const currentIndex = currentImages.length + index;
                updatedLoadingStates[currentIndex] = false;
                setLoadingStates(updatedLoadingStates);
                loadedCount++;
                if (loadedCount === files.length) {
                    setIsUploading(false);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeExistingImage = (id) => {
        if (confirm("Are you sure you want to delete this image?")) {
            router.delete(route("product-images.delete", id), {
                onSuccess: () => {
                    const index = existingImages.findIndex(img => img.id === id);
                    if (index !== -1) {
                        setExistingImages(existingImages.filter(img => img.id !== id));
                        setExistingImagesLoading(prev => prev.filter((_, i) => i !== index));
                    }
                },
                preserveScroll: true,
            });
        }
    };

    const removeTempImage = (index) => {
        if (confirm("Are you sure you want to remove this image? ")) {
            const currentImages = [...data.images];
            currentImages.splice(index, 1);
            setData("images", currentImages);
            const newPreviewUrls = [...imagePreviewUrls];
            newPreviewUrls.splice(index, 1);
            setImagePreviewUrls(newPreviewUrls);
            const newLoadingStates = [...loadingStates];
            newLoadingStates.splice(index, 1);
            setLoadingStates(newLoadingStates);
        }
    };

    const handleDescriptionChange = (value) => {
        setData('description', value);
    };

    const calculatePlaceholdersCount = () => {
        const totalImages = data.images.length;
        const loadedImages = imagePreviewUrls.length;
        return Math.max(0, totalImages - loadedImages);
    };

    const generatePlaceholders = () => {
        const count = calculatePlaceholdersCount();
        return Array(count).fill(null);
    };

    const renderLoadingPlaceholders = () => {
        const placeholders = generatePlaceholders();
        return placeholders.map((_, index) => (
            <div key={`placeholder-${index}`} className="aspect-[16/9] overflow-hidden rounded-sm">
                <div className="flex items-center justify-center h-full bg-gray-100">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
            </div>
        ));
    };

    useEffect(() => {
        if (imagePreviewUrls.length > 0 && loadingStates.length === 0) {
            setLoadingStates(new Array(imagePreviewUrls.length).fill(false));
        }
    }, [imagePreviewUrls]);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'link'
    ];

    return (
        <>
            <Sidebar />
            <div className="pl-64 bg-gray-50 min-h-screen">
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Edit Product" />

                    <div className="container mx-auto p-4">
                        <div className="bg-white shadow-xl rounded-sm overflow-hidden">
                            <div className="bg-[#5b9cff] p-5 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-white">
                                    Edit Product
                                </h2>
                                <Link
                                    href={route("products.index", { page })}
                                    className="px-6 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition duration-300"
                                >
                                    Back
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                {[
                                    { label: "Nama Usaha", name: "nama_usaha", type: "text", placeholder: "Masukkan nama usaha" },
                                    { label: "Lokasi", name: "lokasi", type: "text", placeholder: "Masukkan lokasi usaha" },
                                    { label: "Email", name: "email", type: "email", placeholder: "Masukkan email usaha" },
                                    { label: "Telephone", name: "telephone", type: "tel", placeholder: "Masukkan nomor telepon" },
                                    { label: "Description", name: "description", type: "richtext", placeholder: "Masukkan deskripsi (opsional)" },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label}
                                        </label>
                                        {field.type === "richtext" ? (
                                            <div className="mt-1">
                                                <ReactQuill
                                                    theme="snow"
                                                    value={data.description}
                                                    onChange={handleDescriptionChange}
                                                    modules={modules}
                                                    formats={formats}
                                                    className="h-64 mb-16"
                                                    placeholder="Masukkan deskripsi usaha..."
                                                />
                                            </div>
                                        ) : (
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={data[field.name]}
                                                onChange={(e) => setData(field.name, e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5b9cff] transition duration-300"
                                                required
                                            />
                                        )}
                                        {errors[field.name] && (
                                            <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                                        )}
                                    </div>
                                ))}

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
                                    <div className="relative">
                                        <div className="relative inline-block min-w-[120px]">
                                            <div className="inline-flex items-center justify-center px-4 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors duration-200 shadow-sm border border-blue-200">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Tambahkan Image
                                            </div>
                                            <input
                                                id="images"
                                                type="file"
                                                name="images"
                                                multiple
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        {data.images.length > 0 && (
                                            <span className="ml-3 px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-full inline-flex items-center">
                                                <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {data.images.length} file{data.images.length > 1 ? 's' : ''} dipilih
                                            </span>
                                        )}
                                    </div>
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                    )}

                                    <div className="mt-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {existingImages.map((image, index) => (
                                                <div key={image.id} className="relative aspect-[16/9] overflow-hidden rounded-sm">
                                                    {existingImagesLoading[index] && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                                                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                                                        </div>
                                                    )}
                                                    <img
                                                        src={`/storage/${image.image_path}`}
                                                        alt="Product"
                                                        className={`w-full h-full object-cover ${existingImagesLoading[index] ? 'invisible' : 'visible'}`}
                                                        onLoad={() => {
                                                            setTimeout(() => {
                                                                setExistingImagesLoading(prev => {
                                                                    const newLoading = [...prev];
                                                                    newLoading[index] = false;
                                                                    return newLoading;
                                                                });
                                                            }, 500); // Delay 500ms
                                                        }}
                                                    />
                                                    {!existingImagesLoading[index] && (
                                                        <button
                                                            type="button"
                                                            className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-sm flex items-center justify-center hover:bg-red-700 transition-colors duration-200 z-20"
                                                            onClick={() => removeExistingImage(image.id)}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            {imagePreviewUrls.map((url, index) => (
                                                <div key={`new-${index}`} className="relative aspect-[16/9] overflow-hidden rounded-sm">
                                                    <img
                                                        src={url}
                                                        alt={`New upload ${index + 1}`}
                                                        className="w-full h-full object-cover border-4 border-blue-200"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-sm flex items-center justify-center hover:bg-red-700 transition-colors duration-200"
                                                        onClick={() => removeTempImage(index)}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                            {isUploading && renderLoadingPlaceholders()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <Link
                                        href={route("products.index", { page })}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#5b9cff] transition duration-300"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 text-sm font-medium text-white bg-[#5b9cff] border border-transparent rounded-md shadow-sm hover:from-[#5b9cff] hover:to-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-300"
                                    >
                                        Update Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </>
    );
}