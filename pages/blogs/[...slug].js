import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import Link from "next/link";
import { BlogContext } from "@/hook/BlogContext";

export default function Blog() {
  const { blogsData } = useContext(BlogContext);
  const router = useRouter();
  const { slug } = router.query;
  const firstSlug = Array.isArray(slug) ? slug[0] : slug;

  const fetchBlogDetail = async (slug) => {
    const response = await axios.get(`/api/blogs?slug=${slug}`);
    return response.data;
  };

  const { data: blogDataSlug, isLoading: blogLoading } = useQuery(
    ["DetailBlog", [firstSlug]],
    () => fetchBlogDetail(firstSlug)
  );

  const currentBlogIndex = blogsData?.findIndex(
    (blog) => blog.slug === firstSlug
  );
  const previousIndex = currentBlogIndex - 1;
  const nextIndex = currentBlogIndex + 1;

  return (
    <Layout>
      <div className="flex-1 max-w-3xl mx-auto w-full">
        <article>
          <header className="border-b pb-4 border-slate-400">
            <div className="mb-3 -ml-1">
              <Link
                href="/blogs"
                className="flex items-center text-sm group text-fuchsia-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  ></path>
                </svg>
                Back To Blogs
              </Link>
            </div>

            <div className="pt-1 text-xl font-medium tracking-tight text-slate-900 flex items-center">
              <span className="capitalize">Blog</span>
              <i className="fas fa-chevron-right text-xs text-slate-400 ml-2 mr-2"></i>
              {blogLoading ? (
                <>
                  <div className="text-center">
                    <Loading width={"w-5"} height={"h-5"} />
                  </div>
                </>
              ) : (
                <span className="capitalize">{blogDataSlug?.categoryName}</span>
              )}
            </div>
          </header>

          {blogLoading ? (
            <div className="text-center mt-4">
              <Loading width={"w-8"} height={"h-8"} />
            </div>
          ) : (
            <>
              {blogDataSlug?.blog ? (
                <>
                  <p className="mt-4 text-3xl font-bold text-slate-600 capitalize">
                    {blogDataSlug.blog.title}
                  </p>

                  <p className="my-1 text-sm font-bold text-orange-400 capitalize">
                    {blogDataSlug.blog.categoryName}
                  </p>

                  <p className="text-sm font-medium capitalize">
                    {new Date(blogDataSlug.blog.createdAt).toLocaleString()} -{" "}
                    {blogDataSlug.blog.publisher}
                  </p>

                  <div className="mt-4 prose prose-slate max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-lead:text-slate-500 prose-a:font-semibold prose-a:underline prose-pre:bg-slate-900">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: blogDataSlug.blog.description,
                      }}
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    ></span>
                  </div>
                </>
              ) : (
                <h1 className="pt-6 text-3xl font-bold tracking-tight text-slate-900 text-center">
                  Blog Not Found
                </h1>
              )}
            </>
          )}
        </article>
        <dl className="flex pt-6 mt-6 border-t border-slate-200">
          <div className="mr-auto text-left">
            <dt className="text-sm font-normal tracking-tight text-slate-600">
              Previous
            </dt>
            {previousIndex >= 0 ? (
              <dd className="mt-1">
                <Link
                  href={`/blogs/${blogsData[previousIndex]?.slug}`}
                  passHref
                >
                  <span className="text-base font-semibold text-slate-900 hover:underline">
                    {blogsData[previousIndex]?.title}
                  </span>
                </Link>
              </dd>
            ) : (
              <dd className="mt-1">
                <span className="text-base font-semibold text-slate-400">
                  No Previous Blog
                </span>
              </dd>
            )}
          </div>

          <div className="ml-auto text-right">
            <dt className="text-sm font-normal tracking-tight text-slate-600">
              Next
            </dt>
            {nextIndex < blogsData?.length ? (
              <dd className="mt-1">
                <Link href={`/blogs/${blogsData[nextIndex]?.slug}`} passHref>
                  <span className="text-base font-semibold text-slate-900 hover:underline">
                    {blogsData[nextIndex]?.title}
                  </span>
                </Link>
              </dd>
            ) : (
              <dd className="mt-1">
                <span className="text-base font-semibold text-slate-400">
                  No Next Blog
                </span>
              </dd>
            )}
          </div>
        </dl>
      </div>
    </Layout>
  );
}
