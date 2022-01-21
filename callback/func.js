// 示範解說Promise自帶.then( (參數) => { 處理 } ) 方法概念

let funcA = function() {
    console.log("functionA");
    // return undefined;
};

let funcB = funcA;

let result = funcB();
console.log(result);


let obj1 = {name: "paul"};
let obj2 = obj1;
