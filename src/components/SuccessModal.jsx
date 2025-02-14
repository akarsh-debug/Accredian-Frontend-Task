import React from 'react';
import { CheckCircle } from 'lucide-react';

export const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative border border-gray-200">
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Referral Successful!</h2>
          <p className="text-gray-600 mt-2">
            Your referral has been submitted successfully. We'll notify you once your friend joins.
          </p>
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;