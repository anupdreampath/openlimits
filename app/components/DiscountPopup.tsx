"use client";

import { FormEvent, useEffect, useState } from "react";
import { CALENDAR_LINK, DISCOUNT_CODE, WHATSAPP_NUMBER } from "@/app/lib/open-limits-brain";

type DiscountResponse = {
  code?: string;
  error?: string;
};

export function DiscountPopup() {
  const [open, setOpen] = useState(false);
  const [claimedCode, setClaimedCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("open-limits-discount-seen")) return;
    const timer = window.setTimeout(() => setOpen(true), 1300);
    return () => window.clearTimeout(timer);
  }, []);

  function closePopup() {
    sessionStorage.setItem("open-limits-discount-seen", "true");
    setOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/discount-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          niche: form.get("niche"),
          page: window.location.pathname,
        }),
      });
      const data = (await response.json()) as DiscountResponse;
      if (!response.ok) {
        setError(data.error || "Add email and phone to unlock the code.");
        return;
      }
      sessionStorage.setItem("open-limits-discount-seen", "true");
      setClaimedCode(data.code || DISCOUNT_CODE);
    } catch {
      setError("Connection dipped. Try once more or WhatsApp us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="discount-pop" role="dialog" aria-modal="true" aria-label="30% off new store design">
      <button className="discount-pop__scrim" onClick={closePopup} aria-label="Close discount popup" />
      <div className="discount-pop__card">
        <button className="discount-pop__close" onClick={closePopup} aria-label="Close discount popup">
          ×
        </button>
        <div className="discount-pop__burst" aria-hidden="true">
          <span>30%</span>
          <b>OFF</b>
        </div>
        <div className="discount-pop__content">
          <p className="discount-pop__kicker">New store design projects</p>
          <h2>Get 30% off now.</h2>
          <p>
            Drop your details and unlock the code for a premium Shopify design sprint.
          </p>

          {claimedCode ? (
            <div className="discount-pop__success">
              <span>Your code</span>
              <strong>{claimedCode}</strong>
              <a href={CALENDAR_LINK} target="_blank" rel="noreferrer">
                Book your call →
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                Fast-track WhatsApp →
              </a>
            </div>
          ) : (
            <form className="discount-pop__form" onSubmit={handleSubmit}>
              <input name="name" placeholder="Name" autoComplete="name" />
              <input name="email" type="email" placeholder="Email" autoComplete="email" required />
              <input name="phone" type="tel" placeholder="Phone / WhatsApp" autoComplete="tel" required />
              <input name="niche" placeholder="Niche, e.g. skincare" autoComplete="organization-title" />
              {error ? <div className="discount-pop__error">{error}</div> : null}
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Unlocking..." : "Unlock my 30% code"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
