"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  IconHome,
  IconArrowLeft,
  IconShield,
} from "@tabler/icons-react"

export default function NotFound() {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)


  const handleGoHome = () => {
    setIsRedirecting(true)
    router.push("/")
  }

  const handleGoBack = () => {
    router.back()
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="absolute top-20 left-20 w-4 h-4 bg-emerald-400/20 rounded-full animate-ping delay-500"></div>
      <div className="absolute top-32 right-32 w-3 h-3 bg-teal-400/20 rounded-full animate-ping delay-1000"></div>
      <div className="absolute bottom-24 left-32 w-5 h-5 bg-cyan-400/20 rounded-full animate-ping delay-700"></div>
      <div className="absolute bottom-32 right-24 w-2 h-2 bg-emerald-400/20 rounded-full animate-ping delay-300"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 leading-none select-none">
                404
              </div>

              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50"></div>
                <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Oops! Page Not Found</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have vanished into the digital void. Don&apos;t worry, your money is still
              safe with PayNest!
            </p>
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <IconShield className="w-5 h-5" />
              <span className="text-sm font-medium">Your account and transactions remain secure</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={handleGoHome}
              disabled={isRedirecting}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <IconHome className="relative z-10 w-6 h-6 mr-2" />
              <span className="relative z-10">{isRedirecting ? "Redirecting..." : "Go Home"}</span>
            </button>

            <button
              onClick={handleGoBack}
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-emerald-300 border-2 border-emerald-500/50 hover:border-emerald-400 rounded-2xl backdrop-blur-sm hover:bg-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <IconArrowLeft className="w-6 h-6 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="group-hover:text-emerald-200 transition-colors duration-300">Go Back</span>
            </button>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
