import { useForm, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Create({ bidangUsahaOptions, jenisUsahaOptions }) {
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
        description: "",
        images: [],
        bidang_usaha: "",
        jenis_usaha: "",
    });

    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const [loadingStates, setLoadingStates] = useState([]); // Array untuk menyimpan status loading per gambar
    const [isUploading, setIsUploading] = useState(false);

    const handleDescriptionChange = (value) => {
        setData('description', value);
    };

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
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsUploading(true);

        // Get the current images and add new ones
        const currentImages = [...data.images];
        const newImages = [...currentImages, ...files];
        setData("images", newImages);

        // Create loading states for new images
        const newLoadingStates = [...loadingStates];
        for (let i = 0; i < files.length; i++) {
            newLoadingStates.push(true); // Set loading state to true for each new image
        }
        setLoadingStates(newLoadingStates);

        // Update the preview URLs
        const newPreviewUrls = [...imagePreviewUrls];
        let loadedCount = 0;

        files.forEach((file, index) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Tambahkan artificial delay untuk menunjukkan loading state
                setTimeout(() => {
                    newPreviewUrls.push(reader.result);
                    
                    // Update the loading state for this specific image
                    const updatedLoadingStates = [...loadingStates];
                    // Mencari index yang sesuai berdasarkan jumlah gambar yang ada
                    const currentIndex = currentImages.length + index;
                    updatedLoadingStates[currentIndex] = false;
                    setLoadingStates(updatedLoadingStates);
                    
                    loadedCount++;

                    // When all images are loaded, update the preview state
                    if (loadedCount === files.length) {
                        setImagePreviewUrls(newPreviewUrls);
                        setIsUploading(false);
                    }
                }, 100 + (index * 50)); // Tambahkan delay bertahap untuk setiap gambar
            };

            reader.onerror = () => {
                console.error("Error reading file:", file.name);
                
                // Update the loading state for this specific image
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

    const removeTempImage = (index) => {
        if (confirm('Are you sure you want to remove this image? ')) {
            // Get the current images array
            const currentImages = [...data.images];

            // Remove the image at the specified index
            currentImages.splice(index, 1);

            // Update the form data
            setData('images', currentImages);

            // Update the preview URLs
            const newPreviewUrls = [...imagePreviewUrls];
            newPreviewUrls.splice(index, 1);
            setImagePreviewUrls(newPreviewUrls);

            // Update loading states
            const newLoadingStates = [...loadingStates];
            newLoadingStates.splice(index, 1);
            setLoadingStates(newLoadingStates);
        }
    };

    // Gunakan useEffect untuk inisialisasi loading states sesuai dengan preview yang ada
    useEffect(() => {
        if (imagePreviewUrls.length > 0 && loadingStates.length === 0) {
            // Jika ada preview gambar tapi tidak ada loading states, inisialisasi dengan false
            setLoadingStates(new Array(imagePreviewUrls.length).fill(false));
        }
    }, []);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const page = urlParams.get("page");

    // Menghitung jumlah placeholder yang perlu ditampilkan
    const calculatePlaceholdersCount = () => {
        const totalImages = data.images.length;
        const loadedImages = imagePreviewUrls.length;
        const placeholdersNeeded = Math.max(0, totalImages - loadedImages);
        return placeholdersNeeded;
    };

    // Menghasilkan array placeholder berdasarkan jumlah yang dibutuhkan
    const generatePlaceholders = () => {
        const count = calculatePlaceholdersCount();
        return Array(count).fill(null);
    };

    // Placeholder untuk gambar yang sedang diupload
    const renderLoadingPlaceholders = () => {
        const placeholders = generatePlaceholders();
        return placeholders.map((_, index) => (
            <div key={`placeholder-${index}`} className="aspect-[16/9] overflow-hidden rounded-sm">
                <div className="flex items-center justify-center h-full bg-gray-100">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
                </div>
            </div>
        ));
    };

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
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label}
                                        </label>
                                        <input
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
                                        />
                                        {errors[field.name] && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors[field.name]}
                                            </p>
                                        )}
                                    </div>
                                ))}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Bidang Usaha
                                    </label>
                                    <select
                                        id="bidang_usaha"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.bidang_usaha}
                                        onChange={(e) => setData("bidang_usaha", e.target.value)}
                                        required
                                    >
                                        <option value="">Select Bidang Usaha</option>
                                        {bidangUsahaOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.bidang_usaha && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.bidang_usaha}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Jenis Usaha
                                    </label>
                                    <select
                                        id="jenis_usaha"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.jenis_usaha}
                                        onChange={(e) => setData("jenis_usaha", e.target.value)}
                                        required
                                    >
                                        <option value="">Select Jenis Usaha</option>
                                        {jenisUsahaOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option.charAt(0).toUpperCase() + option.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.jenis_usaha && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.jenis_usaha}
                                        </p>
                                    )}
                                </div>

                                {[
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
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {field.label}
                                        </label>
                                        <input
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
                                        />
                                        {errors[field.name] && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors[field.name]}
                                            </p>
                                        )}
                                    </div>
                                ))}

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Deskripsi
                                    </label>
                                    <ReactQuill
                                        theme="snow"
                                        value={data.description}
                                        onChange={handleDescriptionChange}
                                        modules={modules}
                                        formats={formats}
                                        className="h-64 mb-16"
                                        placeholder="Masukkan deskripsi usaha..."
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Field untuk multiple images */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gambar
                                    </label>
                                    <div className="relative">
                                        <div className="relative inline-block min-w-[120px]">
                                            <div className="inline-flex items-center justify-center px-4 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full hover:bg-green-200 transition-colors duration-200 shadow-sm border border-green-200">
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
                                                <svg className="w-4 h-4 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {data.images.length} file{data.images.length > 1 ? 's' : ''} ditambahkan
                                            </span>
                                        )}
                                    </div>
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.image}
                                        </p>
                                    )}

                                    {/* Preview images dan placeholders */}
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {/* Render existing image previews */}
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
                                                    onClick={() => removeTempImage(index)}
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                        
                                        {/* Render loading placeholders for images being uploaded */}
                                        {isUploading && renderLoadingPlaceholders()}
                                    </div>
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