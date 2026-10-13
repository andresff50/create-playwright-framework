// Genera en memoria (sin tocar el disco) el proyecto de cada variante de la matriz.
import { normalize } from '../../src/answers/normalize.ts';
import type { Answers, RawAnswers } from '../../src/answers/types.ts';
import { buildProject, type ProjectFiles } from '../../src/project/build.ts';
import { VARIANTS, type Variant } from './matrix.ts';

export interface Generated {
  id: string;
  answers: Answers;
  files: ProjectFiles;
}

export function generate(variant: Variant): Generated {
  const answers = normalize(variant.raw as RawAnswers);
  return { id: variant.id, answers, files: buildProject(answers) };
}

export const GENERATED: Generated[] = VARIANTS.map(generate);
