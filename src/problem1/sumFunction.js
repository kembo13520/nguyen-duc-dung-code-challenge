// Using Array.from and reduce
const sum_to_n_a = (n) => {
  // Create an array from 1 to n and use reduce to sum the values
  return Array.from({ length: n }, (_, i) => i + 1).reduce(
    (sum, current) => sum + current,
    0
  );
};

// Using a for loop
const sum_to_n_b = (n) => {
  let sum = 0;
  // Loop through numbers from 1 to n and accumulate the sum
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Using recursion
const sum_to_n_c = (n) => {
  if (n === 0) return 0; // Base case: if n is 0, return 0
  // Sum the current value of n and recursively call the function for n-1
  return n + sum_to_n_c(n - 1);
};
