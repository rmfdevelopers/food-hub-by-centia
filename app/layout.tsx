import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const heading = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  weight: ["400", "700", "900"] 
});
const body = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-body",
  weight: ["400", "500", "700"] 
});

export const metadata: Metadata = {
  title: "Food Hub by Centia | Authentic Nigerian Flavors",
  description: "Onitsha's premier source for natural, organic local foodstuff. Meticulously processed and packaged Nigerian ingredients.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans selection:bg-accent/30`}>
        {children}
      </body>
    </html>
  );
}