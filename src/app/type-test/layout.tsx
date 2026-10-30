import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typeface Pairing Test — Helia Studio",
  description: "Temporary typography comparison laboratory for Helia Studio.",
};

export default function TypeTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

