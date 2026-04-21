import { describe, it, expect } from 'vitest';
import { lbToKg, kgToLb, inToCm, cmToIn } from './units';

describe('lbToKg', () => {
  it('converts 100 lb to 45.4 kg', () => {
    expect(lbToKg(100)).toBe(45.4);
  });

  it('converts 0 lb to 0 kg', () => {
    expect(lbToKg(0)).toBe(0);
  });
});

describe('kgToLb', () => {
  it('converts 100 kg to 220.5 lb', () => {
    expect(kgToLb(100)).toBe(220.5);
  });

  it('converts 0 kg to 0 lb', () => {
    expect(kgToLb(0)).toBe(0);
  });
});

describe('inToCm', () => {
  it('converts 70 inches to 177.8 cm', () => {
    expect(inToCm(70)).toBe(177.8);
  });

  it('converts 0 inches to 0 cm', () => {
    expect(inToCm(0)).toBe(0);
  });
});

describe('cmToIn', () => {
  it('converts 180 cm to 70.9 inches', () => {
    expect(cmToIn(180)).toBe(70.9);
  });

  it('converts 0 cm to 0 inches', () => {
    expect(cmToIn(0)).toBe(0);
  });
});
