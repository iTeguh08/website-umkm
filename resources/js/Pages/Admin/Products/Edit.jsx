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
import { useSortable } from "@dnd-kit/sortable";
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

    const { data, setData, processing, errors } = useForm({
        nama_usaha: product.nama_usaha || "",
        lokasi: product.lokasi || "",
        email: product.email || "",
        telephone: product.telephone || "",
        description: product.description || "",
        bidang_usaha: product.bidang_usaha || "",
        jenis_usaha: product.jenis_usaha || "",
        latitude: product.latitude || "",
        longitude: product.longitude || "",
        is_published: product.is_published == 1,
        _method: "PUT",
    });

    // Unified state for all images
    const [combinedImages, setCombinedImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    // Effect to initialize and synchronize the combinedImages state
    useEffect(() => {
        const existing = (product.images || []).map(img => ({
            id: `existing-${img.id}`,
            isNew: false,
            image_path: img.image_path,
            originalId: img.id
        }));
        setCombinedImages(existing);
    }, [product.images]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setCombinedImages((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append all form data fields
        for (const key in data) {
            formData.append(key, data[key]);
        }
        formData.append("page", page);
        formData.append('is_published', data.is_published ? '1' : '0');
        
        const image_orders = [];

        combinedImages.forEach((image, index) => {
            if (image.isNew) {
                formData.append('images[]', image.file);
                image_orders.push({
                    name: image.file.name,
                    order: index
                });
            } else {
                formData.append(`existing_images[${index}][id]`, image.originalId);
                formData.append(`existing_images[${index}][order]`, index);
            }
        });

        if (image_orders.length > 0) {
            formData.append('image_orders', JSON.stringify(image_orders));
        }

        router.post(route("products.update", product.id), formData, {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsUploading(true);
        const newImageEntries = files.map((file, index) => ({
            id: `new-${Date.now()}-${index}`,
            isNew: true,
            file: file,
            previewUrl: URL.createObjectURL(file),
        }));

        setCombinedImages(prev => [...prev, ...newImageEntries]);
        setIsUploading(false); // Can be improved with per-image loading
    };
    
    const removeImage = (idToRemove) => {
        if (!confirm("Are you sure you want to remove this image?")) return;

        const imageToRemove = combinedImages.find(img => img.id === idToRemove);
        if (!imageToRemove) return;

        if (imageToRemove.isNew) {
            // Just remove from state
            setCombinedImages(combinedImages.filter(img => img.id !== idToRemove));
            // Revoke object URL to prevent memory leaks
            if(imageToRemove.previewUrl) URL.revokeObjectURL(imageToRemove.previewUrl);
        } else {
            // Needs to be deleted from the server
            router.delete(route("product-images.delete", imageToRemove.originalId), {
                onSuccess: () => {
                    setCombinedImages(combinedImages.filter(img => img.id !== idToRemove));
                },
                preserveScroll: true,
            });
        }
    };

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

    const formats = [ "header", "bold", "italic", "underline", "strike", "list", "bullet", "link" ];

    return (
        <>
            <Sidebar />
            <div className="pl-64 bg-gray-50 min-h-screen">
                <AuthenticatedLayout user={auth.user}>
                    <Head title="Edit Product" />
                    <div className="container mx-auto p-4">
                        <div className="bg-white shadow-xl rounded-sm overflow-hidden">
                            <div className="bg-[#5b9cff] p-5 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-white">Edit Product</h2>
                                <Link href={route("products.index", { page })} className="px-6 py-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition duration-300">
                                    Back
                                </Link>
                            </div>

                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Usaha</label>
                                        <input type="text" value={data.nama_usaha} onChange={e => setData('nama_usaha', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5b9cff] transition duration-300" required />
                                        {errors.nama_usaha && <p className="mt-1 text-sm text-red-600">{errors.nama_usaha}</p>}
                                    </div>
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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
                                        <input type="text" value={data.lokasi} onChange={e => setData('lokasi', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5b9cff] transition duration-300" required />
                                        {errors.lokasi && <p className="mt-1 text-sm text-red-600">{errors.lokasi}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5b9cff] transition duration-300" required />
                                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Telephone</label>
                                        <input type="tel" value={data.telephone} onChange={e => setData('telephone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5b9cff] transition duration-300" required />
                                        {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                        <ReactQuill theme="snow" value={data.description} onChange={handleDescriptionChange} modules={modules} formats={formats} className="h-64 mb-16" />
                                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                                        <input type="text" value={data.latitude} onChange={e => setData('latitude', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5b9cff] transition duration-300" />
                                        {errors.latitude && <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                                        <input type="text" value={data.longitude} onChange={e => setData('longitude', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#5b9cff] transition duration-300" />
                                        {errors.longitude && <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>}
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Gambar</label>
                                        <label htmlFor="images" className="cursor-pointer inline-flex items-center">
                                            <div className="inline-flex items-center justify-center px-4 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors duration-200 shadow-sm border border-blue-200">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                </svg>
                                                Tambahkan Image
                                            </div>
                                        </label>
                                        <input id="images" type="file" name="images" multiple className="sr-only" onChange={handleImageChange} />
                                    </div>

                                    <div className="mt-4">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            <SortableContext items={combinedImages.map(img => img.id)} strategy={verticalListSortingStrategy}>
                                                {combinedImages.map((image, index) => (
                                                    <SortableImageItem key={image.id} id={image.id} image={image} index={index} removeImage={removeImage} />
                                                ))}
                                            </SortableContext>
                                            {isUploading && <p>Uploading...</p>}
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="is_published"
                                            id="is_published"
                                            checked={data.is_published}
                                            onChange={(e) =>
                                                setData(
                                                    "is_published",
                                                    e.target.checked
                                                )
                                            }
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <label
                                            htmlFor="is_published"
                                            className="ml-2 block text-sm text-gray-900"
                                        >
                                            Published
                                        </label>
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <Link href={route("products.index", { page })} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#5b9cff] transition duration-300">
                                            Batal
                                        </Link>
                                        <button type="submit" disabled={processing} className="px-4 py-2 text-sm font-medium text-white bg-[#5b9cff] border border-transparent rounded-md shadow-sm hover:from-[#5b9cff] hover:to-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition duration-300">
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

const SortableImageItem = ({ id, image, index, removeImage }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const src = image.isNew ? image.previewUrl : `/storage/${image.image_path}`;
    const alt = image.isNew ? `New upload ${index + 1}` : `Product image ${index + 1}`;
    const label = index === 0 ? "Thumbnail" : index + 1;

    return (
        <div ref={setNodeRef} style={style} className="relative group aspect-[16/9] overflow-hidden rounded-sm border border-gray-200">
            <div {...attributes} {...listeners} className="w-full h-full cursor-grab active:cursor-grabbing">
                <img src={src} alt={alt} className="w-full h-full object-cover pointer-events-none" />
            </div>
            <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded pointer-events-none z-10">
                {label}
                {image.isNew && <span className="ml-1 text-blue-300">(New)</span>}
            </div>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeImage(id);
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-50 pointer-events-auto shadow-lg"
                title="Hapus gambar"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    );
};
