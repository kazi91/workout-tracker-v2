/**
 * units.ts — unit conversion helpers for weight and height display.
 * All values are stored canonically in lb (weight) and inches (height).
 * Convert at display time only — never store converted values.
 * Called by: UserSettingsContext, any component displaying a measurement.
 */

/** Converts pounds to kilograms. */
export function lbToKg(lb: number): number {
  return Math.round(lb * 0.453592 * 10) / 10;
}

/** Converts kilograms to pounds. */
export function kgToLb(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

/** Converts inches to centimetres. */
export function inToCm(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}

/** Converts centimetres to inches. */
export function cmToIn(cm: number): number {
  return Math.round((cm / 2.54) * 10) / 10;
}
