import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { GALLERY, type GalleryItem } from "../../data/autospa";
import { Eyebrow, Reveal } from "./Reveal";

function GalleryCard({ item }: { item: GalleryItem }) {
  const [src, setSrc] = useState(item.src);

  return (
    <figure className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 focus-within:border-blue-500/60">
      <img
        src={src}
        onError={() => {
          if (src !== item.fallback) setSrc(item.fallback);
        }}
        alt={`${item.car} after ${item.service} at Auto Spa America Tampa`}
        loading="lazy"
        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition group-hover:ring-blue-500/40" aria-hidden />

      <span className="absolute right-4 top-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </span>

      <figcaption className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-blue-400">{item.service}</p>
        <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-extrabold tracking-tight text-white">{item.car}</h3>
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">{item.finish}</span>
        </div>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="relative scroll-mt-24 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div
        className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-indigo-700/10 blur-[130px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="flex md:justify-start justify-center">
              <Eyebrow>Transformations</Eyebrow>
            </div>
            <h2 className="mt-5 text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-left">
              Fresh out of the{" "}
              <span className="font-lux-serif font-normal italic text-blue-400">bay.</span>
            </h2>
          </div>
          <p className="mx-auto max-w-sm text-center text-sm leading-relaxed text-zinc-400 md:mx-0 md:text-right">
            A rotating cast of Tampa&rsquo;s finest machines — each one corrected, coated and
            quality-checked under concours lighting before keys change hands.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <Reveal key={item.car} delay={(i % 3) * 110}>
              <GalleryCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
