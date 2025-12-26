import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HFT Strategy Workbench",
  description: "Analyze high-frequency trade signals and export MQL5 expert advisors"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
