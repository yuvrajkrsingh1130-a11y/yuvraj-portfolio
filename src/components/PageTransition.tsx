import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type MouseEvent,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap, prefersReducedMotion } from "../lib/motion";
import { getLenis } from "../lib/scroll";

/* ============================================================
   PAGE TRANSITIONS — one shared ink panel with the name set in
   huge type. In ≈ 420ms, out ≈ 520ms. Reduced motion = instant.
   ============================================================ */

interface TransitionCtx {
  navigateTo: (to: string) => void;
}

const Ctx = createContext<TransitionCtx>({ navigateTo: () => {} });

export function useTransitionNav(): TransitionCtx {
  return useContext(Ctx);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pendingRef = useRef<string | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const resetScroll = useCallback(() => {
    window.scrollTo(0, 0);
    getLenis()?.scrollTo(0, { immediate: true });
  }, []);

  const navigateTo = useCallback(
    (to: string) => {
      if (to === location.pathname) return;
      if (prefersReducedMotion()) {
        navigate(to);
        resetScroll();
        return;
      }
      pendingRef.current = to;
      tlRef.current?.kill();
      const overlay = overlayRef.current;
      if (!overlay) {
        navigate(to);
        return;
      }
      overlay.style.visibility = "visible";
      overlay.style.pointerEvents = "auto";
      if (labelRef.current) labelRef.current.textContent = to.replace("/", "").toUpperCase() || "INDEX";
      tlRef.current = gsap
        .timeline()
        .set(overlay, { scaleY: 0, transformOrigin: "50% 100%" })
        .to(overlay, { scaleY: 1, duration: 0.42, ease: "power4.inOut" })
        .add(() => {
          navigate(to);
          resetScroll();
        });
    },
    [location.pathname, navigate, resetScroll]
  );

  /* after every route change: retract the panel if a transition
     is pending, otherwise make sure the overlay stays hidden
     (back/forward navigation skips the overlay) */
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    if (pendingRef.current !== null) {
      pendingRef.current = null;
      tlRef.current?.kill();
      const t = gsap
        .timeline({ delay: 0.05 })
        .set(overlay, { transformOrigin: "50% 0%" })
        .to(overlay, { scaleY: 0, duration: 0.52, ease: "power4.inOut" })
        .set(overlay, { visibility: "hidden", pointerEvents: "none" });
      tlRef.current = t;
      return () => {
        t.kill();
      };
    }
    gsap.set(overlay, { scaleY: 0, visibility: "hidden", pointerEvents: "none" });
  }, [location.pathname]);

  return (
    <Ctx.Provider value={{ navigateTo }}>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[120] flex origin-bottom scale-y-0 items-center justify-center bg-[var(--ink)] [visibility:hidden]"
        aria-hidden="true"
      >
        <div className="text-center text-[var(--paper)]">
          <p className="display text-[clamp(2.6rem,9vw,8rem)] leading-[0.85]">
            YUVRAJ
            <br />
            SINGH<span className="text-[var(--accent)]">*</span>
          </p>
          <span ref={labelRef} className="tiny-label mt-6 inline-block text-[var(--accent)]">
            WORK
          </span>
        </div>
      </div>
    </Ctx.Provider>
  );
}

/** <a> that routes through the transition system. */
export function TransitionLink({
  to,
  children,
  className = "",
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
} & Record<string, unknown>) {
  const { navigateTo } = useTransitionNav();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigateTo(to);
  };
  return (
    <Link to={to} onClick={onClick} className={className} {...rest}>
      {children}
    </Link>
  );
}
