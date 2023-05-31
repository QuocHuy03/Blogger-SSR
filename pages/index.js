import { useEffect, useState } from "react";
import Aside from "./components/Aside";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useRouter } from "next/router";
import Layout from "./components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-3xl p-6 mx-auto text-slate-900">
        <div className="flex flex-wrap pb-8 mb-8 border-b md:flex-nowrap">
          <div className="mb-8 md:basis-3/5">
            <img
              src="https://avatars.githubusercontent.com/u/97956803?v=4"
              alt="Le Quoc Huy"
              className="w-24 h-24 rounded-full md:w-32 md:h-32"
            />
          </div>
          <div>
            <h1 className="mb-3 text-2xl font-extrabold md:text-3xl">
              Hi, I'm Lê Quốc Huy
            </h1>
            <p>
              I'm a web developer from Vietnam, working on NextJS, Laravel,
              NodeJS and TailwindCSS. I love to working on open source projects
              and contribute to the community.
            </p>
            <div className="flex items-center mt-5">
              <span className="mr-4 text-slate-600">Find Me On :</span>
              <ul className="flex space-x-4">
                <li>
                  <a
                    href="https://github.com/quochuy03"
                    target="_blank"
                    className="transition-all text-slate-800 hover:text-fuchsia-500 group"
                    title="GitHub"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-5 h-5 transition-all group-hover:-translate-y-0.5"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com/huyit03"
                    target="_blank"
                    className="text-blue-500 transition-all hover:text-fuchsia-500 group"
                    title="Facebook"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-5 h-5 transition-all group-hover:-translate-y-0.5"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/huydev"
                    target="_blank"
                    className="text-blue-400 transition-all hover:text-fuchsia-500 group"
                    title="Twitter"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="w-5 h-5 transition-all group-hover:-translate-y-0.5"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <a
              href="/blog"
              className="transition-all hover:text-fuchsia-500"
              title="Next.js 13"
            >
              <h2 className="font-semibold">Next.js 13</h2>
            </a>
            <li className="mt-2">
              Performance improvements : Next.js có thể tiếp tục cải thiện hiệu
              suất trang web bằng cách tối ưu hóa quá trình rendering và tải
              trang. Các cải tiến như Incremental Static Regeneration (ISR) hoặc
              Streaming SSR có thể được cung cấp để tăng tốc quá trình tải trang
              và cải thiện trải nghiệm người dùng, ...
            </li>
            <li className="mt-2">
              Tăng hiệu suất và tốc độ tải trang : Next.js 13 có thể có cải tiến
              về hiệu suất và tối ưu hóa tốc độ tải trang, giúp cải thiện trải
              nghiệm người dùng và tăng khả năng tương tác của ứng dụng.
            </li>
            <li className="mt-2">
              Tích hợp tốt hơn với React 18 : Next.js 13 có thể đi kèm với tích
              hợp tốt hơn với phiên bản React 18 mới nhất, cho phép bạn sử dụng
              các tính năng và cải tiến mới nhất của React.
            </li>
            <li className="mt-2">
              Cải tiến Dev Server : Next.js 13 có thể cung cấp các cải tiến về
              Dev Server, bao gồm tăng tốc độ rebuild và hot reloading để cải
              thiện quá trình phát triển ứng dụng.
            </li>
            <li className="mt-2">
              Cải tiến về quản lý tệp tin và tải tài nguyên : Next.js 13 có thể
              cung cấp các cải tiến về quản lý tệp tin và tải tài nguyên, giúp
              tối ưu hóa kích thước tệp và cải thiện quy trình phát triển.
            </li>

            <li className="mt-2"> 
              Cải tiến về xử lý tệp và dữ liệu tĩnh: Next.js 13 có thể có cải
              tiến về xử lý tệp và dữ liệu tĩnh, bao gồm cải tiến về xử lý và
              lưu trữ các tệp tin tĩnh trong ứng dụng.
            </li>

            <a
              href="/blog"
              className="mt-1.5 flex items-center font-medium text-sm group text-fuchsia-500 gap-0.5"
            >
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 mt-0.5 transition-transform group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
