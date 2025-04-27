import React from "react";

export default function ProductCard({ product, addToCart, onDelete }) {
  const [clicked, setClicked] = React.useState(false);

  return (
    <div className="relative border border-gray-200 rounded-2xl shadow-lg p-5 w-full max-w-xs bg-white flex flex-col items-center mb-8 transition-transform hover:scale-105 hover:shadow-xl group">
      {/* Delete Button */}
      {onDelete && (
        <button
          onClick={onDelete}
          className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 shadow hover:bg-red-600 transition"
          title="Delete Product"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      )}
      {/* Product Image */}
      <div className="w-40 h-40 bg-gray-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image && product.image.trim() !== "" ? product.image : "/assets/angular.png"}
          onError={e => { e.target.onerror = null; e.target.src = "/assets/angular.png"; }}
          alt={product.name}
          className="object-contain w-full h-full"
        />
      </div>
      {/* Name & Description */}
      <h3 className="font-bold text-xl mb-1 truncate w-full text-center" title={product.name}>{product.name}</h3>
      <div className="text-gray-500 text-sm mb-2 text-center line-clamp-2" title={product.description}>{product.description}</div>
      {/* Price Badge */}
      <div className="font-bold text-lg text-white bg-gray-800 px-4 py-1 rounded-full mb-4 shadow inline-block">${product.price}</div>
      {/* Actions */}
      <button
        onClick={async () => {
          setClicked(true);
          await addToCart(product);
          setTimeout(() => setClicked(false), 500);
        }}
        className={`w-full py-2 bg-orange-500 text-white rounded-lg font-semibold shadow hover:bg-orange-600 transition ${clicked ? 'cursor-progress opacity-70' : 'cursor-pointer'}`}
      >
        {clicked ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
