import React from 'react';
import { router } from '@inertiajs/react';

export default function DeleteButton({ productId, currentPage = 1, className = '' }) {
    const handleDelete = (e) => {
        // Stop all event propagation - key for good UX
        e.preventDefault();
        e.stopPropagation();

        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('products.destroy', productId), {
                preserveScroll: true, // Don't auto scroll to top
                data: {
                    page: currentPage
                },
                onSuccess: () => {
                    // Update data silently without page refresh or redirect
                    router.reload({ 
                        only: ['products'],
                        preserveScroll: true,
                        preserveState: true 
                    });
                }
            });
        }
    };

    return (
        <button
            className="p-1.5 text-red-600 hover:bg-red-50 transition-colors"
            type="button"
            onClick={handleDelete}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
        >
            <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
            </svg>
        </button>
    );
}