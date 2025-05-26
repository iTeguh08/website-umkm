import React, { useState, useEffect, useCallback } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ImageItem = ({ id, src, index, moveImage, removeImage, isLoading, isExisting = false }) => {
    const ref = React.useRef(null);
    const [localLoading, setLocalLoading] = useState(true);
    const imgRef = React.useRef(null);

    useEffect(() => {
        if (imgRef.current) {
            if (imgRef.current.complete) {
                setLocalLoading(false);
            }
        }
    }, [src]);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: () => ({ id, index, isExisting }),
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
            const dragIsExisting = item.isExisting;
            const hoverIsExisting = isExisting;

            if (dragIndex === hoverIndex && dragIsExisting === hoverIsExisting) {
                return;
            }

            moveImage(dragIndex, hoverIndex, dragIsExisting, hoverIsExisting);
            item.index = hoverIndex;
            item.isExisting = hoverIsExisting;
        },
    });

    const opacity = isDragging ? 0.5 : 1;
    drag(drop(ref));

    const handleImageLoad = () => {
        setLocalLoading(false);
    };

    const handleImageError = () => {
        setLocalLoading(false);
        console.error('Error loading image:', src);
    };

    return (
        <div
            ref={ref}
            style={{ opacity }}
            className="relative group aspect-[16/9] overflow-hidden rounded-sm"
        >
            <img
                ref={imgRef}
                src={src}
                alt={`Preview ${index + 1}`}
                className={`w-full h-full object-cover ${localLoading ? 'invisible' : 'visible'}`}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
            {localLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            )}
            {!localLoading && (
                <>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            type="button"
                            onClick={() => removeImage(index, isExisting)}
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

export default function Edit({
    auth,
    product,
    bidangUsahaOptions,
    jenisUsahaOptions,
}) {
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
        image_order: '',
        description: product.description || "",
        bidang_usaha: product.bidang_usaha || "",
        jenis_usaha: product.jenis_usaha || "",
        latitude: product.latitude || "",
        longitude: product.longitude || "",
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
                }, 100 + index * 50);
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
                    const index = existingImages.findIndex(
                        (img) => img.id === id
                    );
                    if (index !== -1) {
                        setExistingImages(
                            existingImages.filter((img) => img.id !== id)
                        );
                        setExistingImagesLoading((prev) =>
                            prev.filter((_, i) => i !== index)
                        );
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
        setData("description", value);
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
            <div
                key={`placeholder-${index}`}
                className="aspect-[16/9] overflow-hidden rounded-sm"
            >
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

    const moveImage = useCallback(
        (dragIndex, hoverIndex, dragIsExisting, hoverIsExisting) => {
            if (dragIsExisting === hoverIsExisting) {
                // Moving within the same list (existing or new images)
                if (dragIsExisting) {
                    const newExistingImages = [...existingImages];
                    const [movedImage] = newExistingImages.splice(dragIndex, 1);
                    newExistingImages.splice(hoverIndex, 0, movedImage);
                    setExistingImages(newExistingImages);

                    const newLoadingStates = [...existingImagesLoading];
                    const [movedLoading] = newLoadingStates.splice(dragIndex, 1);
                    newLoadingStates.splice(hoverIndex, 0, movedLoading);
                    setExistingImagesLoading(newLoadingStates);

                    const existingImageIds = newExistingImages.map(img => img.id);
                    setData("image_order", JSON.stringify(existingImageIds));

                } else {
                    const newPreviewUrls = [...imagePreviewUrls];
                    const [movedPreview] = newPreviewUrls.splice(dragIndex, 1);
                    newPreviewUrls.splice(hoverIndex, 0, movedPreview);
                    setImagePreviewUrls(newPreviewUrls);

                    const newImages = [...data.images];
                    const [movedImage] = newImages.splice(dragIndex, 1);
                    newImages.splice(hoverIndex, 0, movedImage);
                    setData("images", newImages);

                    const newLoadingStates = [...loadingStates];
                    const [movedLoading] = newLoadingStates.splice(dragIndex, 1);
                    newLoadingStates.splice(hoverIndex, 0, movedLoading);
                    setLoadingStates(newLoadingStates);
                }
            } else {
                // Moving between lists (from existing to new or vice versa)
                if (dragIsExisting) {
                    const newExistingImages = [...existingImages];
                    const [movedImage] = newExistingImages.splice(dragIndex, 1);
                    const newPreviewUrls = [...imagePreviewUrls];
                    newPreviewUrls.splice(hoverIndex, 0, `/storage/${movedImage.image_path}`);
                    setExistingImages(newExistingImages);
                    setImagePreviewUrls(newPreviewUrls);
                } else {
                    const newPreviewUrls = [...imagePreviewUrls];
                    const [movedPreview] = newPreviewUrls.splice(dragIndex, 1);
                    const newExistingImages = [...existingImages];
                    newExistingImages.splice(hoverIndex, 0, { id: `temp-${Date.now()}`, image_path: movedPreview });
                    setImagePreviewUrls(newPreviewUrls);
                    setExistingImages(newExistingImages);
                }
            }
        },
        [existingImages, imagePreviewUrls, data.images, loadingStates, existingImagesLoading]
    );

    return (
        <DndProvider backend={HTML5Backend}>
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
                                                    onChange={
                                                        handleDescriptionChange
                                                    }
                                                    modules={modules}
                                                    formats={formats}
                                                    className="h-64 mb-16"
                                                    placeholder="Masukkan deskripsi usaha..."
                                                />
                                            </div>
                                        ) : field.type === "select" ? (
                                            <select
                                                id={field.name}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data[field.name]}
                                                onChange={(e) =>
                                                    setData(
                                                        field.name,
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            >
                                                <option value="">
                                                    Select {field.label}
                                                </option>
                                                {field.name === "bidang_usaha"
                                                    ? bidangUsahaOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    option.slice(
                                                                        1
                                                                    )}
                                                            </option>
                                                        )
                                                    )
                                                    : jenisUsahaOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    option.slice(
                                                                        1
                                                                    )}
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                        ) : (
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
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5b9cff] transition duration-300"
                                                required
                                            />
                                        )}
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
                                    {
                                        label: "Description",
                                        name: "description",
                                        type: "richtext",
                                        placeholder:
                                            "Masukkan deskripsi (opsional)",
                                    },
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
                                                    onChange={
                                                        handleDescriptionChange
                                                    }
                                                    modules={modules}
                                                    formats={formats}
                                                    className="h-64 mb-16"
                                                    placeholder="Masukkan deskripsi usaha..."
                                                />
                                            </div>
                                        ) : field.type === "select" ? (
                                            <select
                                                id={field.name}
                                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                value={data[field.name]}
                                                onChange={(e) =>
                                                    setData(
                                                        field.name,
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            >
                                                <option value="">
                                                    Select {field.label}
                                                </option>
                                                {field.name === "bidang_usaha"
                                                    ? bidangUsahaOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    option.slice(
                                                                        1
                                                                    )}
                                                            </option>
                                                        )
                                                    )
                                                    : jenisUsahaOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={option}
                                                                value={option}
                                                            >
                                                                {option
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                    option.slice(
                                                                        1
                                                                    )}
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                        ) : (
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
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5b9cff] transition duration-300"
                                                required
                                            />
                                        )}
                                        {errors[field.name] && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors[field.name]}
                                            </p>
                                        )}
                                    </div>
                                ))}

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
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gambar
                                    </label>
                                    <div className="relative">
                                        <div className="relative inline-block min-w-[120px]">
                                            <div className="inline-flex items-center justify-center px-4 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors duration-200 shadow-sm border border-blue-200">
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
                                                    className="w-4 h-4 mr-1.5 text-blue-500"
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
                                                dipilih
                                            </span>
                                        )}
                                    </div>
                                    {errors.image && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.image}
                                        </p>
                                    )}

                                    <div className="mt-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {existingImages.map(
                                                (image, index) => (
                                                    <ImageItem
                                                        key={image.id}
                                                        id={image.id}
                                                        src={`/storage/${image.image_path}`}
                                                        index={index}
                                                        moveImage={moveImage}
                                                        removeImage={removeExistingImage}
                                                        isLoading={existingImagesLoading[index]}
                                                        isExisting={true}
                                                    />
                                                )
                                            )}
                                            {imagePreviewUrls.map(
                                                (url, index) => (
                                                    <ImageItem
                                                        key={`new-${index}`}
                                                        id={`new-${index}`}
                                                        src={url}
                                                        index={index}
                                                        moveImage={moveImage}
                                                        removeImage={removeTempImage}
                                                        isLoading={loadingStates[index]}
                                                        isExisting={false}
                                                    />
                                                )
                                            )}
                                            {isUploading &&
                                                renderLoadingPlaceholders()}
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
        </DndProvider>
    );
}
