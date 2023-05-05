import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-3.4.1.min.js"
        ></script>
        <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
      </body>
    </Html>
  );
}
