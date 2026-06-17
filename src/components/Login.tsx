import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import bannar from "../assets/Gemini_Generated_Image_wiypiwiypiwiypiw.png";
import logo from "../assets/Logo.png"
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/auth.api";
import { useAuth } from "../Hook/useAuth";
import { useNavigate } from "react-router";
import { showSuccess } from "../utils/toast";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState<string>('admin@goplaces.com')
    const [password, setPassword] = useState<string>('Admin@1234!')
    const { user, refetchUser } = useAuth()
    const navigate = useNavigate()


    const loginMutation = useMutation({
        mutationFn: loginApi,

        onSuccess: (data) => {
            refetchUser()
            const authRole = user?.user?.role
            if (authRole && !['admin', 'staff'].includes(authRole)) {
                //
                return
            }
            showSuccess(data?.data?.message || 'Login successfully!')
            navigate('/dashboard')
        },
        onError: (error) => {
            console.log("error", error.message)
        }
    })


    const { isPending } = loginMutation;

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        loginMutation.mutate({ email, password })
    }

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10 overflow-hidden relative"
            style={{
                backgroundImage: `url(${bannar})`,
            }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md bg-white/15 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl">

                {/* Logo */}
                <div className="flex justify-center mb-5">
                    <img
                        src={logo}
                        alt="Logo"
                        className=" object-contain"
                    />
                </div>

                {/* Title */}
                <h2 className="text-3xl font-bold text-white text-center mb-8">
                    Welcome Back
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="text-white text-sm mb-2 block">
                            Email
                        </label>

                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            defaultValue={email}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder:text-gray-200 outline-none border border-white/30 focus:ring-2 focus:ring-white"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-white text-sm mb-2 block">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                defaultValue={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 text-white placeholder:text-gray-200 outline-none border border-white/30 focus:ring-2 focus:ring-white"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 text-white text-lg"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>


                    {/* Forget Password */}
                    <div className="text-right">
                        <a
                            href="#"
                            className="text-sm text-white hover:underline"
                        >
                            Forget Password?
                        </a>
                    </div>


                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full cursor-pointer bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        {isPending ? "Logging.." : "Login"}
                    </button>

                </form>
            </div>
            {/* <Loading></Loading> */}
        </div>
    );
}