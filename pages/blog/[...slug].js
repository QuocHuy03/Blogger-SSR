import React from "react";
import Home from "..";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Blog() {
  const router = useRouter();
  const { slug } = router.query;
  const firstSlug = Array.isArray(slug) ? slug[0] : slug;

  const fetchBlogDetail = async (slug) => {
    const response = await axios.get(`/api/blogs?slug=${slug}`);
    return response.data;
  };

  const { data, isLoading, error } = useQuery(["DetailBlog", firstSlug], () =>
    fetchBlogDetail(firstSlug)
  );

  return (
    <Home>
      <article>
        <header className="border-b pb-4 border-slate-400">
          <p className="text-base font-medium text-slate-500">
            Getting Started
          </p>

          <p className="pt-1 text-xl font-medium tracking-tight text-slate-900">
            Blog <i className="fas fa-chevron-right text-xs text-slate-400"></i>{" "}
            <span className="capitalize">{data?.category}</span>
          </p>
        </header>

        <p className="mt-4 text-3xl font-bold text-slate-600 capitalize">
          {data?.title}
        </p>

        <p className="my-1 text-sm font-bold text-orange-400 capitalize">
          {data?.category}
        </p>

        <p className="text-sm font-medium capitalize">
          {new Date(data?.createdAt).toLocaleString()} - {data?.publisher}
        </p>

        <div className="mt-4 prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-lead:text-slate-500 prose-a:font-semibold prose-a:underline prose-pre:bg-slate-900">
          <span dangerouslySetInnerHTML={{ __html: data?.description }}></span>
        </div>
      </article>
      <dl className="flex pt-6 mt-6 border-t border-slate-200">
        <div className="mr-auto text-left">
          <dt className="text-sm font-normal tracking-tight text-slate-600">
            Previous
          </dt>

          <dd className="mt-1">
            <a
              href="#"
              className="text-base font-semibold text-slate-900 hover:underline"
            >
              Quick start guide
            </a>
          </dd>
        </div>

        <div className="ml-auto text-right">
          <dt className="text-sm font-normal tracking-tight text-slate-600">
            Next
          </dt>

          <dd className="mt-1">
            <a
              href="#"
              className="text-base font-semibold text-slate-900 hover:underline"
            >
              What are content types?
            </a>
          </dd>
        </div>
      </dl>
    </Home>
  );
}
