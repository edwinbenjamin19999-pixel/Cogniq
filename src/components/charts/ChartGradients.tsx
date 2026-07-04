/**
 * MINIMALIST MONOCHROME CHART THEME — alla Recharts-diagram i svartvitt.
 * Solida svarta/grå fyllnader (2-stop samma färg så alla url(#grad*)-
 * konsumenter fungerar oförändrat). Serier skiljs med valör + mönster,
 * aldrig färg. Rutnät i hårlinje, data i svart.
 */
export function ChartGradients() { return (
    <defs>
      {/* Primär serie — svart */}
      <linearGradient id="gradTeal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" stopOpacity={1} />
        <stop offset="100%" stopColor="#000000" stopOpacity={1} />
      </linearGradient>

      {/* Sekundär serie — mörkgrå */}
      <linearGradient id="gradRose" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#525252" stopOpacity={1} />
        <stop offset="100%" stopColor="#525252" stopOpacity={1} />
      </linearGradient>

      <linearGradient id="gradIndigo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" stopOpacity={1} />
        <stop offset="100%" stopColor="#000000" stopOpacity={1} />
      </linearGradient>

      <linearGradient id="gradAmber" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A3A3A3" stopOpacity={1} />
        <stop offset="100%" stopColor="#A3A3A3" stopOpacity={1} />
      </linearGradient>

      <linearGradient id="gradViolet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#737373" stopOpacity={1} />
        <stop offset="100%" stopColor="#737373" stopOpacity={1} />
      </linearGradient>

      <linearGradient id="gradEmerald" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" stopOpacity={1} />
        <stop offset="100%" stopColor="#000000" stopOpacity={1} />
      </linearGradient>

      {/* Area-fyllnader — platt låg svart tint, ingen fade */}
      <linearGradient id="areaFillTeal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" stopOpacity={0.08} />
        <stop offset="100%" stopColor="#000000" stopOpacity={0.08} />
      </linearGradient>

      <linearGradient id="areaFillIndigo" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" stopOpacity={0.08} />
        <stop offset="100%" stopColor="#000000" stopOpacity={0.08} />
      </linearGradient>

      <linearGradient id="areaFillRose" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#525252" stopOpacity={0.08} />
        <stop offset="100%" stopColor="#525252" stopOpacity={0.08} />
      </linearGradient>

      <linearGradient id="areaFillAmber" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A3A3A3" stopOpacity={0.12} />
        <stop offset="100%" stopColor="#A3A3A3" stopOpacity={0.12} />
      </linearGradient>

      <linearGradient id="areaFillViolet" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#737373" stopOpacity={0.1} />
        <stop offset="100%" stopColor="#737373" stopOpacity={0.1} />
      </linearGradient>

      <linearGradient id="areaFillEmerald" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#000000" stopOpacity={0.08} />
        <stop offset="100%" stopColor="#000000" stopOpacity={0.08} />
      </linearGradient>
    </defs>
  );
}

/** Axeltext i mono-grått */
export const AXIS_TICK = { fill: '#525252', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' };

/** Rutnät — hårlinje, låg kontrast */
export const GRID_PROPS = { strokeDasharray: "2 4",
  stroke: "#E5E5E5",
  vertical: false,
} as const;

export const BAR_ANIMATION = { animationDuration: 400, animationEasing: "ease-out" as const };
export const LINE_ANIMATION = { animationDuration: 600, animationEasing: "ease-out" as const };

/** Monokrom paletter — valörtrappa från svart till ljusgrått */
export const PIE_COLORS = [
  '#000000', '#525252', '#A3A3A3', '#737373',
  '#262626', '#8C8C8C', '#404040', '#BFBFBF',
];

export const NEON = { teal: '#000000',
  emerald: '#000000',
  rose: '#525252',
  indigo: '#000000',
  amber: '#A3A3A3',
  blue: '#000000',
  violet: '#737373',
  slate: '#A3A3A3',
} as const;

export const TOOLTIP_CURSOR = { fill: 'rgba(0,0,0,0.05)', radius: 0 };

/** Diagramkort — svart kant, skarpa hörn, ingen skugga */
export const CHART_CARD_CLASS = "bg-background rounded-none border border-foreground p-6";
