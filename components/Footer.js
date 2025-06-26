"use client"
import { IconShield, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react"
import Link from "next/link"
export function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-slate-900/30 backdrop-blur-xl border-t border-slate-700/50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* PayNest Branding */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <IconShield className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold">PayNest</span>
              <span className="text-gray-400 text-sm">© {currentYear}</span>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link href="/signin" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                Sign In
              </Link>
              <Link href="/signup" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                Sign Up
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                About
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className="text-gray-400 text-sm mr-2">Connect:</span>
              <a
                href="https://www.linkedin.com/in/om-chavda-06a390302/"
                target="_blank"
                className="w-8 h-8 bg-slate-800/50 hover:bg-emerald-600/20 border border-slate-700/50 hover:border-emerald-500/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all duration-300"
                >
                <IconBrandLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Om005"
                target="_blank"
                className="w-8 h-8 bg-slate-800/50 hover:bg-emerald-600/20 border border-slate-700/50 hover:border-emerald-500/50 rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-all duration-300"
              >
                <IconBrandGithub className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
