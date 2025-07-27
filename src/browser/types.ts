/**
 * Minimal representation of an Emscripten module used by the browser API.
 */
export interface EmscriptenModule {
  /** Allocates size bytes on the module heap. */
  _malloc(size: number): number;
  /** Frees a previously allocated block. */
  _free(ptr: number): void;
  /** Reads a numeric value from the module heap. */
  getValue(ptr: number, type: 'i32' | 'double'): number;
  /** Swiss ephemeris functions compiled by Emscripten */
  _swe_julday(year: number, month: number, day: number, hour: number, gregflag: number): number;
  _swe_revjul(jd: number, gregflag: number, yearPtr: number, monthPtr: number, dayPtr: number, hourPtr: number): void;
}
