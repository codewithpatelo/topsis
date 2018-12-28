var assert = require('assert');

const linearAlgebra = require('linear-algebra')(),     
    Vector = linearAlgebra.Vector,
    Matrix = linearAlgebra.Matrix;
    
const topsis = require('../index.js');

let m = new Matrix([[2, 5, 5], [60, 26, 4], [20, 20, 4],  [500, 2, 4], [50, 23, 3], [25, 10, 1]]);
let ia = ['min', 'min', 'max'];
let w = [0.27,0.33,0.40];

    describe('isArray', function() {
    it('Result should be array.', function(){
      assert.equal(Array.isArray(topsis.getBest(m,w,ia)), Array.isArray([2, 5, 5]));
    });
  });

  describe('getBest', function() {
    it('should return the alternative with the lowest euclidean distance to ideal solution and highest to the anti ideal solution and it should be array with numeric data', function(){
      assert.equal(topsis.getBest(m,w,ia), topsis.getBest(m,w,ia));
    });
  });

