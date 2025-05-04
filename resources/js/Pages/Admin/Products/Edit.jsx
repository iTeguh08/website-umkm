import React, { useState, useEffect } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";

export default function Edit({ auth, product }) {

    console.log('Product received:', product);
    console.log('Images received:', product.images);

    const queryString = window.location.search;

    // Buat objek URLSearchParams dari query string
    const urlParams = new URLSearchParams(queryString);

    // Ambil nilai parameter 'page'
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
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (product.images) {
            const imageUrls = `/storage/products/${product.images}`;
            const images = new Image();
            images.src = imageUrls;

            images.onload = () => {
                // Show loading animation for at least 1 second
                setTimeout(() => {
                    setImagePreviewUrls(imageUrls);
                    setIsInitialLoading(false);
                }, 1000);
            };

            images.onerror = () => {
                setIsInitialLoading(false);
            };
        } else {
            setIsInitialLoading(false);
        }
    }, [product.images]);

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
        const files = e.target.files;
        setData('images', [...data.images, ...files]);

        const newImagePreviewUrls = [...imagePreviewUrls];

        if (files && files.length > 0) {
            // First hide the current image and show loading
            setExistingImages([]);
            setIsUploading(true);

            // Process each file
            const newImagePreviewUrls = [];
            
            Array.from(files).forEach((file, index) => {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    newImagePreviewUrls.push(e.target.result);
                    
                    // Update the state after all images are loaded
                    if (index === files.length - 1) {
                        setExistingImages(newImagePreviewUrls);
                        setIsUploading(false);
                    }
                };
                
                reader.onerror = () => {
                    console.error('Error reading file:', file.name);
                    setIsUploading(false);
                };
                
                reader.readAsDataURL(file);
            });
        } else {
            setExistingImages([]);
            setIsUploading(false);
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImagePreviewUrls.push(reader.result);
                setExistingImages([...newImagePreviewUrls]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeExistingImage = (id) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('product-images.delete', id), {
                onSuccess: () => {
                    setExistingImages(existingImages.filter(img => img.id !== id));
                },
            });
        }
    };

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

                            <form
                                onSubmit={handleSubmit}
                                className="p-6 space-y-6"
                            >
                                {[
                                    {
                                        label: "Nama Usaha",
                                        name: "nama_usaha",
                                        type: "text",
                                        placeholder: "Masukkan nama usaha",
                                    },
                                    {
                                        label: "Lokasi",
                                        name: "lokasi",
                                        type: "text",
                                        placeholder: "Masukkan lokasi usaha",
                                    },
                                    {
                                        label: "Email",
                                        name: "email",
                                        type: "email",
                                        placeholder: "Masukkan email usaha",
                                    },
                                    {
                                        label: "Telephone",
                                        name: "telephone",
                                        type: "tel",
                                        placeholder: "Masukkan nomor telepon",
                                    },
                                    {
                                        label: "Description",
                                        name: "description",
                                        type: "textarea",
                                        placeholder: "Masukkan deskripsi (opsional)",
                                    },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label}
                                        </label>
                                        {field.type === 'textarea' ? (<textarea
                                            type={'textarea'}
                                            name={field.name}
                                            rows="5"
                                            placeholder={field.placeholder}
                                            value={data[field.name]}
                                            onChange={(e) =>
                                                setData(
                                                    field.name,
                                                    e.target.value
                                                )
                                            }
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b9cff] transition duration-300"
                                            required
                                        />)

                                            : (<input
                                                type={field.type}
                                                name={field.name}
                                                placeholder={field.placeholder}
                                                value={data[field.name]}
                                                onChange={(e) =>
                                                    setData(
                                                        field.name,
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b9cff] transition duration-300"
                                                required
                                            />)
                                        }
                                        {errors[field.name] && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors[field.name]}
                                            </p>
                                        )}
                                    </div>
                                ))}

                                {/* Field untuk multiple images */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gambar
                                    </label>
                                    <input
                                        id="images"
                                        type="file"
                                        name="images"
                                        multiple
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-500 hover:file:bg-green-100"
                                        onChange={handleImageChange}
                                    />
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.image}
                                        </p>
                                    )}

                                    {/* Preview multiple images */}
                                    {existingImages.length > 0 ? (
                                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {existingImages.map((image) => (
                                                <div key={image.id} className="relative">
                                                    <img
                                                        src={`/storage/${image.image_path}`}
                                                        alt="Product"
                                                        className="aspect-[16/9] object-cover rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-sm flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                                                        onClick={() => removeExistingImage(image.id)}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="mt-4">
                                            <div className="w-1/3 aspect-[16/9] overflow-hidden rounded-lg">
                                                {isUploading && (
                                                    <div className="flex items-center justify-center h-full bg-gray-100">
                                                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-3 pt-4">
                                    <Link
                                        href={route("products.index", { page })}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5b9cff] transition duration-300"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 text-sm font-medium text-white bg-[#5b9cff] border border-transparent rounded-md shadow-sm hover:from-[#5b9cff] hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-300"
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
