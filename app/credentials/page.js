"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import {
  IconShield,
  IconKey,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconX,
  IconLock,
  IconCopy,
  IconRefresh,
  IconTrash,
  IconPlus,
  IconExternalLink,
  IconInfoCircle,
} from "@tabler/icons-react"

export default function Credentials() {
  const { data: session } = useSession()
  const [credentials, setCredentials] = useState({
    razorpayId: "",
    razorpaySecret: "",
  })
  const [showSecret, setShowSecret] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")

  // Mock existing credentials (in real app, fetch from API)
  const [existingCredentials, setExistingCredentials] = useState({
    razorpayId: "rzp_test_1234567890",
    razorpaySecret: "••••••••••••••••••••••••••••••••",
    isConfigured: true,
    lastUpdated: "2024-01-15T10:30:00Z",
    status: "active",
  })

  const validateCredentials = () => {
    const newErrors = {}

    if (!credentials.razorpayId.trim()) {
      newErrors.razorpayId = "Razorpay ID is required"
    } else if (!credentials.razorpayId.startsWith("rzp_")) {
      newErrors.razorpayId = "Invalid Razorpay ID format (should start with 'rzp_')"
    }

    if (!credentials.razorpaySecret.trim()) {
      newErrors.razorpaySecret = "Razorpay Secret is required"
    } else if (credentials.razorpaySecret.length < 20) {
      newErrors.razorpaySecret = "Razorpay Secret seems too short"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateCredentials()) return

    setIsLoading(true)
    setSuccessMessage("")

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
      setExistingCredentials({
        razorpayId: credentials.razorpayId,
        razorpaySecret: "••••••••••••••••••••••••••••••••",
        isConfigured: true,
        lastUpdated: new Date().toISOString(),
        status: "active",
      })
      setSuccessMessage("Credentials updated successfully!")
      setCredentials({ razorpayId: "", razorpaySecret: "" })

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(""), 3000)
    }, 2000)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setCredentials({
      razorpayId: existingCredentials.razorpayId,
      razorpaySecret: "",
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setCredentials({ razorpayId: "", razorpaySecret: "" })
    setErrors({})
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your Razorpay credentials? This will disable payment processing.")) {
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setExistingCredentials({
        razorpayId: "",
        razorpaySecret: "",
        isConfigured: false,
        lastUpdated: null,
        status: "inactive",
      })
      setSuccessMessage("Credentials deleted successfully!")
      setTimeout(() => setSuccessMessage(""), 3000)
    }, 1000)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 pt-24 pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/25">
              <IconKey className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
              Payment Credentials
            </h1>
            <p className="text-gray-400 text-lg">Manage your Razorpay integration settings</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl flex items-center gap-3">
              <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-emerald-300">{successMessage}</span>
            </div>
          )}

          {/* Security Notice */}
          <div className="mb-8 p-6 bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-900/20 border border-yellow-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <IconShield className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Security Notice</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-3">
                  Your Razorpay credentials are encrypted and stored securely. Never share your secret key with anyone.
                  PayNest uses bank-level security to protect your sensitive information.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <IconLock className="w-3 h-3 text-emerald-400" />
                    <span>256-bit Encryption</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconShield className="w-3 h-3 text-emerald-400" />
                    <span>SOC 2 Compliant</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <IconCheck className="w-3 h-3 text-emerald-400" />
                    <span>PCI DSS Certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Credentials Form */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
                <div className="p-6 border-b border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Razorpay Configuration</h2>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-medium border ${
                          existingCredentials.status === "active"
                            ? "text-emerald-400 bg-emerald-900/20 border-emerald-500/30"
                            : "text-red-400 bg-red-900/20 border-red-500/30"
                        }`}
                      >
                        {existingCredentials.status === "active" ? (
                          <>
                            <IconCheck className="w-3 h-3 inline mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <IconX className="w-3 h-3 inline mr-1" />
                            Inactive
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {existingCredentials.isConfigured && !isEditing ? (
                    /* Display Existing Credentials */
                    <div className="space-y-6">
                      {/* Razorpay ID */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Razorpay ID</label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white font-mono">
                            {existingCredentials.razorpayId}
                          </div>
                          <button
                            onClick={() => copyToClipboard(existingCredentials.razorpayId)}
                            className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
                          >
                            <IconCopy className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Razorpay Secret */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">Razorpay Secret</label>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white font-mono">
                            {existingCredentials.razorpaySecret}
                          </div>
                          <button className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-gray-400 cursor-not-allowed">
                            <IconLock className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Secret key is hidden for security</p>
                      </div>

                      {/* Last Updated */}
                      <div className="text-sm text-gray-400">
                        Last updated: {new Date(existingCredentials.lastUpdated).toLocaleString()}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <button
                          onClick={handleEdit}
                          className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-emerald-500/25"
                        >
                          <IconRefresh className="w-5 h-5" />
                          <span>Update Credentials</span>
                        </button>
                        <button
                          onClick={handleDelete}
                          className="flex items-center gap-2 px-6 py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 font-semibold rounded-xl transition-all duration-300"
                        >
                          <IconTrash className="w-5 h-5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Credentials Form */
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        handleSave()
                      }}
                      className="space-y-6"
                    >
                      {/* Razorpay ID */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Razorpay ID <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={credentials.razorpayId}
                          onChange={(e) => setCredentials({ ...credentials, razorpayId: e.target.value })}
                          className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white font-mono placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.razorpayId
                              ? "border-red-500/50 focus:ring-red-500/50"
                              : "border-slate-700/50 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                          }`}
                          placeholder="rzp_test_1234567890"
                        />
                        {errors.razorpayId && <p className="text-red-400 text-xs mt-1">{errors.razorpayId}</p>}
                        <p className="text-xs text-gray-500 mt-1">
                          Find this in your Razorpay Dashboard under API Keys
                        </p>
                      </div>

                      {/* Razorpay Secret */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Razorpay Secret <span className="text-red-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showSecret ? "text" : "password"}
                            value={credentials.razorpaySecret}
                            onChange={(e) => setCredentials({ ...credentials, razorpaySecret: e.target.value })}
                            className={`w-full px-4 py-3 pr-12 bg-slate-800/50 border rounded-xl text-white font-mono placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                              errors.razorpaySecret
                                ? "border-red-500/50 focus:ring-red-500/50"
                                : "border-slate-700/50 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                            }`}
                            placeholder="Enter your Razorpay secret key"
                          />
                          <button
                            type="button"
                            onClick={() => setShowSecret(!showSecret)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            {showSecret ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                          </button>
                        </div>
                        {errors.razorpaySecret && <p className="text-red-400 text-xs mt-1">{errors.razorpaySecret}</p>}
                        <p className="text-xs text-gray-500 mt-1">Keep this secret and never share it publicly</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isLoading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <IconCheck className="w-5 h-5" />
                              {existingCredentials.isConfigured ? "Update Credentials" : "Save Credentials"}
                            </>
                          )}
                        </button>
                        {isEditing && (
                          <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-3 text-gray-400 hover:text-white transition-colors duration-300"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Help & Documentation */}
            <div className="space-y-6">
              {/* Quick Help */}
              <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <IconInfoCircle className="w-5 h-5 text-emerald-400" />
                  Quick Help
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-300 mb-1">Where to find your keys?</h4>
                    <p className="text-gray-400">
                      Log into your Razorpay Dashboard, go to Settings → API Keys to find your credentials.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-1">Test vs Live keys</h4>
                    <p className="text-gray-400">
                      Use test keys for development and live keys for production. Test keys start with "rzp_test_".
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-300 mb-1">Security</h4>
                    <p className="text-gray-400">
                      Your secret key is encrypted and never stored in plain text. Only you can see it.
                    </p>
                  </div>
                </div>
                <a
                  href="https://razorpay.com/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <span>View Razorpay Documentation</span>
                  <IconExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Status Card */}
              <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Integration Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Razorpay Connection</span>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        existingCredentials.status === "active"
                          ? "text-emerald-400 bg-emerald-900/20"
                          : "text-red-400 bg-red-900/20"
                      }`}
                    >
                      {existingCredentials.status === "active" ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Payment Processing</span>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        existingCredentials.isConfigured
                          ? "text-emerald-400 bg-emerald-900/20"
                          : "text-yellow-400 bg-yellow-900/20"
                      }`}
                    >
                      {existingCredentials.isConfigured ? "Enabled" : "Setup Required"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Security</span>
                    <span className="px-2 py-1 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-900/20">
                      Encrypted
                    </span>
                  </div>
                </div>
              </div>

              {/* Add New Integration */}
              {!existingCredentials.isConfigured && (
                <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 rounded-2xl p-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <IconPlus className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Get Started</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Add your Razorpay credentials to start accepting payments through PayNest.
                    </p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-lg transition-colors"
                    >
                      Add Credentials
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
