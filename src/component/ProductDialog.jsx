import React from "react";

const ProductDialog = ({product, images, onClose}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
                <div
                    className={`grid ${images.length === 1 ? 'grid-cols-1' : images.length === 2 ? 'grid-cols-2' : images.length === 3 ? 'grid-cols-3' : images.length === 4 ? 'grid-cols-2 md:grid-cols-2' : 'grid-cols-3'} gap-2 p-4 bg-gray-100 justify-center items-center`}
                >
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`product-${idx}`}
                            className={`${images.length === 1 ? 'h-90' : images.length === 2 ? 'h-100' : images.length === 3 ? 'h-80' : images.length === 4 ? 'h-60' : 'h-40'} object-cover rounded-md mx-auto`}
                        />
                    ))}
                </div>

                {/* Partie bas : détails */}
                <div
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between bg-white border-t border-gray-200">
                    <div className="flex-1 space-y-2">
                        <h2 className="text-xl font-bold text-black">{product.title}</h2>
                        <p className="text-gray-700">{product.description}</p>
                        <p className="text-sm text-gray-500">Numéro: {product.number}</p>
                        <p className="text-lg font-semibold text-black">Prix: {product.price}</p>
                        <p className="text-gray-600">Nom: {product.name}</p>
                    </div>
                    <button onClick={onClose}
                            className="m-4 md:mt-0 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                        Close
                    </button>

                    <button
                        className="m-4 md:mt-0 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition">
                        Acheter
                    </button>

                </div>
            </div>
        </div>
    );
};

export default ProductDialog;