import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, Github } from "lucide-react";
import API from "../services/api";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Setup Form Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle Submit Form
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const response = await API.post(endpoint, data);

      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success(`Welcome back, ${response.data.user.name}!`);
        navigate("/");
      } else {
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
        reset();
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.error || "Something went wrong";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex min-h-screen bg-white transition-all duration-500 ${isLogin ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
      {/* --- BRANDING SIDE --- */}
      <div className="hidden lg:flex w-1/2 bg-blue-700 flex-col justify-center items-start px-16 relative overflow-hidden transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="z-10 text-white max-w-lg">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-blue-700 font-bold text-xl">T</div>
            <span className="text-xl font-bold italic">Talent Growth Blog</span>
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-6">{isLogin ? "Unlock Your Potential" : "Start Your Journey"}</h1>
          <p className="text-blue-100 text-lg mb-8">{isLogin ? "Join a community of 10,000+ professionals growing their careers through writing." : "Create your account today and start sharing your ideas with the world."}</p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-blue-700 bg-gray-300">
                  <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="avatar" className="w-full h-full rounded-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-sm font-medium">10k+ writers joined this month</p>
          </div>
        </div>
      </div>

      {/* --- FORM SIDE --- */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 md:px-16 transition-all duration-500">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{isLogin ? "Welcome Back" : "Create Account"}</h2>
            <p className="text-gray-500 text-lg">{isLogin ? "Please enter your details to sign in." : "Fill in the information below to get started."}</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all outline-none"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all outline-none"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-semibold text-gray-700">Password</label>
                {isLogin && (
                  <a href="#" className="text-sm text-blue-700 font-semibold hover:underline">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 chars" } })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-4 focus:ring-blue-50 focus:border-blue-600 transition-all outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center shadow-lg shadow-blue-200 active:scale-[0.98]">
              {isLoading ? <Loader2 className="animate-spin" /> : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* --- Tab Login/Register  --- */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account yet?" : "Already have an account?"}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  reset();
                }}
                className="ml-2 text-blue-700 font-bold hover:underline transition-all"
              >
                {isLogin ? "Register now" : "Login here"}
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest">
                <span className="px-4 bg-white text-gray-400">Secure Access</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {/* Google Button */}
              <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 active:scale-95">
                {/* Menggunakan in-line SVG sederhana untuk Google agar tetap berwarna tanpa external link */}
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>

              {/* GitHub Button menggunakan Lucide-React */}
              <button type="button" className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 active:scale-95">
                <Github size={20} className="text-gray-900" />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
