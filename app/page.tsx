'use client';

import styles from './page.module.css'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";


import { Button } from "./components/ui/3d-button"
import { Input } from "./components/ui/input"


export default function Home() {
  const [reportInput, setReportInput] = useState(false);
  const [reportId, setReportId] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportId.trim()) {
      router.push(`/report/${reportId.trim()}`);
    }
  };

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
          <div className="absolute top-4 right-4">
            <Link href="/account">
              <Button className="bg-black border-gray-600 border-b-gray-500 text-white px-6 py-2">
                Sign In
              </Button>
            </Link>
          </div>
          <div className='mx-[5%] flex flex-col gap-6 justify-center items-center'>
            <div className={`${styles.fadeIn} text-center text-[#A6192E] text-8xl font-bold`}>
              The Crash App
            </div>
            <div className={`${styles.fadeIn} text-center text-2xl text-[#000000]`}>
              <p>
                  See a crash.
              </p>
              <p>
                Report a crash.
              </p>
              <p>
                Get paid.
              </p>
            </div>
          </div>
          { reportInput ?
              <div className="flex flex-col gap-8 justify-center items-center">
                <Button  
                  className={`bg-gray-900 border-gray-600
                   border-b-gray-500 px-10 py-6 text-xl text-white ${styles.fadeInLeft}`} 
                  onClick={() => setReportInput(false)}>
                    Go Back
                </Button>
                <form onSubmit={handleSubmit} className='flex gap-2 px-10 py-6 text-xl flex mt-0'>
                  <Input
                    type="text"
                    placeholder="Enter your ID Report"
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value)}
                    className={`text-xl placeholder-[#FFFFFF] ${styles.fadeInRight}`}
                  />
                  <Button  
                    type="submit"
                    className={`bg-gray-900 border-gray-600
                   border-b-gray-500 ${styles.fadeInRight}`} 
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </Button>
                </form>
              </div>
              :
              <div className="flex flex-col gap-8 justify-center items-center">
                <div className={`text-white w-full ${styles.fadeInLeft}`}>
                  <Link href="/report/new">
                    <Button className="w-full bg-gray-900 border-gray-600
                       border-b-gray-500 px-10 py-6 text-xl"
                      >
                        Create a Report
                      </Button>
                  </Link>
                </div>
                <div className={`text-white w-full ${styles.fadeInRight}`}>
                  <Button 
                    className="w-full bg-gray-900 border-gray-600
                   border-b-gray-500 px-10 py-6 text-xl"
                    onClick={() => setReportInput(true)}
                  >
                    Get a Report
                  </Button>
                </div>
              </div>
          }
    </div>
  );
}
