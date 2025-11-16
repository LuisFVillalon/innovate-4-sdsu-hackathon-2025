'use client';
//TODO change license plate search from id to license plate
//
import styles from '../page.module.css'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Coins } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";

import { Button } from "../components/ui/3d-button"
import { Input } from "../components/ui/input"

// Type for reports
interface Report {
  reportId: string;
  licensePlate: string;
  timestamp: string;
  location: string;
}

export default function Home() {
  const [reportInput, setReportInput] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);  
  const [reportId, setReportId] = useState("");
  const router = useRouter();
  useEffect(() => {
    // Load JSON file from public directory
    fetch("/reports.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.reports) {
          setReports(data.reports);
        }
      })
      .catch((err) => console.error("Error loading reports:", err));
  }, []);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportId.trim()) {
      router.push(`/report/${reportId.trim()}`);
    }
  };

  return (
    <div className={styles.mainWrapper}>
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
                <p className="text-[#000000]">3,687</p>
                <Coins className="w-6 h-6 text-yellow-400" />
                <ProfileDropdown />
            </div>
          </div>
      </div>


          <div className='mx-[50%] flex flex-col gap-2 justify-center items-center'>
            <div className={`w-full ${styles.fadeIn} text-start text-2xl text-[#000000]`}>
              <p>
                  Hi Michael, welcome to
              </p>
            </div>
            <div className={`${styles.fadeIn} text-start text-[#A6192E] text-8xl font-bold`}>
              The Crash App
            </div>
          </div>
          { reportInput ?
              <div className="pt-[5%] md:pt-[10%] flex flex-col gap-8 justify-center items-center">
                <Button  
                  className={`bg-gray-900 border-gray-600
                   border-b-gray-500 px-10 py-6 text-xl text-white ${styles.fadeInLeft}`} 
                  onClick={() => setReportInput(false)}>
                    Go Back
                </Button>
                <form onSubmit={handleSubmit} className='flex gap-2 px-10 py-6 text-xl flex mt-0'>
                  <Input
                    type="text"
                    placeholder="Enter your license plate"
                    value={reportId}
                    onChange={(e) => setReportId(e.target.value)}
                    className={`bg-white text-xl text-white placeholder:text-black ${styles.fadeInRight}`}
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
              <div className="pt-[5%] md:pt-[10%] flex flex-col gap-8 justify-center items-center">
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
          {/* Scrollable JSON report list */}
          <div className="w-full px-[5%] flex flex-col justify-start items-center">
            <h2 className="text-2xl font-bold text-[#A6192E] ">Recent Reports</h2>
            {reports && reports.length > 0 ? (
              <div className="flex flex-col w-full text-black max-h-[50vh] overflow-y-auto w-[90%] md:w-1/2 bg-gray-50 rounded-xl p-4 pl-0 space-y-3">
                {reports.map((report) => (
                  <div
                    key={report.reportId}
                    className="border-l-4 border-[#A6192E] bg-gray-300  rounded-md shadow-sm"
                  >
                    <p className="text-lg font-bold text-gray-800">{report.licensePlate}</p>
                    <p className="text-sm text-gray-500">{report.location}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(report.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              ) : (
              <p className="text-gray-500 mt-6">No reports found.</p>
            )}
          </div>
    </div>
  );
}
