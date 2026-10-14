import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChartNoAxesCombined,
  Check,
  Layers3,
  Mail,
  MapPin,
  MonitorCog,
  MoveUpRight,
  Wrench,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import services from "../../../data/services.js";
import { homepageSections } from "../../../data/pages.js";
import settings from "../../../data/site-settings.js";
import imagePlaceholder from "../../../data/image-placeholder.js";
import Link from "next/link";

const serviceIcons = {
  building: Building2,
  tools: Wrench,
  systems: MonitorCog,
  strategy: ChartNoAxesCombined,
};

function makeJsonLd(settings, services) {
  const identity = settings.identity || {};
  const contact = settings.contact || {};
  const homepage = settings.homepage || {};
  const siteUrl = settings.seo.siteUrl;
  const business = {
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#business`,
    name: identity.websiteName || "Kashif Consultants",
    url: siteUrl,
    description:
      settings.seo?.metaDescription ||
      homepage.shortDescription ||
      "End-to-end business consultancy, procurement and operational setup.",
    image: homepage.heroImageUrl,
    logo: identity.logoImageUrl || `${siteUrl}/brand-mark.svg`,
    areaServed: [
      { "@type": "City", name: "London" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "GB",
    },
    knowsAbout: [
      "Commercial property procurement",
      "Retail and wholesale business setup",
      "Operational setup",
      "Point-of-sale systems",
      "Inventory management",
      "Business growth strategy",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Business consulting services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.summary,
          provider: { "@id": `${siteUrl}/#business` },
          areaServed: "United Kingdom",
        },
        position: index + 1,
      })),
    },
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email ? { email: contact.email } : {}),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      business,
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: identity.websiteName || "Kashif Consultants",
        publisher: { "@id": `${siteUrl}/#business` },
        inLanguage: "en-GB",
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        url: siteUrl,
        name:
          settings.seo?.metaTitle ||
          "Kashif Consultants | Business setup, procurement & operations",
        description: settings.seo?.metaDescription || homepage.shortDescription,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#business` },
        inLanguage: "en-GB",
      },
    ],
  };
}

export const metadata = (() => {
  const identity = settings.identity || {};
  const homepage = settings.homepage || {};
  const seo = settings.seo || {};
  const siteUrl = seo.siteUrl;
  const title =
    seo.metaTitle ||
    "Kashif Consultants | Business setup, procurement & operations";
  const description =
    seo.metaDescription ||
    homepage.shortDescription ||
    "End-to-end business consulting, commercial property procurement and operational setup for ambitious businesses across the UK.";
  return {
    metadataBase: new URL(siteUrl),
    title: {
      absolute: title,
    },
    description,
    applicationName: identity.websiteName || "Kashif Consultants",
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: "/",
      siteName: identity.websiteName || "Kashif Consultants",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
})();

export default function HomePage() {
  const identity = settings.identity || {};
  const homepage = settings.homepage || {};
  const contact = settings.contact || {};
  const heroHeading =
    homepage.heroHeading || "Good businesses start with a better first step.";
  const emphasized = homepage.heroEmphasis || "better first step.";
  const headingParts = heroHeading.split(emphasized);
  const structuredData = makeJsonLd(settings, services);
  const statistics = homepage.statistics || [];
  const processSteps = homepage.processSteps || [];
  const whyPoints = homepage.whyPoints || [];

  return (
    <>
      <main>
        <section className="hero-section">
          <div className="hero-inner container-wide">
            <div className="hero-copy">
              <div>
                <div className="hero-location">
                  <span className="location-icon">
                    <MapPin size={14} />
                  </span>
                  {identity.serviceArea || "London · Working across the UK"}
                </div>
                <span className="eyebrow hero-eyebrow">
                  {homepage.heroEyebrow || "Start-to-finish business consultants"}
                </span>
                <h1 className="display-heading hero-heading">
                  {headingParts.length > 1 ? (
                    <>
                      {headingParts[0]}
                      <em>{emphasized}</em>
                      {headingParts.slice(1).join(emphasized)}
                    </>
                  ) : (
                    heroHeading
                  )}
                </h1>
                <p className="hero-description">
                  {homepage.shortDescription ||
                    "National business consultation, procurement and operational setup specialists."}
                </p>
                <div className="hero-actions">
                  <Button asChild size="lg">
                    <a href="#contact">
                      {homepage.contactCtaLabel || "Talk through your plans"}
                      <ArrowUpRight size={17} />
                    </a>
                  </Button>
                  <a className="hero-secondary-link" href="#services">
                    Explore our services <ArrowRight size={16} />
                  </a>
                </div>
                <div className="hero-credentials">
                  <span className="credential-stars" aria-label="21 years of experience">
                    21
                  </span>
                  <span>
                    <strong>Years of experience</strong>
                    <span>Senior-led. Hands-on. UK-wide.</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-frame">
                <Image
                  alt={
                    homepage.heroImageAlt ||
                    "A carefully arranged modern retail interior"
                  }
                  className="editorial-image hero-image"
                  fetchPriority="high"
                  fill
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={imagePlaceholder}
                  src={
                    homepage.heroImageUrl ||
                    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=85"
                  }
                  sizes="(max-width: 600px) 100vw, (max-width: 960px) 45vw, 50vw"
                />
              </div>
              <p className="hero-image-caption">
                Commercial spaces, considered from first search to opening day.
              </p>
            </div>
          </div>
          <div className="hero-bottom container-wide" aria-hidden="true">
            <span>Thoughtful business setup</span>
            <span>London / United Kingdom</span>
          </div>
        </section>

        <section className="stats-band" aria-label="Consultancy highlights">
          <div className="stats-inner container-wide">
            {statistics.map((stat, index) => (
              <Reveal className="stat-item" delay={index * 0.06} key={`${stat.value}-${stat.label}`}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="services-section section-space" id="services">
          <div className="container-wide">
            <Reveal className="section-intro section-intro-row">
              <div>
                <span className="eyebrow">
                  {homepage.servicesEyebrow || "How we can help"}
                </span>
                <h2 className="section-heading">
                  {homepage.servicesHeading ||
                    "A solid business starts with the right building blocks."}
                </h2>
              </div>
              <p>
                {homepage.servicesDescription ||
                  "Four connected disciplines. One experienced partner to help bring your next venture to life."}
              </p>
            </Reveal>
            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = serviceIcons[service.icon] || Layers3;
                return (
                  <Reveal delay={index * 0.07} key={service.id}>
                    <Card className="service-card" id={`service-${service.slug}`}>
                      <div className="service-card-top">
                        <span className="service-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="service-icon">
                          <Icon aria-hidden="true" size={23} strokeWidth={1.6} />
                        </span>
                      </div>
                      <h3>{service.title}</h3>
                      <p className="service-summary">{service.summary}</p>
                      <p className="service-description">{service.description}</p>
                      <Link
                        className="service-arrow"
                        href={`/services/${service.slug}`}
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <ArrowUpRight size={19} />
                      </Link>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="story-section" id="about">
          <div className="story-inner container-wide">
            <Reveal className="story-visual">
              <Image
                alt={
                  homepage.storyImageAlt ||
                  "Commercial premises ready to become a new business"
                }
                className="editorial-image story-image"
                fill
                loading="lazy"
                placeholder="blur"
                blurDataURL={imagePlaceholder}
                sizes="(max-width: 600px) 90vw, 45vw"
                src={
                  homepage.storyImageUrl ||
                  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85"
                }
              />
              <div className="story-image-caption">
                <span>01</span>{" "}
                {homepage.storyImageCaption ||
                  "A clearer route from idea to opening day"}
              </div>
              <span className="story-stamp">LONDON<br />TO THE UK</span>
            </Reveal>
            <Reveal className="story-copy" delay={0.08}>
              <span className="eyebrow">
                {homepage.whyEyebrow || "Built around your business"}
              </span>
              <h2 className="section-heading">
                {homepage.whyHeading ||
                  "Commercial know-how, with a systems mindset."}
              </h2>
              {homepage.introHeading && (
                <h3 className="story-subhead">{homepage.introHeading}</h3>
              )}
              <p className="story-intro">
                {homepage.introduction ||
                  "Led by a senior consultant with 21 years of industry experience, Kashif Consultants provides start-to-finish business consulting and end-to-end launch and scaling support across the UK."}
              </p>
              <div className="why-list" id="why-us">
                {whyPoints.map((point) => (
                  <div className="why-point" key={point.title}>
                    <span className="why-check">
                      <Check size={15} />
                    </span>
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="process-section section-space" id="process">
          <div className="container-wide">
            <Reveal className="process-heading">
              <span className="eyebrow">
                {homepage.processEyebrow || "The way forward"}
              </span>
              <h2 className="section-heading">
                {homepage.processHeading || "Clear steps. No loose ends."}
              </h2>
              <p>
                {homepage.processDescription ||
                  "A practical, connected approach that takes your vision from first conversation to opening day."}
              </p>
            </Reveal>
            <div className="process-grid">
              {processSteps.map((step, index) => (
                <Reveal className="process-step" delay={index * 0.08} key={step.title}>
                  <div className="process-step-top">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {index === 0 ? (
                      <MapPin size={20} />
                    ) : index === 1 ? (
                      <Layers3 size={20} />
                    ) : (
                      <MoveUpRight size={20} />
                    )}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="launch-planning-section section-space">
          <div className="container-wide">
            <Reveal className="section-intro section-intro-row">
              <div>
                <span className="eyebrow">{homepageSections[0].eyebrow}</span>
                <h2 className="section-heading">{homepageSections[0].title}</h2>
              </div>
              <p>{homepageSections[0].description}</p>
            </Reveal>
            <div className="planning-grid">
              {homepageSections[0].checkpoints.map((item, index) => (
                <Reveal
                  className="planning-card"
                  delay={index * 0.07}
                  key={item.number}
                >
                  <span className="planning-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
            <Link className="inline-route-link" href="/approach">
              See how we work <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="audience-section section-space">
          <div className="container-wide">
            <Reveal className="section-intro section-intro-row">
              <div>
                <span className="eyebrow">{homepageSections[1].eyebrow}</span>
                <h2 className="section-heading">{homepageSections[1].title}</h2>
              </div>
              <p>{homepageSections[1].description}</p>
            </Reveal>
            <div className="audience-grid">
              {homepageSections[1].audiences.map((audience, index) => (
                <Reveal
                  className="audience-card"
                  delay={index * 0.07}
                  key={audience.title}
                >
                  <span className="audience-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{audience.title}</h3>
                  <p>{audience.text}</p>
                </Reveal>
              ))}
            </div>
            <Link className="inline-route-link" href="/services">
              Explore our services <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner container-wide">
            <Reveal className="contact-copy">
              <span className="eyebrow">
                {homepage.contactEyebrow || "Let's get started"}
              </span>
              <h2 className="section-heading">
                {homepage.contactHeading || "Tell us what you're building."}
              </h2>
              <p>
                {homepage.contactDescription ||
                  "Share the opportunity, the challenge or the idea. We’ll help you work out the best next move."}
              </p>
              <div className="contact-detail">
                <span className="contact-detail-icon">
                  {contact.email ? <Mail size={17} /> : <MapPin size={17} />}
                </span>
                <span>
                  <span>{contact.email ? "Write to us" : "Where we work"}</span>
                  <strong>
                    {contact.email || identity.location || "London, United Kingdom"}
                  </strong>
                </span>
              </div>
              {contact.phone && (
                <div className="contact-detail">
                  <span className="contact-detail-icon">
                    <ArrowRight size={17} />
                  </span>
                  <span>
                    <span>Give us a call</span>
                    <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
                      {contact.phone}
                    </a>
                  </span>
                </div>
              )}
            </Reveal>
            <Reveal className="contact-card" delay={0.08}>
              <div className="contact-card-header">
                <span className="contact-card-kicker">A good place to begin</span>
                <h3>Tell us a little about your plans.</h3>
                <p>Start a no-obligation conversation with our team.</p>
              </div>
              <ContactForm
                buttonLabel={homepage.contactCtaLabel || "Send enquiry"}
                services={services}
              />
            </Reveal>
          </div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
