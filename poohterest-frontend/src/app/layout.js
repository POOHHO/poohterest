import Navbar from "./component/navbar";
import "./globals.css";

export const metadata = {
  title: "Pinterest Clone",
  description: "A Pinterest-like application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen">
        <Navbar />
        <main className="pt-20 px-4 md:px-8 max-w-[2000px] mx-auto">
          <div className="mt-4">
            {children}
          </div>
        </main>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
