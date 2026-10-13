// El español es el idioma fuente de las plantillas. En inglés, cada texto de la terminal y cada archivo
// generado pasa por translate() con la tabla de en.ts (reemplazo de frases, de la más larga a la más corta).
import type { Language } from '../answers/types.ts';
import { PAIRS } from './en.ts';

const EN = new Map(PAIRS.filter(([es, en]) => es !== en));
const EN_LONGEST_FIRST = [...EN].sort(([x], [y]) => y.length - x.length);

export function translate(text: string, language: Language): string {
  if (language !== 'en') return text;
  let out = text;
  for (const [es, en] of EN_LONGEST_FIRST) if (out.includes(es)) out = out.split(es).join(en);
  return out;
}

// Idioma de la terminal: se conoce al leer --lang, la primera pregunta o el JSON de respuestas
let current: Language = 'es';

export const setLanguage = (language: Language): void => {
  current = language;
};

export const getLanguage = (): Language => current;

/** Traduce un texto de la terminal al idioma activo. */
export const tr = (text: string): string => translate(text, current);
