"use client"
import { useState } from "react"
import { useSession } from "next-auth/react"
import {
  IconShield,
  IconEdit,
  IconSend,
  IconReceiptRefund,
  IconArrowsExchange,
  IconSearch,
  IconDownload,
  IconCheck,
  IconClock,
  IconX,
  IconCamera,
  IconMail,
  IconPhone,
} from "@tabler/icons-react"

export default function UserProfile() {
  const { data: session, status  } = useSession()
  
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")

  // Mock transaction data
  const transactions = [
    {
      id: "1",
      type: "sent",
      amount: 250.0,
      recipient: "Alex Johnson",
      email: "alex@example.com",
      date: "2024-01-15",
      status: "completed",
      description: "Dinner split",
    },
    {
      id: "2",
      type: "received",
      amount: 150.0,
      sender: "Sarah Wilson",
      email: "sarah@example.com",
      date: "2024-01-14",
      status: "completed",
      description: "Freelance payment",
    },
    {
      id: "3",
      type: "sent",
      amount: 75.5,
      recipient: "Mike Chen",
      email: "mike@example.com",
      date: "2024-01-13",
      status: "pending",
      description: "Coffee meetup",
    },
    {
      id: "4",
      type: "received",
      amount: 500.0,
      sender: "Emma Davis",
      email: "emma@example.com",
      date: "2024-01-12",
      status: "completed",
      description: "Rent contribution",
    },
    {
      id: "5",
      type: "sent",
      amount: 120.0,
      recipient: "John Smith",
      email: "john@example.com",
      date: "2024-01-11",
      status: "failed",
      description: "Gift money",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = activeFilter === "all" || transaction.type === activeFilter
    const matchesSearch =
      transaction.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalSent = transactions
    .filter((t) => t.type === "sent" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)
  const totalReceived = transactions
    .filter((t) => t.type === "received" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <IconCheck className="w-4 h-4 text-emerald-400" />
      case "pending":
        return <IconClock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <IconX className="w-4 h-4 text-red-400" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-emerald-400 bg-emerald-900/20 border-emerald-500/30"
      case "pending":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-500/30"
      case "failed":
        return "text-red-400 bg-red-900/20 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-500/30"
    }
  }

  if (status === "loading") return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 pt-24 pb-12">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 mb-8 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/20">
                  {/* {session?.user?.image ? (
                    <img
                      src={session.user.image || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                  )} */}
                    <span className="text-4xl font-bold text-white">
                      {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || "U"}
                    </span>
                </div>
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center transition-colors group-hover:scale-110 duration-300">
                  <IconCamera className="w-5 h-5 text-gray-300" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{session?.user?.name || "User Name"}</h1>
                    <div className="flex items-center gap-2 text-emerald-400 mb-4">
                      <IconShield className="w-5 h-5" />
                      <span className="text-sm font-medium">Verified Account</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300">
                    <IconEdit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <IconMail className="w-5 h-5 text-emerald-400" />
                    <span>{session?.user?.email || "user@example.com"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <IconPhone className="w-5 h-5 text-emerald-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconSend className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">${totalSent.toFixed(2)}</div>
              <div className="text-gray-400 text-sm">Total Sent</div>
            </div>

            <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconReceiptRefund className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">${totalReceived.toFixed(2)}</div>
              <div className="text-gray-400 text-sm">Total Received</div>
            </div>

            <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconArrowsExchange className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{transactions.length}</div>
              <div className="text-gray-400 text-sm">Total Transactions</div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-white">Transaction History</h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300">
                    <IconDownload className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="p-6 border-b border-slate-700/50">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Filter Tabs */}
                <div className="flex bg-slate-800/50 rounded-xl p-1">
                  {[
                    { key: "all", label: "All", icon: IconArrowsExchange },
                    { key: "sent", label: "Sent", icon: IconSend },
                    { key: "received", label: "Received", icon: IconReceiptRefund },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        activeFilter === filter.key
                          ? "bg-emerald-600 text-white shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      <filter.icon className="w-4 h-4" />
                      <span>{filter.label}</span>
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="flex-1 relative">
                  <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Transaction List */}
            <div className="p-6">
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <IconArrowsExchange className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No transactions found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30 rounded-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Transaction Icon */}
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            transaction.type === "sent"
                              ? "bg-red-900/20 border border-red-500/30"
                              : "bg-emerald-900/20 border border-emerald-500/30"
                          }`}
                        >
                          {transaction.type === "sent" ? (
                            <IconSend className="w-6 h-6 text-red-400" />
                          ) : (
                            <IconReceiptRefund className="w-6 h-6 text-emerald-400" />
                          )}
                        </div>

                        {/* Transaction Details */}
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">
                              {transaction.type === "sent" ? transaction.recipient : transaction.sender}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(transaction.status)}`}
                            >
                              {getStatusIcon(transaction.status)}
                              <span className="ml-1 capitalize">{transaction.status}</span>
                            </span>
                          </div>
                          <div className="text-sm text-gray-400">
                            {transaction.description} • {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            transaction.type === "sent" ? "text-red-400" : "text-emerald-400"
                          }`}
                        >
                          {transaction.type === "sent" ? "-" : "+"}${transaction.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-400">{transaction.type === "sent" ? "Sent" : "Received"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
