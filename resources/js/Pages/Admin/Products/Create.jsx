import { useForm, Link } from "@inertiajs/react";
import { useState } from "react";
import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create() {
    const {
        data,
        setData,
        post: submitForm,
        processing,
        errors,
        reset,
    } = useForm({
        nama_usaha: "",
        lokasi: "",
        email: "",
        telephone: "",
        images: [],
    });

    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append(`images[${i}]`, data.images[i]);
            }
        }
        submitForm(route("products.store"), {
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const files = e.target.files;
        setData('images', [...data.images, ...files]);

        const newImagePreviewUrls = [...imagePreviewUrls];

        if (files && files.length > 0) {
            // First hide the current image and show loading
            setImagePreviewUrls([]);
            setIsUploading(true);

            // Process each file
            const newImagePreviewUrls = [];
            
            Array.from(files).forEach((file, index) => {
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    newImagePreviewUrls.push(e.target.result);
                    
                    // Update the state after all images are loaded
                    if (index === files.length - 1) {
                        setImagePreviewUrls(newImagePreviewUrls);
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
            setImagePreviewUrls([]);
            setIsUploading(false);
        }

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newImagePreviewUrls.push(reader.result);
                setImagePreviewUrls([...newImagePreviewUrls]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

        const newImagePreviewUrls = [...imagePreviewUrls];
        newImagePreviewUrls.splice(index, 1);
        setImagePreviewUrls(newImagePreviewUrls);
    };

    const queryString = window.location.search;

    // Buat objek URLSearchParams dari query string
    const urlParams = new URLSearchParams(queryString);

    // Ambil nilai parameter 'page'
    const page = urlParams.get("page");

    return (
        <>
            <Sidebar />
            <div className="pl-64 bg-gray-50 min-h-screen">
                <AuthenticatedLayout>
                    <div className="container mx-auto p-4">
                        <div className="bg-white shadow-xl rounded-sm overflow-hidden">
                            <div className="bg-[#04de16] p-5 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-white">
                                    Tambah UMKM Baru
                                </h2>
                                <Link
                                    href={route("products.index", { page })}
                                    className="px-6 py-2 bg-white/30 text-white rounded-md hover:bg-white/40 transition duration-300"
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
                                    {imagePreviewUrls.length > 0 ? (
                                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {imagePreviewUrls.map((url, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={url}
                                                        alt={`Preview ${index + 1}`}
                                                        className="aspect-[16/9] object-cover rounded"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-sm flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
                                                        onClick={() => removeImage(index)}
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
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-4 py-2 text-sm font-medium text-white bg-[#04de16] border border-transparent rounded-md shadow-sm hover:from-green-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 transition duration-300"
                                    >
                                        Simpan
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
