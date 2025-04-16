import React from 'react';

const GenericForm = ({
    fields,
    onSubmit,
    onClose,
    initialData,
    handleImageChange,
    imagePreview,
    processing,
    errors,
    data,
    setData
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            handleImageChange(e);
        } else {
            setData(name, value);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {fields.map((field) => (
                <div key={field.name} className="mb-4">
                    <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                        {field.label}
                    </label>
                    
                    {field.type === 'file' ? (
                        <div className="mt-1">
                            <input
                                type="file"
                                name={field.name}
                                id={field.name}
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {imagePreview && (
                                <div className="mt-2">
                                    <img src={imagePreview} alt="Preview" className="h-32 w-auto object-cover rounded" />
                                </div>
                            )}
                            {errors[field.name] && (
                                <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                            )}
                        </div>
                    ) : (
                        <div className="mt-1">
                            <input
                                type={field.type || 'text'}
                                name={field.name}
                                id={field.name}
                                value={data[field.name] || ''}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                            {errors[field.name] && (
                                <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
                            )}
                        </div>
                    )}
                </div>
            ))}
            
            <div className="mt-6 flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
};

export default GenericForm;