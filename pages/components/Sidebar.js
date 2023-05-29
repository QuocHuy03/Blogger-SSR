import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "./Loading";
import Link from "next/link";

export default function Sidebar() {
  const fetchBlogs = async () => {
    const res = await axios.get("/api/blogs");
    return res?.data;
  };
  const { data, isLoading, error } = useQuery(["departments"], fetchBlogs, {
    staleTime: 0,
  });

  return (
    <div className="fixed z-10 top-[3.5rem] h-screen shadow-xl px-4 left-0 hidden peer-checked:block lg:relative lg:top-0 lg:h-auto lg:px-0 lg:block lg:flex-none lg:shadow-none">
      <div className="absolute inset-y-0 right-0 w-full lg:w-[50vw] bg-white lg:bg-slate-50"></div>

      <nav className="sticky top-[4.5rem] w-64 text-base lg:text-sm">
        <ul
          role="list"
          className="-ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-4 pl-4 space-y-8"
        >
          <li>
            <h3 className="font-semibold tracking-tight text-slate-900">
              BÀI VIẾT LIÊN QUAN
            </h3>

            <ul role="list" className="mt-2 space-y-2 ">
              {data?.map((huydev, index) => (
                <li key={index}>
                  <span className="my-1 mr-1.5 h-2 w-2 flex-shrink-0 rounded-full border-2 border-gray-400 bg-transparent"></span>
                  <Link
                    href={`/blog/${huydev.slug}`}
                    className="text-slate-600 text-sm hover:text-slate-800"
                  >
                    {huydev.title}
                  </Link>
                </li>
              ))}
              <div className="text-center">
              {isLoading && <Loading width={"w-5"} height={"h-5"} />}
              </div>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
