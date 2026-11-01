import { DM_Serif_Display, DM_Sans } from "next/font/google";

export const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif-display",
  display: "swap",
});

export const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

