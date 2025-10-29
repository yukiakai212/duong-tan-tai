/**
 * Assume the input has already been validated,
 * with n >= 1 and n < MAX_SAFE_INTEGER (including the returned result)
 */

export function sum_to_n_a(n: number): number {
  // basic sum with for
  // algorithmic complexity: O(n)
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
}

export function sum_to_n_b(n: number): number {
  // sum with recursion
  // algorithmic complexity: O(n)
  if (n === 1) return 1;
  return n + sum_to_n_b(n - 1);
}

export function sum_to_n_c(n: number): number {
  // sum with arithmetic progression
  // algorithmic complexity: O(1)
  return (n * (n + 1)) / 2;
}
