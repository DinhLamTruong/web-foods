import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-auto">
        <div
          className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-0 right-2 text-gray-600 hover:text-gray-900 text-3xl font-bold"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
