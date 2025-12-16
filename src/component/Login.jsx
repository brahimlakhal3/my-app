    import {Link, useNavigate} from "react-router-dom";
    import {useState} from "react";
    import * as React from "react";
    import {UserAuth} from "../context/AuthContext.jsx";
    import img from "../assets/bwink_bld_01_single_02.jpg";


    const Login = () => {
        const {signInNewUser} = UserAuth();
        const navigate = useNavigate();
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const handleLogin = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                const result = await signInNewUser({
                    email, password
                });
                if (result.success) navigate('/main');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        return (<div className="min-h-screen flex items-center justify-center
                bg-gray-100 p-6">
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-4xl border
                        border-gray-200 flex flex-col md:flex-row overflow-hidden">
                <div className="flex-1 p-6 md:p-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800
                            text-center mb-6">
                        Welcome Back
                    </h1>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-gray-700
                                    font-medium mb-1">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="brahim.lakhal@example.com"
                                className="w-full bg-white border border-gray-300
                                        rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-700
                                    font-medium mb-1">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white border border-gray-300
                                        rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-black/20"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white font-semibold
                                    py-3 rounded-xl hover:bg-gray-800 transition-colors
                                    duration-200 shadow-lg"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-gray-500 mt-5 text-sm">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-black font-semibold
                                hover:underline">Sign Up</Link>
                    </p>

                    {error && (<p className="text-center mt-3 text-red-600 text-sm"
                    >{error.message}</p>)}
                </div>

                <div className="hidden md:block w-1/2">
                    <img
                        src={img || null}
                        alt="Login visual"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </div>);

    }

    export default Login;
