'use client';

import styles from './page.module.css'
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronRight, Coins } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function RedeemPage() {
  const [token, setToken] = useState("")


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
          <ProfileDropdown />
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
        <div className="flex gap-2 px-10 py-6 text-xl mt-0">
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter your Crash Token"
              className={`flex h-9 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xl text-black shadow-sm shadow-black/5 transition-shadow placeholder-[#FFFFFF] focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50 ${styles.fadeInLeft}`}
             
            />
            {!token.trim() ? (
              <div
                className={`${styles.fadeInRight} bg-gray-900 border-gray-600 border-b-gray-500 px-4 py-2 rounded-lg flex items-center justify-center opacity-50 cursor-not-allowed`}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            ) : (
              <Link
                href="/increment"
                className={`bg-gray-900 border-gray-600 border-b-gray-500 px-4 py-2 rounded-lg flex items-center justify-center`}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </Link>
            )}
          </div>
      </div>
    </div>
  )
}

