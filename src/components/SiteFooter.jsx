import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export function SiteFooter({ settings, services }) {
  const identity = settings.identity || {};
  const contact = settings.contact || {};

  return (
    <footer className="site-footer">
      <div className="container-wide">
        <div className="footer-top">
          <Link className="footer-brand" href="/">
            <span className="site-brand-mark" aria-hidden="true">
              {identity.logoMonogram || "KC"}
            </span>
            <span>{identity.websiteName || "Kashif Consultants"}</span>
          </Link>
          <p>{settings.homepage?.shortDescription}</p>
          <Link className="footer-top-link" href="/contact">
            Start a conversation <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="footer-grid">
          <div>
            <span className="footer-label">Explore</span>
            <Link href="/services">Our services</Link>
            <Link href="/approach">How we work</Link>
            <Link href="/about">About us</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div>
            <span className="footer-label">What we do</span>
            {services.slice(0, 4).map((service) => (
              <Link href={`/services/${service.slug}`} key={service.id}>
                {service.title}
              </Link>
            ))}
          </div>
          <div>
            <span className="footer-label">Contact</span>
            <address className="footer-contact-line">
              <MapPin aria-hidden="true" size={15} />
              <span>{contact.address || identity.location || "London, United Kingdom"}</span>
            </address>
            {contact.email ? (
              <a className="footer-contact-line" href={`mailto:${contact.email}`}>
                <Mail aria-hidden="true" size={15} />
                <span>{contact.email}</span>
              </a>
            ) : (
              <Link className="footer-contact-line" href="/contact">
                <Mail aria-hidden="true" size={15} />
                <span>Email us via our enquiry form</span>
              </Link>
            )}
            {contact.phone && (
              <a
                className="footer-contact-line"
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
              >
                <Phone aria-hidden="true" size={15} />
                <span>{contact.phone}</span>
              </a>
            )}
            {contact.socialLinks?.length > 0 && (
              <div className="footer-social-links" aria-label="Social media">
                {contact.socialLinks.map((social) => (
                  <a
                    aria-label={social.label}
                    href={social.href}
                    key={`${social.label}:${social.href}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {social.label} <ArrowUpRight aria-hidden="true" size={13} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="footer-newsletter">
            <span className="footer-label">Occasional insights</span>
            <h2>Useful notes for your next business move.</h2>
            <NewsletterSignup />
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {settings.copyrightYear} {identity.websiteName || "Kashif Consultants"}.
            All rights reserved.
          </span>
          <span>{identity.tagline || "Thoughtful business setup, from start to finish."}</span>
        </div>
      </div>
    </footer>
  );
}
