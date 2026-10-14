import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageCta, PageIntro } from "@/components/MarketingPageParts";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import services from "../../../../../data/services.js";
import { pageMetadata } from "../../../../../data/metadata.js";
import { serviceResources } from "../../../../../data/pages.js";
import settings from "../../../../../data/site-settings.js";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) return {};

  return pageMetadata({
    title: `${service.title} | KS Consultants`,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

function ServiceDetailFallback() {
  return (
    <main className="interior-page">
      <section className="interior-hero">
        <div className="container-wide">
          <div className="interior-hero-copy">
            <span className="eyebrow">Our services</span>
            <h1 className="display-heading">Preparing your service details…</h1>
            <p>Loading the right information for your business plans.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

async function ServiceDetailContent({ params }) {
  const { slug } = await params;
  const serviceIndex = services.findIndex((item) => item.slug === slug);
  if (serviceIndex < 0) notFound();

  const service = services[serviceIndex];
  const detail = service.detail;
  const relatedServices = services.filter((item) => item.slug !== slug).slice(0, 2);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    provider: {
      "@type": "ProfessionalService",
      name: settings.identity.websiteName,
      url: settings.seo.siteUrl,
      areaServed: [
        { "@type": "City", name: "London" },
        { "@type": "Country", name: "United Kingdom" },
      ],
    },
    areaServed: "United Kingdom",
    url: `${settings.seo.siteUrl}/services/${service.slug}`,
  };

  return (
    <main className="interior-page">
      <PageIntro
        eyebrow="Our services"
        title={service.title}
        description={service.summary}
      />
      <section className="service-detail-section section-space">
        <div className="container-wide service-detail-layout">
          <div className="service-detail-copy">
            <Link className="back-route-link" href="/services">
              <ArrowLeft size={15} /> All services
            </Link>
            <Reveal>
              <h2 className="section-heading">A practical way forward.</h2>
              <p className="service-detail-intro">{detail.intro}</p>
              <h3>Who this is for</h3>
              <p>{detail.suitableFor}</p>
            </Reveal>
            <Reveal className="service-detail-note">
              <strong>Important to know</strong>
              <p>{detail.note}</p>
            </Reveal>
          </div>
          <Reveal>
            <Card className="service-deliverables-card">
              <span className="eyebrow">What we can work through</span>
              <h2>Clear priorities. Useful next steps.</h2>
              <ul className="deliverables-list">
                {detail.deliverables.map((item) => (
                  <li key={item}>
                    <Check size={17} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </section>

      <section className="service-stages-section">
        <div className="container-wide">
          <div className="interior-section-heading">
            <span className="eyebrow">A considered sequence</span>
            <h2 className="section-heading">From the first brief to the next move.</h2>
          </div>
          <div className="service-stages-grid">
            {detail.stages.map((stage, index) => (
              <Reveal className="service-stage" delay={index * 0.06} key={stage}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{stage}</h3>
              </Reveal>
            ))}
          </div>
          <div className="official-resources">
            <p>For independent guidance:</p>
            {serviceResources.map((resource) => (
              <a
                href={resource.href}
                key={resource.href}
                rel="noreferrer"
                target="_blank"
              >
                {resource.title} <ArrowRight size={14} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="related-services-section section-space">
        <div className="container-wide">
          <div className="interior-section-heading">
            <span className="eyebrow">Connected support</span>
            <h2 className="section-heading">Other parts of the picture.</h2>
          </div>
          <div className="related-services-grid">
            {relatedServices.map((related) => (
              <Link
                className="related-service-card"
                href={`/services/${related.slug}`}
                key={related.slug}
              >
                <span>{related.title}</span>
                <ArrowRight size={17} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <PageCta
        title="Let’s talk about your plans."
        description="Tell us what you are working towards and where you could use a hand. We’ll help you identify a useful next step."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}

export default function ServiceDetailPage({ params }) {
  return (
    <Suspense fallback={<ServiceDetailFallback />}>
      <ServiceDetailContent params={params} />
    </Suspense>
  );
}
