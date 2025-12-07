import {useEffect, useState} from "react";
import {UserAuth} from "../context/AuthContext.jsx";

const Product = () => {

    const [products, setProducts] = useState([]);
    const {session, getAllProducts, Delete} = UserAuth();


    const handleDelete = async (id) => {
        const result = await Delete(id);
        if (result.success) fetch_products();
    }
    const fetch_products = () => {
        getAllProducts().then(result => {
            if (result.success)
                setProducts(result.data.filter(item => session.user.id === item.user.id));
        });
    }


    useEffect(() => {
        fetch_products();

    }, [])

    return (
        <div className="container mx-auto px-80 p-30">
            <section
                className="grid grid-cols-1
            sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2
            xl:grid-cols-3 gap-4"
            >
                {products.map(item => (
                    <article
                        key={item.id}
                        className="w-full bg-white text-black border border-black/10
                        overflow-hidden rounded-xl shadow-sm hover:shadow-md
                        transition-shadow flex flex-col"
                    >
                        <div className="w-full aspect-[4/3] overflow-hidden relative bg-black">
                            <img
                                src={item.images[0].url}
                                alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t
                            from-black/20 to-transparent"></div>
                        </div>
                        <div className="p-3 flex flex-col flex-grow">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-sm font-semibold truncate">{item.title}</h3>
                                <p className="text-xs text-black/60">{item.price} DH</p>
                            </div>
                            <p className="text-xs text-gray-700 line-clamp-2 flex-grow">
                                {item.description}
                            </p>
                            <div className="pt-3 mt-auto">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="w-full inline-flex justify-center items-center
                                       gap-1 rounded-lg px-3 py-2 text-xs font-medium
                                       bg-red-600 text-white hover:bg-red-700
                                       active:scale-95 transition"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </div>

    )
}

export default Product;