import { ThemeProvider } from "@/components/ThemeContext";
import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "@/styles/fonts.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider initialTheme="light">
      <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}
