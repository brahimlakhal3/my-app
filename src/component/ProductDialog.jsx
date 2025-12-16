import React from "react";
import {UserAuth} from "../context/AuthContext.jsx";

const ProductDialog = ({product, images, onClose}) => {

    const {session} = UserAuth()
    console.log(session)

    const getGridCols = (length) => {
        switch (length) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-3";
            case 4:
                return "grid-cols-2 md:grid-cols-2";
            case 5:
                return "grid-cols-3";
            case 6:
                return "grid-cols-3";
            default:
                return "grid-cols-3";
        }
    };

    const heightMap = {
        1: "h-100",
        2: "h-90",
        3: "h-80",
        4: "h-60",
        5: "h-50",
        6: "h-40",
    };


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-3xl rounded-xl overflow-hidden shadow-lg">
                <div
                    className={`grid ${getGridCols(images.length)} gap-2 p-4  justify-center items-center`}
                >
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`product-${idx}`}
                            className={`${heightMap[images.length]} object-cover rounded-md mx-auto`}
                        />
                    ))}
                </div>
                <div
                    className="p-6 flex flex-col md:flex-row md:items-center
                    justify-between bg-white border-t border-gray-200">
                    <div className="flex-1 space-y-2">
                        <h2 className="text-xl font-bold text-black">{product.title}</h2>
                        <p className="text-gray-700">{product.description}</p>
                        <p className="text-lg font-semibold text-black">Prix: {product.price}</p>
                        <p className="text-gray-600">my name is {product.name + " "}
                            and that's my number {product.number}</p>
                    </div>

                    <button onClick={onClose}
                            className="m-4 md:mt-0 bg-black text-white px-6
                            py-2 rounded-md hover:bg-gray-800 transition">
                        Close
                    </button>

                    <a
                        href={`https://wa.me/212${product.number}?text=${encodeURIComponent(
                            `Bonjour ${product.name}, je m'appelle ${session.user.user_metadata.full_name} je suis intéressé par ${product.title} dans la platforme de vente et d'achat`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m-4 md:mt-0 bg-black text-white px-6
               py-2 rounded-md hover:bg-gray-800 transition inline-flex items-center gap-2"
                    >
                        Acheter
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M9 5l7 7-7 7"/>
                        </svg>
                    </a>

                </div>
            </div>
        </div>
    );
};

export default ProductDialog;