import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import { jaldi } from "@/lib/fonts";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Cloudy",
  description: "change your dns freely",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jaldi.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("contextmenu", function(e) {
                e.preventDefault();
              });
            `,
          }}
        />
        <TopBar />
        {children}
        <Footer />
        <Toaster position="bottom-center" richColors />
      </body>
    </html>
  );
}
