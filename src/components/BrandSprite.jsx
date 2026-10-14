import Image from "next/image";

export function BrandSprite({ src, monogram = "KSC", className }) {
  if (src && src !== "/brand-mark.svg") {
    return (
      <Image
        alt=""
        className={className}
        height={40}
        src={src}
        unoptimized
        width={40}
      />
    );
  }

  if (!src) {
    return (
      <span className="site-brand-mark" aria-hidden="true">
        {monogram}
      </span>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="512"
        height="512"
        rx="112"
        fill="var(--brand-sprite-background)"
      />
      <text
        x="256"
        y="286"
        fill="var(--brand-sprite-foreground)"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="158"
        fontWeight="700"
        letterSpacing="-8"
        textAnchor="middle"
      >
        {monogram}
      </text>
      <path
        d="M144 354h224"
        fill="none"
        stroke="var(--brand-sprite-accent)"
        strokeLinecap="round"
        strokeWidth="18"
      />
    </svg>
  );
}
