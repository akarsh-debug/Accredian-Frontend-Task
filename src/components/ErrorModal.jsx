import React from 'react';
import { XCircle } from 'lucide-react';

export const ErrorModal = ({ isOpen, onClose, errMessage = "We couldn't process your referral at this time. Please try again later." }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative border border-gray-200">
        <div className="flex flex-col items-center text-center">
          <XCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Something Went Wrong</h2>
          <p className="text-gray-600 mt-2">
            {errMessage}
          </p>
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;