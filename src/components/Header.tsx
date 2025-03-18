"use client";

import { useState } from "react";
import Link from "next/link";
import { APP_NAME } from "../../constants";
import { Button } from "./ui/button";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-md  w-full z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-900">
          {APP_NAME}
        </Link>

        <nav className="hidden md:flex space-x-4">
          <Link href="/create">
            <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
              Create
            </Button>
          </Link>
          <Link
            href="/signin"
          >
            <Button variant="outline">Sign In</Button>
          </Link>
        </nav>

        <button
          className="md:hidden text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path
                fillRule="evenodd"
                d="M19.5 6.75H4.5a.75.75 0 010-1.5h15a.75.75 0 010 1.5zm0 6H4.5a.75.75 0 010-1.5h15a.75.75 0 010 1.5zm0 6H4.5a.75.75 0 010-1.5h15a.75.75 0 010 1.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7"
            >
              <path
                fillRule="evenodd"
                d="M6.75 19.5a.75.75 0 001.06 0L12 15.31l4.19 4.19a.75.75 0 001.06-1.06L13.06 14.25l4.19-4.19a.75.75 0 00-1.06-1.06L12 13.19 7.81 9a.75.75 0 10-1.06 1.06L10.94 14.25l-4.19 4.19a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-3 bg-white shadow-md p-4">
          <Link
            href="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md text-center"
            onClick={() => setMenuOpen(false)}
          >
            Create
          </Link>
          <Link
            href="/signin"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-center"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
