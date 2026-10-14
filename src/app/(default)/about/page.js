import { PageCta, PageIntro } from "@/components/MarketingPageParts";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { pageMetadata } from "../../../../data/metadata.js";
import { editorialPages } from "../../../../data/pages.js";

export const metadata = pageMetadata({
  title: "About Kashif Consultants | 21 Years of Business Experience",
  description:
    "Meet Kashif Consultants: senior-led business consulting for commercial premises, operational setup and digital systems across London and the UK.",
  path: "/about",
});

export default function AboutPage() {
  const content = editorialPages.about;

  return (
    <main className="interior-page">
      <PageIntro {...content} />
      <section className="about-story-section section-space">
        <div className="container-wide about-story-layout">
          <Reveal className="about-story-lead">
            <span className="eyebrow">Experience that connects the dots</span>
            <h2 className="section-heading">
              Make the commercial plan work in the real world.
            </h2>
          </Reveal>
          <div className="about-story-copy">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="about-values-section">
        <div className="container-wide">
          <div className="interior-section-heading">
            <span className="eyebrow">What you can expect</span>
            <h2 className="section-heading">A thoughtful partner at every stage.</h2>
          </div>
          <div className="about-values-grid">
            {content.values.map((value, index) => (
              <Reveal delay={index * 0.06} key={value.title}>
                <Card className="about-value-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <PageCta
        title={content.closingTitle}
        description={content.closingDescription}
      />
    </main>
  );
}
