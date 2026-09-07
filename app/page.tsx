"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Plus,
  Minus,
  Menu,
  X,
  Play,
  Pause,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { BrandLogo } from "@/app/components/BrandPrimitives";
import { LeadChat } from "@/app/components/LeadChat";
import { SplashScreen } from "@/app/components/SplashScreen";
import { DiscountPopup } from "@/app/components/DiscountPopup";
import { VisitorTracker } from "@/app/components/VisitorTracker";
import { type Project } from "@/app/lib/projects";
import {
  heroProjects as gallery,
  reelProjects,
  serviceProjects,
  workProjects,
  showcaseProjects,
} from "@/app/lib/project-showcase";
import { services, stages, faqs } from "@/app/lib/studio-content";
import { useStudioMotion } from "@/app/lib/use-studio-motion";

const calendarLink = "https://calendar.app.google/adHW8rdFF8fZwitT6";
const filters = ["All", "Brand Web", "Software", "Commerce"] as const;
const CHAT_AUTO_OPEN_KEY = "open-limits-chat-auto-opened";
const serviceLabels = [
  "WEB",
  "SOFTWARE",
  "MOBILE",
  "AI & AUTOMATION",
  "COMMERCE",
  "DESIGN",
];
const platformSections = [
  {
    name: "Shopify",
    eyebrow: "SHOPIFY COMMERCE",
    title: "Stores that feel built, not themed.",
    text: "For product brands that need a sharper storefront, cleaner collections, better product pages, apps that behave, checkout tracking, and a site that is ready for paid traffic.",
    points: [
      "Custom storefront design",
      "Theme development",
      "Conversion tracking",
      "Subscriptions & apps",
    ],
    projects: [gallery[2], gallery[3], gallery[5]],
  },
  {
    name: "WordPress",
    eyebrow: "WORDPRESS WEBSITES",
    title: "Content-led sites with room to grow.",
    text: "For service businesses, publishers, creators, and local brands that need editable pages, strong SEO foundations, fast landing pages, and a site your team can keep fresh.",
    points: [
      "Editable CMS pages",
      "Service landing pages",
      "Blog & resource hubs",
      "Performance cleanup",
    ],
    projects: [gallery[0], gallery[4], gallery[6]],
  },
];
type ChatAutoWindow = Window & {
  __openLimitsChatAutoOpen?: string;
};

function getChatAutoOpenState() {
  if (typeof window === "undefined") return null;
  const browserWindow = window as ChatAutoWindow;
  try {
    return (
      browserWindow.sessionStorage?.getItem(CHAT_AUTO_OPEN_KEY) ||
      browserWindow.__openLimitsChatAutoOpen ||
      null
    );
  } catch {
    return browserWindow.__openLimitsChatAutoOpen || null;
  }
}

function setChatAutoOpenState(value: string) {
  if (typeof window === "undefined") return;
  const browserWindow = window as ChatAutoWindow;
  browserWindow.__openLimitsChatAutoOpen = value;
  try {
    browserWindow.sessionStorage?.setItem(CHAT_AUTO_OPEN_KEY, value);
  } catch {
    // Some embedded browser contexts disable sessionStorage.
  }
}

function subscribeMotion(callback: () => void) {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
function readMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function serverMotion() {
  return false;
}

function tabKeys(
  event: KeyboardEvent<HTMLDivElement>,
  index: number,
  count: number,
  select: (value: number) => void,
) {
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? count - 1
        : ["ArrowRight", "ArrowDown"].includes(event.key)
          ? (index + 1) % count
          : ["ArrowLeft", "ArrowUp"].includes(event.key)
            ? (index - 1 + count) % count
            : null;
  if (next === null) return;
  event.preventDefault();
  select(next);
  event.currentTarget
    .querySelectorAll<HTMLButtonElement>('[role="tab"]')
    [next]?.focus();
}

function ServiceDial({
  active,
  onChange,
}: {
  active: number;
  onChange: (index: number) => void;
}) {
  return (
    <div
      className="expertise-dial"
      role="tablist"
      aria-label="Choose a service"
      onKeyDown={(event) => tabKeys(event, active, services.length, onChange)}
    >
      <div
        className="dial-ring"
        aria-hidden="true"
        style={{ rotate: active * 60 + "deg" }}
      >
        {Array.from({ length: 48 }, (_, index) => (
          <i key={index} style={{ rotate: index * 7.5 + "deg" }} />
        ))}
      </div>
      <div className="dial-center" aria-hidden="true">
        <span>0{active + 1}</span>
        <small>OUR EXPERTISE</small>
        <ArrowUpRight size={23} />
      </div>
      {services.map((service, index) => (
        <button
          key={service.kind}
          role="tab"
          id={"service-tab-" + index}
          aria-label={service.name}
          aria-selected={index === active}
          aria-controls="service-panel"
          tabIndex={index === active ? 0 : -1}
          className={index === active ? "dial-option is-active" : "dial-option"}
          style={
            {
              "--angle": index * 60 + "deg",
              left: 50 + Math.sin((index * Math.PI) / 3) * 38 + "%",
              top: 50 - Math.cos((index * Math.PI) / 3) * 38 + "%",
            } as CSSProperties
          }
          onClick={() => onChange(index)}
        >
          <span>{serviceLabels[index]}</span>
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(2);
  const [service, setService] = useState(0);
  const [stage, setStage] = useState(0);
  const [filter, setFilter] = useState<"All" | Project["category"]>("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const [motion, setMotion] = useState(true);
  const [galleryFocused, setGalleryFocused] = useState(false);
  const [reelOpen, setReelOpen] = useState(false);
  const [reelIndex, setReelIndex] = useState(0);
  const [reelPlaying, setReelPlaying] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    readMotion,
    serverMotion,
  );
  const moving = motion && !reducedMotion;
  const rootRef = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);
  const reelButtonRef = useRef<HTMLButtonElement>(null);
  useStudioMotion(
    rootRef,
    moving && !menuOpen && !reelOpen && !chatOpen && !offerOpen,
  );
  const filtered =
    filter === "All"
      ? workProjects
      : workProjects.filter((project) => project.category === filter);
  const currentService = services[service];
  const openChat = () => {
    setChatAutoOpenState("manual");
    setMenuOpen(false);
    setChatOpen(true);
  };
  const handleChatOpenChange = (nextOpen: boolean) => {
    setChatAutoOpenState(nextOpen ? "manual" : "dismissed");
    setChatOpen(nextOpen);
  };

  useEffect(() => {
    if (getChatAutoOpenState()) return;
    const timer = window.setTimeout(() => {
      if (getChatAutoOpenState()) return;
      setChatAutoOpenState("auto");
      setChatOpen(true);
    }, 5600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!moving || galleryFocused || reelOpen) return;
    const interval = window.setInterval(
      () => setActiveSlide((index) => (index + 1) % gallery.length),
      4200,
    );
    return () => window.clearInterval(interval);
  }, [moving, galleryFocused, reelOpen, activeSlide]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.setProperty(
              "--reveal-delay",
              Math.min(index * 70, 210) + "ms",
            );
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    root
      .querySelectorAll(".reveal")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleCount, filter]);

  useEffect(() => {
    if (!reelOpen || !reelPlaying || !moving) return;
    const timer = window.setInterval(
      () => setReelIndex((index) => (index + 1) % reelProjects.length),
      3200,
    );
    return () => window.clearInterval(timer);
  }, [reelOpen, reelPlaying, moving]);

  useEffect(() => {
    if (!reelOpen && !menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setReelOpen(false);
        reelRef.current?.close();
      }
    };
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", close);
    };
  }, [reelOpen, menuOpen]);

  function openReel() {
    setReelOpen(true);
    setReelIndex(0);
    setReelPlaying(true);
    reelRef.current?.showModal();
  }
  function closeReel() {
    setReelOpen(false);
    reelRef.current?.close();
    reelButtonRef.current?.focus();
  }

  return (
    <main
      ref={rootRef}
      className={
        "studio-site creative-site" + (!moving ? " motion-paused" : "")
      }
    >
      <SplashScreen />
      <header className="floating-header">
        <Link className="floating-brand" href="/" aria-label="Open Limits home">
          <BrandLogo />
        </Link>
        <nav className="floating-nav" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#platforms">Platforms</a>
          <a href="#work">Projects</a>
          <a href="#faqs">FAQs</a>
        </nav>
        <button
          className="floating-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={17} /> : <Menu size={17} />}
          <span>Menu</span>
        </button>
        <button className="accent-button nav-contact" onClick={openChat}>
          Let&apos;s talk <ArrowUpRight size={16} />
        </button>
      </header>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
        >
          <p className="micro-label">OPEN LIMITS</p>
          {[
            ["About", "#about"],
            ["Services", "#services"],
            ["Platforms", "#platforms"],
            ["Projects", "#work"],
            ["FAQs", "#faqs"],
          ].map(([name, href], index) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              <small>0{index + 1}</small>
              {name}
              <ArrowUpRight />
            </a>
          ))}
          <a className="mobile-email" href="mailto:admin@theopenlimits.com">
            admin@theopenlimits.com
          </a>
        </nav>
      )}

      <section className="creative-hero" id="top">
        <div className="hero-guides" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="creative-hero-title">
          <p className="micro-label">OPEN LIMITS / DESIGN & TECHNOLOGY</p>
          <h1>
            <span className="hero-title-line">
              <span>Websites, Shopify</span>
            </span>
            <span className="hero-title-line">
              <span>apps & software.</span>
            </span>
          </h1>
          <p>
            Shopify, WordPress, Next.js, apps, and custom systems.
            <br />
            Digital experiences that move your business forward.
          </p>
        </div>
        <div
          className="hero-gallery"
          aria-label="Featured digital experiences"
          aria-roledescription="carousel"
          onMouseEnter={() => setGalleryFocused(true)}
          onMouseLeave={() => setGalleryFocused(false)}
          onFocusCapture={() => setGalleryFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node))
              setGalleryFocused(false);
          }}
          onPointerDown={(event) => {
            if (event.button !== 0) return;
            swipeStart.current = { x: event.clientX, y: event.clientY };
            dragged.current = false;
          }}
          onPointerMove={(event) => {
            const start = swipeStart.current;
            if (!start) return;
            const delta = event.clientX - start.x;
            if (
              !dragged.current &&
              Math.abs(event.clientY - start.y) > Math.abs(delta) + 8
            ) {
              swipeStart.current = null;
              return;
            }
            if (Math.abs(delta) > 6) {
              dragged.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
              event.currentTarget.classList.add("is-dragging");
              event.currentTarget.style.setProperty(
                "--drag-x",
                delta * 0.65 + "px",
              );
            }
          }}
          onPointerUp={(event) => {
            if (
              swipeStart.current !== null &&
              Math.abs(event.clientX - swipeStart.current.x) > 35
            ) {
              dragged.current = true;
              const direction = event.clientX < swipeStart.current.x ? 1 : -1;
              setActiveSlide(
                (index) =>
                  (index + direction + gallery.length) % gallery.length,
              );
            }
            event.currentTarget.classList.remove("is-dragging");
            event.currentTarget.style.setProperty("--drag-x", "0px");
            if (event.currentTarget.hasPointerCapture(event.pointerId))
              event.currentTarget.releasePointerCapture(event.pointerId);
            swipeStart.current = null;
          }}
          onPointerCancel={(event) => {
            swipeStart.current = null;
            event.currentTarget.classList.remove("is-dragging");
            event.currentTarget.style.setProperty("--drag-x", "0px");
          }}
          onKeyDown={(event) => {
            if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
            event.preventDefault();
            setActiveSlide(
              (index) =>
                (index +
                  (event.key === "ArrowRight" ? 1 : -1) +
                  gallery.length) %
                gallery.length,
            );
          }}
        >
          {gallery.map((item, index) => {
            let position =
              (index - activeSlide + gallery.length) % gallery.length;
            if (position > Math.floor(gallery.length / 2))
              position -= gallery.length;
            return (
              <a
                key={item.title}
                data-distance={Math.abs(position)}
                data-tilt
                className={
                  "gallery-slide" + (position === 0 ? " is-current" : "")
                }
                href={item.url}
                target={item.url?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                tabIndex={position === 0 ? 0 : -1}
                aria-hidden={Math.abs(position) > 2}
                aria-label={item.title + ", " + item.category}
                style={
                  {
                    "--position": position,
                    "--distance": Math.abs(position),
                    "--slide-color": item.color,
                    zIndex: 5 - Math.abs(position),
                  } as CSSProperties
                }
                onClick={(event) => {
                  if (dragged.current) {
                    event.preventDefault();
                    return;
                  }
                  if (position !== 0) {
                    event.preventDefault();
                    setActiveSlide(index);
                  }
                }}
                draggable={false}
              >
                <Image
                  src={item.image}
                  alt={item.title + " digital experience"}
                  width={900}
                  height={600}
                  priority={Math.abs(position) < 2}
                  loading="eager"
                  unoptimized={item.image.startsWith("http")}
                  draggable={false}
                />
                <span className="gallery-slide-title">
                  {item.title}
                  <ArrowUpRight size={17} />
                </span>
              </a>
            );
          })}
        </div>
        <div className="gallery-controls">
          <button
            className="icon-control"
            aria-label="Previous featured project"
            title="Previous project"
            onClick={() =>
              setActiveSlide(
                (index) => (index - 1 + gallery.length) % gallery.length,
              )
            }
          >
            <ArrowLeft size={17} />
          </button>
          <span>
            <b>{String(activeSlide + 1).padStart(2, "0")}</b> /{" "}
            {String(gallery.length).padStart(2, "0")}
          </span>
          <button
            className="icon-control"
            aria-label="Next featured project"
            title="Next project"
            onClick={() =>
              setActiveSlide((index) => (index + 1) % gallery.length)
            }
          >
            <ArrowRight size={17} />
          </button>
          <button
            className="icon-control gallery-pause"
            aria-label={moving ? "Pause animations" : "Resume animations"}
            title={moving ? "Pause animations" : "Resume animations"}
            onClick={() => setMotion(!motion)}
          >
            {moving ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
        <a
          className="hero-scroll"
          href="#about"
          aria-label="Discover Open Limits"
        >
          <ArrowDown size={17} />
        </a>
      </section>

      <section className="clientele-section">
        <div className="center-heading reveal">
          <p className="micro-label">ACROSS INDUSTRIES</p>
          <h2>
            Different businesses.
            <br />
            Extraordinary possibilities.
          </h2>
        </div>
        {[
          [
            "Beauty",
            "Wellness",
            "Shopify",
            "Food & beverage",
            "Fashion",
            "Healthcare",
            "Lifestyle",
          ],
          [
            "Fitness",
            "WordPress",
            "Home & living",
            "Pet care",
            "Hospitality",
            "Technology",
            "Retail",
          ],
        ].map((row, rowIndex) => (
          <div className={"clientele-track track-" + rowIndex} key={rowIndex}>
            <div className="clientele-marquee">
              {[...row, ...row].map((industry, index) => (
                <span
                  key={index}
                  className={"clientele-name clientele-name-" + (index % 4)}
                  aria-hidden={index >= row.length}
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="creative-about" id="about">
        <div className="about-outline" aria-hidden="true" />
        <div className="about-copy reveal">
          <p className="micro-label">A LITTLE ABOUT US</p>
          <h2>
            We bring a designer&apos;s eye and an engineer&apos;s mind to every
            build. Websites, software, mobile apps, and AI.{" "}
            <span>
              One connected team, from your first idea to what comes next.
            </span>
          </h2>
        </div>
        <button
          className="studio-reel reveal"
          onClick={openReel}
          ref={reelButtonRef}
          aria-label="Play Open Limits studio reel"
        >
          <div className="reel-contact-sheet" aria-hidden="true">
            {reelProjects.slice(0, 4).map((item) => (
              <Image
                key={item.title}
                src={item.image}
                alt=""
                width={500}
                height={330}
                unoptimized={item.image.startsWith("http")}
              />
            ))}
          </div>
          <span className="reel-play">
            <Play size={16} fill="currentColor" /> PLAY STUDIO REEL
          </span>
          <small>IDEAS INTO EXPERIENCES / OPEN LIMITS</small>
        </button>
      </section>

      <section className="creative-services" id="services">
        <div className="center-heading reveal">
          <p className="micro-label">OUR EXPERTISE</p>
          <h2>
            Your next big thing.
            <br />
            Our kind of challenge.
          </h2>
        </div>
        <div className="expertise-workbench content-width reveal">
          <ServiceDial active={service} onChange={setService} />
          <div
            className="expertise-content"
            id="service-panel"
            role="tabpanel"
            aria-labelledby={"service-tab-" + service}
          >
            <div className="expertise-heading">
              <span className="service-number">0{service + 1}</span>
              <div className="expertise-tags">
                {currentService.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="expertise-description" key={currentService.name}>
              <h3>{currentService.name}</h3>
              <p>{currentService.description}</p>
            </div>
            <div className="service-filmstrip" key={currentService.kind}>
              {serviceProjects[service].map((project) => (
                <a
                  key={project.title}
                  className="service-film-frame"
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src={project.image}
                    alt={project.title + " website"}
                    width={440}
                    height={300}
                    unoptimized
                  />
                  <span>
                    {project.title} / Website <ArrowUpRight size={12} />
                  </span>
                </a>
              ))}
            </div>
            <div className="expertise-bottom">
              <button className="line-button" onClick={openChat}>
                Explore your project <ArrowUpRight size={16} />
              </button>
              <div className="service-arrows">
                <button
                  className="icon-control"
                  aria-label="Previous service"
                  title="Previous service"
                  onClick={() =>
                    setService(
                      (index) =>
                        (index - 1 + services.length) % services.length,
                    )
                  }
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  className="icon-control"
                  aria-label="Next service"
                  title="Next service"
                  onClick={() =>
                    setService((index) => (index + 1) % services.length)
                  }
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="service-closing reveal">
          <p>
            Big ambitions deserve
            <br />
            more than a template.
          </p>
          <span>
            We connect strategy, design, and development
            <br />
            to build what your business actually needs.
          </span>
          <button className="accent-button" onClick={openChat}>
            Talk to the team <ArrowUpRight size={16} />
          </button>
        </div>
      </section>

      <section className="platform-section" id="platforms">
        <div className="content-width">
          <div className="platform-heading reveal">
            <p className="micro-label">PLATFORM SPECIALISTS</p>
            <h2>
              Shopify for selling.
              <br />
              WordPress for publishing.
            </h2>
            <p>
              We choose the platform around the job. Some businesses need a
              high-performing store, others need an editable marketing engine,
              and the larger ones need both connected cleanly.
            </p>
          </div>
          <div className="platform-grid">
            {platformSections.map((platform, index) => (
              <article
                className="platform-card reveal"
                key={platform.name}
                style={{ "--platform-index": index } as CSSProperties}
              >
                <div className="platform-copy">
                  <span className="micro-label">{platform.eyebrow}</span>
                  <h3>{platform.title}</h3>
                  <p>{platform.text}</p>
                  <ul>
                    {platform.points.map((point) => (
                      <li key={point}>
                        <Check size={14} />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <button className="line-button" onClick={openChat}>
                    Discuss {platform.name} <ArrowUpRight size={15} />
                  </button>
                </div>
                <div
                  className="platform-stack"
                  aria-label={platform.name + " project examples"}
                >
                  {platform.projects.map((project, projectIndex) => (
                    <a
                      key={project.title}
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="platform-shot"
                      style={
                        {
                          "--shot": projectIndex,
                          "--project-color": project.color,
                        } as CSSProperties
                      }
                    >
                      <Image
                        src={project.image}
                        alt={project.title + " project preview"}
                        width={560}
                        height={350}
                        unoptimized
                        loading="lazy"
                      />
                      <span>
                        {project.title}
                        <ArrowUpRight size={12} />
                      </span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="creative-work" id="work">
        <div className="content-width">
          <div className="work-heading reveal">
            <div>
              <p className="micro-label">FEATURED PROJECTS</p>
              <h2>
                Made to stand out.
                <br />
                Built to work.
              </h2>
            </div>
            <p>
              A selection of brands and digital
              <br />
              experiences from our portfolio.
            </p>
          </div>
          <div
            className="creative-filters"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map((item) => (
              <button
                key={item}
                aria-pressed={item === filter}
                className={item === filter ? "is-active" : ""}
                onClick={() => {
                  setFilter(item);
                  setVisibleCount(4);
                }}
              >
                {item === "All"
                  ? "All projects"
                  : item === "Brand Web"
                    ? "Websites"
                    : item}
                <sup>
                  {item === "All"
                    ? workProjects.length
                    : workProjects.filter(
                        (project) => project.category === item,
                      ).length}
                </sup>
              </button>
            ))}
          </div>
          <div className="creative-project-grid">
            {filtered.slice(0, visibleCount).map((project, index) => (
              <article className="creative-project reveal" key={project.title}>
                <a
                  data-tilt
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="creative-project-image"
                  style={{ "--project-color": project.color } as CSSProperties}
                  aria-label={"Visit " + project.title + " website"}
                >
                  <Image
                    src={project.image}
                    alt={project.title + " website design"}
                    width={1400}
                    height={788}
                    unoptimized
                    loading="lazy"
                  />
                  <span className="project-hover">
                    <ArrowUpRight size={24} />
                  </span>
                  <small>
                    OPEN LIMITS / {String(index + 1).padStart(2, "0")}
                  </small>
                </a>
                <div className="project-category">
                  <span>
                    {project.category === "Brand Web"
                      ? "WEBSITE"
                      : project.category.toUpperCase()}
                  </span>
                  <span>{project.metric.toUpperCase()}</span>
                </div>
                <h3>
                  <a href={project.url} target="_blank" rel="noreferrer">
                    {project.title}
                    <ArrowUpRight size={19} />
                  </a>
                </h3>
                <p>{project.blurb}</p>
              </article>
            ))}
          </div>
          <div className="work-end">
            <h3>There&apos;s more where that came from.</h3>
            <p>
              {showcaseProjects.length} real projects across the studio.
              Discover {workProjects.length} more here.
            </p>
            {visibleCount < filtered.length ? (
              <button
                className="line-button"
                onClick={() => setVisibleCount((count) => count + 4)}
              >
                View more projects <Plus size={16} />
              </button>
            ) : (
              <button className="line-button" onClick={openChat}>
                Let&apos;s make yours next <ArrowUpRight size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="creative-process content-width" id="process">
        <div className="center-heading reveal">
          <p className="micro-label">FROM IDEA TO IMPACT</p>
          <h2>
            Clear thinking.
            <br />
            Exceptional execution.
          </h2>
          <p>
            Know what&apos;s happening, what&apos;s next,
            <br />
            and who&apos;s making it happen.
          </p>
        </div>
        <div className="process-orbit" aria-hidden="true">
          <span>O</span>
          <span>L</span>
        </div>
        <div
          className="creative-process-list"
          role="tablist"
          aria-label="Project process"
          onKeyDown={(event) => tabKeys(event, stage, stages.length, setStage)}
        >
          {stages.map((item, index) => (
            <button
              key={item.name}
              role="tab"
              id={"stage-tab-" + index}
              aria-selected={stage === index}
              aria-controls="stage-detail"
              tabIndex={stage === index ? 0 : -1}
              className={stage === index ? "is-active" : ""}
              onClick={() => setStage(index)}
            >
              <span>0{index + 1}</span>
              <strong>{item.name}</strong>
              <p>{item.title}</p>
              {stage === index ? <Minus size={19} /> : <Plus size={19} />}
            </button>
          ))}
        </div>
        <div
          className="stage-detail"
          key={stage}
          id="stage-detail"
          role="tabpanel"
          aria-labelledby={"stage-tab-" + stage}
        >
          <p>{stages[stage].text}</p>
          <ul>
            {stages[stage].deliverables.map((item) => (
              <li key={item}>
                <Check size={15} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="partnership-section content-width reveal">
        <div className="partnership-lines" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} style={{ "--line": i } as CSSProperties} />
          ))}
        </div>
        <div className="partnership-copy">
          <p className="micro-label">BUILT AROUND YOU</p>
          <h2>
            Your team,
            <br />
            beyond your team.
          </h2>
          <p>
            A direct line to the people doing the work.
            <br />A shared ambition for the finished product.
          </p>
          <a
            href={calendarLink}
            target="_blank"
            rel="noreferrer"
            className="white-button"
          >
            Meet your technology partner <ArrowUpRight size={17} />
          </a>
        </div>
        <div className="partnership-marker" aria-hidden="true">
          <Image src="/open-limits-logo.png" alt="" width={400} height={200} />
        </div>
      </section>

      <section className="creative-faq" id="faqs">
        <div className="faq-content content-width">
          <div className="faq-sign reveal">
            <HelpCircle size={29} />
            <h2>
              Good
              <br />
              questions.
            </h2>
            <p>
              A little clarity before
              <br />
              your next big move.
            </p>
            <button className="white-button" onClick={openChat}>
              Ask us anything <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="creative-faq-list reveal">
            {faqs.map(([question, answer], index) => (
              <details
                key={question}
                name="studio-faq"
                open={index === 0 ? true : undefined}
              >
                <summary>
                  {question}
                  <ChevronDown className="faq-down" size={19} />
                  <ChevronUp className="faq-up" size={19} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="creative-contact content-width reveal">
        <p className="micro-label">WHAT&apos;S NEXT?</p>
        <h2>
          Something great
          <br />
          starts with a conversation.
        </h2>
        <p>
          Tell us what you have in mind.
          <br />
          Our experts will help shape the plan and a personalized quote.
        </p>
        <div className="contact-links">
          <button className="accent-button" onClick={openChat}>
            Start a project <ArrowUpRight size={18} />
          </button>
          <a
            className="line-button"
            href={calendarLink}
            target="_blank"
            rel="noreferrer"
          >
            Book a discovery call <ArrowUpRight size={16} />
          </a>
        </div>
        <button
          className="project-offer-link"
          onClick={() => setOfferOpen(true)}
        >
          View our new-project offer <ArrowUpRight size={14} />
        </button>
      </section>

      <footer className="creative-footer">
        <div className="content-width">
          <div className="footer-navigation">
            <nav aria-label="Footer navigation">
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#platforms">Platforms</a>
              <a href="#work">Projects</a>
              <a href="#faqs">FAQs</a>
            </nav>
            <nav aria-label="Contact links">
              <a
                href="https://www.fiverr.com/s/m5qDeDN"
                target="_blank"
                rel="noreferrer"
              >
                Fiverr <ArrowUpRight size={13} />
              </a>
              <a
                href="https://www.upwork.com/freelancers/~016de1057b0e843c6b?mp_source=share"
                target="_blank"
                rel="noreferrer"
              >
                Upwork <ArrowUpRight size={13} />
              </a>
              <a href="mailto:admin@theopenlimits.com">
                Email us <ArrowUpRight size={13} />
              </a>
            </nav>
          </div>
          <div className="oversized-wordmark" aria-label="Open Limits">
            <span>OPEN</span>
            <span>
              LIMITS<span className="wordmark-period">.</span>
            </span>
          </div>
          <div className="footer-company">
            <Link href="/" aria-label="Open Limits home">
              <BrandLogo />
            </Link>
            <p>
              15720 Ventura Blvd #233
              <br />
              Encino, CA 91436
            </p>
            <a href="mailto:admin@theopenlimits.com">
              admin@theopenlimits.com <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="footer-legal">
            <div>
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms-of-use">Terms of use</Link>
              <Link href="/refund-policy">Refund policy</Link>
              <Link href="/support">Support</Link>
              <Link href="/admin">Admin</Link>
            </div>
            <span>© {new Date().getFullYear()} Open Limits</span>
            <button
              className="motion-control"
              onClick={() => setMotion(!motion)}
            >
              {moving ? <Pause size={13} /> : <Play size={13} />}
              {moving ? "Pause motion" : "Resume motion"}
            </button>
          </div>
        </div>
      </footer>

      <dialog
        className="reel-dialog"
        ref={reelRef}
        aria-label="Open Limits studio reel"
        onCancel={closeReel}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeReel();
        }}
      >
        <div className="reel-dialog-inner">
          <button
            className="reel-close icon-control"
            aria-label="Close studio reel"
            title="Close reel"
            onClick={closeReel}
          >
            <X size={23} />
          </button>
          {reelOpen && (
            <>
              <div className="reel-progress" aria-hidden="true">
                {reelProjects.map((item, index) => (
                  <i
                    key={item.title}
                    className={index === reelIndex ? "is-active" : ""}
                  />
                ))}
              </div>
              <Image
                key={reelProjects[reelIndex].title}
                className="reel-image"
                src={reelProjects[reelIndex].image}
                alt={reelProjects[reelIndex].title}
                width={1400}
                height={900}
                unoptimized={reelProjects[reelIndex].image.startsWith("http")}
              />
              <div className="reel-caption">
                <div>
                  <strong>{reelProjects[reelIndex].title}</strong>
                  <span>{reelProjects[reelIndex].category}</span>
                </div>
                <div>
                  <button
                    className="icon-control"
                    aria-label="Previous reel project"
                    onClick={() =>
                      setReelIndex(
                        (index) =>
                          (index - 1 + reelProjects.length) %
                          reelProjects.length,
                      )
                    }
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    className="icon-control"
                    aria-label={reelPlaying ? "Pause reel" : "Play reel"}
                    onClick={() => setReelPlaying(!reelPlaying)}
                  >
                    {reelPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button
                    className="icon-control"
                    aria-label="Next reel project"
                    onClick={() =>
                      setReelIndex((index) => (index + 1) % reelProjects.length)
                    }
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </dialog>
      <DiscountPopup open={offerOpen} onOpenChange={setOfferOpen} />
      <VisitorTracker />
      <LeadChat open={chatOpen} onOpenChange={handleChatOpenChange} />
    </main>
  );
}
