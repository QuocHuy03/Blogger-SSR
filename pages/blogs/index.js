import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import SingleBlog from "../components/SingleBlog";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";

const index = () => {
  const router = useRouter();
  const page = parseInt(router.query?.page) || 1;

  const fetchBlogs = async () => {
    const res = await axios.get(`/api/blogs?page=${page}`);
    return res?.data;
  };

  const { data, isLoading, error } = useQuery(["blogs", page], fetchBlogs);

  return (
    <Layout>
      <div className="py-5 sm:text-center">
        <h1 className="mb-4 text-2xl font-extrabold tracking-tight text-slate-900  sm:text-2xl">
          Quốc Huy Blog
        </h1>
        <p className="text-lg text-slate-700 dark:text-slate-400">
          Không có gì ngoài các bài viết chất lượng, chuyên sâu.
        </p>
      </div>
      <section className="pt-[20px] pb-[50px]">
        <div className="max-w-screen-xl mx-auto">
          <div className="-mx-4 pb-12 flex flex-wrap justify-center">
            {isLoading ? (
              <div className="text-center mt-4">
                <Loading width={"w-8"} height={"h-8"} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.blogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="w-full border overflow-hidden rounded-md bg-white shadow-one flex flex-col"
                  >
                    <SingleBlog blog={blog} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="wow fadeInUp -mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                {/* Nút "Prev" */}
                {data?.currentPage > 1 && (
                  <li className="mx-1">
                    <Link
                      href={`/blogs?page=${data?.currentPage - 1}`}
                      passHref
                    >
                      <span className="font-bold flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-200 backdrop-opacity-10 px-4 text-sm transition hover:bg-cyan-400 hover:text-white">
                        Prev
                      </span>
                    </Link>
                  </li>
                )}

                {/* Các nút trang */}
                {Array.from({ length: data?.totalPages }, (_, i) => i + 1).map(
                  (pageNumber) => (
                    <li key={pageNumber} className="mx-1">
                      <Link href={`/blogs?page=${pageNumber}`} passHref>
                        <span
                          className={`${
                            pageNumber === parseInt(data?.currentPage)
                              ? "font-bold text-white bg-blue-400"
                              : "font-medium"
                          } flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-200 backdrop-opacity-10 px-4 text-sm transition hover:bg-cyan-400 hover:text-white`}
                        >
                          {pageNumber}
                        </span>
                      </Link>
                    </li>
                  )
                )}

                {/* Nút "Next" */}
                {parseInt(data?.currentPage) < data?.totalPages && (
                  <li className="mx-1">
                    <Link
                      href={`/blogs?page=${parseInt(data?.currentPage) + 1}`}
                      passHref
                    >
                      <span className="font-bold flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-200 backdrop-opacity-10 px-4 text-sm transition hover:bg-cyan-400 hover:text-white">
                        Next
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default index;
