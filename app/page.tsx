'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import styles from "./page.module.css";
import { Button } from "./components/ui/3d-button";
import { Input } from "./components/ui/input";

// Type for reports
interface Report {
  reportId: string;
  licensePlate: string;
  timestamp: string;
  description: string;
  location: string;
}

export default function Home() {
  const [reportInput, setReportInput] = useState(false);
  const [licenseQuery, setLicenseQuery] = useState("");
  const [reports, setReports] = useState<Report[]>([]);

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
    <div className={`${styles.mainWrapper} `}>
      
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
        {/* Sign In button */}
        <div className="flex">
          <Link href="/account">
            <Button className="bg-black border-gray-600 border-b-gray-500 text-white px-6 py-2">
              Sign In
            </Button>
          </Link>
        </div>
      </div>


      {/* Title */}
      <div className="mx-[5%] flex flex-col gap-6 justify-center items-center">
        <div className="text-center text-[#A6192E] text-8xl font-bold">The Crash App</div>
        <div className="text-center text-2xl text-black">
          <p>See a crash.</p>
          <p>Report a crash.</p>
          <p>Get paid.</p>
        </div>
      </div>

      {/* Conditional form or buttons */}
      {reportInput ? (
        <div className="flex flex-col gap-8 justify-center items-center">
          <Button
            className="bg-gray-900 border-gray-600 border-b-gray-500 px-10 py-6 text-xl text-white"
            onClick={() => {
              setReportInput(false);
              setLicenseQuery(""); // ✅ clears the search filter
            }}
                        
          >
            Go Back
          </Button>

          <form className="flex gap-2 px-10 py-6 text-xl">
            <Input
              type="text"
              placeholder="Enter your license plate"
              value={licenseQuery}
              onChange={(e) => setLicenseQuery(e.target.value)}
              className="!bg-white !text-black placeholder:!text-gray-500 text-xl"
            />
            {/* <Button
              type="button"
              className="bg-gray-900 border-gray-600 border-b-gray-500"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </Button> */}
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-8 justify-center items-center">
          <div className="text-white w-full">
            <Link href="/report/new">
              <Button className="w-full bg-gray-900 border-gray-600 border-b-gray-500 px-10 py-6 text-xl">
                Create a Report
              </Button>
            </Link>
          </div>
          <div className="text-white w-full">
            <Button
              className="w-full bg-gray-900 border-gray-600 border-b-gray-500 px-10 py-6 text-xl"
              onClick={() => setReportInput(true)}
            >
              Get a Report
            </Button>
          </div>
        </div>
      )}

      {/* Scrollable JSON report list */}
      <div className="w-full px-[5%] flex flex-col justify-start items-center">
        <h2 className="text-2xl font-bold text-[#A6192E] ">Recent Reports</h2>
        {filteredReports && filteredReports.length > 0 ? (
          <div className="flex flex-col w-full text-black max-h-[50vh] overflow-y-auto w-[90%] md:w-1/2 bg-gray-50 rounded-xl p-4 pl-0 space-y-3">
            {filteredReports.map((report) => (
              <div
                key={report.reportId}
                className="border-l-4 border-[#A6192E] bg-gray-300 rounded-md shadow-sm hover:bg-gray-200 transition-colors block p-4"
              >
                <p className="text-lg font-bold text-gray-800">{report.licensePlate}</p>
                <p className="text-sm text-gray-500">{report.description}</p>
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
