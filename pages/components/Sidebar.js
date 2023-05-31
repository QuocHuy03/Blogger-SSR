import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "./Loading";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Sidebar() {

  const router = useRouter();
  const { slug } = router.query;
  const [selectedSlug, setSelectedSlug] = useState(null);

  const handleLinkClick = (slug) => {
    setSelectedSlug(slug);
  };

  const fetchBlogs = async () => {
    const res = await axios.get("/api/blogs");
    return res?.data;
  };
  const { data, isLoading, error } = useQuery(["blogs"], fetchBlogs, {
    staleTime: 0,
  });

  return (
    <div className="fixed z-10 top-[3.5rem] h-screen shadow-xl px-4 left-0 hidden peer-checked:block lg:relative lg:top-0 lg:h-auto lg:px-0 lg:block lg:flex-none lg:shadow-none bg-white">
      
      <div className="absolute inset-y-0 right-0 w-full lg:w-[50vw] border-r border-gray-200 bg-white lg:bg-slate-50"></div>

      <nav className="sticky top-[4.5rem] w-64 text-base lg:text-sm">
        <ul
          role="list"
          className="-ml-0.5 h-[calc(100vh-4.5rem)] overflow-y-auto py-4 px-4 space-y-8"
        >
          <li>
            <h3 className="font-semibold tracking-tight text-slate-900">
              BÀI VIẾT LIÊN QUAN
            </h3>

            <ul role="list" className="mt-2 space-y-2 ">
              {data?.map((huydev, index) => (
                <li key={index} className="flex items-center">
                  <span
                    className={`my-1 mr-1.5 h-2 w-2 flex-shrink-0 rounded-full border-2 border-gray-400 ${
                      slug[0] === huydev.slug || selectedSlug === huydev.slug
                        ? "bg-blue-500"
                        : "bg-transparent"
                    }`}
                  ></span>
                  <Link href={`/blogs/${huydev.slug}`}>
                    <p
                      className="text-slate-600 text-sm hover:text-slate-800"
                      onClick={() => handleLinkClick(huydev.slug)}
                    >
                      {huydev.title}
                    </p>
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
