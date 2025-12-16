    import {UserAuth} from "../context/AuthContext.jsx";
    import {useEffect, useState} from "react";
    import ProductDialog from "./ProductDialog.jsx";

    const MainScreen = () => {

        const {getAllProducts, session} = UserAuth();
        const [products, setProducts] = useState([]);
        const [selectedProduct, setSelectedProduct] = useState(null);
        const [selectedCategory, setSelectedCategory] = useState("all");
        const [minPrice, setMinPrice] = useState("");
        const [maxPrice, setMaxPrice] = useState("");

        const categories = ["all", ...new Set(products.map(p => p.categorie))];

        const filteredProducts = products.filter(item => {
            const byMin = minPrice === "" || item.price >= Number(minPrice);
            const byMax = maxPrice === "" || item.price <= Number(maxPrice);
            const byCategory = selectedCategory === "all" || item.categorie === selectedCategory;
            const byID = session.user.id !== item.user.id;
            return byMin && byMax && byCategory && byID;
        });
        useEffect(() => {
            getAllProducts().then(result => {
                if (result.success) setProducts(result.data);
            });
            console.log(session)
        }, []);


        return (<>
            <div className="flex flex-col md:flex-row gap-6 m-24 p-4 ">

                <aside className="md:w-1/5 bg-white shadow p-4 rounded-lg order-1">
                    <h3 className="text-lg font-semibold mb-3">Filtrer par prix</h3>
                    <label className="text-sm font-medium">Prix maximum</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                        placeholder="Ex: 500"
                        className="mt-1 w-full border rounded px-3 py-1.5 text-sm"
                    />
                    <label className="text-sm font-medium">Prix minimum</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                        placeholder="Ex: 100"
                        className="mt-1 w-full border rounded px-3 py-1.5 text-sm mb-4"
                    />
                </aside>


                <section
                    className="flex-1 grid grid-cols-1
                        sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2
                        xl:grid-cols-3 gap-4 p-3 order-2"
                >
                    {filteredProducts.map(item => (<article
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
                            <div className="flex gap-2 pt-3 mt-auto">
                                <a
                                    href={`https://wa.me/212${item.user.phone}?text=${encodeURIComponent(
                                        `Bonjour, je m'appelle ${item.user.full_name} je suis intéressé par ${item.title} dans le site de Sarghini`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1
                                        rounded-lg px-3 py-1.5 text-xs font-medium
                                        bg-black text-white hover:opacity-90 active:scale-95"
                                >
                                    Contact
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M9 5l7 7-7 7"/>
                                    </svg>
                                </a>
                                <button
                                    onClick={() => setSelectedProduct(item)}
                                    className="inline-flex items-center gap-1 rounded-lg
                                            px-3 py-1.5 text-xs font-medium border border-black/30
                                            text-black bg-white hover:bg-black
                                            hover:text-white active:scale-95"
                                >Voir plus
                                </button>
                            </div>
                        </div>
                    </article>))}
                </section>


                <aside className="md:w-1/5 bg-white shadow p-4 rounded-lg  order-3">
                    <h3 className="text-lg font-semibold mb-3">Catégories</h3>
                    <ul className="space-y-2">
                        {categories.map(cat => (<li key={cat}>
                            <button
                                onClick={() => setSelectedCategory(cat)}
                                className={`block w-full text-left px-3 py-1.5 rounded text-sm 
                                ${selectedCategory === cat ? "bg-black text-white" : "hover:bg-black/10"}`}>
                                {cat}
                            </button>
                        </li>))}
                    </ul>
                </aside>
            </div>

            {selectedProduct && (<ProductDialog
                product={{
                    title: selectedProduct.title,
                    categorie: selectedProduct.categorie,
                    description: selectedProduct.description,
                    number: selectedProduct.user.phone,
                    price: selectedProduct.price,
                    name: selectedProduct.user.full_name,
                }}
                images={selectedProduct.images.map(img => img.url)}
                onClose={() => setSelectedProduct(null)}
            />)}

        </>);
    }

    export default MainScreen;