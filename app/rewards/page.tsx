'use client';

import Image from "next/image";
import { Coins } from "lucide-react";
import styles from "../page.module.css";
import Link from "next/link";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function PrizePage() {
  const prizes = [
    { name: "Dominos", id: 3789, image: "/dominos.png" },
    { name: "In-N-Out", id: 3790, image: "/innout.png" },
    { name: "Money", id: 3791, image: "/money.png" },
    { name: "Panda Express", id: 3792, image: "/pandaexpress.png" },
    { name: "Starbucks", id: 3793, image: "/starbucks.png" },
    { name: "The Habit", id: 3794, image: "/thehabit.png" },
  ];

  return (
    <div className={`${styles.mainWrapper} relative min-h-screen bg-white`}>
      {/* Top right coin + profile */}
            <div className="w-full flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Logo */}
        <div className=" flex items-center h-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/crashapplogo.png"
              alt="Logo"
              width={112}
              height={112}
              className="h-28 w-28 rounded-full object-cover bg-transparent"
              priority
            />
          </Link>
        </div>
        {/* Account button */}
          <div className="text-xl flex">
            <div className="flex gap-2 justify-center items-center">
                <p className="text-[#000000]">4,234</p>
                <Coins className="w-6 h-6 text-yellow-400" />
                <ProfileDropdown />
            </div>
          </div>
      </div>

      {/* Header */}
      <div className="text-left w-full max-w-xl mx-auto mt-20 px-4">
        <p className="text-2xl font-semibold text-black">Hi Michael,</p>
        <p className="text-xl text-gray-700">Select a prize</p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10 w-full max-w-xl mx-auto px-4">
        {prizes.map((prize) => (
          <div
            key={prize.id}
            className="flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-[1.02] transition-transform cursor-pointer"
          >
            {/* Display image from /public directory */}
            <div className="w-24 h-24 relative mb-3">
              <Image
                src={prize.image}
                alt={prize.name}
                fill
                className="object-contain rounded-md"
              />
            </div>
            <p className="text-black font-medium">{prize.name}</p>
            <div className="flex">
              <Coins className="w-4 h-4 text-yellow-400" />
              <p className="text-gray-500 text-sm">{prize.id.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
