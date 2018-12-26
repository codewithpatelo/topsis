const linearAlgebra = require('linear-algebra')(),     
    Vector = linearAlgebra.Vector,
    Matrix = linearAlgebra.Matrix;


// General function to sort JSON array by attribute:

function sortedBy(elm){
   return function(a,b){
      if( b[elm] > a[elm]){
          return 1;
      }else if( b[elm] < a[elm] ){
          return -1;
      }
      return 0;
   }
}


exports.topsis = function getBest(m, w, ia) {
	
//ERROR HANDLERS

if (!(m instanceof Matrix)) {
	return console.log('ERROR. Matrix argument MUST be a linear-algebra module matrix.');
} else {


if (Array.isArray(ia) == false) {
	return console.log('ERROR. Impact argument MUST be an array.');
}

if (ia.length != m.cols) {
	return console.log('ERROR. Impact argument size MUST be equal to Alternative Matrix columns size.');
}

if (ia.every(function(i){ return typeof i === "string" }) == false) {
	return console.log('ERROR. Impact argument MUST contain string type elements.');
} else {
	if (ia.indexOf('max') > -1 == false || ia.indexOf('min') > -1 == false) {
      return console.log('ERROR. Impact argument MUST contain string type element exactly named "max" or "min" accordingly.');
	}
	
}


if (Array.isArray(w) == false) {
	return console.log('ERROR. Weights argument MUST be an array.');
}

if (w.length != m.cols) {
	return console.log('ERROR. Weights argument size MUST be equal to Alternative Matrix columns size.');
} 



// Calculating norm

let j; // Cols
let i; // Rows
let norm = 0;
let normArray = [];

for (j = 0; j < m.cols; j++) {
  for (i = 0; i < m.rows; i++) { 

    let num = m.data[i][j];
    norm = Math.pow(num, 2) + norm;
    
  }

  
norm = Math.round(Math.sqrt(norm) * 100) / 100;

normArray.push(norm);

norm = 0;


}

mNormArray = [];


i = 0;
for (i = 0; i < m.rows; i++) {
  mNormArray.push(normArray);
}

mNormArray = new Matrix(mNormArray);


// Normalised Alternative Matrix


let nm = [];

nm = m.div(mNormArray);


// Weighted normalised alternative matrix
let ev = [];
i = 0;
for (i = 0; i < m.rows; i++) {
  ev.push(w);
}

ev = new Matrix(ev);
wnm = nm.mul(ev);



// Computing ideal and anti-ideal solution

i = 0; // Rows
j = 0; // Columns
a = 0; // iterations
let attributeValues = [];
let idealSolution = [];
let aidealSolution = [];

for (a = 0; a < 2; a++) {

  
  for (j = 0; j < m.cols; j++) {
    for (i = 0; i < m.rows; i++) {
	    
     attributeValues.push(wnm.data[i][j]);
  

    } 
  
    if (a == 0) {
      if (ia[j] == 'min') {
        attributeFunction = Math.min( ...attributeValues);
	    idealSolution.push(attributeFunction);
      } else if (ia[j] == 'max') {
	    attributeFunction = Math.max( ...attributeValues);
	    idealSolution.push(attributeFunction);
      }
	} else if (a == 1) {
      if (ia[j] == 'min') {
        attributeFunction = Math.max( ...attributeValues);
	    aidealSolution.push(attributeFunction);
      } else if (ia[j] == 'max') {
	    attributeFunction = Math.min( ...attributeValues);
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

listIdeal = [];
listaIdeal = [];

for (a = 0; a < 2; a++) {
  for (i = 0; i < m.rows; i++) {
	  
	distToI = 0;
    distToaI = 0;
    for (j = 0; j < m.cols; j++) {
      wnm.data[i];
	  if (a == 0) {
        distToI = distToI + Math.pow(wnm.data[i][j]-idealSolution[j], 2);
	  } else {
	    distToaI = distToaI + Math.pow(wnm.data[i][j]-aidealSolution[j], 2);
	  }
    
    }
	
    if (a == 0) {
      distToI = Math.sqrt(distToI);
	  listIdeal.push(distToI);
    } else {
      distToaI = Math.sqrt(distToaI);
	  listaIdeal.push(distToaI);
	}
    
  }
}




i = 0;
listedPerformancedScore = [];
for (i = 0; i < m.rows; i++) {
	performanceScore =  listaIdeal[i] / (listIdeal[i] + listaIdeal[i]);
	listedPerformancedScore.push(performanceScore);
	
}



let indexedPerformanceScore = [];
i = 0;
for (i = 0; i < m.rows; i++) {
 
 let dp = {
	 index: i,
	 data: m.data[i],
	 ps: listedPerformancedScore[i]
  }
  indexedPerformanceScore.push(dp);

}



let rankedPerformanceScore = indexedPerformanceScore.sort( sortedBy("ps") );

return rankedPerformanceScore[0].data;

}

}; // TERMINA FUNCION


