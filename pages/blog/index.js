import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import SingleBlog from "../components/SingleBlog";
import Layout from "../components/Layout";

const index = () => {
  const fetchBlogs = async () => {
    const res = await axios.get("/api/blogs");
    return res?.data;
  };

  const { data, isLoading, error } = useQuery(["blogs"], fetchBlogs);

  return (
    <Layout>
      <div class="py-10 sm:text-center">
        <h1 class="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 sm:text-4xl">
          Quốc Huy Blog
        </h1>
        <p class="text-lg text-slate-700 dark:text-slate-400">
          Không có gì ngoài các bài viết chất lượng, chuyên sâu.
        </p>
      </div>
      <section className="pt-[30px] pb-[50px]">
        <div className="max-w-screen-xl mx-auto">
          <div className="-mx-4 pb-12 flex flex-wrap justify-center">
            {isLoading ? (
              <div className="text-center mt-4">
                <Loading width={"w-8"} height={"h-8"} />
              </div>
            ) : (
              <>
                {data?.map((blog) => (
                  <div
                    key={blog._id}
                    className="w-full px-2 pb-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                  >
                    <SingleBlog blog={blog} />
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="wow fadeInUp -mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <ul className="flex items-center justify-center pt-8">
                <li className="mx-1">
                  <a
                    href="#0"
                    className="font-bold flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-200 backdrop-opacity-10 px-4 text-sm transition hover:bg-cyan-400 hover:text-white"
                  >
                    Prev
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="font-medium flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-200 backdrop-opacity-10 px-4 text-sm transition hover:bg-cyan-400 hover:text-white"
                  >
                    1
                  </a>
                </li>

                <li className="mx-1">
                  <a
                    href="#0"
                    className="font-medium flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-200 backdrop-opacity-10 px-4 text-sm transition hover:bg-cyan-400 hover:text-white"
                  >
                    2
                  </a>
                </li>
                <li className="mx-1">
                  <a className="font-medium flex h-9 min-w-[36px] cursor-not-allowed items-center justify-center rounded-md bg-slate-200 backdrop-opacity-10 px-4 text-sm transition hover:bg-cyan-400 px-4 text-sm text-body-color">
                    ...
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="font-medium  flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-200 backdrop-opacity-10 px-4 text-sm transition hover:bg-cyan-400 hover:text-white"
                  >
                    12
                  </a>
                </li>
                <li className="mx-1">
                  <a
                    href="#0"
                    className="font-bold flex h-9 min-w-[36px] items-center justify-center rounded-md bg-slate-200 backdrop-opacity-10 px-4 text-sm transition hover:bg-cyan-400 hover:text-white"
                  >
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default index;
