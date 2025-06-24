"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
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
} from "@tabler/icons-react";
import {
  delcreds,
  getcreds,
  setcreds,
  validateRazorpayCredentials,
} from "@/actions/useractions";
import toast from "react-hot-toast";
import { NavbarDemo } from "@/components/NavbarDemo";
import SessionGuard from "@/components/Guard";

export default function Credentials() {
  const { data: session, status } = useSession();
  const [credentials, setCredentials] = useState({
    razorpayId: "",
    razorpaySecret: "",
  });
  const [showSecret, setShowSecret] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [existingCredentials, setExistingCredentials] = useState({
    razorpayId: "rzp_test_1234567890",
    razorpaySecret: "••••••••••••••••••••••••••••••••",
    tm: "••••••••••••••••••••••••••••••••",
    isConfigured: true,
    lastUpdated: "2024-01-15T10:30:00Z",
    status: "active",
  });

  const handleSave = async () => {
    const rsp = await validateRazorpayCredentials(
      credentials.razorpayId,
      credentials.razorpaySecret
    );

    if (rsp.valid == false) {
      toast.error("Invlid credentials");
      return;
    }
    setIsLoading(true);
    const res = await setcreds(
      session.user.email,
      credentials.razorpayId,
      credentials.razorpaySecret
    );
    console.log(res.id);
    if (res.success == true) {
      setExistingCredentials({
        ...existingCredentials,
        razorpayId: credentials.razorpayId,
        razorpaySecret: credentials.razorpaySecret,
        status: "active",
      });
      toast.success("Credentials Saved");
      setCredentials({
        ...credentials,
        razorpaySecret: existingCredentials.tm,
      });
    } else {
      toast.success(res.message);
    }
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setCredentials({
      ...credentials,
      razorpaySecret: existingCredentials.razorpaySecret,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCredentials({
      razorpayId: existingCredentials.razorpayId,
      razorpaySecret: existingCredentials.tm,
    });
    setErrors({});
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your Razorpay credentials? This will disable payment processing."
      )
    ) {
      return;
    }

    const rsp = await delcreds(session.user.email);
    if (rsp.success) {
      setExistingCredentials({
        ...existingCredentials,
        razorpayId: "Configure to active",
        razorpaySecret: "Confiture to active",
        status: "inactive",
      });
      setCredentials({
        ...credentials,
        razorpayId: "Configure to active",
        razorpaySecret: "Confiture to active",
      });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  useEffect(() => {
    if (status != "loading") {
      const fn = async () => {
        try {
          const rsp = await getcreds(session.user.email);
          console.log(rsp);
          if (rsp.success) {
            if (rsp.isactive) {
              setExistingCredentials({
                ...existingCredentials,
                razorpayId: rsp.id,
                razorpaySecret: rsp.secret,
                status: "active",
              });
              setCredentials({
                razorpayId: rsp.id,
                razorpaySecret: existingCredentials.tm,
              });
            } else {
              setExistingCredentials({
                ...existingCredentials,
                razorpayId: "Configure to active",
                razorpaySecret: "Configure to active",
                status: "inactive",
              });
              setCredentials({
                razorpayId: "Configure to active",
                razorpaySecret: existingCredentials.tm,
              });
            }
          } else {
            toast.error("Error in fetching credentials");
          }
        } catch (err) {
          console.error("Error fetching friends:", err);
        }
      };

      fn();
    }
  }, [status]);

  if (status == "loading") return null;
  return (
    <SessionGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 pt-24 pb-12">
        <NavbarDemo />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/25">
                <IconKey className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2">
                Payment Credentials
              </h1>
              <p className="text-gray-400 text-lg">
                Manage your Razorpay integration settings
              </p>
            </div>

            {successMessage && (
              <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-xl flex items-center gap-3">
                <IconCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-emerald-300">{successMessage}</span>
              </div>
            )}

            <div className="mb-8 p-6 bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-900/20 border border-yellow-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <IconShield className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Security Notice
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Your Razorpay credentials are encrypted and stored securely.
                    Never share your secret key with anyone.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
                  <div className="p-6 border-b border-slate-700/50">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">
                        Razorpay Configuration
                      </h2>
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
                              Account is active
                            </>
                          ) : (
                            <>
                              <IconX className="w-3 h-3 inline mr-1" />
                              Account is inactive
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    {existingCredentials.isConfigured && !isEditing ? (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Razorpay ID
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white font-mono">
                              {credentials.razorpayId}
                            </div>
                            <button
                              onClick={() =>
                                copyToClipboard(existingCredentials.razorpayId)
                              }
                              className="p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-xl text-gray-400 hover:text-white transition-all duration-300"
                            >
                              <IconCopy className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Razorpay Secret
                          </label>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white font-mono">
                              {credentials.razorpaySecret}
                            </div>
                            <button className="p-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-gray-400 cursor-not-allowed">
                              <IconLock className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Secret key is hidden for security
                          </p>
                        </div>

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
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSave();
                        }}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Razorpay ID <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={credentials.razorpayId}
                            onChange={(e) =>
                              setCredentials({
                                ...credentials,
                                razorpayId: e.target.value,
                              })
                            }
                            className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white font-mono placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                              errors.razorpayId
                                ? "border-red-500/50 focus:ring-red-500/50"
                                : "border-slate-700/50 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                            }`}
                            placeholder="rzp_test_1234567890"
                          />
                          {errors.razorpayId && (
                            <p className="text-red-400 text-xs mt-1">
                              {errors.razorpayId}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Find this in your Razorpay Dashboard under API Keys
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Razorpay Secret{" "}
                            <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type={showSecret ? "text" : "password"}
                              value={credentials.razorpaySecret}
                              onChange={(e) =>
                                setCredentials({
                                  ...credentials,
                                  razorpaySecret: e.target.value,
                                })
                              }
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
                              {showSecret ? (
                                <IconEyeOff className="w-5 h-5" />
                              ) : (
                                <IconEye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          {errors.razorpaySecret && (
                            <p className="text-red-400 text-xs mt-1">
                              {errors.razorpaySecret}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            Keep this secret and never share it publicly
                          </p>
                        </div>

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
                                {existingCredentials.isConfigured
                                  ? "Update Credentials"
                                  : "Save Credentials"}
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

              <div className="space-y-6">
                <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <IconInfoCircle className="w-5 h-5 text-emerald-400" />
                    Quick Help
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-300 mb-1">
                        Where to find your keys?
                      </h4>
                      <p className="text-gray-400">
                        Log into your Razorpay Dashboard, go to Settings → API
                        Keys to find your credentials.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-300 mb-1">
                        Test vs Live keys
                      </h4>
                      <p className="text-gray-400">
                        Use test keys for development and live keys for
                        production. Test keys start with "rzp_test_".
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-300 mb-1">
                        Security
                      </h4>
                      <p className="text-gray-400">
                        Your secret key is encrypted and never stored in plain
                        text. Only you can see it.
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

                <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Integration Status
                  </h3>
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
                        {existingCredentials.status === "active"
                          ? "Connected"
                          : "Disconnected"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Payment Processing</span>
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          existingCredentials.status == "active"
                            ? "text-emerald-400 bg-emerald-900/20"
                            : "text-yellow-400 bg-yellow-900/20"
                        }`}
                      >
                        {existingCredentials.status == "active"
                          ? "Enabled"
                          : "Disabled"}
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

                {!existingCredentials.isConfigured && (
                  <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 rounded-2xl p-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <IconPlus className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Get Started
                      </h3>
                      <p className="text-gray-300 text-sm mb-4">
                        Add your Razorpay credentials to start accepting
                        payments through PayNest.
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
    </SessionGuard>
  );
}
