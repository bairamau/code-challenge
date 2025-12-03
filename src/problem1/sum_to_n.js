const sum_to_n_a = (n) => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
};

const sum_to_n_b = (n) => {
  if (n === 0 || n === 1) return n;
  return n + sum_to_n_b(n - 1);
};

const sum_to_n_c = (n) => {
  return Array.from({ length: n }).reduce((acc, _, idx) => acc + idx + 1, 0);
};
