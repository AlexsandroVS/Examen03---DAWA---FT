'use client';

import { FiAlertTriangle, FiTrash2, FiX } from 'react-icons/fi';
import { useState } from 'react';

type DeleteConfirmationProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  productName: string;
};

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  productName
}: DeleteConfirmationProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <FiAlertTriangle className="text-red-600 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Confirmar eliminación</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Cerrar modal"
            >
              <FiX size={20} />
            </button>
          </div>
          
          <div className="mb-6 pl-14">
            <p className="text-gray-600">
              Estás a punto de eliminar permanentemente el producto:
            </p>
            <p className="font-semibold text-lg text-gray-800 mt-1">"{productName}"</p>
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <FiAlertTriangle /> Esta acción no se puede deshacer.
            </p>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Eliminando...
                </>
              ) : (
                <>
                  <FiTrash2 /> Eliminar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}