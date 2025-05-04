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
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitForm(route("products.store"), {
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            // First hide the current image and show loading
            setImagePreview(null);
            setIsUploading(true);

            const reader = new FileReader();

            // Create a promise to handle the image loading
            const loadImage = new Promise((resolve) => {
                reader.onload = (e) => {
                    resolve(e.target.result);
                };
                reader.readAsDataURL(file);
            });

            // Show loading animation while image is being processed
            loadImage.then((result) => {
                // Show loading animation for at least 1 second
                const startTime = Date.now();
                const timeout = 1000; // 1 second

                // Wait for either the timeout or the image to be fully loaded
                const waitTime = Math.max(
                    0,
                    timeout - (Date.now() - startTime)
                );
                setTimeout(() => {
                    setImagePreview(result);
                    setIsUploading(false);
                }, waitTime);
            });
        } else {
            setImagePreview(null);
            setIsUploading(false);
        }
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gambar
                                    </label>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleImageChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-500 hover:file:bg-green-100"
                                            accept="image/*"
                                        />
                                    </div>
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.image}
                                        </p>
                                    )}

                                    {imagePreview ? (
                                        <div className="mt-4">
                                            <div className="w-1/3 overflow-hidden rounded-lg">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover transition duration-300 hover:scale-105"
                                                />
                                            </div>
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
