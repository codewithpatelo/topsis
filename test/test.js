const should = require('chai').should();

const linearAlgebra = require('linear-algebra')();

const Matrix = linearAlgebra.Matrix;

const topsis = require('../index.js');



// Testing Errors ...

let m = new Matrix([[2, 5, 5], [60, 26, 4], [20, 20, 4], [500, 2, 4], [50, 23, 3], [25, 10, 1]]);
let w = [0.27, 0.33, 0.4];
let ia = ['min', 'min', 'max'];

let result = null;

describe('ErrIsMatrix', () => {
  it('If m argument is not matrix it should throw error alert.', () => {
	result = topsis.getBest('test', w, ia);
    result.should.equal('ERROR');
  });
});

describe('ErrIsArray', () => {
  it('If ia argument is not an array it should throw error alert.', () => {
	result = topsis.getBest(m, w, 0);
    result.should.equal('ERROR');
  });
});

describe('ErrIaLength', () => {
  it('If ia argument has a larger length than m columns it should throw error alert.', () => {
	result = topsis.getBest(m, w, ['min', 'min', 'max', 'min']);
    result.should.equal('ERROR');
  });
});

describe('ErrIaType', () => {
  it('If ia argument has elements that are not strings it should throw error alert.', () => {
	result = topsis.getBest(m, w, [5, 7, 'max']);
    result.should.equal('ERROR');
  });
});

describe('ErrIaRule', () => {
  it('If ia argument has elements that are not max/min strings it should throw error alert.', () => {
    result = topsis.getBest(m, w, ['test', 'test', 'test']);
	result.should.equal('ERROR');
  });
});


describe('ErrWtype', () => {
  it('If w argument is not an array it should throw error alert.', () => {
    result = topsis.getBest(m, 'test', ia);
	result.should.equal('ERROR');
  });
});

describe('ErrWsize', () => {
  it('If w argument length is not matching m column size it should throw error alert.', () => {
    result = topsis.getBest(m, [0.25, 0.25, 0.25, 0.25], ia);
	result.should.equal('ERROR');
  });
});

describe('ErrWhigherone', () => {
  it('If any w argument element is higher than 1 it should throw error alert.', () => {
    result = topsis.getBest(m, [3.25, 0.25, 0.25], ia);
	result.should.equal('ERROR');
  });
});

describe('ErrWsum', () => {
  it('If w argument element sum is higher than 1 it should throw error alert.', () => {
    result = topsis.getBest(m, [0.95, 0.65, 0.45], ia);
	result.should.equal('ERROR');
  });
});


describe('isArray', () => {
  it('Result should be array.', () => {
    result = topsis.getBest(m, w, ia);
    console.log(m,w,ia);
	result.should.be.a('array');
  });
});

describe('getBest', () => {
  it('should return the alternative with the lowest euclidean distance to ideal solution and highest to the anti ideal solution and it should be array with numeric data', () => {
    console.log(topsis.getBest(m, w, ia));
	result = topsis.getBest(m, w, ia);
    result.should.have.lengthOf(m.cols)
  });
});





describe('getBestWithRandom', () => {
  it('should return the alternative with the lowest euclidean distance to ideal solution and highest to the anti ideal solution and it should be array with numeric data', () => {
// Creating random arguments to test
arguments = topsis.createRandom();


m = arguments.m;
w = arguments.w;
ia = arguments.ia;

console.log(m,w,ia);

let nc = m.cols;

    console.log(topsis.getBest(m, w, ia));
	result = topsis.getBest(m, w, ia);
    result.should.have.lengthOf(nc);
  });
});





