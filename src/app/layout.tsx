import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dare Beauty | Skin, Nails, Lashes & Parties",
  description:
    "Professional beauty services by Dare Beauty: nails, facials, lashes, brows, memberships, and mini glam parties.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
