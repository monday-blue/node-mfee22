// 模組練習 
let car = require("./car1");  // car變數存了一個物件(car是一個物件)

console.log(car.color);  // 印出undefined，因為還未定義car物件的color屬性
car.color = "blue";      // 未定義car物件的color屬性以及設其值為"blue"
console.log(car.color);  // 印出blue

car.setName("AAAA");
car.showName();

console.log(car);
// 印出
// {
//   setName: [Function: setName],
//   showName: [Function: showName],
//   color: 'blue'
// }


// 三的模組(module)來源：
// 1. 內建的: fs
// require("fs")
// 2. 第三方: mysql2, moment, axios, dotenv,...
// require("mysql2")
// 3. 自己開發的*
// require("./car1")