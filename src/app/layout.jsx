import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "Jeddah Traders",
  description: "Jeddah Traders",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#F4F5FA] custom-width">
        <NextTopLoader
          color="#ff4799"
          initialPosition={0.08}
          crawlSpeed={300}
          height={3}
          crawl={false}
          showSpinner={false}
          easing="ease"
          speed={300}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
          <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {children}
      </body>
    </html>
  );
}
