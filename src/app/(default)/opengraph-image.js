import { ImageResponse } from "next/og";
import { SocialCard } from "./social-card.js";

export const alt =
  "KS Consultants — business consulting, property procurement and operational setup";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard platform="Business setup, start to finish" />, size);
}
