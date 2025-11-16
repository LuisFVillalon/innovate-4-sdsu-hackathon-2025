"use client"

import { useState } from "react"

export default function RedeemPage() {
  const [token, setToken] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!token.trim()) {
      return
    }
    
    setIsSubmitting(true)
    // Handle token redemption logic here
    console.log("Redeeming token:", token)
    
    // Reset after a brief delay (for demo purposes)
    setTimeout(() => {
      setIsSubmitting(false)
      // Could navigate to success page or show success message
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start py-8 px-4 sm:py-16 sm:px-8 bg-white relative">
        {/* Logo placeholder in top-left */}
        <div className="absolute top-8 left-8">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs text-gray-600 font-medium">Logo</span>
          </div>
        </div>

        {/* Main content - centered */}
        <div className="w-full flex-1 flex items-center justify-center">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-4">
              <label htmlFor="crash-token" className="block text-sm font-medium text-black">
                Enter a crash token:
              </label>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  id="crash-token"
                  type="text"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="XD-1234"
                  className="flex-1 h-12 px-4 rounded-lg border border-gray-300 bg-white text-black placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={!token.trim() || isSubmitting}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[48px] min-h-[48px]"
                  aria-label="Submit token"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

