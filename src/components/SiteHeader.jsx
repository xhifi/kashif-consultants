"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import imagePlaceholder from "../../data/image-placeholder.js";

const menuContent = {
  Services: {
    kicker: "What we do",
    title: "The right people, place and plan.",
    body: "Practical end-to-end support for your next commercial venture.",
    links: [
      { label: "All services", href: "/services" },
      { label: "Commercial property", href: "/services/national-unit-procurement" },
      { label: "Operational setup", href: "/services/operational-setup" },
      { label: "Digital systems", href: "/services/digital-systems" },
      { label: "Retail & wholesale", href: "/services/retail-wholesale-strategy" },
    ],
  },
  Approach: {
    kicker: "How we work",
    title: "One clear path, start to finish.",
    body: "From the first conversation to the first day of trade, every step stays connected.",
    links: [
      { label: "Our process", href: "/approach" },
      { label: "21 years of experience", href: "/about" },
      { label: "Integrated digital systems", href: "/services/digital-systems" },
    ],
  },
  About: {
    kicker: "Meet your consultant",
    title: "Commercial experience. Connected thinking.",
    body: "A senior-led consultancy pairing property, operations and digital systems.",
    links: [
      { label: "Our story", href: "/about" },
      { label: "What sets us apart", href: "/about" },
      { label: "Get in touch", href: "/contact" },
    ],
  },
};

function Brand({ identity }) {
  const monogram = identity.logoMonogram || "KC";

  return (
    <Link href="/" className="site-brand" aria-label={`${identity.websiteName || "Kashif Consultants"} home`}>
      {identity.logoImageUrl ? (
        <Image
          alt=""
          className="site-brand-image"
          height={40}
          placeholder="blur"
          blurDataURL={imagePlaceholder}
          src={identity.logoImageUrl}
          unoptimized
          width={160}
        />
      ) : (
        <span className="site-brand-mark" aria-hidden="true">
          {monogram}
        </span>
      )}
      <span className="site-brand-copy">
        <span className="site-brand-name">{identity.websiteName || "Kashif Consultants"}</span>
        <span className="site-brand-tagline">
          {identity.tagline || "Business consultants"}
        </span>
      </span>
    </Link>
  );
}

function DesktopMenu({
  activeMenu,
  setActiveMenu,
  identity,
  serviceCount,
  menuItems,
}) {
  const content = menuItems[activeMenu];
  if (!content) return null;

  return (
    <motion.div
      className="desktop-menu-panel"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
    >
      <div className="desktop-menu-content">
        <div className="desktop-menu-intro">
          <span className="menu-eyebrow">{content.kicker}</span>
          <h2>{content.title}</h2>
          <p>{content.body}</p>
          {activeMenu === "Services" && (
            <Link
              className="desktop-menu-all"
              href="/services"
              onClick={() => setActiveMenu(null)}
            >
              Explore all {serviceCount || "our"} services <ArrowRight size={15} />
            </Link>
          )}
        </div>
        <nav className="desktop-menu-links" aria-label={`${activeMenu} links`}>
          {content.links.map((item) => (
            <Link
              href={item.href}
              className="desktop-menu-link"
              key={`${item.href}:${item.label}`}
              onClick={() => setActiveMenu(null)}
            >
              <span>{item.label}</span>
              <ArrowDownRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </nav>
      </div>
      <div className="desktop-menu-footer">
        <span>{identity.tagline || "From first plan to first sale."}</span>
        <Link
          className="menu-footer-cta"
          href="/contact"
          onClick={() => setActiveMenu(null)}
        >
          Start a conversation <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}

function MobileNavigation({ identity, onClose, menuItems }) {
  const [section, setSection] = useState(null);
  const selectedMenu = section && menuItems[section];
  const reduceMotion = useReducedMotion();

  function goTo(href) {
    onClose();
    window.location.assign(href);
  }

  return (
    <div className="mobile-sheet">
      <div className="mobile-sheet-header">
        <Brand identity={identity} />
        <SheetClose asChild>
          <Button variant="outline" size="icon" aria-label="Close menu">
            <X size={20} />
          </Button>
        </SheetClose>
      </div>
      <SheetTitle className="sr-only">Main navigation</SheetTitle>
      <div className="mobile-sheet-content">
        <AnimatePresence mode="wait" initial={false}>
          {selectedMenu ? (
            <motion.div
              className="mobile-submenu"
              key={section}
              initial={reduceMotion ? false : { x: 32, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { x: -24, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <button
                type="button"
                className="mobile-back-link"
                onClick={() => setSection(null)}
              >
                <ArrowLeft size={16} /> All navigation
              </button>
              <p className="menu-eyebrow">{selectedMenu.kicker}</p>
              <h2>{selectedMenu.title}</h2>
              <p className="mobile-submenu-copy">{selectedMenu.body}</p>
              <nav aria-label={`${section} navigation`} className="mobile-link-list">
                {selectedMenu.links.map((item) => (
                  <button
                    className="mobile-link-button"
                    key={`${item.href}:${item.label}`}
                    onClick={() => goTo(item.href)}
                    type="button"
                  >
                    {item.label}
                    <ArrowRight size={17} />
                  </button>
                ))}
              </nav>
            </motion.div>
          ) : (
            <motion.nav
              className="mobile-root-menu"
              key="root"
              initial={reduceMotion ? false : { x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { x: 24, opacity: 0 }}
              transition={{ duration: 0.22 }}
              aria-label="Main navigation"
            >
              {Object.keys(menuItems).map((label, index) => (
                <button
                  className="mobile-nav-choice"
                  key={label}
                  onClick={() => setSection(label)}
                  type="button"
                >
                  <span className="mobile-nav-number">0{index + 1}</span>
                  <span>{label === "Approach" ? "Our approach" : label}</span>
                  <ArrowRight size={19} />
                </button>
              ))}
              <button
                className="mobile-nav-choice"
                onClick={() => goTo("/contact")}
                type="button"
              >
                <span className="mobile-nav-number">04</span>
                <span>Contact</span>
                <ArrowRight size={19} />
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      <div className="mobile-sheet-footer">
        <p>{identity.tagline || "From first plan to first sale."}</p>
        <Link
          className="button-primary mobile-contact-button"
          href="/contact"
          onClick={onClose}
        >
          Talk through your plans <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}

export function SiteHeader({ settings, services = [] }) {
  const identity = settings.identity || {};
  const contact = settings.contact || {};
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuItems =
    settings.navigation?.length > 0
      ? Object.fromEntries(
          settings.navigation.map((menu) => [
            menu.label,
            {
              kicker: `Explore ${menu.label.toLowerCase()}`,
              title: menu.featureTitle,
              body: menu.featureDescription,
              links: menu.links || [],
            },
          ]),
        )
      : menuContent;

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 32);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}`}
        onMouseLeave={() => setActiveMenu(null)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setActiveMenu(null);
        }}
      >
        <div className="site-header-inner">
          <Brand identity={identity} />
          <nav className="desktop-nav" aria-label="Main navigation">
            {Object.keys(menuItems).map((label) => (
              <button
                aria-expanded={activeMenu === label}
                aria-haspopup="true"
                className={`desktop-nav-trigger${activeMenu === label ? " is-active" : ""}`}
                key={label}
                onClick={() =>
                  setActiveMenu((current) => (current === label ? null : label))
                }
                onMouseEnter={() => setActiveMenu(label)}
                type="button"
              >
                {label === "Approach" ? "Our approach" : label}
                <motion.span
                  animate={{ rotate: activeMenu === label ? 180 : 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <ChevronDown aria-hidden="true" size={14} />
                </motion.span>
              </button>
            ))}
          </nav>
          <div className="desktop-nav-actions">
            <ThemeToggle />
            {contact.phone && (
              <a className="nav-phone" href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
                {contact.phone}
              </a>
            )}
            <Button asChild size="sm">
              <Link href="/contact">
                {settings.homepage?.contactCtaLabel || "Let’s talk"}{" "}
                <ArrowRight size={15} />
              </Link>
            </Button>
          </div>
          <ThemeToggle className="mobile-theme-toggle" />
          <Sheet
            open={mobileOpen}
            onOpenChange={(open) => {
              setMobileOpen(open);
              if (!open) setActiveMenu(null);
            }}
          >
            <SheetTrigger asChild>
              <Button
                className="mobile-menu-trigger"
                variant="outline"
                size="icon"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <MobileNavigation
                identity={identity}
                menuItems={menuItems}
                onClose={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
        <AnimatePresence>
          {activeMenu && (
            <DesktopMenu
              activeMenu={activeMenu}
              identity={identity}
              menuItems={menuItems}
              serviceCount={services.length}
              setActiveMenu={setActiveMenu}
            />
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
