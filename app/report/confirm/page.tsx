"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/3d-button"

function ConfirmContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)
  
  // Get reportId from URL params, fallback to default if not present
  const crashId = searchParams.get('reportId') || "2FBD298"
  const crashToken = "XD-1234"

  const handleCopyToken = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(crashToken)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } else {
        // Fallback for mobile browsers that don't support clipboard API
        const textArea = document.createElement("textarea")
        textArea.value = crashToken
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        
        try {
          const successful = document.execCommand("copy")
          if (successful) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          } else {
            console.error("Copy command failed")
          }
        } catch (err) {
          console.error("Fallback copy failed:", err)
        } finally {
          document.body.removeChild(textArea)
        }
      }
    } catch (err) {
      console.error("Failed to copy:", err)
      // Try fallback method
      try {
        const textArea = document.createElement("textarea")
        textArea.value = crashToken
        textArea.style.position = "fixed"
        textArea.style.left = "-999999px"
        textArea.style.top = "-999999px"
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand("copy")
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackErr) {
        console.error("Fallback copy also failed:", fallbackErr)
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start py-8 px-4 sm:py-16 sm:px-8 bg-white">
        <div className="w-full space-y-6 sm:space-y-8">
          <div className="space-y-2 text-center w-full">
            <h1 className="text-2xl sm:text-3xl font-semibold leading-tight tracking-tight text-black">
              Report Submitted Successfully!
            </h1>
          </div>

          <div className="w-full space-y-6 py-8">
            <div className="bg-white border-2 border-gray-300 rounded-xl p-8 space-y-6">
              {/* Crash ID Section */}
              {/* <div className="space-y-3 text-center">
                <p className="text-sm font-medium text-black">
                  Your <span style={{ color: '#A6192E' }}>Crash ID</span> is:
                </p>
                <div className="bg-white border border-gray-300 rounded-lg p-4 inline-block">
                  <div className="text-3xl sm:text-4xl font-bold text-black tracking-wider">
                    {crashId}
                  </div>
                </div>
                <p className="text-sm text-black pt-2">
                  Write this on the back of your <span style={{ color: '#A6192E' }}>Crash Card</span>.
                </p>
              </div> */}

              {/* Crash Token Section */}
              <div className="space-y-3 text-center pt-6">
                <p className="text-sm font-medium text-black">
                  Your <span style={{ color: '#A6192E' }}>Crash Token</span> is:
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="bg-white border border-gray-300 rounded-lg p-4">
                    <div className="text-2xl sm:text-3xl font-bold text-black tracking-wider">
                      {crashToken}
                    </div>
                  </div>
                  <button
                    onClick={handleCopyToken}
                    className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Copy crash token"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5 text-black" />
                    )}
                  </button>
                </div>
                {copied && (
                  <p className="text-xs text-green-600">Copied!</p>
                )}
                <p className="text-sm text-black pt-2">
                  You can use this token to redeem <span style={{ color: '#A6192E' }}>Crash Coins</span>!
                </p>
              </div>
            </div>

            {/* Home Button */}
            <div className="pt-4 flex justify-center">
              <Button
                onClick={() => router.push("/")}
                variant="default"
                className="min-h-[44px]"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function ConfirmReport() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  )
}

