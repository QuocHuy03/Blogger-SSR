import { ThemeProvider } from "@/components/Admins/ThemeContext";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@/styles/fonts.css";
import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";
import { useState, useEffect } from "react";

const progress = new ProgressBar({
  size: 2,
  color: "#1E3A8A",
  className: "bar-of-progress",
  delay: 100,
});

export default function App({ Component, pageProps }) {
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
    <ThemeProvider initialTheme="light">
      <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
        {loading && <div className="loading-spinner"></div>}
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}
