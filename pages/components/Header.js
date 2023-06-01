import { useDebounce } from "@/hook/SearchDebounce";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, isDirty] = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!isDirty) return;
    const search = async () => {
      try {
        const response = await axios.get(`/api/blog?search=${debouncedValue}`);
        console.log(response.data);
      } catch (error) {
        console.error("Error searching:", error);
      }
    };
    search();
  }, [debouncedValue]);
  return (
    <header className="border-b bg-white sticky top-0 z-50 flex items-center justify-between px-4 py-3 gap-4">
      <div className="flex items-center justify-start">
        <a
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-900"
        >
          LQH
        </a>
      </div>

      <div
        className="flex items-center justify-center sm:w-full h-10"
      >
        <span className="relative flex items-center group">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="absolute w-4 h-4 ml-3 fill-slate-400 group-hover:fill-slate-500 group-focus:fill-slate-500"
          >
            <path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search docs…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full py-2 pl-8 pr-2 border rounded bg-slate-100 placeholder-slate-400 text-slate-800 border-slate-100 outline outline-offset-2 outline-2 outline-transparent hover:border-slate-200 focus:border-slate-200 focus:outline-slate-600"
          />
        </span>
        <input type="hidden" name="sites" value="#" />
        <input className="sr-only" placeholder="Search..." />
      </div>

      <div className="flex items-center justify-end">
        <Link
          href="/blogs"
          className="px-4 py-2.5 text-sm font-semibold rounded bg-slate-900 text-slate-50 transition ease-in-out delay-75 hover:scale-105 duration-200"
        >
          Blogs
        </Link>
      </div>
    </header>
  );
}
