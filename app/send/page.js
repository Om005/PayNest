"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  IconSearch,
  IconUser,
  IconMail,
  IconPhone,
  IconSend,
  IconPlus,
  IconClock,
  IconStar,
  IconUsers,
  IconArrowRight,
  IconShield,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import Script from "next/script";
import { initiate } from "@/actions/useractions";

export default function SendMoney() {
  const { data: session, status } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showSendForm, setShowSendForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Mock contacts data
  const allContacts = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      avatar: null,
      isFrequent: true,
      lastTransaction: "2024-01-15",
      totalSent: 450.0,
      status: "verified",
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 (555) 234-5678",
      avatar: null,
      isFrequent: true,
      lastTransaction: "2024-01-14",
      totalSent: 200.0,
      status: "verified",
    },
    {
      id: "3",
      name: "Mike Chen",
      email: "mike@example.com",
      phone: "+1 (555) 345-6789",
      avatar: null,
      isFrequent: false,
      lastTransaction: "2024-01-10",
      totalSent: 75.0,
      status: "verified",
    },
    {
      id: "4",
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1 (555) 456-7890",
      avatar: null,
      isFrequent: true,
      lastTransaction: "2024-01-08",
      totalSent: 320.0,
      status: "pending",
    },
    {
      id: "5",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 (555) 567-8901",
      avatar: null,
      isFrequent: false,
      lastTransaction: null,
      totalSent: 0,
      status: "verified",
    },
  ];

  const filteredContacts = allContacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "frequent" && contact.isFrequent) ||
      (activeTab === "recent" && contact.lastTransaction);

    return matchesSearch && matchesTab;
  });

  const handleSendMoney = async () => {
    if (!selectedContact || !amount) return;
    console.log(selectedContact);
    // console.log(process.env.KEY_ID);
    let a = await initiate(amount*100, session?.user.email, selectedContact.email, message);
    let orderId = a.id;
    var options = {
      key: process.env.NEXT_PUBLIC_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "PayNest", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "verified":
        return <IconCheck className="w-4 h-4 text-emerald-400" />;
      case "pending":
        return <IconClock className="w-4 h-4 text-yellow-400" />;
      default:
        return <IconX className="w-4 h-4 text-red-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "verified":
        return "text-emerald-400 bg-emerald-900/20 border-emerald-500/30";
      case "pending":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-500/30";
      default:
        return "text-red-400 bg-red-900/20 border-red-500/30";
    }
  };

  if (status == "loading") return null;
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 pt-24 pb-12">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/25">
                <IconSend className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
                Send Money
              </h1>
              <p className="text-gray-400 text-lg">
                Choose a contact and send money instantly
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Search & List */}
              <div className="lg:col-span-2">
                <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
                  {/* Search Header */}
                  <div className="p-6 border-b border-slate-700/50">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Search Input */}
                      <div className="flex-1 relative">
                        <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by name or email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                        />
                      </div>

                      {/* Add Contact Button */}
                      <button className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-emerald-500/25">
                        <IconPlus className="w-5 h-5" />
                        <span>Add Contact</span>
                      </button>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex bg-slate-800/50 rounded-xl p-1 mt-4">
                      {[
                        { key: "all", label: "All Contacts", icon: IconUsers },
                        { key: "frequent", label: "Frequent", icon: IconStar },
                        { key: "recent", label: "Recent", icon: IconClock },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 flex-1 justify-center ${
                            activeTab === tab.key
                              ? "bg-emerald-600 text-white shadow-lg"
                              : "text-gray-400 hover:text-white hover:bg-slate-700/50"
                          }`}
                        >
                          <tab.icon className="w-4 h-4" />
                          <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact List */}
                  <div className="p-6">
                    {filteredContacts.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <IconUsers className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">
                          No contacts found
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Try adjusting your search or add a new contact
                        </p>
                        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-300 mx-auto">
                          <IconPlus className="w-4 h-4" />
                          <span>Add New Contact</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredContacts.map((contact) => (
                          <div
                            key={contact.id}
                            onClick={() => {
                              setSelectedContact(contact);
                              setShowSendForm(true);
                            }}
                            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                              selectedContact?.id === contact.id
                                ? "bg-emerald-900/20 border-emerald-500/50"
                                : "bg-slate-800/30 hover:bg-slate-800/50 border-slate-700/30 hover:border-slate-600/50"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              {/* Avatar */}
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                {contact.avatar ? (
                                  <img
                                    src={contact.avatar || "/placeholder.svg"}
                                    alt={contact.name}
                                    className="w-full h-full rounded-xl object-cover"
                                  />
                                ) : (
                                  <span className="text-white font-semibold text-lg">
                                    {contact.name.charAt(0)}
                                  </span>
                                )}
                              </div>

                              {/* Contact Info */}
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-white">
                                    {contact.name}
                                  </span>
                                  {contact.isFrequent && (
                                    <IconStar className="w-4 h-4 text-yellow-400 fill-current" />
                                  )}
                                  <span
                                    className={`px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                                      contact.status
                                    )}`}
                                  >
                                    {getStatusIcon(contact.status)}
                                    <span className="ml-1 capitalize">
                                      {contact.status}
                                    </span>
                                  </span>
                                </div>
                                <div className="text-sm text-gray-400">
                                  <div className="flex items-center gap-1 mb-1">
                                    <IconMail className="w-3 h-3" />
                                    <span>{contact.email}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Transaction Info */}
                            <div className="text-right">
                              {contact.totalSent > 0 && (
                                <div className="text-sm text-emerald-400 font-semibold mb-1">
                                  ${contact.totalSent.toFixed(2)} sent
                                </div>
                              )}
                              {contact.lastTransaction && (
                                <div className="text-xs text-gray-500">
                                  Last:{" "}
                                  {new Date(
                                    contact.lastTransaction
                                  ).toLocaleDateString()}
                                </div>
                              )}
                              <IconArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-400 transition-colors mt-2" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Send Money Form */}
              <div className="lg:col-span-1">
                <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl sticky top-24">
                  {showSendForm && selectedContact ? (
                    <div className="p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                          Send Money
                        </h3>
                        <div className="flex items-center justify-center gap-3 p-3 bg-slate-800/50 rounded-xl">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {selectedContact.name.charAt(0)}
                            </span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-white">
                              {selectedContact.name}
                            </div>
                            <div className="text-sm text-gray-400">
                              {selectedContact.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendMoney();
                        }}
                        className="space-y-4"
                      >
                        {/* Amount Input */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Amount
                          </label>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
                              ₹
                            </span>
                            <input
                              type="number"
                              step="0.01"
                              min="0.01"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              className="w-full pl-8 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white text-lg font-semibold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
                              placeholder="0.00"
                              required
                            />
                          </div>
                        </div>

                        {/* Quick Amount Buttons */}
                        <div className="grid grid-cols-3 gap-2">
                          {[10, 25, 50].map((quickAmount) => (
                            <button
                              key={quickAmount}
                              type="button"
                              onClick={() => setAmount(quickAmount.toString())}
                              className="py-2 px-3 bg-slate-800/50 hover:bg-emerald-600/20 border border-slate-700/50 hover:border-emerald-500/50 rounded-lg text-gray-300 hover:text-emerald-300 transition-all duration-300 text-sm font-medium"
                            >
                              ₹{quickAmount}
                            </button>
                          ))}
                        </div>

                        {/* Message Input */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Message (Optional)
                          </label>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 resize-none"
                            placeholder="What's this for?"
                            rows={3}
                          />
                        </div>

                        {/* Security Notice */}
                        <div className="flex items-center gap-2 p-3 bg-emerald-900/20 border border-emerald-500/30 rounded-xl">
                          <IconShield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <div className="text-sm text-emerald-300">
                            Your transaction is protected by bank-level security
                          </div>
                        </div>

                        {/* Send Button */}
                        <button
                          type="submit"
                          disabled={!amount || isLoading}
                          className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isLoading ? (
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              Sending...
                            </div>
                          ) : (
                            <div 
                             className="flex items-center justify-center gap-2">
                              <IconSend className="w-5 h-5" />
                              <span>Send ₹{amount || "0.00"}</span>
                            </div>
                          )}
                        </button>

                        {/* Cancel Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowSendForm(false);
                            setSelectedContact(null);
                            setAmount("");
                            setMessage("");
                          }}
                          className="w-full py-3 px-4 text-gray-400 hover:text-white transition-colors duration-300"
                        >
                          Cancel
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <IconUser className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-400 mb-2">
                        Select a Contact
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Choose someone from your contacts to send money to
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
