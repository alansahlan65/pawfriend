"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Heart,
  Menu,
  PawPrint,
  Share2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  adoptionFaqs,
  journey,
  navigation,
  personality,
  preparationSteps,
  residents,
  siteCopy,
} from "@/content/site-content";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

type SaveNotice = {
  action: "saved" | "removed";
  petId: string;
  sequence: number;
};

function scrollBehaviorForClick(detail: number): ScrollBehavior {
  return detail === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

function MagneticLink({ href, children, className = "" }: MagneticLinkProps) {
  const move = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (
      !window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches
    ) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--magnet-x",
      `${(event.clientX - box.left - box.width / 2) * 0.12}px`,
    );
    event.currentTarget.style.setProperty(
      "--magnet-y",
      `${(event.clientY - box.top - box.height / 2) * 0.12}px`,
    );
  };

  const reset = (event: React.PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.removeProperty("--magnet-x");
    event.currentTarget.style.removeProperty("--magnet-y");
  };

  return (
    <a
      className={`button-link ${className}`}
      href={href}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} />
    </a>
  );
}

function Rating({ label, score }: { label: string; score: number }) {
  return (
    <div className="rating-row">
      <span>{label}</span>
      <span className="paw-rating" aria-label={`${score} out of 5`}>
        {[1, 2, 3, 4, 5].map((paw) => (
          <PawPrint
            aria-hidden="true"
            className={paw <= score ? "is-filled" : ""}
            key={paw}
            size={22}
            strokeWidth={1.8}
          />
        ))}
      </span>
    </div>
  );
}

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);
  const residentScroller = useRef<HTMLDivElement>(null);
  const catalogTrigger = useRef<HTMLButtonElement>(null);
  const catalogHeading = useRef<HTMLHeadingElement>(null);
  const shouldRestoreCatalogFocus = useRef(false);
  const catalogScrollBehavior = useRef<ScrollBehavior>("auto");
  const scrollTriggerRefresh = useRef<(() => void) | null>(null);
  const shortlistPanel = useRef<HTMLElement>(null);
  const shortlistCloseButton = useRef<HTMLButtonElement>(null);
  const shortlistReturnFocus = useRef<HTMLElement | null>(null);
  const shortlistExitTimer = useRef<number | null>(null);
  const shortlistOpenFrame = useRef<number | null>(null);
  const shortlistMountedRef = useRef(false);
  const shortlistOpenRef = useRef(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuInstant, setMenuInstant] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [shortlistMounted, setShortlistMounted] = useState(false);
  const [shortlistOpen, setShortlistOpen] = useState(false);
  const [shortlistInstant, setShortlistInstant] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [catalogInstant, setCatalogInstant] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [saveNotice, setSaveNotice] = useState<SaveNotice | null>(null);

  const favoritePets = useMemo(
    () => residents.filter((pet) => favorites.includes(pet.id)),
    [favorites],
  );
  const noticePet = saveNotice
    ? residents.find((pet) => pet.id === saveNotice.petId)
    : undefined;

  const clearShortlistMotion = useCallback(() => {
    if (shortlistExitTimer.current !== null) {
      window.clearTimeout(shortlistExitTimer.current);
      shortlistExitTimer.current = null;
    }
    if (shortlistOpenFrame.current !== null) {
      window.cancelAnimationFrame(shortlistOpenFrame.current);
      shortlistOpenFrame.current = null;
    }
  }, []);

  const closeShortlist = useCallback((instant: boolean) => {
    if (!shortlistMountedRef.current) return;
    clearShortlistMotion();
    shortlistOpenRef.current = false;
    setShortlistInstant(instant);
    setShortlistOpen(false);

    if (instant) {
      shortlistMountedRef.current = false;
      setShortlistMounted(false);
      return;
    }

    shortlistExitTimer.current = window.setTimeout(() => {
      shortlistMountedRef.current = false;
      setShortlistMounted(false);
      shortlistExitTimer.current = null;
    }, 200);
  }, [clearShortlistMotion]);

  const openShortlist = useCallback((returnFocusTo: HTMLElement | null, instant: boolean) => {
    clearShortlistMotion();
    shortlistOpenRef.current = true;
    shortlistReturnFocus.current = returnFocusTo;
    setMenuInstant(instant);
    setMenuOpen(false);
    setShortlistInstant(instant);

    if (shortlistMountedRef.current) {
      setShortlistOpen(true);
      return;
    }

    shortlistMountedRef.current = true;
    setShortlistMounted(true);
    if (instant) {
      setShortlistOpen(true);
      return;
    }

    shortlistOpenFrame.current = window.requestAnimationFrame(() => {
      setShortlistOpen(true);
      shortlistOpenFrame.current = null;
    });
  }, [clearShortlistMotion]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = window.localStorage.getItem("pawfriend-shortlist");
        const parsed: unknown = stored ? JSON.parse(stored) : [];
        if (Array.isArray(parsed)) {
          const validIds = new Set<string>(residents.map((pet) => pet.id));
          setFavorites(parsed.filter((id): id is string => typeof id === "string" && validIds.has(id)));
        }
      } catch {
        setStorageAvailable(false);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => () => clearShortlistMotion(), [clearShortlistMotion]);

  useEffect(() => {
    if (!shortlistOpen) return;
    const panel = shortlistPanel.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    shortlistCloseButton.current?.focus();

    const handleDialogKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeShortlist(true);
        return;
      }

      if (event.key !== "Tab" || !panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("hidden"));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleDialogKeydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleDialogKeydown);
      shortlistReturnFocus.current?.focus({ preventScroll: true });
      shortlistReturnFocus.current = null;
    };
  }, [closeShortlist, shortlistOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setMenuInstant(true);
      setMenuOpen(false);
      menuButton.current?.focus({ preventScroll: true });
    };

    window.addEventListener("keydown", closeMenuOnEscape);
    return () => window.removeEventListener("keydown", closeMenuOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (!statusMessage) return;
    const timeout = window.setTimeout(() => setStatusMessage(""), 4500);
    return () => window.clearTimeout(timeout);
  }, [statusMessage]);

  useEffect(() => {
    if (!saveNotice) return;
    const timeout = window.setTimeout(() => setSaveNotice(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [saveNotice]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      scrollTriggerRefresh.current?.();
      if (catalogOpen) {
        catalogHeading.current?.focus({ preventScroll: true });
        document.getElementById("all-residents")?.scrollIntoView({
          behavior: catalogScrollBehavior.current,
          block: "start",
        });
      } else if (shouldRestoreCatalogFocus.current) {
        shouldRestoreCatalogFocus.current = false;
        catalogTrigger.current?.focus({ preventScroll: true });
        document.getElementById("residents")?.scrollIntoView({
          behavior: catalogScrollBehavior.current,
          block: "start",
        });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [catalogOpen]);

  useEffect(() => {
    const container = root.current;
    if (!container) return;

    const navigateToSection = (event: MouseEvent) => {
      const source = event.target;
      if (!(source instanceof Element)) return;
      const anchor = source.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.classList.contains("skip-link")) return;

      const href = anchor.getAttribute("href");
      const target = href ? document.querySelector<HTMLElement>(href) : null;
      if (!href || !target) return;

      event.preventDefault();
      const instant = event.detail === 0;
      setMenuInstant(instant);
      setMenuOpen(false);
      closeShortlist(instant);
      const destination = href === "#top" ? 0 : window.scrollY + target.getBoundingClientRect().top - 64;
      window.history.pushState(null, "", href);
      window.scrollTo({
        top: Math.max(0, destination),
        behavior: scrollBehaviorForClick(event.detail),
      });
    };

    container.addEventListener("click", navigateToSection);
    return () => container.removeEventListener("click", navigateToSection);
  }, [closeShortlist]);

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    let disposed = false;
    let motionContext: { revert: () => void } | null = null;

    const setupMotion = async () => {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (disposed) return;

        gsap.registerPlugin(ScrollTrigger);
        scrollTriggerRefresh.current = () => ScrollTrigger.refresh();
        motionContext = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktopMotion:
            "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
          narrativeMotion:
            "(min-width: 1121px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        },
        (mediaContext) => {
          const { motion, desktopMotion, narrativeMotion } = mediaContext.conditions as {
            motion: boolean;
            desktopMotion: boolean;
            narrativeMotion: boolean;
          };

          if (motion) {
            gsap.from(".hero-line", {
              yPercent: 105,
              duration: 1.1,
              stagger: 0.09,
              ease: "expo.out",
            });
            gsap.from(".hero-dog", {
              y: 56,
              scale: 0.92,
              autoAlpha: 0,
              duration: 1.2,
              delay: 0.12,
              ease: "expo.out",
            });
            gsap.from(".hero-aside > *", {
              x: 32,
              autoAlpha: 0,
              duration: 0.75,
              stagger: 0.08,
              delay: 0.42,
              ease: "power3.out",
            });

            gsap.utils
              .toArray<HTMLElement>(
                ".section-heading, .personality-copy, .journey-title-wrap, .success-headline, .prepare-lead, .faq-intro",
              )
              .forEach((element) => {
                gsap.from(element, {
                  clipPath: "inset(0 0 100% 0)",
                  y: 20,
                  duration: 0.8,
                  ease: "expo.out",
                  scrollTrigger: {
                    trigger: element,
                    start: "top 86%",
                    once: true,
                  },
                });
              });

            const revealSelector = narrativeMotion
              ? ".pet-card, .prepare-step"
              : ".pet-card, .journey-step, .prepare-step";

            ScrollTrigger.batch(revealSelector, {
              start: "top 90%",
              once: true,
              onEnter: (elements) =>
                gsap.from(elements, {
                  y: 24,
                  autoAlpha: 0,
                  duration: 0.64,
                  stagger: 0.06,
                  ease: "power3.out",
                }),
            });
          }

          const heroStage = document.querySelector<HTMLElement>(".hero-stage");
          const heroStory = document.querySelector<HTMLElement>(".hero-story");
          const introBand = document.querySelector<HTMLElement>(".intro-band");

          if (narrativeMotion && heroStage && heroStory && introBand) {
            gsap.set(heroStage, {
              height: "calc(100svh - 64px)",
              overflow: "hidden",
              position: "relative",
            });
            gsap.set(introBand, {
              position: "absolute",
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 8,
            });

            const heroHandoff = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: heroStory,
                start: "top top",
                end: "+=115%",
                pin: heroStage,
                scrub: 1.1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            heroHandoff
              .to(".hero-copy", { yPercent: -30, scale: 0.96, autoAlpha: 0.18 }, 0)
              .to(".hero-line-wrap:nth-child(odd) .hero-line", { xPercent: -6 }, 0)
              .to(".hero-line-wrap:nth-child(even) .hero-line", { xPercent: 5 }, 0)
              .to(".hero-aside", { xPercent: 102 }, 0.04)
              .to(".hero-note", { yPercent: -40, autoAlpha: 0 }, 0.04)
              .to(".hero-dog", { yPercent: -22, scale: 1.28 }, 0)
              .to(".blue-swipe", { xPercent: -8, scaleX: 1.24, scaleY: 1.04 }, 0)
              .fromTo(introBand, { yPercent: 100 }, { yPercent: 0 }, 0.42)
              .fromTo(
                ".intro-band h2",
                { clipPath: "inset(100% 0 0 0)", y: 28 },
                { clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.3 },
                0.6,
              )
              .fromTo(
                ".intro-band > p, .paw-scatter",
                { autoAlpha: 0, y: 16 },
                { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.05 },
                0.7,
              );
          }

          if (!desktopMotion) return;

          const track = document.querySelector<HTMLElement>(".resident-track");
          const pin = document.querySelector<HTMLElement>(".residents-pin");
          if (track && pin) {
            const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 96);
            gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: pin,
                start: "top 80px",
                end: () => `+=${Math.max(900, distance() * 1.25)}`,
                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
          }

          if (!narrativeMotion) {
            gsap.fromTo(
              ".journey-line",
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: ".journey-grid",
                  start: "top 70%",
                  end: "bottom 65%",
                  scrub: 0.8,
                },
              },
            );
          }

          const fitStory = document.querySelector<HTMLElement>(".fit-story");
          const fitStage = document.querySelector<HTMLElement>(".fit-stage");
          const journeySection = document.querySelector<HTMLElement>(".journey-section");
          const fitSeam = document.querySelector<HTMLElement>(".fit-seam");

          if (narrativeMotion && fitStory && fitStage && journeySection && fitSeam) {
            gsap.set(fitStage, {
              height: "calc(100svh - 64px)",
              overflow: "hidden",
              position: "relative",
            });
            gsap.set(journeySection, {
              position: "absolute",
              inset: 0,
              zIndex: 12,
              clipPath: "inset(0 100% 0 0)",
            });
            gsap.set(fitSeam, { display: "block", x: 0, scaleY: 0, autoAlpha: 1 });

            const fitHandoff = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: fitStory,
                start: "top 64px",
                end: "+=125%",
                pin: fitStage,
                scrub: 1.1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            fitHandoff
              .to(".personality-copy", { xPercent: -24, autoAlpha: 0.14, duration: 0.48 }, 0)
              .to(".rating-list", { xPercent: 24, autoAlpha: 0.14, duration: 0.48 }, 0)
              .to(".otis-stage img", { xPercent: -10, scale: 0.94, duration: 0.48 }, 0)
              .to(".otis-swipe", { xPercent: -12, scaleX: 0.8, rotate: -2.5, duration: 0.48 }, 0)
              .to(fitSeam, { scaleY: 1, duration: 0.1 }, 0.18)
              .to(
                journeySection,
                { clipPath: "inset(0 0% 0 0)", duration: 0.5 },
                0.26,
              )
              .to(
                fitSeam,
                { x: () => Math.max(0, fitStage.clientWidth - 6), duration: 0.5 },
                0.26,
              )
              .fromTo(
                ".journey-title-wrap",
                { x: 80, clipPath: "inset(0 100% 0 0)" },
                { x: 0, clipPath: "inset(0 0% 0 0)", duration: 0.3 },
                0.5,
              )
              .fromTo(
                ".journey-step",
                { x: 56, autoAlpha: 0 },
                { x: 0, autoAlpha: 1, duration: 0.32, stagger: 0.04 },
                0.58,
              )
              .fromTo(
                ".journey-line",
                { scaleX: 0 },
                { scaleX: 1, duration: 0.28 },
                0.68,
              )
              .to(fitSeam, { autoAlpha: 0, duration: 0.12 }, 0.8);
          }
        },
      );

      return () => media.revert();
        }, scope);
      } catch {
        scrollTriggerRefresh.current = null;
      }
    };

    const frame = window.requestAnimationFrame(() => void setupMotion());
    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      scrollTriggerRefresh.current = null;
      motionContext?.revert();
    };
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((current) => {
      const isSaved = current.includes(id);
      setSaveNotice({
        action: isSaved ? "removed" : "saved",
        petId: id,
        sequence: Date.now(),
      });
      const next = isSaved ? current.filter((item) => item !== id) : [...current, id];
      try {
        window.localStorage.setItem("pawfriend-shortlist", JSON.stringify(next));
      } catch {
        setStorageAvailable(false);
      }
      return next;
    });
  };

  const moveResidents = (direction: -1 | 1, detail: number) => {
    const behavior = scrollBehaviorForClick(detail);
    if (
      window.matchMedia(
        "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    ) {
      window.scrollBy({ top: direction * 480, behavior });
      return;
    }
    residentScroller.current?.scrollBy({ left: direction * 320, behavior });
  };

  const openResidentCatalog = (detail: number) => {
    catalogScrollBehavior.current = scrollBehaviorForClick(detail);
    setCatalogInstant(detail === 0);
    setCatalogOpen(true);
  };

  const closeResidentCatalog = (detail: number) => {
    catalogScrollBehavior.current = scrollBehaviorForClick(detail);
    shouldRestoreCatalogFocus.current = true;
    setCatalogOpen(false);
  };

  const sharePawFriend = async () => {
    const shareData = {
      title: "PawFriend",
      text: "Meet adoptable pets by personality.",
      url: window.location.origin,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setStatusMessage("Share options opened.");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setStatusMessage("PawFriend link copied.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatusMessage("Unable to share. Copy the page address and try again.");
    }
  };

  const shareShortlist = async () => {
    if (!favoritePets.length) return;

    const names = favoritePets.map((pet) => pet.name).join(", ");
    const shareData = {
      title: "My PawFriend shortlist",
      text: `My PawFriend shortlist: ${names}.`,
      url: `${window.location.origin}/#residents`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setStatusMessage("Shortlist share options opened.");
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setStatusMessage("Shortlist copied.");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setStatusMessage("Unable to share the shortlist. Copy the page address and try again.");
    }
  };

  return (
    <div ref={root}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="PawFriend home">
          <PawPrint aria-hidden="true" size={28} fill="currentColor" />
          <span>PawFriend</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="shortlist-trigger"
            type="button"
            aria-label={`Open shortlist with ${favorites.length} saved ${favorites.length === 1 ? "pet" : "pets"}`}
            aria-expanded={shortlistOpen}
            aria-controls="shortlist-panel"
            onClick={(event) => {
              const instant = event.detail === 0;
              setMenuInstant(instant);
              setMenuOpen(false);
              if (shortlistOpenRef.current) {
                closeShortlist(instant);
              } else {
                openShortlist(event.currentTarget, instant);
              }
            }}
          >
            <Heart aria-hidden="true" fill={favorites.length ? "currentColor" : "none"} />
            <span>Saved</span>
            <strong>{favorites.length}</strong>
          </button>
          <MagneticLink className="header-cta" href="#residents">
            Meet the pets
          </MagneticLink>
        </div>
        <button
          ref={menuButton}
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={(event) => {
            const instant = event.detail === 0;
            closeShortlist(instant);
            setMenuInstant(instant);
            setMenuOpen((open) => !open);
          }}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div
          className={`mobile-menu ${menuOpen ? "is-open" : ""} ${menuInstant ? "is-instant" : ""}`}
          id="mobile-navigation"
        >
          {navigation.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={(event) => {
                setMenuInstant(event.detail === 0);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={(event) => {
              openShortlist(menuButton.current, event.detail === 0);
            }}
          >
            View saved pets ({favorites.length})
          </button>
          <a
            href="#residents"
            onClick={(event) => {
              setMenuInstant(event.detail === 0);
              setMenuOpen(false);
            }}
          >Meet the pets</a>
        </div>
      </header>

      {shortlistMounted ? (
        <>
        <div
          className={`shortlist-backdrop ${shortlistOpen ? "is-open" : ""} ${shortlistInstant ? "is-instant" : ""}`}
          aria-hidden="true"
          onClick={(event) => closeShortlist(event.detail === 0)}
        />
        <aside
          ref={shortlistPanel}
          className={`shortlist-panel ${shortlistOpen ? "is-open" : ""} ${shortlistInstant ? "is-instant" : ""}`}
          id="shortlist-panel"
          role="dialog"
          aria-modal={shortlistOpen ? "true" : undefined}
          aria-hidden={!shortlistOpen}
          aria-labelledby="shortlist-title"
          inert={!shortlistOpen}
        >
          <div className="shortlist-heading">
            <div>
              <p>{favoritePets.length ? `${favoritePets.length} saved` : "Your shortlist"}</p>
              <h2 id="shortlist-title">Your saved pets.</h2>
            </div>
            <button
              ref={shortlistCloseButton}
              className="shortlist-close"
              type="button"
              aria-label="Close saved pets"
              onClick={(event) => closeShortlist(event.detail === 0)}
            >
              <X aria-hidden="true" />
            </button>
          </div>

          {favoritePets.length ? (
            <div className="shortlist-items">
              {favoritePets.map((pet) => (
                <article className="shortlist-item" key={pet.id}>
                  <Image src={pet.image} alt="" width={88} height={88} sizes="88px" />
                  <div>
                    <h3>{pet.name}</h3>
                    <p>{pet.age} · {pet.breed}</p>
                    <span>{pet.trait}</span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${pet.name} from shortlist`}
                    onClick={() => toggleFavorite(pet.id)}
                  >
                    <X aria-hidden="true" />
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="shortlist-empty">
              <Heart aria-hidden="true" />
              <h3>No pets saved yet.</h3>
              <p>Save any pet you want to meet. Your shortlist will appear here for comparison.</p>
              <a className="button-link" href="#residents">
                <span>Browse the residents</span>
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          )}

          <div className="shortlist-footer">
            <p>{storageAvailable ? "Saved on this device." : "Saved until this page closes."}</p>
            <button type="button" disabled={!favoritePets.length} onClick={shareShortlist}>
              <Share2 aria-hidden="true" /> Share my shortlist
            </button>
          </div>
        </aside>
        </>
      ) : null}

      <main id="main-content">
        <div className="hero-story">
          <div className="hero-stage">
            <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="hero-line-wrap"><span className="hero-line">Find your</span></span>{" "}
              <span className="hero-line-wrap"><span className="hero-line">new best</span></span>{" "}
              <span className="hero-line-wrap"><span className="hero-line">friend.</span></span>
            </h1>
            <span className="marker-stroke" aria-hidden="true" />
            <MagneticLink className="mobile-hero-cta" href="#residents">
              Meet the pets
            </MagneticLink>
          </div>

          <div className="hero-portrait" aria-label="Meet Milo">
            <span className="blue-swipe" aria-hidden="true" />
            <Image
              className="hero-dog"
              src="/images/hero-milo.webp"
              alt="Milo, a joyful tan and white rescue dog"
              fill
              priority
              sizes="(max-width: 760px) 100vw, 48vw"
            />
            <p className="hero-note">
              Milo
              <span>Certified sock thief</span>
              <svg aria-hidden="true" viewBox="0 0 110 52">
                <path d="M3 13c28-11 63-9 95 12M84 14l15 12-18 5" />
              </svg>
            </p>
          </div>

          <aside className="hero-aside">
            <p className="hero-intro">{siteCopy.hero.intro}</p>
            <MagneticLink href="#residents">Meet the pets</MagneticLink>
            <div className="proof-cluster">
              <div className="mini-portraits" aria-hidden="true">
                {residents.slice(0, 3).map((pet) => (
                  <Image key={pet.id} src={pet.image} alt="" width={48} height={48} />
                ))}
              </div>
              <div className="proof-copy">
                <p><strong>{siteCopy.hero.proofTitle}</strong><span>{siteCopy.hero.proofBody}</span></p>
                <small>{siteCopy.hero.proofNote}</small>
              </div>
            </div>
            <a className="text-link" href="#journey">
              How adoption works <ArrowRight aria-hidden="true" size={18} />
            </a>
          </aside>
            </section>

            <section className="intro-band" aria-labelledby="intro-title">
              <h2 id="intro-title">Somebody here is <em>your</em> type.</h2>
              <p>{siteCopy.introduction.body}</p>
              <div className="paw-scatter" aria-hidden="true">
                <PawPrint /><PawPrint /><PawPrint />
              </div>
            </section>
          </div>
        </div>

        <section className="residents-pin" id="residents" aria-labelledby="residents-title">
          <div className="section-heading residents-heading">
            <h2 id="residents-title">{siteCopy.residents.title}</h2>
            <p>{siteCopy.residents.body}</p>
            <div className="residents-controls">
              <button
                ref={catalogTrigger}
                className="button-link catalog-trigger"
                type="button"
                aria-expanded={catalogOpen}
                aria-controls="all-residents"
                onClick={(event) => {
                  if (catalogOpen) closeResidentCatalog(event.detail);
                  else openResidentCatalog(event.detail);
                }}
              >
                <span>
                  {catalogOpen
                    ? siteCopy.residents.showFeatured
                    : siteCopy.residents.viewAll(residents.length)}
                </span>
                {catalogOpen
                  ? <ArrowLeft aria-hidden="true" size={18} />
                  : <ArrowRight aria-hidden="true" size={18} />}
              </button>
              <div className="gallery-controls">
                <button type="button" onClick={(event) => moveResidents(-1, event.detail)} aria-label="View previous resident">
                  <ArrowLeft aria-hidden="true" />
                </button>
                <button type="button" onClick={(event) => moveResidents(1, event.detail)} aria-label="View next resident">
                  <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
          <div className="resident-scroller" ref={residentScroller}>
            <div className="resident-track">
              {residents.slice(0, 5).map((pet, index) => {
                const isFavorite = favorites.includes(pet.id);
                return (
                  <article className={`pet-card pet-card-${index + 1}`} key={pet.id}>
                    <span className={`pet-label ${pet.color}`}>{pet.name}</span>
                    <div className="pet-photo">
                      <Image
                        src={pet.image}
                        alt={`${pet.name}, ${pet.breed}`}
                        fill
                        sizes="(max-width: 760px) 78vw, 320px"
                      />
                    </div>
                    <div className="pet-meta"><span>{pet.age}</span><span>{pet.breed}</span></div>
                    <h3>{pet.trait}</h3>
                    <p>{pet.description}</p>
                    <div className="pet-actions">
                      <a href="#prepare">Plan a meeting</a>
                      <button
                        className={isFavorite ? "is-favorite" : ""}
                        type="button"
                        aria-label={isFavorite ? `Remove ${pet.name} from favorites` : `Save ${pet.name} to favorites`}
                        aria-pressed={isFavorite}
                        onClick={() => toggleFavorite(pet.id)}
                      >
                        <Heart aria-hidden="true" fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {catalogOpen ? (
          <section
            className={`resident-catalog ${catalogInstant ? "is-instant" : ""}`}
            id="all-residents"
            aria-labelledby="all-residents-title"
          >
            <div className="catalog-heading">
              <div>
                <h2 ref={catalogHeading} id="all-residents-title" tabIndex={-1}>
                  {siteCopy.residents.catalogTitle}
                </h2>
              </div>
              <p>{siteCopy.residents.catalogBody}</p>
            </div>

            <div className="catalog-grid">
              {residents.map((pet, index) => {
                const isFavorite = favorites.includes(pet.id);
                return (
                  <article
                    className={`catalog-pet-card catalog-pet-card-${pet.id}`}
                    key={pet.id}
                    style={{ "--card-order": index } as React.CSSProperties}
                  >
                    <span className={`pet-label ${pet.color}`}>{pet.name}</span>
                    <div className="pet-photo">
                      <Image
                        src={pet.image}
                        alt={`${pet.name}, ${pet.breed}`}
                        fill
                        sizes="(max-width: 640px) 88vw, (max-width: 1120px) 30vw, 22vw"
                      />
                    </div>
                    <div className="pet-meta"><span>{pet.age}</span><span>{pet.breed}</span></div>
                    <h3>{pet.trait}</h3>
                    <p>{pet.description}</p>
                    <div className="pet-actions">
                      <a href="#prepare">Plan a meeting</a>
                      <button
                        className={isFavorite ? "is-favorite" : ""}
                        type="button"
                        aria-label={isFavorite ? `Remove ${pet.name} from favorites` : `Save ${pet.name} to favorites`}
                        aria-pressed={isFavorite}
                        onClick={() => toggleFavorite(pet.id)}
                      >
                        <Heart aria-hidden="true" fill={isFavorite ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              className="button-link catalog-back"
              type="button"
              onClick={(event) => closeResidentCatalog(event.detail)}
            >
              <ArrowLeft aria-hidden="true" size={18} />
              <span>{siteCopy.residents.showFeatured}</span>
            </button>
          </section>
        ) : null}

        <div className="fit-story">
          <div className="fit-stage">
            <section className="personality-section" aria-labelledby="personality-title">
          <div className="personality-copy reveal">
            <h2 id="personality-title">{siteCopy.personality.title}</h2>
            <p>{siteCopy.personality.body}</p>
            <p className="hand-note">{siteCopy.personality.note}</p>
          </div>
          <div className="otis-stage reveal">
            <span className="otis-swipe" aria-hidden="true" />
            <Image
              src="/images/personality-otis.webp"
              alt="Otis, a cheerful black Labrador"
              fill
              sizes="(max-width: 760px) 92vw, 42vw"
            />
            <span className="otis-label">Otis</span>
          </div>
          <div className="rating-list reveal">
            {personality.map((item) => <Rating key={item.label} {...item} />)}
          </div>
            </section>

            <section className="journey-section" id="journey" aria-labelledby="journey-title">
          <div className="journey-title-wrap reveal">
            <h2 id="journey-title">{siteCopy.journey.title}</h2>
            <p>{siteCopy.journey.body}</p>
          </div>
          <div className="journey-grid">
            <span className="journey-line" aria-hidden="true" />
            {journey.map((step) => (
              <article className="journey-step" key={step.number}>
                <span className="journey-number">{step.number}</span>
                <div className="journey-image">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 70vw, 24vw"
                  />
                </div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
            </section>
            <span className="fit-seam" aria-hidden="true" />
          </div>
        </div>

        <section className="success-section" id="mission" aria-labelledby="success-title">
          <div className="story-photos reveal">
            <figure className="story-photo before">
              <Image src="/images/story/luna-shelter.webp" alt="Luna waiting safely at the shelter" fill sizes="280px" />
              <figcaption>First meeting</figcaption>
            </figure>
            <figure className="story-photo home">
              <Image src="/images/story/luna-home.webp" alt="Luna relaxed on a sofa at home" fill sizes="280px" />
              <figcaption>Settling in</figcaption>
            </figure>
          </div>
          <div className="success-headline reveal">
            <h2 id="success-title">{siteCopy.story.title} <span>{siteCopy.story.accent}</span></h2>
          </div>
          <div className="success-copy reveal">
            <p>{siteCopy.story.body}</p>
            <button
              className="ink-link story-toggle"
              type="button"
              aria-expanded={storyOpen}
              onClick={() => setStoryOpen((open) => !open)}
            >
              {storyOpen ? "Close Luna's story" : "Read Luna's story"}
              <ArrowRight aria-hidden="true" />
            </button>
            {storyOpen ? (
              <p className="story-extra">
                {siteCopy.story.detail}
              </p>
            ) : null}
          </div>
        </section>

        <section className="prepare-section" id="prepare" aria-labelledby="prepare-title">
          <div className="prepare-lead reveal">
            <h2 id="prepare-title">{siteCopy.preparation.title}</h2>
            <p>{siteCopy.preparation.body}</p>
          </div>
          <ol className="prepare-steps">
            {preparationSteps.map((step) => (
              <li className="prepare-step reveal" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
          <button
            className="prepare-shortlist"
            type="button"
            onClick={(event) => openShortlist(event.currentTarget, event.detail === 0)}
          >
            <Heart aria-hidden="true" fill={favorites.length ? "currentColor" : "none"} />
            View my shortlist <span>{favorites.length}</span>
          </button>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-title">
          <div className="faq-intro reveal">
            <h2 id="faq-title">{siteCopy.faq.title}</h2>
            <p>{siteCopy.faq.body}</p>
            <a className="ink-link" href="#journey">Review the adoption journey <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="faq-list">
            {adoptionFaqs.map((item) => (
              <details key={item.question}>
                <summary>
                  <span>{item.question}</span>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="final-invitation" id="final-cta" aria-labelledby="final-title">
          <div className="invitation-copy reveal">
            <p className="eyebrow">Good company comes in all shapes.</p>
            <h2 id="final-title">Someone is<br />waiting for <em>you.</em></h2>
            <MagneticLink href="#residents">Meet the pets</MagneticLink>
            <p>{siteCopy.final.note}</p>
          </div>
          <div className="invitation-portrait">
            <Image src="/images/final-pet-group.webp" alt="A cheerful group of rescue dogs and cats" fill sizes="(max-width: 760px) 100vw, 60vw" />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <a className="brand" href="#top"><PawPrint aria-hidden="true" fill="currentColor" /> PawFriend</a>
          <p>{siteCopy.footer.tagline}</p>
        </div>
        <div className="footer-links">
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </div>
        <div className="footer-contact">
          <div className="footer-utility-links">
            <a href="#faq">Adoption FAQ</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/accessibility">Accessibility</Link>
          </div>
          <div className="social-links">
            <button type="button" aria-label="Share PawFriend" onClick={sharePawFriend}>
              <Share2 aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="footer-legal">
          <p>{siteCopy.footer.disclosure}</p>
          <p>© {new Date().getFullYear()} PawFriend</p>
        </div>
      </footer>

      <p className={`status-toast ${statusMessage ? "is-visible" : ""}`} role="status" aria-live="polite">
        {statusMessage}
      </p>

      {saveNotice && noticePet ? (
        <aside
          className="save-notice"
          data-action={saveNotice.action}
          key={saveNotice.sequence}
          role="status"
          aria-live="polite"
        >
          <div className="save-notice-photo" aria-hidden="true">
            <Image src={noticePet.image} alt="" fill sizes="72px" />
          </div>
          <div className="save-notice-copy">
            <span>
              {saveNotice.action === "saved"
                ? siteCopy.notifications.savedLabel
                : siteCopy.notifications.removedLabel}
            </span>
            <strong>
              {saveNotice.action === "saved"
                ? siteCopy.notifications.savedMessage(noticePet.name)
                : siteCopy.notifications.removedMessage(noticePet.name)}
            </strong>
          </div>
          <span className="save-notice-mark" aria-hidden="true">
            {saveNotice.action === "saved" ? <Heart fill="currentColor" /> : <PawPrint />}
          </span>
        </aside>
      ) : null}
    </div>
  );
}
