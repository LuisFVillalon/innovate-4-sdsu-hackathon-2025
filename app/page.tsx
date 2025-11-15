'use client';

import styles from './page.module.css'

// import Link from "next/link"
import { useState } from "react";
import { ChevronRight } from "lucide-react";



import { Button } from "./components/ui/3d-button"
import { Input } from "./components/ui/input"


export default function Home() {
  const [reportInput, setReportInput] = useState(false); // 0 is the initial value

  return (
    <div className={styles.mainWrapper}>
          <div className={`${styles.fadeIn} text-[#A6192E] text-4xl font-bold`}>
            The Crash App
          </div>
            { reportInput ?
              <div className="flex flex-col gap-8 justify-center items-center">
                <Button  
                  className={styles.fadeInLeft} 
                  onClick={() => setReportInput(false)}>
                    Go Back
                </Button>
                <div className='flex mt-0'>
                  <Input
                    type="text"
                    placeholder="Enter your ID Report"
                    className={`placeholder-[#FFFFFF] ${styles.fadeInRight}`}
                  />
                  <Button  
                    className={`bg-[#A6192E] ${styles.fadeInRight}`} 
                  >
                      <ChevronRight className="bg-[#A6192E] w-5 h-5 text-white" />
                  </Button>
                </div>
              </div>
              :
              <div className="flex flex-col gap-8 justify-center items-center">
                <div className={styles.fadeInLeft}>
                  <Button>Create a Report</Button>
                </div>
                <div className={styles.fadeInRight}>
                  <Button onClick={() => setReportInput(true)}>Get a Report</Button>
                </div>
              </div>
            }
    </div>
  );
}
