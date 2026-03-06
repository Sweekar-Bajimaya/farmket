'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Error404Props {
  errorText?: string;
}

export default function Error404Page({ errorText = "Page Not Found" }: Error404Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="mb-8">
        <Image
          src="/page_not_found.png"          alt="Not Found Illustration"
          width={450}
          height={675}
          priority
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{errorText}</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, the page you are looking for does not exist or an error occurred.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
}