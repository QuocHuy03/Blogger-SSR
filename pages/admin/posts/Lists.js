import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Lists() {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get("/api/blogs").then((response) => {
      setBlogs(response?.data);
    });
  }, []);
  return (
    <Layout>
      <Link className="btn btn-primary" href={"/products/new"}>
        Add Blog
      </Link>
      <table className="min-w-full divide-y divide-gray-200 mt-5">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              STT
            </th>

            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Title
            </th>

            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Publisher
            </th>

            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Time
            </th>

            <th
              scope="col"
              className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {blogs &&
            blogs.map((blog, index) => (
              <tr key={blog._id} className="text-center">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>

                <td className="px-6 py-4 whitespace-nowrap">{blog.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {blog.publisher}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(blog.createdAt).toLocaleString()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={"/admin/posts/edit/" + blog._id}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <span className="px-2">|</span>
                  <Link
                    href={"/admin/posts/delete/" + blog._id}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
