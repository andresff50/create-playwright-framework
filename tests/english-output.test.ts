// Un proyecto generado en inglés no debe contener restos de español.
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { GENERATED } from './helpers/generate.ts';

const SPANISH_WORDS = [
  'de', 'la', 'el', 'los', 'las', 'para', 'con', 'sin', 'una', 'que', 'por', 'del', 'cada', 'solo', 'todo',
  'este', 'esta', 'usa', 'ejecuta', 'pruebas', 'datos', 'nunca', 'también', 'archivo', 'carpeta', 'prueba',
  'ambiente', 'reporte', 'usuario', 'conexión', 'página', 'corrida', 'reintentos', 'Revisa', 'Ajusta', 'Opción',
  'Valor', 'Ninguno', 'Sí', 'más', 'como', 'pero', 'aquí', 'después', 'siempre', 'debe', 'tu', 'tus', 'vía',
  'ningún', 'ninguna', 'bajo', 'hasta', 'desde', 'ejemplo', 'nombre', 'valores', 'guarda', 'crea', 'elige',
  'instala',
]; // prettier-ignore
const SPANISH = new RegExp(`[áéíóúñÁÉÍÓÚÑ¿¡]|(?<![\\w-])(${SPANISH_WORDS.join('|')})(?![\\w-])`);

// Contiene las respuestas del usuario tal cual (nombre del proyecto, etc.)
const SKIP = new Set(['scaffold.answers.json']);

for (const g of GENERATED.filter((x) => x.answers.language === 'en')) {
  test(`sin español: ${g.id}`, () => {
    const leftovers: string[] = [];
    for (const [rel, content] of g.files) {
      if (SKIP.has(rel)) continue;
      content.split('\n').forEach((line, i) => {
        if (SPANISH.test(line)) leftovers.push(`${rel}:${i + 1}: ${line.trim()}`);
      });
    }
    assert.deepEqual(leftovers, [], 'añade los pares que falten en src/i18n/en.ts');
  });
}
