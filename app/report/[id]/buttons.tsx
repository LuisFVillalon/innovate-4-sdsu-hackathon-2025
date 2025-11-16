'use client';

import { Button } from '@/components/ui/3d-button';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  
  return (
    <Button
      onClick={() => router.push('/')}
      className="bg-gray-900 border-gray-600 border-b-gray-500 px-4 py-2 text-sm text-white"
    >
      ← Back to Home
    </Button>
  );
}

export function DownloadButton() {
  return (
    <Button
      className="bg-gray-900 border-gray-600 border-b-gray-500 px-4 py-2 text-sm text-white"
    >
      Download Report
    </Button>
  );
}

