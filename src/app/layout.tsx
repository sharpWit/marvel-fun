import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import QueryProviders from "@/providers/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Marvel Next App",
  description: "Created by Saeed Khosravi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-red-600 `}>
        <QueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="container pt-4 lg:pt-32 min-h-screen">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
