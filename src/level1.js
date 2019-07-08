import {test} from 'tape-modern';
import {map, filter, reduce, compose} from 'ramda';
import checkPrimes from './lib/checkPrimes';

export default function() {
  /* Level 1 */
  const ex1 = 'use map to cube (n³) each value and return';
  const exercise1 = _ => {
    const numbers = [3, 6, 9, 12, 15, 18];
    return map(n => n ** 3, numbers); // return answer here
  };

  const ex2 = 'use filter to only return numbers divisible by 6';
  const exercise2 = _ => {
    const numbers = [28, 42, 55, 66, 72, 84, 93];
    return filter(n => n % 6 === 0, numbers); // return answer here
  };

  const ex3 = 'use reduce to sum the numbers';
  const exercise3 = _ => {
    const numbers = [10, 20, 30, 40, 50, 60];
    return reduce((acc, n) => acc + n, 0, numbers); // return answer here
  };

  const ex4 = `use compose to run the following three commands

1. map over the numbers and triple each number
2. use filter and keep the even numbers
3. use reduce to add the resulting numbers
`;
  const exercise4 = _ => {
    const numbers = [1, 3, 6, 10, 13, 16];
    const triple = map(n => n * 3);
    const even = filter(n => n % 2 === 0);
    const sum = reduce((acc, n) => acc + n, 0);
    return compose(
      sum,
      even,
      triple
    )(numbers); // return answer here
  };

  const ex5 = 'Use map to find the square root of each number';
  const exercise5 = _ => {
    const numbers = [9, 16, 25, 36, 49, 64, 81];
    return map(n => Math.sqrt(n), numbers); // return answer here
  };

  const ex6 = 'use filter to return numbers between 10 and 20';
  const exercise6 = _ => {
    const numbers = [1, 5, 6, 3, 10, 12, 18, 21, 28, 34, 39, 45];
    return filter(n => n > 10 && n < 20, numbers); // return answer here
  };

  const ex7 = `use compose and the checkPrimes function to run the following three commands:

  1. Use map to subtract 1 from each numbers
  2. Use filter to return all prime numbers.
  3. Use reduce to count the number of prime numbers in the array.

  ** If you have time at the end, try and figure out how to take the
     checkPrimes formula and write it functionally into your compose **
  `;
  const exercise7 = _ => {
    const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const subtract1 = map(n => n - 1);
    const prime = filter(checkPrimes);
    const count = reduce(acc => ++acc, 0);
    return compose(
      count,
      prime,
      subtract1
    )(numbers); // return answer here
  };

  /* tests to validate exercises go here */
  test('Level 1', assert => {
    assert.same(exercise1(), [27, 216, 729, 1728, 3375, 5832], ex1);
    assert.same(exercise2(), [42, 66, 72, 84], ex2);
    assert.same(exercise3(), 210, ex3);
    assert.same(exercise4(), 96, ex4);
    assert.same(exercise5(), [3, 4, 5, 6, 7, 8, 9], ex5);
    assert.same(exercise6(), [12, 18], ex6);
    assert.same(exercise7(), 5, ex7);
  });
}
