import {useState} from "react";
import {UserAuth} from "../context/AuthContext.jsx";


const NewProduct = () => {
    const {session, addProduct, uploadImage} = UserAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (!title || !description || !price) {
            setMessage("Please fill all fields");
            return;
        }

        setLoading(true);

        const result = await addProduct({
            title, description, price: parseFloat(price),
            user_id: session?.user?.id, category: category,
        });


        if (result.success) {
            uploadImage(image, result.data.id)
            setMessage("Product created successfully!");
            setTitle("");
            setDescription("");
            setPrice("");
        } else {
            setMessage("Error: " + result.error.message);
        }


        setLoading(false);
    };

    return (<div className="flex items-center justify-center
    min-h-screen bg-gray-100 p-6">
        <div className="bg-white shadow-xl rounded-2xl
            p-10 max-w-md w-full border border-gray-200">

            <h1 className="text-2xl font-bold text-gray-800
                mb-6 text-center">
                Create New Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-5">
                <input
                    type="text"
                    placeholder="Product Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white border border-gray-300
                                rounded-xl p-3 text-gray-800
                               placeholder-gray-400 focus:outline-none
                               focus:ring-2 focus:ring-black/20"
                />

                <input
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white border border-gray-300
                                rounded-xl p-3 text-gray-800
                               placeholder-gray-400 focus:outline-none
                               focus:ring-2 focus:ring-black/20"
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Price (MAD)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-white border border-gray-300
                                rounded-xl p-3 text-gray-800
                               placeholder-gray-400 focus:outline-none
                               focus:ring-2 focus:ring-black/20"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{outline: "none", boxShadow: "none"}}
                    className="
                            w-full rounded-lg border
                            border-gray-300 bg-white
                            p-3 text-gray-700
                            appearance-none
                            focus:outline-none
                            focus:ring-2 focus:ring-gray-400
                            focus:border-gray-500"
                >
                    <option value="" disabled>Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home</option>
                    <option value="sport">Sport</option>
                    <option value="beauty">Beauty</option>
                </select>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImage(e.target.files)}
                    className="w-full bg-white border border-gray-300
                        rounded-xl p-3 text-gray-800
                               focus:outline-none focus:ring-2
                               focus:ring-black/20"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white font-semibold py-3 rounded-xl
                               hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                >
                    {loading ? "Creating..." : "Create Product"}
                </button>
            </form>

            {message && (<p className="mt-4 text-center text-gray-600 text-sm">
                {message}
            </p>)}
        </div>
    </div>);


};

export default NewProduct;
