// 把 readFile callback版 改成 Promise版
// readFile Promise 我自己改的版本

const { readFile } = require("fs"); //自NodeJS System讀進readFile

// 本來自己寫錯的版本
// let doReadfile = function (dataname, translate) {

//     return new Promise( (resolve, reject) => {

//         readFile( (dataname, translate ) => {

//             resolve(console.log(data));
//             reject(console.error(err));

//         });
    
//     });
    
//  };

//  doReadfile("test.txt", "utf-8").then( (result) => {
//     console.log(result);
//  });

 
// 本來自己寫錯的版本，試著改成對的版本
// Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。
 let doReadfile = function (dataname, translate) {

    return new Promise( (resolve, reject) => {

        readFile( dataname, translate, (err, data) => {
            if (err) {
                // reject(console.error(err));
                reject(err);
                // return; ???我原來沒加
            }
            // resolve(console.log(data));
            resolve(data);

        });
    
    });
    
 };

 doReadfile("test.txt", "utf-8").then( (result) => {
    console.log(result);
 })
 .catch( (err) => {
    console.error(err);
 });
// 
// 印出   // 寫resolve(console.log(data));的狀態下
// 2022.01.08 MFEE22 readFile test in NodeJS class.
// undefined  
// 多印一個undefined錯誤原因檢討：doReadfile("test.txt", "utf-8")這個寫法已經呼叫執行函式了，而doReadfile是一個函式而不是Promise物件，所以doReadfile函式沒有Promise物件的狀態轉移可以用result接，所以出現undefined；而且這裡也沒有要接著串接做其他事所以不需要用then(原來的callback寫法，是要用回呼函式的方式去串接接著做下一件事)
// 
// 印出   // 寫resolve(data);的狀態下
// 2022.01.08 MFEE22 readFile test in NodeJS class. 
// 沒有多印一個undefined



// doReadfile("test.txt", "utf-8");
// 
// 印出   // 寫resolve(console.log(data));的狀態下
// 2022.01.08 MFEE22 readFile test in NodeJS class.
//
// 印出   // 寫resolve(data);的狀態下
// 沒印出任何東西







