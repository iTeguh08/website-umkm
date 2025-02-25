import React from 'react';

const CrudModal = ({ isOpen, onClose, title, children, maxWidth = '2xl', showImage = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
                <div className="fixed inset-0 bg-black opacity-30" onClick={onClose}></div>
                <div className={`relative w-full ${maxWidth === '2xl' ? 'max-w-2xl' : maxWidth === '4xl' ? 'max-w-4xl' : 'max-w-2xl'} rounded-lg bg-white p-6 shadow-xl`}>
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className={showImage ? 'grid grid-cols-2 gap-4' : ''}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrudModal;