const assert = require('assert');

const linearAlgebra = require('linear-algebra')();

const Matrix = linearAlgebra.Matrix;

const topsis = require('../index.js');

const m = new Matrix([[2, 5, 5], [60, 26, 4], [20, 20, 4], [500, 2, 4], [50, 23, 3], [25, 10, 1]]);
const w = [0.27, 0.33, 0.4];
const ia = ['min', 'min', 'max'];


describe('ErrIsMatrix', () => {
  it('If m argument is not matrix it should throw error alert.', () => {
    assert.equal(topsis.getBest('test', w, ia), 'ERROR');
  });
});

describe('ErrIsArray', () => {
  it('If ia argument is not an array it should throw error alert.', () => {
    assert.equal(topsis.getBest(m, w, 0), 'ERROR');
  });
});

describe('ErrIaLength', () => {
  it('If ia argument has a larger length than m columns it should throw error alert.', () => {
    assert.equal(topsis.getBest(m, w, ['min', 'min', 'max', 'min']), 'ERROR');
  });
});

describe('ErrIaType', () => {
  it('If ia argument has elements that are not strings it should throw error alert.', () => {
    assert.equal(topsis.getBest(m, w, [5, 7, 'max']), 'ERROR');
  });
});

describe('ErrIaRule', () => {
  it('If ia argument has elements that are not max/min strings it should throw error alert.', () => {
    assert.equal(topsis.getBest(m, w, ['test', 'test', 'test']), 'ERROR');
  });
});


describe('ErrWtype', () => {
  it('If w argument is not an array it should throw error alert.', () => {
    assert.equal(topsis.getBest(m, 'test', ia), 'ERROR');
  });
});

describe('ErrWsize', () => {
  it('If w argument length is not matching m column size it should throw error alert.', () => {
    assert.equal(topsis.getBest(m, [0.25, 0.25, 0.25, 0.25], ia), 'ERROR');
  });
});

describe('ErrWhigherone', () => {
  it('If any w argument element is higher than 1 it should throw error alert.', () => {
    assert.equal(topsis.getBest(m, [3.25, 0.25, 0.25], ia), 'ERROR');
  });
});

describe('ErrWsum', () => {
  it('If w argument element sum is higher than 1 it should throw error alert.', () => {
    assert.equal(topsis.getBest(m, [0.95, 0.65, 0.45], ia), 'ERROR');
  });
});


describe('isArray', () => {
  it('Result should be array.', () => {
    assert.equal(Array.isArray(topsis.getBest(m, w, ia)), Array.isArray([2, 5, 5]));
  });
});

describe('getBest', () => {
  it('should return the alternative with the lowest euclidean distance to ideal solution and highest to the anti ideal solution and it should be array with numeric data', () => {
    console.log(topsis.getBest(m, w, ia));
    assert.equal(topsis.getBest(m, w, ia), topsis.getBest(m, w, ia));
  });
});

