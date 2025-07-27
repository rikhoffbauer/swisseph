/**
 * Swiss Ephemeris WASM module loader and API.
 *
 * This module exposes a minimal subset of the Swiss Ephemeris functions
 * compiled to WebAssembly. Functions return Promises and load the WASM
 * module lazily on first use.
 */
import type { EmscriptenModule } from './types';
import wasmFactory from 'swisseph-wasm';

let modulePromise: Promise<EmscriptenModule> | undefined;

/**
 * Loads the WebAssembly module if it hasn't been loaded yet.
 *
 * @returns Promise that resolves with the initialized WASM module.
 */
export function loadModule(): Promise<EmscriptenModule> {
  if (!modulePromise) {
    modulePromise = wasmFactory();
  }
  return modulePromise!;
}

/**
 * Calculates the Julian day number for the given date.
 *
 * @param year - Full year (e.g. 2024).
 * @param month - Month number 1-12.
 * @param day - Day of the month.
 * @param hour - Decimal hours of the day.
 * @param gregflag - Calendar system flag.
 * @returns Promise resolving to the Julian day number.
 */
export async function swe_julday(
  year: number,
  month: number,
  day: number,
  hour: number,
  gregflag: number
): Promise<number> {
  const mod = await loadModule();
  return (mod as any)._swe_julday(year, month, day, hour, gregflag) as number;
}

/**
 * Converts a Julian day value back to calendar date components.
 *
 * @param jd - Julian day to convert.
 * @param gregflag - Calendar system flag.
 * @returns Promise containing `{ year, month, day, hour }`.
 */
export async function swe_revjul(
  jd: number,
  gregflag: number
): Promise<{ year: number; month: number; day: number; hour: number }> {
  const mod = await loadModule();
  const yearPtr = (mod as any)._malloc(4);
  const monthPtr = (mod as any)._malloc(4);
  const dayPtr = (mod as any)._malloc(4);
  const hourPtr = (mod as any)._malloc(8);

  (mod as any)._swe_revjul(jd, gregflag, yearPtr, monthPtr, dayPtr, hourPtr);

  const result = {
    year: (mod as any).getValue(yearPtr, 'i32') as number,
    month: (mod as any).getValue(monthPtr, 'i32') as number,
    day: (mod as any).getValue(dayPtr, 'i32') as number,
    hour: (mod as any).getValue(hourPtr, 'double') as number,
  };

  (mod as any)._free(yearPtr);
  (mod as any)._free(monthPtr);
  (mod as any)._free(dayPtr);
  (mod as any)._free(hourPtr);

  return result;
}
