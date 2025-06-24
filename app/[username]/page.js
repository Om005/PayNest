"use client"
import { useState, useEffect } from "react"
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
  IconInfoCircle,
} from "@tabler/icons-react"
import { getuser, getPayments, updatename, getAllTransactions } from "@/actions/useractions"
import toast from "react-hot-toast"

export default function UserProfile() {
  const { data: session, status  } = useSession()

  const [showEditModal, setShowEditModal] = useState(false)
  const [editName, setEditName] = useState("")
  const [isUpdatingName, setIsUpdatingName] = useState(false)
  const [nameError, setNameError] = useState("")
  
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [curr, setcurr] = useState([])
  const [tamount, settamount] = useState([])
  const [alltransactions, setalltransactions] = useState([])


  const handleUpdateName = async () => {
    if (!editName.trim()) {
      toast.error("Name is required")
      return
    }

    if (editName.trim().length < 2) {
      toast.error("Name must be at least 2 characters")
      return
    }

    setIsUpdatingName(true)
    const rsp = await updatename(session.user.email, editName);
    if(rsp.success){
      toast.success("Name updated");
      setcurr({...curr, name: editName});
    }
    else{
      toast.success(rsp.message);
    }
    
      setIsUpdatingName(false)
      setShowEditModal(false)
  }

  const handleCloseModal = () => {
    setShowEditModal(false)
    setEditName("")
    setNameError("")
  }

  // Mock transaction data
    const transactions = [
    {
      _id: "1",
      from_user: "user@example.com", // Current user's email
      to_user: "alex@example.com",
      oid: "order_1234567890",
      message: "Dinner split",
      amount: 250.0,
      createdAt: "2024-01-15T10:30:00Z",
      status: "completed",
    },
    {
      _id: "2",
      from_user: "sarah@example.com",
      to_user: "user@example.com", // Current user's email
      oid: "order_2345678901",
      message: "Freelance payment",
      amount: 150.0,
      createdAt: "2024-01-14T14:20:00Z",
      status: "completed",
    },
    {
      _id: "3",
      from_user: "user@example.com", // Current user's email
      to_user: "mike@example.com",
      oid: "order_3456789012",
      message: "Coffee meetup",
      amount: 75.5,
      createdAt: "2024-01-13T09:15:00Z",
      status: "failed",
    },
    {
      _id: "4",
      from_user: "emma@example.com",
      to_user: "user@example.com", // Current user's email
      oid: "order_4567890123",
      message: "Rent contribution",
      amount: 500.0,
      createdAt: "2024-01-12T16:45:00Z",
      status: "completed",
    },
    {
      _id: "5",
      from_user: "user@example.com", // Current user's email
      to_user: "john@example.com",
      oid: "order_5678901234",
      message: "Gift money",
      amount: 120.0,
      createdAt: "2024-01-11T11:30:00Z",
      status: "completed",
    },
  ]


  const processedTransactions = alltransactions.map((transaction) => {
    const isSent = transaction.from_user === session?.user?.email
    const otherUser = isSent ? transaction.to_user : transaction.from_user

    return {
      ...transaction,
      type: isSent ? "sent" : "received",
      otherUser: otherUser,
      // Extract name from email (in real app, you'd fetch user details)
      otherUserName: otherUser
        .split("@")[0]
        .replace(/[._]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
    }
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const filteredTransactions = processedTransactions.filter((transaction) => {
    const matchesFilter = activeFilter === "all" || transaction.type === activeFilter
    const matchesSearch =
      transaction.otherUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.otherUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.message?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.oid.toLowerCase().includes(searchTerm.toLowerCase())
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

  useEffect(() => {
    if(status!="loading"){
      const fetch = async()=>{
        const user = await getuser(session.user.email);
        setcurr(user.data);
        const obj = await getPayments(session.user.email);
        settamount(obj);
        const all = await getAllTransactions(session.user.email);
        console.log(all)
        if(all.success){

          setalltransactions(all.data);
        }
        else{
          toast.error("Error in fetching")
        }
        console.log(obj);
      }  
      fetch();
    }
  }, [status])
  
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
                {/* <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center transition-colors group-hover:scale-110 duration-300">
                  <IconCamera className="w-5 h-5 text-gray-300" />
                </button> */}
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{curr.name || "User Name"}</h1>
                    {curr.active==true && <div className="flex items-center gap-2 text-emerald-400 mb-4">
                      <IconShield className="w-5 h-5" />
                      <span className="text-sm font-medium"> Active</span>
                    </div>}
                    {curr.active==false && <div className="flex items-center gap-2 text-red-400 mb-4">
                      <IconShield className="w-5 h-5" />
                      <span className="text-sm font-medium"> Inactive</span>
                    </div>}
                  </div>
                  <button
                  onClick={() => {
                      setEditName(session?.user?.name || "")
                      setShowEditModal(true)
                      setNameError("")
                    }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-xl text-gray-300 hover:text-white transition-all duration-300">
                    <IconEdit className="w-4 h-4" />
                    <span>Edit Name</span>
                  </button>
                </div>

                    
                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <IconMail className="w-5 h-5 text-emerald-400" />
                    <span>{session?.user?.email || "user@example.com"}</span>
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
              <div className="text-2xl font-bold text-white mb-1">₹{tamount.totalSent}</div>
              <div className="text-gray-400 text-sm">Total Sent</div>
            </div>

            <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconReceiptRefund className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">₹{tamount.totalReceived}</div>
              <div className="text-gray-400 text-sm">Total Received</div>
            </div>

            <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <IconArrowsExchange className="w-8 h-8 text-white" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{tamount.totalTransactions}</div>
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
                  <IconSearch className="absolute left-3 top-1/2 transform -translate-y-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, message ..."
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
                      key={transaction._id}
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
                            <span className="font-semibold text-white">{transaction.otherUserName}</span>
                            <span
                              className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(transaction.status)}`}
                            >
                              <div className="flex">

                              {getStatusIcon(transaction.status)}
                              <span className="ml-1 capitalize">{transaction.status}</span>
                              </div>
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 space-y-1">
                            <div>{transaction.message || "No message"}</div>
                            <div className="flex items-center gap-2">
                              {/* <span>Order: {transaction.oid}</span> */}
                              <span>•</span>
                              <span>{formatDate(transaction.createdAt)}</span>
                            </div>
                            <div className="text-xs text-gray-500">{transaction.otherUser}</div>
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
                          ₹{transaction.amount.toFixed(2)}
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
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl w-full max-w-md">
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 hover:bg-slate-800/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <IconX className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-400 text-sm mt-1">Update your display name</p>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleUpdateName()
                  }}
                >
                  <div className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => {
                          setEditName(e.target.value)
                          setNameError("")
                        }}
                        className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          nameError
                            ? "border-red-500/50 focus:ring-red-500/50"
                            : "border-slate-700/50 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                        }`}
                        placeholder="Enter your full name"
                        autoFocus
                      />
                      {nameError && <p className="text-red-400 text-xs mt-1">{nameError}</p>}
                    </div>

                    {/* Info Note */}
                    <div className="flex items-start gap-3 p-3 bg-slate-800/30 border border-slate-700/30 rounded-xl">
                      <IconInfoCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-gray-400">
                        <p className="font-medium text-gray-300 mb-1">Note:</p>
                        <p>
                          Email and phone number cannot be changed for security reasons. Contact support if you need to
                          update these details.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-3 text-gray-400 hover:text-white hover:bg-slate-800/50 border border-slate-700/50 rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdatingName || !editName.trim()}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isUpdatingName ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Updating...
                        </div>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
