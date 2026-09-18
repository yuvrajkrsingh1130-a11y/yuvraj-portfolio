import type { Project } from "../data/projects";

/* ============================================================
   COVER ART — procedural SVG placeholders, one composition per
   project variant. Replace this component's output with real
   imagery (<img>) when the projects ship — layout won't care.
   ============================================================ */

interface Props {
  project: Project;
  className?: string;
  label?: string;
}

const VB_W = 1200;
const VB_H = 900;

function Monolith({ p }: { p: Project }) {
  const { bg, fg, accent } = p.palette;
  return (
    <>
      <rect width={VB_W} height={VB_H} fill={bg} />
      {[140, 300, 460, 620, 780, 940].map((x, i) => (
        <rect
          key={x}
          x={x}
          y={i % 2 ? 90 : 170}
          width={110}
          height={i % 2 ? 720 : 560}
          fill={i === 3 ? accent : fg}
        />
      ))}
      <text x={140} y={846} fontFamily="'Space Mono',monospace" fontSize={30} fill={fg} letterSpacing={10}>
        {p.index} — {p.categoryLabel}
      </text>
      <text
        x={600}
        y={520}
        textAnchor="middle"
        fontFamily="Syne,Arial Black,Arial"
        fontWeight={900}
        fontSize={230}
        fill={bg}
        stroke={fg}
        strokeWidth={4}
        letterSpacing={-8}
      >
        {p.title}
      </text>
    </>
  );
}

function Static({ p }: { p: Project }) {
  const { bg, fg, accent } = p.palette;
  return (
    <>
      <rect width={VB_W} height={VB_H} fill={bg} />
      {Array.from({ length: 26 }).map((_, i) => (
        <rect
          key={i}
          x={0}
          y={30 + i * 34}
          width={VB_W}
          height={i % 7 === 3 ? 10 : 2}
          fill={i % 5 === 0 ? accent : fg}
          opacity={i % 7 === 3 ? 1 : 0.5}
          transform={`translate(${(i % 4) * 14 - 28},0)`}
        />
      ))}
      <rect x={700} y={150} width={380} height={380} fill={fg} />
      <text x={890} y={395} textAnchor="middle" fontFamily="Syne,Arial Black,Arial" fontWeight={900} fontSize={150} fill={bg}>
        {p.index}
      </text>
      <text x={80} y={680} fontFamily="Syne,Arial Black,Arial" fontWeight={900} fontSize={190} fill={fg} letterSpacing={-6}>
        {p.title}
      </text>
      <text x={80} y={130} fontFamily="'Space Mono',monospace" fontSize={28} fill={fg} letterSpacing={8}>
        SIGNAL / INTERFERENCE / PRINT
      </text>
    </>
  );
}

function Signal({ p }: { p: Project }) {
  const { bg, fg, accent } = p.palette;
  const wave = (yBase: number, amp: number, phase: number) => {
    let d = `M 0 ${yBase}`;
    for (let x = 0; x <= VB_W; x += 20) {
      const y = yBase + Math.sin(x * 0.018 + phase) * amp * Math.sin(x * 0.0021 + phase * 2);
      d += ` L ${x} ${y.toFixed(1)}`;
    }
    return d;
  };
  return (
    <>
      <rect width={VB_W} height={VB_H} fill={bg} />
      <path d={wave(300, 120, 0)} stroke={fg} strokeWidth={3} fill="none" />
      <path d={wave(450, 180, 2)} stroke={accent} strokeWidth={5} fill="none" />
      <path d={wave(600, 90, 4)} stroke={fg} strokeWidth={2} fill="none" opacity={0.6} />
      <path d={wave(700, 40, 1)} stroke={fg} strokeWidth={1.5} fill="none" opacity={0.35} />
      <text x={60} y={200} fontFamily="Syne,Arial Black,Arial" fontWeight={900} fontSize={200} fill={fg} letterSpacing={-6}>
        {p.title}
      </text>
      <text x={60} y={830} fontFamily="'Space Mono',monospace" fontSize={30} fill={accent} letterSpacing={12}>
        LIVE — WEBGL — {p.year}
      </text>
    </>
  );
}

function Velocity({ p }: { p: Project }) {
  const { bg, fg, accent } = p.palette;
  return (
    <>
      <rect width={VB_W} height={VB_H} fill={bg} />
      <g transform="skewX(-12)">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={200 + i * 210} y={120} width={i === 2 ? 150 : 60} height={560} fill={i === 2 ? accent : fg} opacity={i === 2 ? 1 : 0.85} />
        ))}
      </g>
      <text x={90} y={820} fontFamily="Syne,Arial Black,Arial" fontWeight={900} fontSize={260} fill={fg} letterSpacing={-10}>
        {p.title.split(" ")[0]}
      </text>
      <text x={1110} y={160} textAnchor="end" fontFamily="'Space Mono',monospace" fontSize={34} fill={fg} letterSpacing={8}>
        {p.index} / {p.year}
      </text>
    </>
  );
}

function Anthem({ p }: { p: Project }) {
  const { bg, fg, accent } = p.palette;
  return (
    <>
      <rect width={VB_W} height={VB_H} fill={bg} />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={600} cy={430} r={60 + i * 46} fill="none" stroke={fg} strokeWidth={i % 3 === 0 ? 6 : 2} opacity={1 - i * 0.08} />
      ))}
      <circle cx={600} cy={430} r={44} fill={fg} />
      <text x={600} y={452} textAnchor="middle" fontFamily="Syne,Arial Black,Arial" fontWeight={900} fontSize={54} fill={bg}>
        {p.index}
      </text>
      <text x={60} y={150} fontFamily="Syne,Arial Black,Arial" fontWeight={900} fontSize={130} fill={fg} letterSpacing={-4}>
        NOISE
      </text>
      <text x={1140} y={840} textAnchor="end" fontFamily="Syne,Arial Black,Arial" fontWeight={900} fontSize={130} fill={fg} letterSpacing={-4}>
        ANTHEM
      </text>
      <rect x={60} y={780} width={260} height={50} fill={accent} />
    </>
  );
}

function Machines({ p }: { p: Project }) {
  const { bg, fg, accent } = p.palette;
  return (
    <>
      <rect width={VB_W} height={VB_H} fill={bg} />
      <defs>
        <radialGradient id={`chrome-${p.slug}`} cx="0.35" cy="0.28" r="0.9">
          <stop offset="0%" stopColor={fg} />
          <stop offset="45%" stopColor="#8a867c" />
          <stop offset="72%" stopColor="#26241f" />
          <stop offset="100%" stopColor={bg} />
        </radialGradient>
      </defs>
      <ellipse cx={430} cy={470} rx={310} ry={290} fill={`url(#chrome-${p.slug})`} />
      <ellipse cx={820} cy={330} rx={190} ry={180} fill="none" stroke={accent} strokeWidth={5} />
      <ellipse cx={860} cy={620} rx={120} ry={115} fill={accent} />
      <text x={880} y={660} textAnchor="middle" fontFamily="'Space Mono',monospace" fontSize={34} fill={bg} letterSpacing={6}>
        SOFT
      </text>
      <text x={60} y={130} fontFamily="'Space Mono',monospace" fontSize={28} fill={fg} letterSpacing={10}>
        {p.index} — EXPERIMENT — {p.year}
      </text>
      <text x={60} y={840} fontFamily="Syne,Arial Black,Arial" fontWeight={900} fontSize={110} fill="none" stroke={fg} strokeWidth={2} letterSpacing={-2}>
        {p.title}
      </text>
    </>
  );
}

export default function CoverArt({ project, className = "", label }: Props) {
  const render = () => {
    switch (project.cover) {
      case "monolith":
        return <Monolith p={project} />;
      case "static":
        return <Static p={project} />;
      case "signal":
        return <Signal p={project} />;
      case "velocity":
        return <Velocity p={project} />;
      case "anthem":
        return <Anthem p={project} />;
      case "machines":
        return <Machines p={project} />;
    }
  };

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={className}
      role="img"
      aria-label={label ?? `${project.title} — ${project.categoryLabel}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {render()}
    </svg>
  );
}
