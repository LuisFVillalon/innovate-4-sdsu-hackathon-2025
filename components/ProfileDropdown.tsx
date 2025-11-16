'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";

export default function ProfileDropdown() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMenuClick = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Profile menu"
      >
        <User className="w-6 h-6 text-[#000000]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => handleMenuClick('/account')}
              className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
            >
              Profile
            </button>
            <button
              onClick={() => handleMenuClick('/redeem')}
              className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
            >
              Redeem
            </button>
            <button
              onClick={() => handleMenuClick('/rewards')}
              className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 transition-colors"
            >
              Rewards
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

