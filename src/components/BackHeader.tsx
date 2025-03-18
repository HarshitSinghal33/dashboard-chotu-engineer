"use client";

import { useRouter } from "next/navigation";
import { APP_NAME } from "../../constants";

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full bg-white shadow-md py-3 px-5 flex items-center">
      <button
        onClick={() => router.back()}
        className="mr-4 p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h1 className="text-lg font-semibold">{APP_NAME}</h1>
    </header>
  );
}
