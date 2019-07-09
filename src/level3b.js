import {test} from 'tape-modern';
import {
  map,
  filter,
  reduce,
  compose,
  head,
  tail,
  join,
  split,
  prop,
  max,
} from 'ramda';
// import capitalizeWords from './lib/capitalize';

const cars = [
  {
    model: 'silverado',
    make: 'chevy',
    engine: 'V8',
    color: 'black',
    year: 1999,
    salesPrice: 29000,
  },
  {
    model: 'grand prix',
    make: 'pontiac',
    engine: 'V6',
    color: 'red',
    year: 2001,
    salesPrice: 32000,
  },
  {
    model: 'deville',
    make: 'cadillac',
    engine: 'V8',
    color: 'brown',
    year: 2002,
    salesPrice: 36000,
  },
  {
    model: 'land cruiser',
    make: 'toyota',
    engine: 'V8',
    color: 'black',
    year: 2001,
    salesPrice: 40000,
  },
  {
    model: 'civic',
    make: 'honda',
    engine: 'V4',
    color: 'silver',
    year: 2004,
    salesPrice: 29000,
  },
  {
    model: 'sierra',
    make: 'GMC',
    engine: 'V8',
    color: 'navy',
    year: 2006,
    salesPrice: 30000,
  },
];

/* Level 3 - Paintings */
export default function() {
  /**
   *  Placing capitalizeModel function in the parent scope so it can be
   *  used in both exercise 1 and exercise 6
   * */
  const capitalizeModel = car => {
    const modelArray = split(' ');
    const capitalized = map(
      word => head(word).toUpperCase() + tail(word).toLowerCase()
    );
    const joined = join(' ');
    return compose(
      joined,
      capitalized,
      modelArray
    )(car.model);
  };

  const ex1 =
    'Use map to transform the list of auto models to uppercase the first letter of each word';
  const exercise1 = _ => {
    return map(capitalizeModel, cars);
  };

  const ex2 = 'Use filter to return a list of cars made between 2001-2004';
  const exercise2 = _ => {
    const filterFn = car => car.year >= 2001 && car.year <= 2004;
    return filter(filterFn, cars);
  };

  const ex3 = 'Use reduce to count the number of cars that were made in the 2000s';
  const exercise3 = _ => {
    const reducer = (count, car) => {
      return car.year >= 2000 ? ++count : count;
    };
    return reduce(reducer, 0, cars);
  };

  const ex4 =
    'Use map, filter and reduce with compose to return the price of the the most expensive car from the 2000s ';
  const exercise4 = _ => {
    const carsFrom2000s = filter(car => car.year >= 2000);
    const salesPrices = map(car => prop('salesPrice', car));
    const mostExpensive = reduce(max, 0);
    return compose(
      mostExpensive,
      salesPrices,
      carsFrom2000s
    )(cars);
  };

  const ex5 = `Use map to transform the salesPrice to USD currency format (ex: $400,000.00)

    ** Hint: Check MDN for the toLocaleString method on the Number Object **
    `;
  const exercise5 = _ => {
    const makeCurrency = car => {
      return car.salesPrice.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
    };
    return map(makeCurrency, cars);
  };

  const ex6 = `Use compose and filter to return cars with V8s, map over them and return the names of the cars with the first letter capitalized.`;

  const exercise6 = _ => {
    const carsWithV8s = filter(car => car.engine === 'V8');
    // using capitalizeModel function from exercise 1
    const capitalizedNames = map(capitalizeModel);
    return compose(
      capitalizedNames,
      carsWithV8s
    )(cars);
  };

  /* tests to validate exercises go here */
  test('test', assert => {
    assert.same(
      exercise1(),
      ['Silverado', 'Grand Prix', 'Deville', 'Land Cruiser', 'Civic', 'Sierra'],
      ex1
    );

    assert.same(
      exercise2(),
      [
        {
          model: 'grand prix',
          make: 'pontiac',
          engine: 'V6',
          color: 'red',
          year: 2001,
          salesPrice: 32000,
        },
        {
          model: 'deville',
          make: 'cadillac',
          engine: 'V8',
          color: 'brown',
          year: 2002,
          salesPrice: 36000,
        },
        {
          model: 'land cruiser',
          make: 'toyota',
          engine: 'V8',
          color: 'black',
          year: 2001,
          salesPrice: 40000,
        },
        {
          model: 'civic',
          make: 'honda',
          engine: 'V4',
          color: 'silver',
          year: 2004,
          salesPrice: 29000,
        },
      ],
      ex2
    );
    assert.same(exercise3(), 5, ex3);
    assert.same(exercise4(), 40000, ex4);
    assert.same(exercise5(), [
      '$29,000.00',
      '$32,000.00',
      '$36,000.00',
      '$40,000.00',
      '$29,000.00',
      '$30,000.00',
    ]);
    assert.same(
      exercise6(),
      ['Silverado', 'Deville', 'Land Cruiser', 'Sierra'],
      ex6
    );
  });
}
