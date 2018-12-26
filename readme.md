` cons linearAlgebra = require('linear-algebra')(),   
    Vector = linearAlgebra.Vector,
    Matrix = linearAlgebra.Matrix; `

` cons topsis = require('topsis') `


# Topsis

TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution) is an algorithm developed in 1981 by Hwang and Yoon.
It is a technique commonly utilised in the field of operation research, managerial accounting, decision science and prescriptive analytics for multi-attribute decision-making problems (MADC).
Its most common use case is to select the optimal choice from an array of alternatives with complicting criteria. (For instance, to select a celphone to buy that have the highest quality camera at the lowest price).
The central idea behind the algorithm is that the most desirable solution is the one that has the highest geometric distance (euclidean distance) to the anti-ideal solution and the lowest euclidean distance to the ideal solution.

## Installation

` npm i topsis `

## Example Usage

```javascript
var m = new Matrix([[2, 5, 5], [60, 26, 4], [20, 20, 4],  [500, 2, 4], [50, 23, 3], [25, 10, 1]]); // This argument is the alternative matrix. Each row is an alternative and each column is a criterion.
let ia = ['min', 'min', 'max']; // This argument indicates if a criterion is beneficial or not.
let w = [0.27,0.33,0.40];  // This argument indicates the weights of each criteria.


topsis.getBest(m, w, ia);
```

Returns:
```javascript
[2, 5, 5]
```

## License

MIT

## Package Dependencies

* linear-algebra

## Bibliography

* Hwang, C. L., & Yoon, K. (1981). Methods for multiple attribute decision making. In Multiple attribute decision making (pp. 58-191).Springer, Berlin, Heidelberg.