import { describe, it, expect } from 'vitest';
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from '../src/index.js';

describe('Sum methods', () => {
  it('sum_to_n_c should correctly calculate the sum of numbers from 1 to n using the formula', () => {
    expect(sum_to_n_c(1)).toBe(1);
    expect(sum_to_n_c(3)).toBe(6); // 1 + 2 + 3 = 6
    expect(sum_to_n_c(5)).toBe(15); // 1 + 2 + 3 + 4 + 5 = 15
    expect(sum_to_n_c(10)).toBe(55); // 1 + 2 + ... + 10 = 55
  });

  it('sum_to_n_a should correctly calculate the sum of numbers from 1 to n using a loop', () => {
    expect(sum_to_n_a(1)).toBe(1);
    expect(sum_to_n_a(3)).toBe(6); // 1 + 2 + 3 = 6
    expect(sum_to_n_a(5)).toBe(15); // 1 + 2 + 3 + 4 + 5 = 15
    expect(sum_to_n_a(10)).toBe(55); // 1 + 2 + ... + 10 = 55
  });

  it('sum_to_n_b should correctly calculate the sum of numbers from 1 to n using recursion', () => {
    expect(sum_to_n_b(1)).toBe(1);
    expect(sum_to_n_b(3)).toBe(6); // 1 + 2 + 3 = 6
    expect(sum_to_n_b(5)).toBe(15); // 1 + 2 + 3 + 4 + 5 = 15
    expect(sum_to_n_b(10)).toBe(55); // 1 + 2 + ... + 10 = 55
  });
});
