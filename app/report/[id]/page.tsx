import { readFileSync } from 'fs';
import { join } from 'path';
import Link from 'next/link';
import styles from '../../page.module.css';
import Image from 'next/image';

interface Report {
  reportId: string;
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  incident: string;
  licensePlate: string;
  photos: string[];
  description: string;
  timestamp: string;
  location: string;
}

interface ReportsData {
  reports: Report[];
}

export default function ReportPage({ params }: { params: { id: string } }) {
  let report: Report | null = null;

  try {
    const filePath = join(process.cwd(), 'reports', 'reports.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const data: ReportsData = JSON.parse(fileContents);
    // Hardcoded for testing
    report = data.reports.find((r) => r.reportId === "2FBD298") || null;
  } catch (error) {
    console.error('Error reading reports file:', error);
  }

  if (!report) {
    return (
      <div className={styles.mainWrapper}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#A6192E] mb-6">Report not found</h1>
          <Link
            href="/"
            className="text-xl text-[#000000] underline hover:text-[#A6192E]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-xl text-[#000000] underline hover:text-[#A6192E]"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-8 space-y-6">
          <div className="border-b-2 border-gray-200 pb-4">
            <h1 className="text-4xl font-bold text-[#A6192E] mb-2">
              Report #{report.reportId}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-[#000000] mb-2">Contact Information</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-black"><span className="font-medium">Name:</span> {report.contact.name}</p>
                  <p className="text-black"><span className="font-medium">Phone:</span> {report.contact.phone}</p>
                  <p className="text-black"><span className="font-medium">Email:</span> {report.contact.email}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#000000] mb-2">Incident Details</h2>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="text-black"><span className="font-medium">Type:</span> {report.incident}</p>
                  <p className="text-black"><span className="font-medium">License Plate:</span> {report.licensePlate}</p>
                  <p className="text-black"><span className="font-medium">Date & Time:</span> {formatDate(report.timestamp)}</p>
                  <p className="text-black"><span className="font-medium">Location:</span> {report.location}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#000000] mb-2">Description</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-black">{report.description}</p>
              </div>
            </div>
          </div>

          {report.photos && report.photos.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-[#000000] mb-4">Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.photos.map((photo, index) => (
                  <div key={index} className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                    <Image
                      src={photo}
                      alt={`Report photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

