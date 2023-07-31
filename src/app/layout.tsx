import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Montserrat } from "next/font/google";
import Head from "./head";

const montserrat = Montserrat({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/CustomToast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased",
        montserrat.className
      )}
    >
      {/* <Head /> */}
      <body className="min-h-screen bg-slate-50 dark:bg-darker-blue antialiased">
        <Providers>
          <Toaster position="bottom-right" />
          {/* @ts-expect-error Server Component */}
          <Navbar />
          <main>{children}</main>
        </Providers>
        {/* Allow for more height on mobile devices */}
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
