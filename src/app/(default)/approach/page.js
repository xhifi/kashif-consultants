import { ArrowUpRight } from "lucide-react";
import { PageCta, PageIntro } from "@/components/MarketingPageParts";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import { pageMetadata } from "../../../../data/metadata.js";
import { editorialPages } from "../../../../data/pages.js";

export const metadata = pageMetadata({
  title: "Our Approach | KS Consultants",
  description:
    "See how KS Consultants connects property, operations and digital systems into a practical plan for launching or growing a UK retail or wholesale business.",
  path: "/approach",
});

export default function ApproachPage() {
  const content = editorialPages.approach;

  return (
    <main className="interior-page">
      <PageIntro {...content} />
      <section className="approach-stages-section section-space">
        <div className="container-wide">
          <div className="interior-section-heading">
            <span className="eyebrow">Four stages, one connected plan</span>
            <h2 className="section-heading">Know what happens next.</h2>
          </div>
          <div className="approach-stages-grid">
            {content.stages.map((stage, index) => (
              <Reveal delay={index * 0.06} key={stage.number}>
                <Card className="approach-stage-card">
                  <span>{stage.number}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="approach-principles-section">
        <div className="container-wide">
          <div className="interior-section-heading">
            <span className="eyebrow">How we work</span>
            <h2 className="section-heading">Clear, considered and client-led.</h2>
          </div>
          <div className="approach-principles-grid">
            {content.principles.map((principle) => (
              <div className="approach-principle" key={principle.title}>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="resources-section section-space">
        <div className="container-wide">
          <div className="interior-section-heading">
            <span className="eyebrow">Useful official guidance</span>
            <h2 className="section-heading">Start with the right source.</h2>
            <p>
              Business, planning and workplace requirements depend on your
              circumstances. These official resources are a helpful starting
              point; check your specific situation with the relevant authority
              or a qualified adviser.
            </p>
          </div>
          <div className="resource-grid">
            {content.resources.map((resource) => (
              <a
                className="resource-card"
                href={resource.href}
                key={resource.href}
                rel="noreferrer"
                target="_blank"
              >
                <span>{resource.title}</span>
                <p>{resource.description}</p>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
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
