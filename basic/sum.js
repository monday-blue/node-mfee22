// sum.js

function sum( n ) {
    let sum = 0 ;
    for ( let i = 0 ; i <= n ; i++ ) {
        sum = sum + i ;        
    } // for
    return sum ;

  } ;
  
  console.log( sum(1) ) ;  // 1
  console.log( sum(2) ) ;  // 3
  console.log( sum(5) ) ;  // 15
  console.log( sum(10) ) ; // 55