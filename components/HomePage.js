"use client"

import { ArrowRight, Shield, Zap, Users, CheckCircle, Send, Smartphone, CreditCard, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="group inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 backdrop-blur-sm text-emerald-300 text-sm font-medium hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-300 cursor-pointer">
                  <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />🚀 Trusted by 50,000+ users worldwide
                </div>

                <h1 className="text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-emerald-300 leading-tight tracking-tight">
                  Send Money
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 animate-gradient-x">
                    Instantly
                  </span>
                  <span className="block">Anywhere</span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-lg font-light">
                  Transform the way you transfer money. Lightning-fast, ultra-secure, and beautifully simple. Your
                  money, delivered in seconds, not days.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Get Started Free</span>
                  <ArrowRight className="relative z-10 ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-emerald-300 border-2 border-emerald-500/50 hover:border-emerald-400 rounded-2xl backdrop-blur-sm hover:bg-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1">
                  <span className="group-hover:text-emerald-200 transition-colors duration-300">Watch Demo</span>
                </button>
              </div>

              <div className="flex items-center gap-8 pt-6">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="p-1 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Zero hidden fees
                  </span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="p-1 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors duration-300">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Military-grade security
                  </span>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="relative">
                {/* Floating Elements */}
                <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl rotate-12 animate-float opacity-80"></div>
                <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl -rotate-12 animate-float-delayed opacity-80"></div>

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-emerald-600/90 to-teal-700/90 rounded-3xl p-8 shadow-2xl shadow-emerald-500/20 backdrop-blur-sm border border-emerald-500/20 transform rotate-2 hover:rotate-1 transition-transform duration-500">
                  <div className="bg-slate-900/95 rounded-2xl p-6 transform -rotate-2 border border-slate-700/50 backdrop-blur-sm">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-white text-lg">Quick Transfer</h3>
                        <div className="p-2 bg-emerald-500/20 rounded-xl">
                          <Send className="h-6 w-6 text-emerald-400" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-slate-800/80 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors duration-300 group cursor-pointer">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <span className="text-white font-bold text-lg">A</span>
                          </div>
                          <div>
                            <p className="font-semibold text-white group-hover:text-emerald-300 transition-colors duration-300">
                              Alex Johnson
                            </p>
                            <p className="text-sm text-gray-400">alex@paynest.com</p>
                          </div>
                        </div>

                        <div className="text-center py-6 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent rounded-xl"></div>
                          <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 relative z-10">
                            $2,500.00
                          </span>
                          <p className="text-gray-400 text-sm mt-1">Ready to send</p>
                        </div>

                        <button className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 transition-all duration-300">
                          Send Instantly
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 to-slate-900/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-20 animate-fade-in-up">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                What You Get
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
                Experience the next generation of financial technology with features designed for the modern world
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description:
                    "Transfers complete in milliseconds, not minutes. Experience the speed of light with every transaction.",
                  gradient: "from-yellow-400 to-orange-500",
                  bgGradient: "from-yellow-500/10 to-orange-500/10",
                },
                {
                  icon: Shield,
                  title: "Ultra Secure",
                  description:
                    "Military-grade encryption and quantum-resistant security protocols protect every transaction.",
                  gradient: "from-emerald-400 to-teal-500",
                  bgGradient: "from-emerald-500/10 to-teal-500/10",
                },
                {
                  icon: Users,
                  title: "Effortlessly Simple",
                  description: "Intuitive design that makes complex financial operations feel like child's play.",
                  gradient: "from-purple-400 to-pink-500",
                  bgGradient: "from-purple-500/10 to-pink-500/10",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10 space-y-6 text-center">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900/50 to-black/50 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-20 animate-fade-in-up">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                How It Works
              </h2>
              <p className="text-xl text-gray-400 font-light">Three simple steps to financial freedom</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  step: "1",
                  icon: Smartphone,
                  title: "Choose Recipient",
                  description: "Select from your contacts or enter their details with our smart search",
                },
                {
                  step: "2",
                  icon: CreditCard,
                  title: "Enter Amount",
                  description: "Type the amount and add a personal message with emoji support",
                },
                {
                  step: "3",
                  icon: Send,
                  title: "Send Instantly",
                  description: "Confirm with biometric security and watch your money fly",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="text-center space-y-6 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/30 group-hover:shadow-emerald-500/50 group-hover:scale-110 transition-all duration-500">
                      <span className="text-3xl font-black text-white">{step.step}</span>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <div className="p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 group-hover:bg-slate-700/50 group-hover:border-emerald-500/30 transition-all duration-300">
                        <step.icon className="h-8 w-8 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed max-w-sm mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-teal-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in-up">
            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-teal-400">
              Ready to Transform
              <span className="block">Your Financial Future?</span>
            </h2>

            <p className="text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Join the revolution. Experience money transfers like never before.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <button className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-2xl shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10">Start Your Journey</span>
                <ArrowRight className="relative z-10 ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </button>

              <button className="group inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-emerald-300 border-2 border-emerald-500/50 hover:border-emerald-400 rounded-2xl backdrop-blur-sm hover:bg-emerald-500/10 transition-all duration-500 transform hover:-translate-y-2">
                <span className="group-hover:text-emerald-200 transition-colors duration-300">Explore Features</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-10px) rotate(12deg);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) rotate(-12deg);
          }
          50% {
            transform: translateY(-8px) rotate(-12deg);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
