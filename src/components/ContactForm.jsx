"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export function ContactForm({
  services = [],
  buttonLabel = "Send enquiry",
}) {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitEnquiry(event) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus("sending");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fields)),
      });
      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || "We couldn't send your enquiry. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setErrorMessage(
        "We couldn't reach the server. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  return (
    <div className="contact-form-wrap">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="contact-success"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: 8 }}
            key="success"
            role="status"
            transition={{ duration: 0.28 }}
          >
            <span className="success-icon">
              <Check size={21} />
            </span>
            <h3>Thank you. We’ll be in touch.</h3>
            <p>Your enquiry has been sent securely to our team.</p>
            <button className="text-link" onClick={() => setStatus("idle")} type="button">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            animate={{ opacity: 1, y: 0 }}
            className="contact-form"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: 8 }}
            key="form"
            onSubmit={submitEnquiry}
            transition={{ duration: 0.28 }}
          >
            <div className="form-grid">
              <div>
                <Label htmlFor="enquiry-name">Your name</Label>
                <Input
                  autoComplete="name"
                  id="enquiry-name"
                  maxLength={120}
                  name="name"
                  placeholder="Jane Smith"
                  required
                />
              </div>
              <div>
                <Label htmlFor="enquiry-email">Email address</Label>
                <Input
                  autoComplete="email"
                  id="enquiry-email"
                  maxLength={254}
                  name="email"
                  placeholder="jane@company.co.uk"
                  required
                  type="email"
                />
              </div>
            </div>
            <div className="form-grid">
              <div>
                <Label htmlFor="enquiry-phone">Phone number <span>(optional)</span></Label>
                <Input
                  autoComplete="tel"
                  id="enquiry-phone"
                  maxLength={40}
                  name="phone"
                  placeholder="+44"
                  type="tel"
                />
              </div>
              <div>
                <Label htmlFor="enquiry-service">What are you planning?</Label>
                <select className="shadcn-input" defaultValue="" id="enquiry-service" name="service">
                  <option value="">Select an area</option>
                  {services.map((service) => (
                    <option key={service.slug} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </div>
            <div>
              <Label htmlFor="enquiry-message">A little about your plans</Label>
              <Textarea
                id="enquiry-message"
                maxLength={3000}
                name="message"
                placeholder="Tell us where you are in the process and what you have in mind."
                required
                rows={4}
              />
            </div>
            <div className="form-trap" aria-hidden="true">
              <label htmlFor="enquiry-website">Leave this field blank</label>
              <input
                autoComplete="off"
                id="enquiry-website"
                name="website"
                tabIndex={-1}
                type="text"
              />
            </div>
            {status === "error" && (
              <p className="form-error" role="alert">
                {errorMessage}
              </p>
            )}
            <Button
              className="contact-submit"
              disabled={status === "sending"}
              size="lg"
              type="submit"
            >
              {status === "sending" ? "Sending..." : buttonLabel}
              {status !== "sending" && <ArrowRight size={17} />}
            </Button>
            <p className="form-privacy">
              Your details are used only to respond to this enquiry.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
