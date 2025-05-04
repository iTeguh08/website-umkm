import { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableImage = ({ image, onToggleMain, onRemove }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: image.id.toString(),
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className="relative border rounded-md p-2 mb-2 bg-white"
        >
            <div className="flex items-center">
                <div {...attributes} {...listeners} className="cursor-move mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grip-vertical" viewBox="0 0 16 16">
                        <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                </div>
                <div className="flex-1">
                    <img 
                        src={`/storage/${image.image_path}`} 
                        alt="Product" 
                        className="h-20 w-auto object-cover rounded"
                    />
                </div>
                <div className="ml-4 flex gap-2">
                    <button
                        type="button"
                        onClick={() => onToggleMain(image.id)}
                        className={`px-2 py-1 text-xs rounded ${
                            image.is_main ? 'bg-green-500 text-white' : 'bg-gray-200'
                        }`}
                    >
                        {image.is_main ? 'Main' : 'Set as Main'}
                    </button>
                    <button
                        type="button"
                        onClick={() => onRemove(image.id)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};