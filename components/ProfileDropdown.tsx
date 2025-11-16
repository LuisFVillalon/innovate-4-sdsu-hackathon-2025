'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "lucide-react";

export default function ProfileDropdown() {
  const router = useRouter();
  const pathname = usePathname();
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
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer hover:opacity-80 transition-opacity flex items-center"
        aria-label="Profile menu"
      >
        <User className="w-6 h-6 text-[#000000]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="py-1">
            <button
              onClick={() => handleMenuClick('/account')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                pathname === '/account' || pathname === '/increment'
                  ? 'text-black font-semibold bg-gray-100' 
                  : 'text-black'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleMenuClick('/redeem')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                pathname === '/redeem' 
                  ? 'text-black font-semibold bg-gray-100' 
                  : 'text-black'
              }`}
            >
              Redeem
            </button>
            <button
              onClick={() => handleMenuClick('/rewards')}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                pathname === '/rewards' 
                  ? 'text-black font-semibold bg-gray-100' 
                  : 'text-black'
              }`}
            >
              Rewards
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

