// Modelo de las respuestas del usuario. Añadir una opción nueva empieza aquí: el compilador señala el resto.

/** Idioma de las preguntas y del proyecto generado. */
export type Language = 'es' | 'en';
/** Lenguaje del framework generado. */
export type Lang = 'ts' | 'py';
/** Gestor de dependencias: npm en TypeScript; pip o Poetry en Python. */
export type PackageManager = 'npm' | 'pip' | 'poetry';
export type Size = 'small' | 'medium' | 'large';
export type Browser = 'chromium' | 'firefox' | 'webkit' | 'mobile-chrome' | 'mobile-safari';
export type Reporter = 'html' | 'junit' | 'allure' | 'metrics';
export type Db = 'none' | 'postgres' | 'mysql' | 'mssql' | 'mongodb';
/** Motores con cliente de base de datos generado. */
export type DbEngine = Exclude<Db, 'none'>;
export type Extra = 'a11y' | 'visual';
export type Docker = 'none' | 'dockerfile' | 'compose';
export type Ci = 'github' | 'jenkins' | 'gitlab' | 'azure';

/** Opción de un catálogo, tal como se muestra en la terminal. */
export interface Option<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

/** Respuestas que tienen un valor sugerido según el tamaño del proyecto. */
export interface SizeDefaults {
  envs: string[];
  browsers: Browser[];
  reporters: Reporter[];
  api: boolean;
  db: Db;
  data: boolean;
  auth: boolean;
  extras: Extra[];
  bdd: boolean;
  docker: Docker;
  ci: Ci[];
  shards: number;
  lint: boolean;
  precommit: boolean;
  claude: boolean;
}

/** Respuestas completas y coherentes: lo que reciben las plantillas. */
export interface Answers extends SizeDefaults {
  language: Language;
  size: Size;
  lang: Lang;
  packageManager: PackageManager;
  name: string;
  baseUrl: string;
  git: boolean;
}

/** Respuestas tal como llegan de las preguntas o de un JSON (--answers): todo es opcional. */
export type RawAnswers = Partial<Answers>;
