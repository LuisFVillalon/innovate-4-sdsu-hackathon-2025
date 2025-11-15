'use client';

import styles from './page.module.css'

import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";



import { Button } from "./components/ui/3d-button"
import { Input } from "./components/ui/input"


export default function Home() {
  const [reportInput, setReportInput] = useState(false); // 0 is the initial value

  return (
    <div className={styles.mainWrapper}>
          <div className="text-xl text-[#000000] underline absolute top-4 right-4">
            <Link href="/account">
              Sign In
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
                <div className='flex gap-2 px-10 py-6 text-xl flex mt-0'>
                  <Input
                    type="text"
                    placeholder="Enter your ID Report"
                    className={`text-xl placeholder-[#FFFFFF] ${styles.fadeInRight}`}
                  />
                  <Button  
                    className={`bg-gray-900 border-gray-600
                   border-b-gray-500 ${styles.fadeInRight}`} 
                  >
                      <ChevronRight className="w-5 h-5 text-white" />
                  </Button>
                </div>
              </div>
              :
              <div className="flex flex-col gap-8 justify-center items-center">
                <div className={`text-white w-full ${styles.fadeInLeft}`}>
                  <Button className="w-full bg-gray-900 border-gray-600
                   border-b-gray-500 px-10 py-6 text-xl">Create a Report</Button>
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
