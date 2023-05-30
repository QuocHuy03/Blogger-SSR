import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useRouter } from "next/router";

export default function Home({ children }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Header />
      <main className="relative flex justify-center mx-auto sm:px-2 bg-white max-w-8xl ">
        {slug ? null : ( // Check slug
          <label
            htmlFor="navigation"
            className="fixed bottom-0 left-0 z-50 flex items-center justify-center w-12 h-12 mb-4 ml-4 bg-white border rounded-full shadow-lg cursor-pointer text-slate-600 border-slate-300 lg:hidden transition duration-200 ease-in-out active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 8h16M4 16h16"
              />
            </svg>
          </label>
        )}
        <input
          type="checkbox"
          name="navigation"
          id="navigation"
          className="hidden peer"
        />
        {slug ? <Sidebar /> : null}
        <div className="flex-auto max-w-2xl min-w-0 px-4 py-10 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
          {children}
        </div>
      </main>
    </>
  );
}
