'use client';

import styles from './page.module.css'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight, User, Coins } from "lucide-react";

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
    <div className={styles.mainWrapper}>
      <div className="absolute top-4 left-0 bg-transparent flex items-center h-10">
        <Link href="/" className="flex items-center">
          <Image
            src="/crashapplogo.png"
            alt="Logo"
            width={112}
            height={112}
            className="h-28 w-28 rounded-full object-cover bg-transparent"
            style={{ backgroundColor: 'transparent' }}
            priority
          />
        </Link>
      </div>
      <div className="text-xl absolute top-6 right-6">
        <div className="flex gap-2 justify-center items-center">
          <p className="text-[#000000]">3,687</p>
          <Coins className="w-6 h-6 text-yellow-400" />
          <User className=" w-6 h-6 text-[#000000]" />
        </div>
      </div>

      <div className='mx-[5%] flex flex-col gap-6 justify-center items-center'>
        <div className={`${styles.fadeIn} text-center text-[#A6192E] text-8xl font-bold`}>
          The Crash App
        </div>
        <div className={`${styles.fadeIn} text-center text-2xl text-[#000000]`}>
          <p>
            Redeem your token.
          </p>
          <p>
            Get paid.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-8 justify-center items-center">
        <form onSubmit={handleSubmit} className='flex gap-2 px-10 py-6 text-xl flex mt-0'>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your Crash Token"
            className={`flex h-9 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xl text-black shadow-sm shadow-black/5 transition-shadow placeholder-[#FFFFFF] focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 ${styles.fadeInLeft}`}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className={`bg-gray-900 border-gray-600 border-b-gray-500 px-4 py-2 rounded-lg ${styles.fadeInRight}`}
            disabled={!token.trim() || isSubmitting}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </form>
      </div>
    </div>
  )
}

