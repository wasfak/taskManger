import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="min-w-screen p-6 flex items-center justify-center bg-black text-white">
      <Link href="/" className="mr-4">
        Home
      </Link>
      <Link href="/add" className="ml-4">
        New Task
      </Link>
    </nav>
  );
}
