"use client"
import { useSession, signOut } from "next-auth/react"
import { useState } from "react"
import { motion } from "motion/react"
import {
  IconShield,
  IconUser,
  IconLogout,
  IconSend,
  IconHome,
  IconLogin,
  IconUserPlus,
  IconCircleDashedPercentage
} from "@tabler/icons-react"
import { useRouter } from "next/navigation"
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
}

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  )
}

function Navbar({ className }) {
  const router = useRouter();
  const { data: session } = useSession()
  const [active, setActive] = useState(null)

  return (
    <div className={`fixed top-6 inset-x-0 max-w-4xl mx-auto z-50 ${className}`}>
      <Menu setActive={setActive}>
        <div
        onClick={()=>{
          router.push("/");
        }}
        className="flex cursor-pointer items-center gap-2 mr-8">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
            <IconShield className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">PayNest</span>
        </div>

        <MenuItem setActive={setActive} active={active} item="Menu">
          <div className="flex flex-col space-y-3 text-sm min-w-[160px]">
            <HoveredLink href="/" icon={<IconHome className="w-4 h-4" />}>
              Home
            </HoveredLink>
          </div>
        </MenuItem>

        {session && (
          <MenuItem setActive={setActive} active={active} item="Send & Manage">
            <div className="flex flex-col space-y-3 text-sm min-w-[180px]">
              
              <HoveredLink href="/send" icon={<IconSend className="w-4 h-4 text-emerald-400" />}>
                Send Money
              </HoveredLink>
              <HoveredLink href="/credentials" icon={<IconCircleDashedPercentage className="w-4 h-4 text-teal-400" />}>
                Your Credentials
              </HoveredLink>
              <div className="border-t border-gray-700 pt-2 mt-2">
                <div className="text-xs text-gray-500">Secure • Encrypted • Instant</div>
              </div>
            </div>
          </MenuItem>
        )}

        {session && (
          <MenuItem setActive={setActive} active={active} item="Account">
            <div className="flex flex-col space-y-3 text-sm min-w-[200px]">
              <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white scale-200 font-semibold text-sm">
                    {session.user?.name?.charAt(0).toUpperCase() || session.user?.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{session.user?.name || "User"}</div>
                  <div className="text-gray-400 text-xs">{session.user?.email}</div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-2">
                <HoveredLink href={`/${session.user.name}`} icon={<IconUser className="w-4 h-4" />}>
                  Your Profile
                </HoveredLink>
                <button
                  onClick={() => signOut()}
                  className={`flex items-center gap-3 w-full cursor-pointer hover:text-red-500 text-gray-300 hover:bg-slate-800/50 px-3 py-2 rounded-lg transition-all duration-200`}
                >
                  <IconLogout className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>

            </div>
          </MenuItem>
        )}

        {!session && (
          <MenuItem setActive={setActive} active={active} item="Get Started">
            <div className="flex flex-col space-y-3 text-sm min-w-[220px]">
              <div className="text-center p-4 bg-gradient-to-br from-emerald-900/20 to-teal-900/20 rounded-lg border border-emerald-500/20">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <IconShield className="w-6 h-6 text-white" />
                </div>
                <div className="text-white font-semibold mb-1">Join PayNest Today</div>
                <div className="text-gray-400 text-xs">Secure • Fast • Trusted</div>
              </div>

              <div className="space-y-2">
                <HoveredLink
                  href="/signin"
                  icon={<IconLogin className="w-4 h-4 text-emerald-400" />}
                  className="bg-slate-800/30 hover:bg-emerald-900/20 rounded-lg px-3 py-2 transition-colors"
                >
                  Sign In
                </HoveredLink>
                <HoveredLink
                  href="/signup"
                  icon={<IconUserPlus className="w-4 h-4 text-teal-400" />}
                  className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 hover:from-emerald-600/30 hover:to-teal-600/30 rounded-lg px-3 py-2 transition-colors border border-emerald-500/20"
                >
                  Create Account
                </HoveredLink>
              </div>

            </div>
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}

const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer hover:text-emerald-300 text-white font-medium px-4 py-2 rounded-lg hover:bg-slate-800/30 transition-all duration-200"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-slate-900/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-black/20"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-2xl border bg-slate-900/80 backdrop-blur-xl border-slate-700/50 shadow-2xl shadow-black/10 flex items-center justify-between px-6 py-4"
    >
      {children}
    </nav>
  )
}

const HoveredLink = ({ children, icon, className = "", ...rest }) => {
  return (
    <a
      {...rest}
      className={`flex items-center gap-3 text-gray-300 hover:text-white hover:bg-slate-800/50 px-3 py-2 rounded-lg transition-all duration-200 ${className}`}
    >
      {icon}
      <span>{children}</span>
    </a>
  )
}
