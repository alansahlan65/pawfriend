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

type Resident = (typeof residents)[number];

function ResidentCard({ pet, saved, catalog = false, onSave, onMeet }: {
  pet: Resident;
  saved: boolean;
  catalog?: boolean;
  onSave: (id: string) => void;
  onMeet: (id: string, detail: number) => void;
}) {
  return (
    <article className={catalog ? "catalog-pet-card" : "pet-card"}>
      <div className="contact-print">
        <span className={`pet-label ${pet.color}`}>{pet.name}</span>
        <button className="pet-photo profile-photo-trigger" type="button" aria-label={siteCopy.discovery.meet(pet.name)} onClick={(event) => onMeet(pet.id, event.detail)}>
          <Image src={pet.image} alt={`${pet.name}, ${pet.breed}`} fill sizes="(max-width: 640px) 80vw, 340px" />
          <span className="portrait-caption" aria-hidden="true">{siteCopy.discovery.meet(pet.name)} <ArrowRight size={18} /></span>
        </button>
      </div>
      <div className="pet-meta"><span>{pet.age}</span><span>{pet.breed}</span></div>
      <h3>{pet.trait}</h3>
      <p>{pet.observation}</p>
      <div className="pet-actions">
        <button className="profile-link" type="button" onClick={(event) => onMeet(pet.id, event.detail)}>{siteCopy.discovery.meet(pet.name)} <ArrowRight aria-hidden="true" size={17} /></button>
        <button className={saved ? "is-favorite" : ""} type="button" aria-label={saved ? `Remove ${pet.name} from favorites` : `Save ${pet.name} to favorites`} aria-pressed={saved} onClick={() => onSave(pet.id)}>
          <Heart aria-hidden="true" fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
    </article>
  );
}

export function LandingPage() {
  const root = useRef<HTMLDivElement>(null);
  const profileHeading = useRef<HTMLHeadingElement>(null);
  const profileNavigationFrame = useRef<number | null>(null);
  const [selectedPetId, setSelectedPetId] = useState<string>("milo");
  const [speciesFilter, setSpeciesFilter] = useState<"all" | "dog" | "cat">("all");
  const selectedPet = residents.find((pet) => pet.id === selectedPetId) ?? residents[0];
  const catalogPets = residents.filter((pet) => speciesFilter === "all" || pet.species === speciesFilter);
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
      const returnFocusTo = shortlistReturnFocus.current;
      shortlistReturnFocus.current = null;
      window.requestAnimationFrame(() => {
        returnFocusTo?.focus({ preventScroll: true });
      });
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
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        scrollTriggerRefresh.current = () => ScrollTrigger.refresh();
        motionContext = gsap.context(() => {
          const media = gsap.matchMedia();
          media.add(
            {
              motion: "(prefers-reduced-motion: no-preference)",
              desktopMotion: "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
              narrativeMotion: "(min-width: 1121px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
            },
            (mediaContext) => {
              const { motion, desktopMotion, narrativeMotion } = mediaContext.conditions as {
                motion: boolean;
                desktopMotion: boolean;
                narrativeMotion: boolean;
              };

              if (motion) {
                gsap.from(".hero-line", {
                  yPercent: 108,
                  duration: 1.05,
                  stagger: 0.08,
                  ease: "expo.out",
                });
                gsap.from(".hero-description, .hero-actions, .hero-footnote", {
                  y: 24,
                  autoAlpha: 0,
                  duration: 0.72,
                  stagger: 0.07,
                  delay: 0.32,
                  ease: "power3.out",
                });
                gsap.from(".hero-portrait", {
                  y: 44,
                  scale: 0.95,
                  autoAlpha: 0,
                  duration: 1.1,
                  delay: 0.12,
                  ease: "expo.out",
                });

                gsap.utils
                  .toArray<HTMLElement>(
                    ".residents-heading, .catalog-heading, .success-copy, .journey-title-wrap, .prepare-lead, .faq-intro",
                  )
                  .forEach((element) => {
                    gsap.from(element, {
                      clipPath: "inset(0 0 100% 0)",
                      y: 28,
                      duration: 0.85,
                      ease: "expo.out",
                      scrollTrigger: { trigger: element, start: "top 86%", once: true },
                    });
                  });

                ScrollTrigger.batch(".prepare-step", {
                  start: "top 90%",
                  once: true,
                  onEnter: (elements) =>
                    gsap.from(elements, {
                      y: 34,
                      autoAlpha: 0,
                      duration: 0.68,
                      stagger: 0.06,
                      ease: "power3.out",
                    }),
                });
              }

              if (narrativeMotion) {
                const heroStory = scope.querySelector<HTMLElement>(".hero-story");
                const hero = scope.querySelector<HTMLElement>(".hero");
                const introBand = scope.querySelector<HTMLElement>(".intro-band");

                if (heroStory && hero && introBand) {
                  gsap.set(heroStory, {
                    height: "calc(100svh - 64px)",
                    minHeight: 650,
                    overflow: "hidden",
                    position: "relative",
                  });
                  gsap.set(hero, { height: "100%", minHeight: 0 });
                  gsap.set(introBand, {
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    left: 0,
                    zIndex: 8,
                    yPercent: 105,
                  });

                  const heroHandoff = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                      trigger: heroStory,
                      start: "top top",
                      end: "+=105%",
                      pin: heroStory,
                      scrub: 0.68,
                      anticipatePin: 1,
                      invalidateOnRefresh: true,
                    },
                  });

                  heroHandoff
                    .to(".hero-copy", { yPercent: -28, scale: 0.96, autoAlpha: 0.16 }, 0)
                    .to(".hero-line-wrap:nth-child(odd) .hero-line", { xPercent: -7 }, 0)
                    .to(".hero-line-wrap:nth-child(even) .hero-line", { xPercent: 6 }, 0)
                    .to(".hero-note", { yPercent: -70, autoAlpha: 0 }, 0.04)
                    .to(".hero-dog", { yPercent: -18, scale: 1.18 }, 0)
                    .to(".blue-swipe", { xPercent: -9, scaleX: 1.25, scaleY: 1.06, rotate: 0 }, 0)
                    .to(introBand, { yPercent: 0 }, 0.42)
                    .fromTo(
                      ".intro-band h2",
                      { clipPath: "inset(100% 0 0 0)", y: 38 },
                      { clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.3 },
                      0.58,
                    )
                    .fromTo(
                      ".intro-band > p, .intro-paw",
                      { autoAlpha: 0, y: 22 },
                      { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.05 },
                      0.68,
                    );
                }
              }

              if (!desktopMotion) return;

              const track = scope.querySelector<HTMLElement>(".resident-track");
              const residentSection = scope.querySelector<HTMLElement>(".residents-pin");
              const residentViewport = scope.querySelector<HTMLElement>(".resident-scroller");
              if (track && residentSection && residentViewport) {
                const distance = () => Math.max(0, track.scrollWidth - residentViewport.clientWidth);
                gsap.to(track, {
                  x: () => -distance(),
                  ease: "none",
                  scrollTrigger: {
                    trigger: residentSection,
                    start: "top 80px",
                    end: () => `+=${Math.max(1050, distance() * 1.7)}`,
                    pin: true,
                    scrub: 0.62,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                  },
                });
              }

              if (narrativeMotion) {
                const profileStory = scope.querySelector<HTMLElement>(".profile-story");
                const profileStage = scope.querySelector<HTMLElement>(".profile-stage");
                const profileSection = scope.querySelector<HTMLElement>(".pet-profile");
                const storySection = scope.querySelector<HTMLElement>(".success-section");
                const profileSeam = scope.querySelector<HTMLElement>(".profile-seam");

                if (profileStory && profileStage && profileSection && storySection && profileSeam) {
                  gsap.set(profileStage, {
                    height: "calc(100svh - 64px)",
                    minHeight: 650,
                    overflow: "hidden",
                    position: "relative",
                  });
                  gsap.set(profileSection, { height: "100%", minHeight: 0 });
                  gsap.set(storySection, {
                    position: "absolute",
                    inset: 0,
                    zIndex: 12,
                    height: "100%",
                    clipPath: "inset(0 100% 0 0)",
                  });
                  gsap.set(profileSeam, { display: "block", x: 0, scaleY: 0, autoAlpha: 1 });

                  const profileHandoff = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                      trigger: profileStory,
                      start: "top 64px",
                      end: "+=115%",
                      pin: profileStage,
                      scrub: 0.74,
                      anticipatePin: 1,
                      invalidateOnRefresh: true,
                    },
                  });

                  profileHandoff
                    .to(".profile-portrait", { xPercent: -18, scale: 0.92, autoAlpha: 0.1, duration: 0.48 }, 0)
                    .to(".profile-details", { xPercent: 22, autoAlpha: 0.08, duration: 0.48 }, 0)
                    .to(profileSeam, { scaleY: 1, duration: 0.1 }, 0.18)
                    .to(storySection, { clipPath: "inset(0 0% 0 0)", duration: 0.5 }, 0.26)
                    .to(profileSeam, { x: () => Math.max(0, profileStage.clientWidth - 6), duration: 0.5 }, 0.26)
                    .fromTo(
                      ".story-photos",
                      { x: 90, autoAlpha: 0 },
                      { x: 0, autoAlpha: 1, duration: 0.3 },
                      0.48,
                    )
                    .fromTo(
                      ".success-copy",
                      { x: 72, autoAlpha: 0 },
                      { x: 0, autoAlpha: 1, duration: 0.3 },
                      0.56,
                    )
                    .to(profileSeam, { autoAlpha: 0, duration: 0.12 }, 0.82);
                }

                const journeySection = scope.querySelector<HTMLElement>(".journey-section");
                if (journeySection) {
                  const journeyTimeline = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: {
                      trigger: journeySection,
                      start: "top 64px",
                      end: "+=82%",
                      pin: true,
                      scrub: 0.62,
                      anticipatePin: 1,
                    },
                  });
                  journeyTimeline
                    .fromTo(".journey-line", { scaleX: 0 }, { scaleX: 1, duration: 0.68 }, 0)
                    .fromTo(
                      ".journey-step",
                      { y: 34, autoAlpha: 0.22 },
                      { y: 0, autoAlpha: 1, duration: 0.34, stagger: 0.13 },
                      0.08,
                    );
                }
              }
            },
          );
          return () => media.revert();
        }, scope);
      } catch {
        // The complete, readable composition is the default when motion cannot load.
        scrollTriggerRefresh.current = null;
        motionContext?.revert();
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

  useEffect(() => () => {
    if (profileNavigationFrame.current !== null) window.cancelAnimationFrame(profileNavigationFrame.current);
  }, []);

  const meetResident = (id: string, detail: number) => {
    setSelectedPetId(id);
    if (profileNavigationFrame.current !== null) window.cancelAnimationFrame(profileNavigationFrame.current);
    profileNavigationFrame.current = window.requestAnimationFrame(() => {
      profileHeading.current?.focus({ preventScroll: true });
      document.getElementById("pet-profile")?.scrollIntoView({ behavior: scrollBehaviorForClick(detail), block: "start" });
      profileNavigationFrame.current = null;
    });
  };

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
    if (window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) {
      window.scrollBy({ top: direction * 520, behavior });
      return;
    }
    const scroller = residentScroller.current;
    if (!scroller) return;
    const card = scroller.querySelector<HTMLElement>(".pet-card");
    scroller.scrollBy({ left: direction * ((card?.offsetWidth ?? 320) + 28), behavior });
  };

  const openResidentCatalog = (detail: number) => {
    catalogScrollBehavior.current = scrollBehaviorForClick(detail);
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
      setStatusMessage("Sharing is unavailable. Copy the page address instead.");
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
      setStatusMessage("Couldn’t share the shortlist. Try copying the page address.");
    }
  };

  return (
    <div ref={root} className="landing-page">
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
              <h2 id="shortlist-title">The pets you paused for.</h2>
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
              <p>Start with the face that makes you pause. You can compare favorites here before planning a visit.</p>
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
          <section className="hero" id="top" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">{siteCopy.discovery.heroEyebrow}</p>
              <h1 id="hero-title" aria-label="Find your new best friend.">
                <span className="hero-line-wrap" aria-hidden="true"><span className="hero-line">Find your</span></span>
                <span className="hero-line-wrap" aria-hidden="true"><span className="hero-line">new best</span></span>
                <span className="hero-line-wrap" aria-hidden="true"><span className="hero-line hero-accent">friend.</span></span>
              </h1>
              <p className="hero-description">{siteCopy.hero.intro}</p>
              <div className="hero-actions">
                <MagneticLink href="#residents">Meet the pets</MagneticLink>
                <a className="text-link" href="#journey">How adoption works <ArrowRight aria-hidden="true" size={17} /></a>
              </div>
              <p className="hero-footnote"><Heart aria-hidden="true" size={15} /> {siteCopy.hero.proofNote}</p>
            </div>
            <div className="hero-portrait" aria-label="Meet Milo">
              <span className="blue-swipe" aria-hidden="true" />
              <Image className="hero-dog" src="/images/hero-milo.webp" alt="Milo, a joyful tan and white rescue dog" fill priority sizes="(max-width: 760px) 100vw, 55vw" />
              <p className="hero-note">Milo<span>Certified sock thief</span><svg aria-hidden="true" viewBox="0 0 110 52"><path d="M3 13c28-11 63-9 95 12M84 14l15 12-18 5" /></svg></p>
              <span className="portrait-stamp" aria-hidden="true"><PawPrint size={25} /> Big personality.<br />Very good company.</span>
            </div>
          </section>
          <section className="intro-band" aria-labelledby="intro-title">
            <span className="intro-rule" aria-hidden="true" />
            <h2 id="intro-title">Somebody here is <em>your</em> type.</h2>
            <p>{siteCopy.introduction.body}</p>
            <PawPrint className="intro-paw" aria-hidden="true" size={36} />
          </section>
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
          <div className="resident-scroller" ref={residentScroller} aria-label="Featured residents" tabIndex={0}>
            <div className="resident-track">
              {residents.slice(0, 5).map((pet) => <ResidentCard key={pet.id} pet={pet} saved={favorites.includes(pet.id)} onSave={toggleFavorite} onMeet={meetResident} />)}
            </div>
          </div>
          <p className="contact-sheet-note">{siteCopy.discovery.featured} <span>01 / 05</span></p>
        </section>

        {catalogOpen ? (
          <section className="resident-catalog" id="all-residents" aria-labelledby="all-residents-title">
            <div className="catalog-heading">
              <div>
                <h2 ref={catalogHeading} id="all-residents-title" tabIndex={-1}>
                  {siteCopy.residents.catalogTitle}
                </h2>
              </div>
              <p>{siteCopy.residents.catalogBody}</p>
            </div>

            <div className="catalog-toolbar">
              <div className="resident-filters" role="group" aria-label={siteCopy.discovery.filterLabel}>
                {(["all", "dog", "cat"] as const).map((filter) => <button key={filter} type="button" aria-pressed={speciesFilter === filter} onClick={() => setSpeciesFilter(filter)}>{filter === "all" ? siteCopy.discovery.all : filter === "dog" ? siteCopy.discovery.dogs : siteCopy.discovery.cats}</button>)}
              </div>
              <p role="status">{siteCopy.discovery.results(catalogPets.length)}</p>
            </div>
            <div className="catalog-grid">
              {catalogPets.map((pet) => <ResidentCard key={pet.id} pet={pet} saved={favorites.includes(pet.id)} catalog onSave={toggleFavorite} onMeet={meetResident} />)}
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

        <div className="profile-story">
          <div className="profile-stage">
        <section className="pet-profile" id="pet-profile" aria-labelledby="profile-title">
          <div className={`profile-portrait profile-portrait-${selectedPet.color}`}>
            <div className="profile-photo">
              <Image key={selectedPet.image} src={selectedPet.image} alt={`${selectedPet.name}, ${selectedPet.breed}`} fill sizes="(max-width: 760px) 90vw, 45vw" />
            </div>
            <p className="profile-handwriting">{selectedPet.trait}</p>
          </div>
          <div className="profile-details">
            <p className="eyebrow">{siteCopy.discovery.profileLabel}</p>
            <h2 id="profile-title" ref={profileHeading} tabIndex={-1}>{selectedPet.name}<span aria-hidden="true">.</span></h2>
            <p className="profile-meta">{selectedPet.age} <span aria-hidden="true">/</span> {selectedPet.breed}</p>
            <p className="profile-bio">{selectedPet.description}</p>
            <div className="profile-questions">
              <h3>{siteCopy.discovery.questionsTitle}</h3>
              <p>{siteCopy.discovery.questionsIntro}</p>
              <ul><li>{selectedPet.question}</li><li>{siteCopy.discovery.householdQuestion}</li><li>{siteCopy.discovery.careQuestion}</li></ul>
            </div>
            <div className="profile-actions">
              <button className="button-link profile-save" type="button" aria-pressed={favorites.includes(selectedPet.id)} onClick={() => toggleFavorite(selectedPet.id)}><Heart aria-hidden="true" size={18} fill={favorites.includes(selectedPet.id) ? "currentColor" : "none"} />{favorites.includes(selectedPet.id) ? siteCopy.discovery.saved(selectedPet.name) : siteCopy.discovery.save(selectedPet.name)}</button>
              <a className="text-link" href="#prepare">{siteCopy.discovery.prepare} <ArrowRight aria-hidden="true" size={17} /></a>
            </div>
            <p className="profile-availability">{siteCopy.discovery.availability}</p>
            <a className="profile-back" href="#residents"><ArrowLeft aria-hidden="true" size={16} />{siteCopy.discovery.back}</a>
          </div>
        </section>

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
          <div className="success-copy">
            <p className="eyebrow">{siteCopy.discovery.storyLabel}</p>
            <h2 id="success-title">{siteCopy.story.title}</h2>
            <p className="story-subtitle">{siteCopy.story.accent}</p>
            <p>{siteCopy.story.body}</p>
            <p>{siteCopy.mission.support}</p>
            <button className="ink-link story-toggle" type="button" aria-expanded={storyOpen} aria-controls="introduction-advice" onClick={() => setStoryOpen((open) => !open)}>{storyOpen ? siteCopy.discovery.storyClose : siteCopy.discovery.storyOpen}<ArrowRight aria-hidden="true" size={18} /></button>
            {storyOpen ? <p className="story-extra" id="introduction-advice">{siteCopy.story.detail}</p> : null}
          </div>
        </section>
            <span className="profile-seam" aria-hidden="true" />
          </div>
        </div>

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
          <div className="invitation-copy">
            <p className="eyebrow">{siteCopy.discovery.heroNote}</p>
            <h2 id="final-title">Someone is<br />waiting for <em>you.</em></h2>
            <MagneticLink href="#residents">Meet the pets</MagneticLink>
            <p>{siteCopy.final.note}</p>
          </div>
          <div className="invitation-portrait"><Image src="/images/final-pet-group.webp" alt="A cheerful group of rescue dogs and cats" fill sizes="(max-width: 760px) 100vw, 60vw" /></div>
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

      {favorites.length > 0 && !menuOpen ? (
        <button className="mobile-shortlist-bar" type="button" hidden={shortlistMounted} aria-controls="shortlist-panel" aria-expanded={false} onClick={(event) => openShortlist(event.currentTarget, event.detail === 0)}><Heart aria-hidden="true" size={18} fill="currentColor" /><span>{siteCopy.discovery.shortlist}</span><strong>{favorites.length}</strong><ArrowRight aria-hidden="true" size={18} /></button>
      ) : null}

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
