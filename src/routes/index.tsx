import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Samuel Chilinda — Founder, Builder, Strategist" },
      { name: "description", content: "Samuel Chilinda — Founder of Oasis Tech Capital. Business, finance, economics, technology, product design." },
      { property: "og:title", content: "Samuel Chilinda" },
      { property: "og:description", content: "Founder of Oasis Tech Capital. Building at the intersection of business, finance and technology." },
    ],
  }),
  component: Home,
});

const projects = [
  { name: "Ticket Malawi", role: "Product · Engineering", url: "https://ticketmalawi.com", year: "2024" },
  { name: "Oasis CI", role: "Founder · Strategy", url: "#", year: "2024" },
  { name: "Oasis Africa", role: "Founder · Design", url: "https://oasisafrica.xyz", year: "2023" },
  { name: "EMS Africa", role: "Consulting · Build", url: "https://emsafrica.it.com", year: "2023" },
];

const disciplines = [
  { k: "01", t: "Business", d: "I think in systems — how ventures compound, where the leverage hides, and which bets are worth making." },
  { k: "02", t: "Finance", d: "Numbers as narrative. Capital, structure, and the quiet math behind ambitious decisions." },
  { k: "03", t: "Technology", d: "I build on the web because it's the closest thing we have to magic that ships." },
  { k: "04", t: "Product Design", d: "Restraint as a craft. The details nobody notices are the ones that make everything feel right." },
];

function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40 });
  const sy = useSpring(y, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, [x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
    >
      <motion.div
        animate={{ scale: hover ? 2.4 : 1, opacity: hover ? 0.4 : 1 }}
        className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground mix-blend-difference"
      />
    </motion.div>
  );
}

function Nav() {
  return <SiteNav variant="home" />;
}

/* The stream that flows through the name — code, numbers, tiny charts */
function NameStream() {
  // Two copies side-by-side so the marquee loops seamlessly.
  const tokens = [
    "const", "$=42.18", "▁▂▃▅▇█▇▅▃▂", "0x9F", "ROI→", "1.0001", "//build",
    "EBITDA", "▲▼▲▲▼", "{ }", "0101", "→capital", "MWK", "▂▄▆█▆▄", "fn()",
    "ship()", "USD/MWK", "∑", "▇▇▅▃▁", "deploy", "0.0034", "λx.x", "yield",
  ];
  const row = [...tokens, ...tokens, ...tokens, ...tokens];
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="flex h-full w-max items-center gap-6 font-mono text-[clamp(28px,9vw,110px)] font-bold leading-none whitespace-nowrap"
           style={{ animation: "stream 28s linear infinite" }}>
        {row.map((t, i) => (
          <span key={i} className={i % 3 === 0 ? "opacity-90" : i % 3 === 1 ? "opacity-60" : "opacity-40"}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-4 pt-28 pb-8 md:px-12 md:pt-32 md:pb-12">
      <motion.div style={{ y, opacity }} className="flex flex-1 flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs"
        >
          Founder · Builder · Strategist
        </motion.p>

        {/* The name — bold sans, with a stream of code/numbers/charts flowing through it */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative mt-5 select-none font-sans font-black uppercase leading-[0.85] tracking-[-0.04em] text-[clamp(56px,16vw,220px)] md:mt-6"
          aria-label="Samuel Chilinda"
        >
          {/* Layer 1: faint outline so the shape is always readable */}
          <span
            aria-hidden
            className="absolute inset-0 text-transparent"
            style={{ WebkitTextStroke: "1.5px oklch(0.6 0 0)" }}
          >
            Samuel<br />Chilinda
          </span>
          {/* Layer 2: the stream itself, clipped to the letter shapes */}
          <span aria-hidden className="name-stream relative block">
            Samuel<br />Chilinda
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md font-display text-xl italic text-muted-foreground md:text-3xl">
            Founder of <span className="text-foreground not-italic font-sans text-base tracking-tight md:text-xl">Oasis Tech Capital LLC</span> — quietly stacking ideas, companies, and small pieces of the future.
          </p>
          <a href="#work" className="group flex items-center gap-3 self-start font-mono text-[10px] uppercase tracking-widest md:self-end md:text-xs">
            <span>See what I've been building</span>
            <span className="inline-block transition-transform group-hover:translate-y-1">↓</span>
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-muted-foreground md:text-[10px]"
      >
        <span>Lilongwe → World</span>
        <span>©{new Date().getFullYear()}</span>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = ["Business", "✦", "Finance", "✦", "Economics", "✦", "Technology", "✦", "Product Design", "✦"];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border py-6 md:py-8">
      <div className="flex w-max marquee gap-8 font-display text-4xl md:gap-12 md:text-8xl">
        {row.map((t, i) => (
          <span key={i} className={i % 2 === 0 ? "italic" : "text-muted-foreground"}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="invert-section relative px-4 py-24 md:px-12 md:py-48">
      <div className="grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">[ About ]</p>
        </div>
        <div className="md:col-span-8">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl leading-[1.1] sm:text-4xl md:text-6xl"
          >
            I live between <em>spreadsheets</em> and <em>pixels</em> — capital stacks one hour, component libraries the next. Same instinct either way: make things that feel inevitable, then make them real.
          </motion.h2>

          <div className="mt-14 grid gap-px bg-border md:mt-20 md:grid-cols-2">
            {disciplines.map((d, i) => (
              <motion.div
                key={d.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-background p-6 transition-colors hover:bg-card md:p-8"
                data-hover
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{d.k}</span>
                  <ArrowUpRight className="h-4 w-4 -translate-y-1 translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                </div>
                <h3 className="mt-5 font-display text-2xl md:mt-6 md:text-3xl">{d.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{d.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="relative px-4 py-24 md:px-12 md:py-48">
      <div className="mb-12 flex items-end justify-between md:mb-20">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">[ Selected Work ]</p>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] sm:text-5xl md:text-7xl">A few things,<br className="md:hidden" /> made carefully.</h2>
        </div>
        <span className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground md:block">
          {projects.length} projects
        </span>
      </div>

      <div className="border-t border-border">
        {projects.map((p, i) => (
          <ProjectRow key={p.name} {...p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ name, role, url, year, index }: typeof projects[number] & { index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className="group relative grid grid-cols-12 items-center gap-2 border-b border-border py-6 md:gap-4 md:py-12"
      data-hover
    >
      <motion.div
        animate={{ scaleX: hover ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0 }}
        className="absolute inset-0 -z-0 bg-foreground"
      />
      <span className="col-span-1 font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-background relative md:text-xs">0{index + 1}</span>
      <h3 className="col-span-8 font-display text-2xl transition-colors group-hover:text-background relative sm:text-3xl md:col-span-7 md:text-6xl">
        <motion.span animate={{ x: hover ? 16 : 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="inline-block">
          {name}
        </motion.span>
      </h3>
      <span className="col-span-2 hidden font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-background md:block relative">{role}</span>
      <span className="col-span-3 text-right font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-background relative md:col-span-2 md:text-xs">
        <motion.span animate={{ rotate: hover ? 45 : 0 }} className="mr-1 inline-block md:mr-2">↗</motion.span>
        {year}
      </span>
    </motion.a>
  );
}

function What() {
  const items = [
    { t: "Websites with weight", d: "Fast, considered, a little bit alive. The kind people remember without knowing why." },
    { t: "Business, up close", d: "Sitting with founders to untangle strategy, structure, and the next honest move." },
    { t: "Product & brand", d: "Identity, interface, and the thousand small decisions that decide how a thing feels." },
  ];
  return (
    <section className="invert-section relative px-4 py-24 md:px-12 md:py-48">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">[ What I do ]</p>
      <h2 className="mt-5 max-w-5xl font-display text-4xl leading-[1.02] sm:text-5xl md:mt-6 md:text-8xl">
        Make. Think. <em className="text-muted-foreground">Repeat, slowly.</em>
      </h2>
      <div className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-12">
        {items.map((it, i) => (
          <motion.div
            key={it.t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
          >
            <span className="font-mono text-xs text-muted-foreground">— 0{i + 1}</span>
            <h3 className="mt-4 font-display text-2xl md:text-3xl">{it.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{it.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const socials = [
    { mark: "IG", label: "Instagram", url: "https://instagram.com" },
    { mark: "X", label: "X / Twitter", url: "https://x.com" },
    { mark: "FB", label: "Facebook", url: "https://facebook.com" },
    { mark: "WA", label: "WhatsApp", url: "https://wa.me/" },
  ];
  return (
    <section id="contact" className="relative px-4 py-24 md:px-12 md:py-48">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">[ Elsewhere ]</p>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 font-display text-5xl leading-[0.95] sm:text-7xl md:mt-6 md:text-[12rem]"
      >
        Say <em>hello</em>,<br />or just lurk.
      </motion.h2>

      <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <a
            href="https://samuelchilinda.xyz"
            className="group inline-flex items-center gap-3 font-display text-2xl sm:text-3xl md:gap-4 md:text-5xl"
            data-hover
          >
            <span className="border-b border-border pb-2 transition-colors group-hover:border-foreground break-all">samuelchilinda.xyz</span>
            <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 md:h-8 md:w-8" />
          </a>
          <p className="mt-6 max-w-md text-sm text-muted-foreground">
            The home base. Writing, projects, half-finished ideas — everything I'm thinking about, in one place.
          </p>
        </div>
        <div className="md:col-span-6">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:text-xs">Elsewhere</p>
          <ul className="mt-6 grid grid-cols-2 gap-px bg-border">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between bg-background p-4 transition-colors hover:bg-card md:p-6"
                  data-hover
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="font-mono text-[10px] text-muted-foreground">{s.mark}</span>
                    <span className="truncate text-sm">{s.label}</span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 opacity-40 transition-all group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8 md:px-12 md:py-10">
      <div className="flex flex-col justify-between gap-3 font-mono text-[9px] uppercase tracking-widest text-muted-foreground md:flex-row md:text-[10px]">
        <span>Samuel Chilinda · Oasis Tech Capital LLC</span>
        <span>© {new Date().getFullYear()} — All rights reserved.</span>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main className="noise bg-background text-foreground overflow-x-hidden">
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <What />
      <Contact />
      <Footer />
    </main>
  );
}
