import React, { useState, useEffect, useCallback } from "react";
import { Head, Link, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Sidebar from "@/Components/Sidebar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

    // Handle initial load state for existing images
    useEffect(() => {
        // Set all existing images loading to false after a short delay
        // This ensures the loading animation shows briefly but doesn't get stuck
        const timer = setTimeout(() => {
            setExistingImagesLoading(new Array(existingImages.length).fill(false));
        }, 100);

        return () => clearTimeout(timer);
    }, []); // Run only once on mount

    // Sensors for @dnd-kit with better accessibility and touch support
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Handle drag end for existing images
    const handleExistingImagesDragEnd = useCallback((event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const activeIndex = existingImages.findIndex((img) => img.id === active.id);
        const overIndex = existingImages.findIndex((img) => img.id === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
            setExistingImages((prevImages) => arrayMove(prevImages, activeIndex, overIndex));
            setExistingImagesLoading((prevStates) => arrayMove(prevStates, activeIndex, overIndex));
        }
    }, [existingImages]);

    // Handle drag end for new images
    const handleNewImagesDragEnd = useCallback((event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const activeIndex = imagePreviewUrls.findIndex((_, index) => `new-${index}` === active.id);
        const overIndex = imagePreviewUrls.findIndex((_, index) => `new-${index}` === over.id);

        if (activeIndex !== -1 && overIndex !== -1) {
            setData((prevData) => {
                const newImages = arrayMove(prevData.images, activeIndex, overIndex);
                return { ...prevData, images: newImages };
            });

            setImagePreviewUrls((prevUrls) => arrayMove(prevUrls, activeIndex, overIndex));
            setLoadingStates((prevStates) => arrayMove(prevStates, activeIndex, overIndex));
        }
    }, [imagePreviewUrls]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Add all form data
        formData.append('nama_usaha', data.nama_usaha);
        formData.append('lokasi', data.lokasi);
        formData.append('email', data.email);
        formData.append('telephone', data.telephone);
        formData.append('description', data.description);
        formData.append('bidang_usaha', data.bidang_usaha);
        formData.append('jenis_usaha', data.jenis_usaha);
        formData.append('latitude', data.latitude);
        formData.append('longitude', data.longitude);
        formData.append('page', data.page);
        formData.append('_method', 'PUT');

        // Add existing images with their new order
        if (existingImages.length > 0) {
            existingImages.forEach((image, index) => {
                formData.append(`existing_images[${index}][id]`, image.id);
                formData.append(`existing_images[${index}][order]`, index);
            });
        }

        // Add new images with their order
        if (data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append(`images[${i}]`, data.images[i]);
                // Order starts after existing images
                const newImageOrder = existingImages.length + i;
                formData.append(`image_orders[${i}]`, newImageOrder);
            }
        }

        // Alternative approach: Use router.post instead of submitForm
        router.post(route("products.update", product.id), formData, {
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

    const SortableExistingImageItem = ({
        id,
        image,
        index,
        removeExistingImage,
        isLoading,
        setExistingImagesLoading,
    }) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
        } = useSortable({ id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
        };

        const handleDeleteClick = (e) => {
            // Stop all event propagation
            e.preventDefault();
            e.stopPropagation();

            removeExistingImage(image.id);
        };

        return (
            <div
                ref={setNodeRef}
                style={style}
                className="relative group aspect-[16/9] overflow-hidden rounded-sm border border-gray-200"
            >
                {/* Drag handle area - only the image itself */}
                <div
                    {...attributes}
                    {...listeners}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full bg-gray-100">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <img
                            src={`/storage/${image.image_path}`}
                            alt="Product"
                            className="w-full h-full object-cover pointer-events-none"
                        />
                    )}
                </div>

                {/* Delete button overlay - positioned outside drag area */}
                {!isLoading && (
                    <>
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            onMouseDown={(e) => e.stopPropagation()}
                            onMouseUp={(e) => e.stopPropagation()}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-50 pointer-events-auto shadow-lg"
                            title="Hapus gambar"
                            style={{
                                zIndex: 9999,
                                position: 'absolute',
                                pointerEvents: 'auto'
                            }}
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

                        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded pointer-events-none z-10">
                            {index === 0 ? "Thumbnail" : index + 1}
                        </div>
                    </>
                )}
            </div>
        );
    };

    const SortableNewImageItem = ({
        id,
        src,
        index,
        removeTempImage,
        isLoading,
    }) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
        } = useSortable({ id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.5 : 1,
        };

        const handleDeleteClick = (e) => {
            // Stop all event propagation
            e.preventDefault();
            e.stopPropagation();

            removeTempImage(index);
        };

        return (
            <div
                ref={setNodeRef}
                style={style}
                className="relative group aspect-[16/9] overflow-hidden rounded-sm border-4 border-blue-200"
            >
                {/* Drag handle area - only the image itself */}
                <div
                    {...attributes}
                    {...listeners}
                    className="w-full h-full cursor-grab active:cursor-grabbing"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full bg-gray-100">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : (
                        <img
                            src={src}
                            alt={`New upload ${index + 1}`}
                            className="w-full h-full object-cover pointer-events-none"
                        />
                    )}
                </div>

                {/* Delete button overlay - positioned outside drag area */}
                {!isLoading && (
                    <>
                        <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                        <button
                            type="button"
                            onClick={handleDeleteClick}
                            onMouseDown={(e) => e.stopPropagation()}
                            onMouseUp={(e) => e.stopPropagation()}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-50 pointer-events-auto shadow-lg"
                            title="Hapus gambar"
                            style={{
                                zIndex: 9999,
                                position: 'absolute',
                                pointerEvents: 'auto'
                            }}
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

                        <div className="absolute top-2 left-2 bg-blue-600 bg-opacity-80 text-white text-xs px-2 py-1 rounded pointer-events-none z-10">
                            New {index + 1}
                        </div>
                    </>
                )}
            </div>
        );
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

                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={(event) => {
                                    // Check if dragging existing image or new image
                                    if (typeof event.active.id === 'number') {
                                        handleExistingImagesDragEnd(event);
                                    } else if (String(event.active.id).startsWith('new-')) {
                                        handleNewImagesDragEnd(event);
                                    }
                                }}
                            >
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
                                                <SortableContext
                                                    items={existingImages.map((img) => img.id)}
                                                    strategy={verticalListSortingStrategy}
                                                >
                                                    {existingImages.map(
                                                        (image, index) => (
                                                            <SortableExistingImageItem
                                                                key={image.id}
                                                                id={image.id}
                                                                image={image}
                                                                index={index}
                                                                removeExistingImage={
                                                                    removeExistingImage
                                                                }
                                                                isLoading={
                                                                    existingImagesLoading[
                                                                    index
                                                                    ]
                                                                }
                                                                setExistingImagesLoading={
                                                                    setExistingImagesLoading
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </SortableContext>

                                                <SortableContext
                                                    items={imagePreviewUrls.map((_, index) => `new-${index}`)}
                                                    strategy={verticalListSortingStrategy}
                                                >
                                                    {imagePreviewUrls.map(
                                                        (url, index) => (
                                                            <SortableNewImageItem
                                                                key={`new-${index}`}
                                                                id={`new-${index}`}
                                                                src={url}
                                                                index={index}
                                                                removeTempImage={
                                                                    removeTempImage
                                                                }
                                                                isLoading={
                                                                    isUploading
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </SortableContext>

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
                            </DndContext>
                        </div>
                    </div>
                </AuthenticatedLayout>
            </div>
        </>
    );
}
