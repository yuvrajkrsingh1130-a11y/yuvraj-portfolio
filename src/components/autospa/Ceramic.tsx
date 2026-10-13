import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Droplets,
  FileCheck2,
  Gem,
  Phone,
  Play,
  ShieldCheck,
  Sun,
} from "lucide-react";
import { CERAMIC_IMAGE, GALLERY, PHONE_DISPLAY, PHONE_HREF } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS, Eyebrow, Reveal } from "./Reveal";

interface CeramicProps {
  onReserve: () => void;
}

/* Observe once, then stay visible (drives counters + demo auto-run). */
function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/** Metallic silver count-up stat. */
function MetalStat({
  to,
  suffix,
  label,
  active,
  delay = 0,
}: {
  to: number;
  suffix: string;
  label: string;
  active: boolean;
  delay?: number;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now() + delay;
    const duration = 1500;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - start) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, delay]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-center backdrop-blur-md">
      <p className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]">
        {value}
        <span className="ml-0.5 bg-none text-xl text-sky-400 [-webkit-text-fill-color:#38bdf8]">{suffix}</span>
      </p>
      <p className="mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
    </div>
  );
}

const DROPLETS = [
  { left: "7%", top: "16%", size: 15, drift: 10 },
  { left: "18%", top: "52%", size: 10, drift: -6 },
  { left: "29%", top: "24%", size: 18, drift: 14 },
  { left: "40%", top: "60%", size: 9, drift: -10 },
  { left: "49%", top: "14%", size: 13, drift: 6 },
  { left: "58%", top: "46%", size: 17, drift: -14 },
  { left: "68%", top: "20%", size: 10, drift: 8 },
  { left: "76%", top: "58%", size: 14, drift: -8 },
  { left: "85%", top: "28%", size: 11, drift: 12 },
  { left: "92%", top: "52%", size: 16, drift: -12 },
  { left: "35%", top: "38%", size: 8, drift: 4 },
  { left: "63%", top: "70%", size: 9, drift: -4 },
] as const;

function HydrophobicDemo({ autoRun }: { autoRun: boolean }) {
  const [sheeting, setSheeting] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const run = () => {
    setSheeting(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSheeting(false), 2400);
  };

  useEffect(() => {
    if (autoRun) {
      const t = window.setTimeout(run, 600);
      return () => window.clearTimeout(t);
    }
  }, [autoRun]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div>
      <div
        onMouseEnter={run}
        className="relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#0b2a4a_0%,#0a4d8f_38%,#06182e_72%,#38bdf8_130%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-30px_60px_rgba(0,0,0,0.55)] sm:h-52"
        role="img"
        aria-label={
          sheeting
            ? "Water sheeting off the ceramic coated panel"
            : "Water beaded on a ceramic coated panel at a 110 degree contact angle"
        }
      >
        {/* gloss sweep */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.14)_45%,transparent_60%)]" aria-hidden />
        {DROPLETS.map((d, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute rounded-full transition-all duration-[1500ms] ease-[cubic-bezier(0.5,0,0.9,0.4)]"
            style={{
              left: d.left,
              top: d.top,
              width: d.size,
              height: d.size * 0.92,
              background:
                "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.98) 0%, rgba(186,230,253,0.85) 34%, rgba(56,189,248,0.55) 68%, rgba(2,44,84,0.65) 100%)",
              boxShadow:
                "inset 0 -2px 4px rgba(2,44,84,0.55), inset 1px 1px 2px rgba(255,255,255,0.8), 0 4px 8px rgba(0,0,0,0.45)",
              transform: sheeting
                ? `translate(${d.drift}px, 190px) scale(0.5)`
                : "translate(0px, 0px) scale(1)",
              opacity: sheeting ? 0 : 1,
              transitionDelay: `${i * 55}ms`,
            }}
          />
        ))}
        <span className="absolute bottom-3 left-4 rounded-full border border-white/20 bg-black/45 px-3 py-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-sky-200 backdrop-blur-md">
          {sheeting ? "Sheeting active — 110° contact angle" : "Beaded — hover to sheet the water"}
        </span>
        <span className="absolute right-4 top-3 rounded-full border border-sky-300/30 bg-sky-400/15 px-3 py-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.18em] text-sky-200 backdrop-blur-md">
          System X® 9H
        </span>
      </div>

      <button
        type="button"
        onClick={run}
        className={cn(
          "mt-4 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/10 px-5 py-2.5 text-xs font-extrabold text-sky-300 hover:bg-sky-500/20",
          BUTTON_PHYSICS
        )}
      >
        <Play className="h-3.5 w-3.5" />
        {sheeting ? "Sheeting…" : "Run water-sheeting demo"}
      </button>
    </div>
  );
}

export function Ceramic({ onReserve }: CeramicProps) {
  const [imgSrc, setImgSrc] = useState(CERAMIC_IMAGE);
  const { ref: bentoRef, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section id="ceramic" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-80 w-[720px] -translate-x-1/2 rounded-full bg-[#38bdf8]/[0.07] blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>System X® Ceramic Protection</Eyebrow>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Armor, engineered{" "}
            <span className="font-lux-serif font-normal italic text-sky-400">like aerospace.</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            A diamond-hard, glass-like shell bonded to your paint by certified installers —
            right here under International Plaza.
          </p>
        </Reveal>

        {/* ---------- High-gloss Bento Grid ---------- */}
        <div
          ref={bentoRef}
          className="mt-14 grid gap-4 rounded-[2rem] border border-white/10 bg-white/[0.02] p-4 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-5 lg:grid-cols-3"
        >
          {/* Card A — Diamond Armor + CarFax */}
          <Reveal className="lg:col-span-2">
            <article className="group relative h-full min-h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition-all duration-300 ease-out hover:-translate-y-2 hover:border-sky-400/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)]">
              <img
                src={imgSrc}
                onError={() => setImgSrc(GALLERY[1].src)}
                alt="Luxury sports car protected with System X 9H Diamond Armor ceramic coating"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/35 to-transparent" aria-hidden />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/60 via-transparent to-transparent" aria-hidden />

              <div className="relative flex h-full flex-col justify-end p-7 sm:p-9">
                <span className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-sky-300/30 bg-[#050507]/60 px-3.5 py-1.5 text-[9.5px] font-extrabold uppercase tracking-[0.2em] text-sky-300 backdrop-blur-md">
                  <Gem className="h-3.5 w-3.5" /> Card A — Flagship Protection
                </span>
                <h3 className="mt-16 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  9H Diamond Armor
                </h3>
                <p className="mt-2.5 max-w-md text-sm leading-relaxed text-zinc-300">
                  Aerospace-grade ceramic that bonds at the molecular level — harder than your
                  clear coat, glossier than the day it left the factory.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-extrabold text-white backdrop-blur-md">
                    <FileCheck2 className="h-3.5 w-3.5 text-sky-300" /> CarFax Registered
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-extrabold text-white backdrop-blur-md">
                    <Sun className="h-3.5 w-3.5 text-sky-300" /> Florida UV Shield
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[11px] font-extrabold text-white backdrop-blur-md">
                    <BadgeCheck className="h-3.5 w-3.5 text-sky-300" /> Certified Installers
                  </span>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Card B — Warranty + metallic counters */}
          <Reveal delay={120}>
            <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-2 hover:border-sky-400/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-500/15 text-sky-400">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-zinc-500">
                Card B — Warranty
              </p>
              <h3 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-white">
                10-Year Transferable Warranty
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-400">
                Registered protection that follows the car — and lifts its resale value — for a
                full decade. If it fails under normal use, we re-apply it.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2.5">
                <MetalStat to={9} suffix="H" label="Pencil hardness" active={inView} />
                <MetalStat to={10} suffix="YR" label="Warranty cover" active={inView} delay={120} />
                <MetalStat to={110} suffix="°" label="Contact angle" active={inView} delay={240} />
                <MetalStat to={24} suffix="HR" label="Full cure" active={inView} delay={360} />
              </div>

              <p className="mt-auto flex items-center gap-2 pt-6 text-[11px] font-bold text-zinc-500">
                <BadgeCheck className="h-4 w-4 shrink-0 text-sky-400" />
                Documented on your vehicle&rsquo;s CarFax report.
              </p>
            </article>
          </Reveal>

          {/* Card C — Hydrophobic demo */}
          <Reveal delay={100} className="lg:col-span-2">
            <article className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-7 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-2 hover:border-sky-400/50 hover:shadow-[0_20px_50px_rgba(59,130,246,0.3)] sm:p-8">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-md">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-sky-400/30 bg-sky-500/15 text-sky-400">
                    <Droplets className="h-5 w-5" />
                  </span>
                  <p className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-zinc-500">
                    Card C — Live Demo
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
                    Intense Hydrophobic Beading
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                    Water, lovebugs and road film refuse to stick. Watch the panel shed every
                    droplet — this is your wash routine, reduced to a rinse.
                  </p>
                </div>
                <span className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
                  <span className="block bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                    110°
                  </span>
                  <span className="mt-0.5 block text-[8.5px] font-extrabold uppercase tracking-[0.16em] text-zinc-500">
                    Contact angle
                  </span>
                </span>
              </div>
              <HydrophobicDemo autoRun={inView} />
            </article>
          </Reveal>

          {/* CTA card */}
          <Reveal delay={200}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-sky-400/30 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 p-7 shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_55px_rgba(59,130,246,0.45)] sm:p-8">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#38bdf8]/30 blur-[70px]"
                aria-hidden
              />
              <p className="relative text-[10px] font-extrabold uppercase tracking-[0.24em] text-sky-300">
                Begin Here
              </p>
              <h3 className="relative mt-2 text-2xl font-extrabold leading-tight tracking-tight text-white">
                Reserve your ceramic consultation.
              </h3>
              <p className="relative mt-2.5 text-[13px] leading-relaxed text-blue-100/85">
                Free paint assessment under concours lighting. No obligation, no pressure — just
                a straight answer on what your paint needs.
              </p>
              <button
                type="button"
                onClick={onReserve}
                className={cn(
                  "group relative mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-extrabold text-blue-950 shadow-xl hover:bg-sky-50",
                  BUTTON_PHYSICS
                )}
              >
                <Gem className="h-4 w-4" />
                Reserve Ceramic Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <a
                href={PHONE_HREF}
                className="relative mt-3.5 inline-flex items-center justify-center gap-2 text-xs font-bold text-sky-200 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5" /> or call {PHONE_DISPLAY}
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
