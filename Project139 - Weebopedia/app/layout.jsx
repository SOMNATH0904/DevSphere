import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Weebopedia",
  description: "Community for the weebs!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className="bg-black text-white">


        <main className="app">

        <Navbar/>
        
          {children}
          </main>
      </body>
    </html>
  );
}
