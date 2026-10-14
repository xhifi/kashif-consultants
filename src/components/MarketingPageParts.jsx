import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/ui/button";

export function PageIntro({ eyebrow, title, description }) {
  return (
    <section className="interior-hero">
      <div className="container-wide">
        <div className="interior-hero-copy">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="display-heading">{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}

export function PageCta({ title, description, label = "Talk through your plans" }) {
  return (
    <section className="page-cta">
      <div className="container-wide page-cta-inner">
        <Reveal>
          <span className="eyebrow">Your next step</span>
          <h2 className="section-heading">{title}</h2>
          <p>{description}</p>
        </Reveal>
        <Button asChild size="lg">
          <Link href="/contact">
            {label} <ArrowRight size={17} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
