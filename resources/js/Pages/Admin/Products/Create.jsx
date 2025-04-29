import { useForm, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Create() {
    const { data, setData, post: submitForm, processing, errors, reset } = useForm({
        nama_usaha: "",
        lokasi: "",
        email: "",
        telephone: "",
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitForm(route('products.store'), {
            preserveScroll: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-5 sm:p-6 bg-white shadow rounded-lg">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                    Tambah UMKM Baru
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Usaha
                        </label>
                        <input
                            type="text"
                            name="nama_usaha"
                            value={data.nama_usaha}
                            onChange={(e) => setData('nama_usaha', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                        {errors.nama_usaha && (
                            <p className="mt-1 text-sm text-red-600">{errors.nama_usaha}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Lokasi
                        </label>
                        <input
                            type="text"
                            name="lokasi"
                            value={data.lokasi}
                            onChange={(e) => setData('lokasi', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                        {errors.lokasi && (
                            <p className="mt-1 text-sm text-red-600">{errors.lokasi}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Telephone
                        </label>
                        <input
                            type="tel"
                            name="telephone"
                            value={data.telephone}
                            onChange={(e) => setData('telephone', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                        {errors.telephone && (
                            <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gambar
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            accept="image/*"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                        )}
                        
                        {imagePreview && (
                            <div className="mt-4">
                                <div className="h-48 w-full md:w-1/2 overflow-hidden rounded-md">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3">
                        <Link 
                            href={route('products.index')}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}