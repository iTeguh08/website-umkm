import React from 'react';

const GenericForm = ({
    fields,
    handleSubmit,
    onClose,
    handleImageChange,
    imagePreview,
    isSubmitting,
    errors,
    data,
    setData,
    onSuccess
}) => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSubmit({
            onSuccess: () => {
                onSuccess && onSuccess();
            }
        });
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const file = e.target.files[0];
            setData(name, file);
            handleImageChange(e);
        } else {
            setData(name, value);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="font-sans w-full max-w-none">
            <div className="space-y-6">
                {fields.map((field) => (
                    <div key={field.name} className="mb-4">
                        <label htmlFor={field.name} className="block text-base font-semibold text-gray-800 mb-2 tracking-wide">
                            {field.label}
                        </label>
                        {field.type === 'file' ? (
                            <div className="mt-1">
                                <input
                                    type="file"
                                    name={field.name}
                                    id={field.name}
                                    onChange={handleChange}
                                    className="block w-full max-w-none text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {imagePreview && (
                                    <div className="mt-2">
                                        <img src={imagePreview} alt="Preview" className="h-32 w-auto object-cover rounded" />
                                    </div>
                                )}
                                {errors[field.name] && (
                                    <p className="mt-2 text-sm text-red-600 font-semibold">{errors[field.name]}</p>
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
                                    className="block w-full max-w-none rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 text-base px-4 py-2 bg-white font-normal"
                                />
                                {errors[field.name] && (
                                    <p className="mt-2 text-sm text-red-600 font-semibold">{errors[field.name]}</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-gray-300 bg-white px-5 py-2 text-base font-semibold text-gray-700 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex justify-center rounded-xl border border-transparent bg-blue-600 px-5 py-2 text-base font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
            </div>
        </form>
    );
};

export default GenericForm;