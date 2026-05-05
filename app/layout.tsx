import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const headingFont = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading" 
});

const bodyFont = DM_Sans({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "700"],
  variable: "--font-body" 
});

export const metadata: Metadata = {
  title: "Food Hub by Centia | Authentic Nigerian Staples",
  description: "Premium, organic, and expertly processed Nigerian ingredients sourced directly from Onitsha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}