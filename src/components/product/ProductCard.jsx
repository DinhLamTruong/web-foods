import React from 'react';
import { formatPrice } from '../../utils/priceUtil'; // Import formatPrice if needed

const ProductCard = ({ product, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-3 flex flex-col cursor-pointer"
      onClick={() => onClick(product)}
    >
      <img
        src={product?.imageUrl}
        alt={product?.description}
        className="rounded-lg mb-2 min-h-[200px] object-cover"
      />
      <p className="text-sm text-gray-800 mb-auto line-clamp-3">
        {product?.description}
      </p>
      <div className="flex justify-between items-center mt-3">
        <span className="text-orange-500 font-bold text-lg">
          {formatPrice(product?.price)}
          {product?.currency}
        </span>
        <button
          className="w-8 h-8 rounded-full border border-orange-400 text-orange-400 flex justify-center items-center hover:bg-orange-50"
          aria-label="Filter"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
          >
            <path d="M3 5h18v2H3V5zm4 6h10v2H7v-2zm2 6h6v2H9v-2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
