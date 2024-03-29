import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@/styles/fonts.css";
import ProgressBar from "@badrap/bar-of-progress";
import { useState, useEffect } from "react";
import Router from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlogProvider } from "@/hook/BlogContext";


const progress = new ProgressBar({
  size: 2,
  color: "#1E3A8A",
  className: "bar-of-progress",
  delay: 100,
});

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const start = () => {
      setLoading(true);
      progress.start();
    };
    const finish = () => {
      setLoading(false);
      progress.finish();
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", finish);
    Router.events.on("routeChangeError", finish);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", finish);
      Router.events.off("routeChangeError", finish);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          backgroundColor: "white",
        }}
      >
        {loading && <div className="loading-spinner"></div>}
        <BlogProvider>
          <Component {...pageProps} />
        </BlogProvider>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}
