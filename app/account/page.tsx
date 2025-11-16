'use client';
//TODO change license plate search from id to license plate
//
import styles from '../page.module.css'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
//import { useRouter } from "next/navigation";
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
  description: string;
}

export default function Home() {
  const [reportInput, setReportInput] = useState(false);
  const [reports, setReports] = useState<Report[]>([]); 
  const [licenseQuery, setLicenseQuery] = useState(""); 
  useEffect(() => {
    fetch("/reports.json")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.reports;
        if (list) setReports(list);
      })
      .catch((err) => console.error("Error loading reports:", err));
  }, []);
  // ✅ Filter reports live by license plate (case-insensitive)
const filteredReports = licenseQuery.trim()
  ? reports.filter((r) =>
      r.licensePlate.toLowerCase().includes(licenseQuery.trim().toLowerCase())
    )
  : reports;

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
              <div className="pt-[2.5%] flex flex-col gap-4 justify-center items-center">
                <Button
                  className="bg-gray-900 border-gray-600 border-b-gray-500 px-10 py-6 text-xl text-white"
                  onClick={() => {
                    setReportInput(false);
                    setLicenseQuery(""); // ✅ clears the search filter
                  }}
                              
                >
                  Go Back
                </Button>
                <form className='flex gap-2 px-10 py-3 text-xl flex-col mt-0'>
                  <label className="text-black">Click on a report to view full details.</label>
                  <Input
                    type="text"
                    placeholder="Enter your license plate"
                    value={licenseQuery}
                    onChange={(e) => setLicenseQuery(e.target.value)}
                    className={`bg-white text-xl text-black placeholder:text-black ${styles.fadeInRight}`}
                  />
                </form>
              </div>
              :
              <div className="pt-[5%] flex flex-col gap-8 justify-center items-center">
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
              {filteredReports && filteredReports.length > 0 ? (
                <div className="flex flex-col w-full text-black max-h-[50vh] overflow-y-auto w-[90%] md:w-1/2 bg-gray-50 rounded-xl p-4 pl-0 space-y-3">
                  {filteredReports.map((report) => (
                    <Link
                      key={report.reportId}
                      href={`/report/${encodeURIComponent(report.licensePlate)}`}
                      className="border-l-4 border-[#A6192E] bg-gray-300 rounded-md shadow-sm hover:bg-gray-200 transition-colors block p-4"
                    >
                      <p className="text-lg font-bold text-gray-800">{report.licensePlate}</p>
                      <p className="text-sm text-gray-500">{report.description}</p>
                      <p className="text-sm text-gray-500">{report.location}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(report.timestamp).toLocaleString()}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mt-6">No reports found.</p>
              )}
          </div>
    </div>
  );
}
