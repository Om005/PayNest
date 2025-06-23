"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import {
  IconBrandGoogle,
  IconBrandGithub,
  IconShield,
  IconLock,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconFingerprint,
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function Signin() {
    const {data: session} = useSession();
        const router = useRouter();
        
        useEffect(() => {
        if (session) {
          router.push("/");
        }
      }, [session, router]);

  const [form, setForm] = useState({
    email: "",
    pass: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!form.pass) {
      newErrors.pass = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      console.log("Form submitted", form)
    }, 2000)
  }

  const inputClasses =
    "w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
  const labelClasses = "block text-sm font-semibold text-gray-300 mb-2"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Trust Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/25">
            <IconShield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Sign in to your PayNest account and continue your financial journey
          </p>
        </div>

        {/* Security Badges */}

        {/* Main Form Card */}
        <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className={labelClasses}>Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`${inputClasses} ${errors.email ? "border-red-500/50 focus:ring-red-500/50" : ""}`}
                placeholder="john@example.com"
                autoComplete="email"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-300">Password</label>
                {/* <a
                  href="/forgot-password"
                  className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Forgot password?
                </a> */}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.pass}
                  onChange={(e) => setForm({ ...form, pass: e.target.value })}
                  className={`${inputClasses} pr-12 ${errors.pass ? "border-red-500/50 focus:ring-red-500/50" : ""}`}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.pass && <p className="text-red-400 text-xs mt-1">{errors.pass}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 bg-slate-800 border-slate-600 rounded focus:ring-emerald-500 focus:ring-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-400">
                  Keep me signed in
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                <>
                  Sign In
                  <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </>
              )}
            </button>

            {/* Biometric Login */}

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-900/30 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <button
                onClick={()=>signIn("google")}
              type="button"
              className="group cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
            >
              <IconBrandGoogle className="w-5 h-5" />
              <span className="font-medium">Continue with Google</span>
            </button>
            <button
                onClick={()=>{signIn("github")}}
              type="button"
              className="group cursor-pointer w-full flex items-center justify-center gap-3 py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
            >
              <IconBrandGithub className="w-5 h-5" />
              <span className="font-medium">Continue with Github</span>
            </button>
          </form>

          {/* Signup Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <a href="/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                Create one here
              </a>
            </p>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-2">
            <IconShield className="w-4 h-4 text-emerald-400" />
            <span>Your login is encrypted and secure</span>
          </div>
        </div>

        {/* Quick Stats */}
      </div>
    </div>
  )
}
