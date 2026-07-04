/**
 * Module color map — consistent theming across all modules.
 * Each module has a solid bg, light bg, text color, border, and hex accent.
 */
export const MODULE_COLORS = {
  bokforing:   { solid: 'bg-slate-800',   light: 'bg-slate-50',   text: 'text-slate-600',   border: 'border-slate-300',   accent: '#1e293b', darkBg: 'dark:bg-slate-900/30' },
  fakturering: { solid: 'bg-[#000000]',    light: 'bg-neutral-100',    text: 'text-[#000000]',    border: 'border-black',    accent: '#000000', darkBg: 'dark:bg-blue-900/30' },
  lon:         { solid: 'bg-neutral-700',  light: 'bg-neutral-100', text: 'text-neutral-700', border: 'border-neutral-300', accent: '#000000', darkBg: 'dark:bg-neutral-700/30' },
  moms:        { solid: 'bg-neutral-700',   light: 'bg-neutral-100',  text: 'text-neutral-700',  border: 'border-neutral-300',  accent: '#7c3aed', darkBg: 'dark:bg-neutral-700/30' },
  skatt:       { solid: 'bg-neutral-700',    light: 'bg-neutral-100',   text: 'text-neutral-700',   border: 'border-neutral-300',   accent: '#d97706', darkBg: 'dark:bg-neutral-700/30' },
  budget:      { solid: 'bg-neutral-700',   light: 'bg-neutral-100',  text: 'text-neutral-700',  border: 'border-neutral-300',  accent: '#4f46e5', darkBg: 'dark:bg-neutral-700/30' },
  rapporter:   { solid: 'bg-neutral-700',     light: 'bg-neutral-100',    text: 'text-neutral-700',    border: 'border-neutral-300',    accent: '#525252', darkBg: 'dark:bg-neutral-700/30' },
  bank:        { solid: 'bg-black',     light: 'bg-neutral-100',    text: 'text-black',    border: 'border-black',    accent: '#000000', darkBg: 'dark:bg-blue-900/30' },
  bolag:       { solid: 'bg-black',     light: 'bg-neutral-100',    text: 'text-black',    border: 'border-black',    accent: '#000000', darkBg: 'dark:bg-blue-900/30' },
  hr:          { solid: 'bg-neutral-700',  light: 'bg-neutral-100', text: 'text-neutral-700', border: 'border-neutral-300', accent: '#000000', darkBg: 'dark:bg-neutral-700/30' },
  projekt:     { solid: 'bg-orange-600',   light: 'bg-orange-50',  text: 'text-orange-600',  border: 'border-orange-200',  accent: '#ea580c', darkBg: 'dark:bg-orange-900/30' },
} as const;

export type ModuleKey = keyof typeof MODULE_COLORS;
