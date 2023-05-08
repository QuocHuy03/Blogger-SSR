import { ThemeProvider } from "@/components/ThemeContext";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@/styles/fonts.css";
import ProgressBar from "@badrap/bar-of-progress";
import { useState, useEffect } from "react";
import Router from "next/router";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";

const progress = new ProgressBar({
  size: 2,
  color: "#1E3A8A",
  className: "bar-of-progress",
  delay: 100,
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/admin/login");
    } else if (accessToken) {
      try {
        const decodedToken = jwt_decode(accessToken);
        const { isAdmin } = decodedToken.user;
        if (!isAdmin === "admin") {
          router.push("/admin/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
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
