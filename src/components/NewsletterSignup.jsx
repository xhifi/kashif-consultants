"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterSignup() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  async function submitSignup(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fields.get("email"),
          consent: fields.get("consent") === "on",
          website: fields.get("website"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "We couldn't submit your request. Please try again.");
        setStatus("error");
        return;
      }

      setMessage("Thanks — your signup request has been sent to our team.");
      setStatus("sent");
      form.reset();
    } catch {
      setMessage("We couldn't reach the server. Please try again when you're online.");
      setStatus("error");
    }
  }

  return (
    <div className="newsletter-signup">
      <p className="newsletter-description">
        Occasional practical notes on premises, operations and growing a
        physical business.
      </p>
      <form className="newsletter-form" onSubmit={submitSignup}>
        <label className="sr-only" htmlFor="newsletter-email">
          Email address for newsletter
        </label>
        <input
          autoComplete="email"
          className="newsletter-email"
          id="newsletter-email"
          maxLength={254}
          name="email"
          placeholder="you@company.co.uk"
          required
          type="email"
        />
        <div className="newsletter-trap" aria-hidden="true">
          <label htmlFor="newsletter-website">Leave this blank</label>
          <input
            autoComplete="off"
            id="newsletter-website"
            name="website"
            tabIndex={-1}
            type="text"
          />
        </div>
        <label className="newsletter-consent">
          <input name="consent" required type="checkbox" />
          <span>I agree to receive occasional business updates by email.</span>
        </label>
        <button
          className="newsletter-submit"
          disabled={status === "sending"}
          type="submit"
        >
          {status === "sending" ? "Sending..." : "Subscribe"}
          {status === "sent" ? <Check size={16} /> : <ArrowRight size={16} />}
        </button>
      </form>
      <AnimatePresence mode="wait" initial={false}>
        {message && (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className={`newsletter-status${status === "error" ? " is-error" : ""}`}
            exit={{ opacity: 0, y: -4 }}
            initial={{ opacity: 0, y: 4 }}
            key={message}
            role={status === "error" ? "alert" : "status"}
            transition={{ duration: 0.18 }}
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
      <p className="newsletter-privacy">
        Your request is emailed to our team; this site does not store a
        mailing list.
      </p>
    </div>
  );
}
