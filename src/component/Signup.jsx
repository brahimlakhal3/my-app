import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import * as React from "react";
import {UserAuth} from "../context/AuthContext.jsx";
import img from "../assets/bwink_bld_01_single_02.jpg";


const Signup = () => {
    const {signUpNewUser} = UserAuth()

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signUpNewUser({name, phone, email, password});
            console.log(result);
            if (result.success) {
                navigate('/main')
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-4xl border border-gray-200 flex flex-col md:flex-row overflow-hidden">

                {/* ==== FORMULAIRE (GAUCHE) ==== */}
                <div className="flex-1 p-6 md:p-10">
                    {/* TITLE */}
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        Create Account
                    </h1>

                    {/* FORM */}
                    <form onSubmit={handleSignup} className="space-y-5">

                        {/* FULL NAME */}
                        <div>
                            <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3
                                   text-gray-800 placeholder-gray-400
                                   focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>

                        {/* PHONE */}
                        <div>
                            <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="text"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="06 00 00 00 00"
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3
                                   text-gray-800 placeholder-gray-400
                                   focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3
                                   text-gray-800 placeholder-gray-400
                                   focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3
                                   text-gray-800 placeholder-gray-400
                                   focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white font-semibold py-3 rounded-xl
                               hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </form>

                    {/* FOOTER */}
                    <p className="text-center text-gray-500 mt-5 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-black font-semibold hover:underline">
                            Login
                        </Link>
                    </p>

                    {/* ERROR MESSAGE */}
                    {error && (
                        <p className="text-center mt-3 text-red-600 text-sm">
                            {error}
                        </p>
                    )}
                </div>

                {/* ==== IMAGE (DROITE) ==== */}
                <div className="hidden md:block w-1/2 mr-10">
                    <img
                        src={img}
                        alt="Login visual"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>
    );

}

export default Signup;