import { ThemeProvider } from "@/components/ThemeContext";
import "@/styles/globals.css";
import "@/styles/table.module.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider initialTheme="light">
      <Component {...pageProps} />
      <ToastContainer />
    </ThemeProvider>
  );
}
