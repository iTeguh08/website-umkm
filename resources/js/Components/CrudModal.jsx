import React, { useEffect, forwardRef } from 'react';

const CrudModal = forwardRef(({ isOpen, onClose, title, children, maxWidth = '3xl', showImage = false }, ref) => {
    if (!isOpen) return null;

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black opacity-30" onClick={handleClose}></div>
                <div className="relative rounded-sm bg-white p-6 shadow-xl w-full" style={maxWidth ? { maxWidth } : {}}>
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                        <button
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default CrudModal;