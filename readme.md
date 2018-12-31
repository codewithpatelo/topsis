```javascript

const linearAlgebra = require('linear-algebra')();
const Matrix = linearAlgebra.Matrix; `
	
const topsis = require('topsis');

```

# Topsis
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/76980eb6d7fc488c917cb7cb0b638fd8)](https://app.codacy.com/app/patelotech/topsis?utm_source=github.com&utm_medium=referral&utm_content=patelotech/topsis&utm_campaign=Badge_Grade_Dashboard)
[![npm version](https://badge.fury.io/js/recht.svg)](https://badge.fury.io/js/recht)
[![build](https://travis-ci.org/patelotech/topsis.svg?branch=master)](https://travis-ci.org/patelotech/topsis)
[![Coverage Status](https://coveralls.io/repos/github/patelotech/topsis/badge.svg?branch=master)](https://coveralls.io/github/patelotech/topsis?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/patelotech/topsis/badge.svg?targetFile=package.json)](https://snyk.io/test/github/patelotech/topsis?targetFile=package.json)
[![dependencies Status](https://david-dm.org/patelotech/topsis/status.svg)](https://david-dm.org/patelotech/topsis)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/dashersw/recht/master/LICENSE) [![Greenkeeper badge](https://badges.greenkeeper.io/patelotech/topsis.svg)](https://greenkeeper.io/)

This is the first npm library in NodeJS to implement TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution). This library is fully **open-source** and **free** to use. TOPSIS is an algorithm developed in 1981 by Hwang and Yoon.
It is a technique commonly utilised in the field of operations research, managerial accounting, decision science and prescriptive analytics for multi-attribute decision-making problems (MADC).
Its most common use case is to select the optimal choice from an array of alternatives with conflicting criteria. (For instance, to select a celphone to buy that have the highest quality camera at the lowest price).
The central idea behind the algorithm is that the most desirable solution is the one that has the highest geometric distance (euclidean distance) to the anti-ideal solution and the lowest euclidean distance to the ideal solution.

## Installation

` npm i topsis `

## Example Usage

```javascript
let m = new Matrix([
                    [2, 5, 5], 
                    [60, 26, 4], 
                    [20, 20, 4],  
                    [500, 2, 4], 
                    [50, 23, 3], 
                    [25, 10, 1]
                    ]); 
// m argument is the alternative matrix. Each row is an alternative and each column is a criterion.
                    
let w = [0.27,0.33,0.40];  // This argument indicates the weights of each criteria.
let ia = ['min', 'min', 'max']; // This argument indicates if a criterion is beneficial or not.


topsis.getBest(m, w, ia);
```

Returns:
```javascript
[2, 5, 5]
```

## DEMO

<https://runkit.com/patelotech/runkit-npm-topsis>

## Documentation

| Argument      | Description                                                                                                                                                                                               | Mandatory  | Type                    |  Rules                                                                                                                                                                                                                 |
|:-------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------:|:-----------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| m             | **m** argument stands for 'alternative matrix' and is a matrix that contains the data from all alternatives. Columns are criteria and rows are alternatives.                                              | True       | Matrix of numeric data  | This argument **MUST** be a matrix object from linear-algebra module and **MUST** contain only numeric data.                                                                                                           | 
| w             | **w** argument stands for 'weights argument' or also known as eigenvector and this is the argument that indicates the weighting of each criterion.                                                        | True       | Array of float numbers. | This argument **MUST** have the exact same length than the number of columns that the alternative matrix has. Each weight **MUST** be a number from 0 to 1 and all weights **MUST** sum 1.                             |
| ia            | **ia** argument stands for 'impact argument' and this is the argument that indicates which criteria is beneficial and which is not. So which ones we want to minimise and which ones we want to maximise. | True       | Array of strings.       | This argument **MUST**  have the exact same length than the number of columns that the alternative matrix has. All of the elements of the array **MUST** be strings containing the string 'max' or 'min' accordingly.  |
 
**NOTE:** Make sure to read through bibliography below of TOPSIS to understand how the algorithm works.

### Algorithm Steps

1.  Computing normalised alternative matrix. (Alternative matrix divided by calculated norm of each column).
2.  Computing weighted normalised alternative matrix. (Alternative matrix multiplied by eigenvector).
3.  Calculating the ideal solution. (An hypothetical alternative that maximises benefits and minimises costs the most).
4.  Calculating the anti-ideal solution. (An hypothetical alternative that minimises benefits and maximises costs the most).
5.  For each alternative in the weighted normalised alternative matrix, calculate the euclidean distance to the ideal and anti-ideal solution.
6.  Calculate a performance score for each alternative. (Distance to the anti-ideal solution divided by the sum of the distance of the ideal and anti-ideal solution).
7.  Rank in descending order performance scores for each alternative.
8.  Return the top-one.

## Aditional functions...

### CreateRandom
```javascript
topsis.createRandom(); // Creates random arguments for a topsis.getBest function.

```

Returns:
```javascript
{ 
  m : 
    { data:
     [ [ 478, 6, 184, 1000 ],
       [ 805, 34, 703, 770 ],
       [ 216, 210, 294, 225 ],
       [ 857, 253, 396, 63 ],
       [ 244, 652, 886, 736 ],
       [ 378, 824, 948, 769 ],
       [ 298, 76, 573, 604 ] ],
      rows: 7,
      cols: 4 
    },
  w: [ 0.52, 0.26, 0.04, 0.18 ],
  ia: [ 'max', 'min', 'max', 'max' ]
}
```

## Package roadmap

-   [x] TOPSIS.
-   [x] Support for Linear-Algebra matrices. 
-   [ ] Support for MathJS matrices.
-   [ ] (FTOPSIS) Fuzzy TOPSIS
-   [ ] (IFTOPSIS) Intuisionistic Fuzzy TOPSIS
-   [ ] (NTOPSIS) Neutrosophic TOPSIS

## Package Dependencies

-   linear-algebra

## License

MIT

## Contributing

<https://github.com/patelotech/topsis>

## Linting

-   AIRBNB
[AIRBNB JS CODE STYLE](https://dev.mysql.com/doc/ "AIRBNB JS CODE STYLE")

### Configuration

-   Eslint v-4.19.1 // AIRBNB Configuration

### Linting scripts

-   Error check: `npm run check`
-   Error fix:  `npm run lint` or `npm run lint -- --fix`

## Bibliography

-   Hwang, C. L., & Yoon, K. (1981). Methods for multiple attribute decision making. In Multiple attribute decision making (pp. 58-191).Springer, Berlin, Heidelberg.
cd do
cd do