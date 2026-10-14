import { ArrowRight, MapPin } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/MarketingPageParts";
import { Reveal } from "@/components/Reveal";
import { Card } from "@/components/ui/card";
import services from "../../../../data/services.js";
import { pageMetadata } from "../../../../data/metadata.js";
import { editorialPages } from "../../../../data/pages.js";
import settings from "../../../../data/site-settings.js";

export const metadata = pageMetadata({
  title: "Contact Kashif Consultants | Discuss Your Business Plans",
  description:
    "Start a conversation about commercial property, business setup, retail and wholesale strategy or digital systems. Serving London and businesses across the UK.",
  path: "/contact",
});

export default function ContactPage() {
  const content = editorialPages.contact;
  const contact = settings.contact || {};

  return (
    <main className="interior-page">
      <PageIntro {...content} />
      <section className="contact-page-section section-space">
        <div className="container-wide contact-page-layout">
          <Reveal className="contact-page-copy">
            <span className="eyebrow">A useful first conversation</span>
            <h2 className="section-heading">
              Start with where you are.
            </h2>
            <p>
              You do not need a finished brief. Let us know what you are
              considering, what feels unclear and what you hope to achieve.
            </p>
            <ul className="contact-reassurance-list">
              {content.reassurance.map((item) => (
                <li key={item}>
                  <ArrowRight size={16} aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <div className="contact-detail">
              <span className="contact-detail-icon">
                <MapPin size={17} />
              </span>
              <span>
                <span>Based in London</span>
                <strong>Working with businesses across the UK</strong>
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
          <Reveal delay={0.08}>
            <Card className="contact-card contact-page-card">
              <div className="contact-card-header">
                <span className="contact-card-kicker">Tell us about your plans</span>
                <h3>What would you like to make happen?</h3>
                <p>We’ll use your details only to respond to your enquiry.</p>
              </div>
              <ContactForm
                buttonLabel={settings.homepage?.contactCtaLabel || "Send enquiry"}
                services={services}
              />
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
