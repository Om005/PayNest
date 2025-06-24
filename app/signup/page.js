"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { IconBrandGoogle, IconShield, IconLock, IconCheck, IconEye, IconEyeOff, IconBrandGithub } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function Signup() {
    const {data: session} = useSession();
    const router = useRouter();
    
    useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    email: "",
    pass: "",
    cpass: "",
  })

  const validateForm = () => {
    const newErrors = {}

    if (!form.fname.trim()) newErrors.fname = "First name is required"
    if (!form.lname.trim()) newErrors.lname = "Last name is required"
    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!form.pass) {
      newErrors.pass = "Password is required"
    } else if (form.pass.length < 8) {
      newErrors.pass = "Password must be at least 8 characters"
    }
    if (form.pass !== form.cpass) {
      newErrors.cpass = "Passwords do not match"
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
            Join PayNest
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            Create your secure account and start sending money instantly
          </p>
        </div>

        {/* Security Badges */}

        {/* Main Form Card */}
        <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            

            {/* Social Login */}
            <button
              onClick={()=>{signIn("google")}}
              type="button"
              className="group w-full flex items-center justify-center gap-3 py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
            >
              <IconBrandGoogle className="w-5 h-5" />
              <span className="font-medium">Continue with Google</span>
            </button>
            <button
                onClick={()=>{signIn("github")}}
              type="button"
              className="group w-full flex items-center justify-center gap-3 py-3 px-4 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300"
            >
              <IconBrandGithub className="w-5 h-5" />
              <span className="font-medium">Continue with Github</span>
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{" "}
              <a href="/signin" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                Sign in here
              </a>
            </p>
          </div>
        </div>

        {/* Security Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-2">
            <IconShield className="w-4 h-4 text-emerald-400" />
            <span>Your data is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  )
}
