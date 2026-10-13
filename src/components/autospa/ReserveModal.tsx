import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Car,
  CarFront,
  Check,
  Gem,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import { PACKAGES, PHONE_DISPLAY, PHONE_HREF, TIME_SLOTS, type VehicleClass } from "../../data/autospa";
import { cn } from "../../utils/cn";
import { BUTTON_PHYSICS } from "./Reveal";

export const CERAMIC_ID = "ceramic-consultation";

interface ReserveModalProps {
  open: boolean;
  initialPackageId: string;
  vehicle: VehicleClass;
  onVehicleChange: (v: VehicleClass) => void;
  onClose: () => void;
}

export function ReserveModal({ open, initialPackageId, vehicle, onVehicleChange, onClose }: ReserveModalProps) {
  const [packageId, setPackageId] = useState(initialPackageId);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Sync the package the guest tapped on each time the modal opens.
  useEffect(() => {
    if (open) {
      setPackageId(initialPackageId);
      setSubmitted(false);
      setError("");
    }
  }, [open, initialPackageId]);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button, input, select")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const selectedPackage = PACKAGES.find((p) => p.id === packageId);
  const isCeramic = packageId === CERAMIC_ID;
  const priceLabel = isCeramic
    ? "Free consultation"
    : selectedPackage
      ? `$${vehicle === "suv" ? selectedPackage.suvPrice : selectedPackage.sedanPrice} · ${selectedPackage.duration}`
      : "";

  const reference = useMemo(() => {
    if (!submitted) return "";
    const seed = `${name}-${date}-${slot}`.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return `ASA-${(seed % 9000) + 1000}`;
  }, [submitted, name, date, slot]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please add your name so we can greet you at the desk.");
    if (phone.replace(/\D/g, "").length < 7) return setError("Please add a valid phone number for your ready-text.");
    if (!date) return setError("Please choose a day for your visit.");
    if (!slot) return setError("Please pick an arrival window.");
    setError("");
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Reserve your detailing slot"
    >
      <button
        type="button"
        aria-label="Close reservation"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-[1.75rem] border border-white/12 bg-[#101014] shadow-[0_40px_120px_rgba(0,0,0,0.8)] sm:rounded-[1.75rem]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/70 to-transparent" aria-hidden />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.26em] text-sky-400">
              <Sparkles className="h-3.5 w-3.5" /> Auto Spa America
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
              {submitted ? "You're on the books." : "Reserve your slot."}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {submitted
                ? "Show this reference at the lower-deck valet desk."
                : "Under Cheesecake Factory, International Plaza. 60 seconds to book."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 sm:p-8">
            <div className="rounded-3xl border border-emerald-500/25 bg-emerald-500/[0.07] p-6 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40">
                <BadgeCheck className="h-7 w-7" />
              </span>
              <p className="mt-4 text-[10px] font-extrabold uppercase tracking-[0.24em] text-emerald-300">
                Reservation reference
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight text-white">{reference}</p>
              <dl className="mx-auto mt-5 max-w-xs space-y-2 text-left text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-zinc-500">Guest</dt>
                  <dd className="font-bold text-white">{name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-zinc-500">Service</dt>
                  <dd className="text-right font-bold text-white">
                    {isCeramic ? "Ceramic Consultation" : selectedPackage?.name}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-zinc-500">Arrival</dt>
                  <dd className="font-bold text-white">
                    {date} · {slot}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="font-semibold text-zinc-500">Estimate</dt>
                  <dd className="font-bold text-blue-300">{priceLabel}</dd>
                </div>
              </dl>
            </div>
            <p className="mt-5 text-center text-[13px] leading-relaxed text-zinc-400">
              We&rsquo;ll text <span className="font-bold text-white">{phone}</span> to confirm.
              Need to adjust? Call the desk at{" "}
              <a href={PHONE_HREF} className="font-bold text-sky-400 hover:text-blue-300">
                {PHONE_DISPLAY}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "mt-6 w-full rounded-full bg-blue-600 py-3.5 text-sm font-extrabold text-white shadow-[0_0_28px_rgba(59,130,246,0.45)] hover:bg-blue-500",
                BUTTON_PHYSICS
              )}
            >
              Done — see you at the Plaza
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 p-6 sm:p-8" noValidate>
            {/* Package select */}
            <div>
              <label htmlFor="reserve-package" className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                Select your ritual
              </label>
              <div className="relative mt-2">
                <select
                  id="reserve-package"
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 pr-10 text-sm font-bold text-white outline-none backdrop-blur-md transition-colors focus:border-blue-500/60 [&>option]:bg-zinc-900"
                >
                  {PACKAGES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ${vehicle === "suv" ? p.suvPrice : p.sedanPrice}
                    </option>
                  ))}
                  <option value={CERAMIC_ID}>System X® Ceramic Consultation — Free</option>
                </select>
                <Gem className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-400" />
              </div>
              <p aria-live="polite" className="mt-2 text-xs font-bold text-blue-300">
                {priceLabel}
                {isCeramic ? " · includes free paint assessment" : ""}
              </p>
            </div>

            {/* Vehicle toggle */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-500">Vehicle class</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(
                  [
                    { id: "sedan", label: "Sedan / Coupe", icon: Car },
                    { id: "suv", label: "SUV / Truck / Van", icon: CarFront },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={vehicle === opt.id}
                    onClick={() => onVehicleChange(opt.id)}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-2xl border px-3 py-3 text-[13px] font-extrabold transition-all duration-300",
                      vehicle === opt.id
                        ? "border-blue-500/60 bg-blue-600/20 text-white shadow-[0_0_22px_rgba(59,130,246,0.3)]"
                        : "border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/25 hover:text-white"
                    )}
                  >
                    <opt.icon className="h-4 w-4" /> {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest details */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="reserve-name" className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                  Your name
                </label>
                <input
                  id="reserve-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm font-semibold text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-blue-500/60"
                />
              </div>
              <div>
                <label htmlFor="reserve-phone" className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                  Mobile for ready-text
                </label>
                <input
                  id="reserve-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(813) 555-0100"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm font-semibold text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-blue-500/60"
                />
              </div>
            </div>

            {/* Date + slots */}
            <div>
              <label htmlFor="reserve-date" className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                Day of visit
              </label>
              <input
                id="reserve-date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm font-semibold text-white outline-none transition-colors [color-scheme:dark] focus:border-blue-500/60"
              />
              <fieldset className="mt-4">
                <legend className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-zinc-500">
                  Arrival window
                </legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={slot === t}
                      onClick={() => setSlot(t)}
                      className={cn(
                        "rounded-full border px-4 py-2.5 text-xs font-extrabold transition-all duration-300",
                        slot === t
                          ? "border-blue-500/60 bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.45)]"
                          : "border-white/10 bg-white/[0.04] text-zinc-300 hover:border-blue-500/40 hover:text-white"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            {error && (
              <p role="alert" className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] font-semibold text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={cn(
                "group flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 py-4 text-sm font-extrabold text-white shadow-[0_0_34px_rgba(59,130,246,0.55)] ring-1 ring-sky-400/50 hover:bg-blue-500",
                BUTTON_PHYSICS
              )}
            >
              <CalendarCheck className="h-4 w-4" />
              Confirm Reservation
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="flex items-center justify-center gap-1.5 text-center text-[11px] font-semibold text-zinc-500">
              <Check className="h-3.5 w-3.5 text-sky-400" />
              No prepayment. Pay at pickup — and only when you love the finish.
            </p>
            <p className="flex items-center justify-center gap-1.5 text-center text-xs font-semibold text-zinc-500">
              Prefer to talk? <Phone className="h-3.5 w-3.5 text-sky-400" />
              <a href={PHONE_HREF} className="font-bold text-zinc-300 hover:text-white">
                {PHONE_DISPLAY}
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
