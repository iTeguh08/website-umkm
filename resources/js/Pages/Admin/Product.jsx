// resources/js/Pages/Admin/Product.jsx
import React, { useState } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import CrudModal from '@/Components/CrudModal';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';

const Product = () => {
    const { products } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
    });

    const openModal = (product = null) => {
        setCurrentProduct(product);
        setData({
            name: product ? product.name : '',
            description: product ? product.description : '',
            price: product ? product.price : '',
            stock: product ? product.stock : '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submit = (e) => {
        e.preventDefault();

        if (currentProduct) {
            put(route('products.update', currentProduct.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('products.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        destroy(route('products.destroy', id), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Product Management" />
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Product Management</h1>
                    <PrimaryButton onClick={() => openModal()}>Add Product</PrimaryButton>
                </div>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <PrimaryButton onClick={() => openModal(product)}>Edit</PrimaryButton>
                                        <PrimaryButton onClick={() => handleDelete(product.id)}>Delete</PrimaryButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <CrudModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={currentProduct ? 'Edit Product' : 'Add Product'}
            >
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <TextInput
                            id="description"
                            type="text"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <TextInput
                            id="price"
                            type="number"
                            name="price"
                            value={data.price}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        <InputError message={errors.price} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <TextInput
                            id="stock"
                            type="number"
                            name="stock"
                            value={data.stock}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('stock', e.target.value)}
                        />
                        <InputError message={errors.stock} className="mt-2" />
                    </div>
                    <div className="flex justify-end">
                        <PrimaryButton type="submit" disabled={processing}>
                            {currentProduct ? 'Update' : 'Create'}
                        </PrimaryButton>
                    </div>
                </form>
            </CrudModal>
        </div>
    );
};

export default Product;