import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageCta, PageIntro } from "@/components/MarketingPageParts";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import services from "../../../../data/services.js";
import { pageMetadata } from "../../../../data/metadata.js";
import { editorialPages } from "../../../../data/pages.js";

export const metadata = pageMetadata({
  title: "Business Consulting Services | Kashif Consultants",
  description:
    "Explore commercial property procurement, operational setup, digital systems integration and retail and wholesale strategy across London and the UK.",
  path: "/services",
});

export default function ServicesPage() {
  const content = editorialPages.services;

  return (
    <main className="interior-page">
      <PageIntro {...content} />
      <section className="interior-section section-space">
        <div className="container-wide">
          <div className="interior-section-heading">
            <span className="eyebrow">Four connected disciplines</span>
            <h2 className="section-heading">
              Support that moves with your business.
            </h2>
            <p>
              Start with the challenge in front of you. We can focus on one
              workstream or connect the pieces into a wider launch plan.
            </p>
          </div>
          <div className="service-overview-grid">
            {services.map((service, index) => (
              <Reveal delay={index * 0.06} key={service.slug}>
                <Card className="service-overview-card">
                  <span className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <Link
                    className="inline-route-link"
                    href={`/services/${service.slug}`}
                  >
                    Explore this service <ArrowRight size={16} />
                  </Link>
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
