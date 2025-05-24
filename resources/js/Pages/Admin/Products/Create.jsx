import React from "react";
import { useForm, Link } from "@inertiajs/react";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "@/Components/Sidebar";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ImageItem = ({
    id,
    src,
    index,
    moveImage,
    removeTempImage,
    isLoading,
}) => {
    const ref = React.useRef(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: () => ({ id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop({
        accept: "image",
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref));

    return (
        <div
            ref={ref}
            style={{ opacity }}
            className="relative group aspect-[16/9] overflow-hidden rounded-sm border border-gray-200"
        >
            {isLoading ? (
                <div className="flex items-center justify-center h-full bg-gray-100">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
            ) : (
                <>
                    <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            type="button"
                            onClick={() => removeTempImage(index)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            title="Hapus gambar"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="absolute top-1 left-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {index === 0 ? "Thumbnail" : index + 1}
                    </div>
                </>
            )}
        </div>
    );
};

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
        latitude: "",
        longitude: "",
    });

    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
    const [loadingStates, setLoadingStates] = useState([]); // Array untuk menyimpan status loading per gambar
    const [isUploading, setIsUploading] = useState(false);

    const handleDescriptionChange = (value) => {
        setData("description", value);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
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
                }, 100 + index * 50); // Tambahkan delay bertahap untuk setiap gambar
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
        if (confirm("Are you sure you want to remove this image? ")) {
            // Get the current images array
            const currentImages = [...data.images];

            // Remove the image at the specified index
            currentImages.splice(index, 1);

            // Update the form data
            setData("images", currentImages);

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
            <div
                key={`placeholder-${index}`}
                className="aspect-[16/9] overflow-hidden rounded-sm"
            >
                <div className="flex items-center justify-center h-full bg-gray-100">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600"></div>
                </div>
            </div>
        ));
    };

    const moveImage = useCallback(
        (dragIndex, hoverIndex) => {
            setData((prevData) => {
                const newImages = [...prevData.images];
                const newPreviewUrls = [...imagePreviewUrls];
                const newLoadingStates = [...loadingStates];

                // Reorder images
                const [movedImage] = newImages.splice(dragIndex, 1);
                newImages.splice(hoverIndex, 0, movedImage);

                // Reorder preview URLs
                const [movedPreview] = newPreviewUrls.splice(dragIndex, 1);
                newPreviewUrls.splice(hoverIndex, 0, movedPreview);

                // Reorder loading states
                const [movedLoading] = newLoadingStates.splice(dragIndex, 1);
                newLoadingStates.splice(hoverIndex, 0, movedLoading);

                // Update state
                setImagePreviewUrls(newPreviewUrls);
                setLoadingStates(newLoadingStates);

                return { ...prevData, images: newImages };
            });
        },
        [imagePreviewUrls, loadingStates]
    );

    return (
        <DndProvider backend={HTML5Backend}>
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
                                        onChange={(e) =>
                                            setData(
                                                "bidang_usaha",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Bidang Usaha
                                        </option>
                                        {bidangUsahaOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    option.slice(1)}
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
                                        onChange={(e) =>
                                            setData(
                                                "jenis_usaha",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">
                                            Select Jenis Usaha
                                        </option>
                                        {jenisUsahaOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    option.slice(1)}
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Latitude
                                    </label>
                                    <input
                                        type="text"
                                        name="latitude"
                                        placeholder="Enter latitude"
                                        value={data.latitude}
                                        onChange={(e) =>
                                            setData("latitude", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b9cff] transition duration-300"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        name="longitude"
                                        placeholder="Enter longitude"
                                        value={data.longitude}
                                        onChange={(e) =>
                                            setData("longitude", e.target.value)
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b9cff] transition duration-300"
                                        required
                                    />
                                </div>

                                {/* Field untuk multiple images */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gambar
                                    </label>
                                    <div className="relative">
                                        <div className="relative inline-block min-w-[120px]">
                                            <div className="inline-flex items-center justify-center px-4 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full hover:bg-green-200 transition-colors duration-200 shadow-sm border border-green-200">
                                                <svg
                                                    className="w-4 h-4 mr-1"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 4v16m8-8H4"
                                                    />
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
                                                <svg
                                                    className="w-4 h-4 mr-1.5 text-green-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                {data.images.length} file
                                                {data.images.length > 1
                                                    ? "s"
                                                    : ""}{" "}
                                                ditambahkan
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
                                        {imagePreviewUrls.map((url, index) => (
                                            <ImageItem
                                                key={`preview-${index}`}
                                                id={`preview-${index}`}
                                                src={url}
                                                index={index}
                                                moveImage={moveImage}
                                                removeTempImage={
                                                    removeTempImage
                                                }
                                                isLoading={loadingStates[index]}
                                            />
                                        ))}

                                        {/* Render loading placeholders for images being uploaded */}
                                        {isUploading &&
                                            renderLoadingPlaceholders()}
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
        </DndProvider>
    );
}
