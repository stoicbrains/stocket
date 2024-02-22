import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({subsets:['latin'],weight:['100','400','600','800','900']})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
   
    
  );
}
