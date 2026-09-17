import type { CSSProperties } from "react";
import Link from "next/link";
import { Arrow, BrandLogo } from "@/tenants/fullstack/components/BrandPrimitives";
import { InfoPageContent } from "@/tenants/fullstack/info-content";

const calendarLink = "/?contact=1";
function renderPoint(point: string) { return point; }

export function InfoPage({ content }: { content: InfoPageContent }) {
  return (
    <main
      className="info-page"
      style={{ "--accent": content.accent } as CSSProperties}
    >
      <header className="info-header">
        <Link className="logo" href="/" aria-label="Morgan Retailers home">
          <BrandLogo />
        </Link>
        <nav aria-label="Information navigation">
          <Link href="/#work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/process">Process</Link>
          <Link href="/pricing">Pricing</Link>
          <a href={calendarLink} target="_blank" rel="noreferrer">
            Request a call <Arrow diagonal />
          </a>
        </nav>
      </header>

      <section className="info-hero">
        <p className="kicker">{content.eyebrow}</p>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
        <div className="info-hero__actions">
          <a href={calendarLink} target="_blank" rel="noreferrer">
            Request a project call <Arrow />
          </a>
          <Link href="/?contact=1">Morgan Retailers support</Link>
        </div>
        <div className="info-stat" aria-label={content.statLabel}>
          <strong>{content.stat}</strong>
          <span>{content.statLabel}</span>
        </div>
      </section>

      <section className="info-story">
        {content.sections.map((section, index) => (
          <article key={section.title} className="info-card">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.points?.length ? (
              <ul>
                {section.points.map((point) => (
                  <li key={point}>{renderPoint(point)}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </section>

      <footer className="info-footer">
        <div>
          <h2>MORGAN RETAILERS</h2>
          <p>TheFullStack Guys is a website operated by Morgan Retailers.<br />GSTIN: 07ANVPC6122B1ZA<br />1st Floor, House No-29, Tiggipur, New Delhi, North Delhi, Delhi, 110036, India.</p>
          <p>
            Written scope, milestone payments, and 3 months of support after launch.
          </p>
        </div>
        <div className="info-footer__links">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/refund-policy">Refunds</Link>
          <Link href="/terms-of-use">Terms</Link>
          <Link href="/admin">Admin panel</Link>
        </div>
      </footer>
    </main>
  );
}
