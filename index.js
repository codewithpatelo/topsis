const linearAlgebra = require('linear-algebra')();

const Matrix = linearAlgebra.Matrix;

// General function to sort JSON array by attribute:
function sortedBy(elm) {
  return function order(a, b) {
    if (b[elm] > a[elm]) {
      return 1;
    } if (b[elm] < a[elm]) {
      return -1;
    }
    return 0;
  };
}

exports.getBest = function getBest(m, w, ia) {
  // ERROR HANDLERS

  if (!(m.data)) {
    console.log('ERROR. Matrix argument MUST be a linear-algebra module matrix.');
    return 'ERROR';
  }

  if (Array.isArray(ia) === false) {
    console.log('ERROR. Impact argument MUST be an array.');
    return 'ERROR';
  }

  if (ia.length !== m.cols) {
    console.log('ERROR. Impact argument size MUST be equal to Alternative Matrix columns size.');
    return 'ERROR';
  }

  if (ia.every(i => typeof i === 'string') === false) {
    console.log('ERROR. Impact argument MUST contain string type elements.');
    return 'ERROR';
  }

  const c1 = ia.indexOf('max') > -1;
  const c2 = ia.indexOf('min') > -1;

  if (!(c1 || c2)) {
    console.log('ERROR. Impact argument MUST contain string type element exactly named "max" or "min" accordingly.');
    return 'ERROR';
  }

  if (Array.isArray(w) === false) {
    console.log('ERROR. Weights argument MUST be an array.');
    return 'ERROR';
  }

  if (w.length !== m.cols) {
    console.log('ERROR. Weights argument size MUST be equal to Alternative Matrix columns size.');
    return 'ERROR';
  }

  let i = 0;

  for (i = 0; i < m.cols; i += 1) {
    if (w[i] > 1) {
      console.log('ERROR. The value from an element in the weights argument cannot be higher than 1.');
      return 'ERROR';
    }
  }

  function add(a, b) {
    return a + b;
  }


  if (w.reduce(add, 0) > 1) {
    console.log('ERROR. Elements from the weights argument must sum exactly 1.');
    return 'ERROR';
  }


  // Calculating norm
  let j; // Cols
  i = 0; // Rows
  let norm = 0;
  const normArray = [];

  for (j = 0; j < m.cols; j += 1) {
    for (i = 0; i < m.rows; i += 1) {
      const num = m.data[i][j];
      norm = (num ** 2) + norm;
    }

    norm = Math.round(Math.sqrt(norm) * 100) / 100;
    normArray.push(norm);
    norm = 0;
  }

  let mNormArray = [];

  i = 0;

  for (i = 0; i < m.rows; i += 1) {
    mNormArray.push(normArray);
  }

  mNormArray = new Matrix(mNormArray);

  // Normalised Alternative Matrix

  let nm = [];

  nm = m.div(mNormArray);

  // Weighted normalised alternative matrix
  let ev = [];
  i = 0;
  for (i = 0; i < m.rows; i += 1) {
    ev.push(w);
  }

  ev = new Matrix(ev);

  const wnm = nm.mul(ev);


  // Computing ideal and anti-ideal solution

  i = 0; // Rows
  j = 0; // Columns
  let a = 0; // iterations
  let attributeValues = [];
  const idealSolution = [];
  const aidealSolution = [];
  let attributeFunction = null;

  for (a = 0; a < 2; a += 1) {
    for (j = 0; j < m.cols; j += 1) {
      for (i = 0; i < m.rows; i += 1) {
        attributeValues.push(wnm.data[i][j]);
      }

      if (a === 0) {
        if (ia[j] === 'min') {
          attributeFunction = Math.min(...attributeValues);
          idealSolution.push(attributeFunction);
        } else if (ia[j] === 'max') {
          attributeFunction = Math.max(...attributeValues);
          idealSolution.push(attributeFunction);
        }
      } else if (a === 1) {
        if (ia[j] === 'min') {
          attributeFunction = Math.max(...attributeValues);
          aidealSolution.push(attributeFunction);
        } else if (ia[j] === 'max') {
          attributeFunction = Math.min(...attributeValues);
          aidealSolution.push(attributeFunction);
        }
      }

      attributeValues = [];
    }
    j = 0;
  }


  // Calculate distance to ideal and antiideal solution
  i = 0; // Rows
  j = 0; // Cols
  a = 0;

  const listIdeal = [];
  const listaIdeal = [];
  let distToI = 0;
  let distToaI = 0;

  for (a = 0; a < 2; a += 1) {
    for (i = 0; i < m.rows; i += 1) {
      distToI = 0;
      distToaI = 0;
      for (j = 0; j < m.cols; j += 1) {
        if (a === 0) {
          distToI += ((wnm.data[i][j] - idealSolution[j]) ** 2);
        } else {
          distToaI += ((wnm.data[i][j] - aidealSolution[j]) ** 2);
        }
      }

      if (a === 0) {
        distToI = Math.sqrt(distToI);
        listIdeal.push(distToI);
      } else {
        distToaI = Math.sqrt(distToaI);
        listaIdeal.push(distToaI);
      }
    }
  }


  i = 0;
  const listedPerformancedScore = [];
  let performanceScore = null;
  for (i = 0; i < m.rows; i += 1) {
    performanceScore = listaIdeal[i] / (listIdeal[i] + listaIdeal[i]);
    listedPerformancedScore.push(performanceScore);
  }


  const indexedPerformanceScore = [];
  i = 0;
  for (i = 0; i < m.rows; i += 1) {
    const dp = {
      index: i,
      data: m.data[i],
      ps: listedPerformancedScore[i],
    };
    indexedPerformanceScore.push(dp);
  }


  const rankedPerformanceScore = indexedPerformanceScore.sort(sortedBy('ps'));

  return rankedPerformanceScore[0].data;
}; // TERMINA FUNCION


exports.createRandom = function createRandom() {
  const cn = Math.floor(Math.random() * 6) + 2;
  const rn = Math.floor(Math.random() * 20) + 1;
  let i = 0;
  let j = 0;

  let c = [];

  const r = [];

  for (i = 0; i < rn; i += 1) {
    for (j = 0; j < cn; j += 1) {
      c.push(Math.floor(Math.random() * 1000) + 1);
    }
    r.push(c);
    c = [];
  }

  const m2 = new Matrix(r);

  const w2 = [];
  const ia2 = [];
  j = 0;

  let num = 0;

  for (j = 0; j < cn; j += 1) {
    num = Math.random();
    w2.push(num);
  }

  j = 0;
  num = 0;

  for (j = 0; j < cn; j += 1) {
    num = w2[j] + num;
  }

  let sum = 0;


  while (!((sum > 0.95) && (sum < 1.05))) {
    sum = Math.round(num);
    num -= 1;
    num /= cn;

    j = 0;

    for (j = 0; j < cn; j += 1) {
      w2[j] = Number((w2[j] - num).toFixed(2));
    }


    for (j = 0; j < cn; j += 1) {
      w2[j] = Math.abs(w2[j]);
    }

    num = 0;
    j = 0;
    for (j = 0; j < cn; j += 1) {
      num = w2[j] + num;
    }


    sum = num;
  }


  num = 0;
  j = 0;
  let v = '';


  for (j = 0; j < cn; j += 1) {
    num = Math.floor(Math.random() * 2);
    if (num === 1) {
      v = 'max';
    } else if (num === 0) {
      v = 'min';
    }
    ia2.push(v);
  }

  const resp = { m: m2, w: w2, ia: ia2 };


  return resp;
};
