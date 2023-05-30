import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import { adminPages } from "@/middleware/adminPages";

function Lists() {
  const [blogs, setBlogs] = useState([]);

  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get("/api/blogs").then((response) => {
      setBlogs(response?.data);
    });
  }, [deleted]);

  function handleDelete(blogs, _id) {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete [${blogs.title}]?`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, Delete!",
      confirmButtonColor: "#d55",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = blogs;
        await axios.delete("/api/blogs?_id=" + _id);
        setDeleted(!deleted);
      }
    });
  }

  const empty = () => {
    return (
      <tr className="text-center">
        <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
          <span className="text-red-600">Không Có Dữ Liệu ...</span>
        </td>
      </tr>
    );
  };

  return (
    <Layout>
      <Link
        className="px-4 py-2 font-semibold text-sm bg-sky-500 text-white rounded shadow-sm"
        href={"/admin/posts/Add"}
      >
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
              Category
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
        {blogs.length !== 0 ? (
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
                    {blog.categoryName}
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
                    <button
                      onClick={() => handleDelete(blog, blog._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        ) : (
          <tbody>{blogs.length === 0 && empty()}</tbody>
        )}
      </table>
    </Layout>
  );
}
export default adminPages(Lists);