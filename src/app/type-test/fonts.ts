import {
  Newsreader,
  Instrument_Serif,
  Instrument_Sans,
  Fraunces,
  Plus_Jakarta_Sans,
  Cormorant_Garamond,
  Source_Sans_3,
  DM_Serif_Display,
  DM_Sans,
  Lora,
  Inter,
} from "next/font/google";

export const newsreader = Newsreader({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600"],
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond",
  display: "swap",
});

export const sourceSans3 = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-source-sans-3",
  display: "swap",
});

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

export const lora = Lora({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-inter",
  display: "swap",
});
