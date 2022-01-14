// await/async 版 吃早餐 --流程詳述

// await 是因為工程師覺得 Promise 還是不夠好看
// 希望可以讓JS更像「同步」的程式 eg: PHP程式
// await / async
// 是基於 Promise 的語法糖(讓你比較好寫/甜的語法)，還是要懂 Promise
// -> 1. 還是要有 Promise
// -> 2. 看到框架 lib(library) 說自己是 promise-based，即使它範例用.then()，那十之八九還是可以用await / async語法 (十之八九：也有可能有不能用的不知道)

// -> 1. 還是要有 Promise模板
let doWork = function (job, timer) {  // 不需要參數callback函式了

    return new Promise((resolve, reject) => {  // 加return

      setTimeout(() => {
        // 如果順利完成外包工作
        resolve(`完成工作 ${job}`);
        // 呼叫resolve，會把這一個 promise 物件的狀態變成 fulfilled
  
        // 如果發生錯誤沒完成外包工作
        // reject(err);   //setTimeout通常不會失敗所以先註解掉
        // 呼叫reject，會把這一個 promise 物件的狀態變成 rejected
      }, timer);

    });

};



// Promise模板實際使用 -> await / async用在這裡
// 改寫：刷牙2秒 --> 吃早餐3秒 --> 寫功課2秒
// await必須放在async function裡面

// ****** await / async的Promise物件使用 版本----流程詳述******

// await必須放在async function裡面
async function main() {    // 加一個async，main名字不重要還要想名字為了立即執行它很麻煩，所以常寫成IIFE立即執行函式。加一個async，變async函式，async函式讓await暫停有範圍，不會整個一人公司主程式全部卡住。
    let result1 = await doWork("刷牙", 2000);  // 加一個await暫停主程式
};
main();
// await 就像是一種「暫停鍵」，讓主程式整個暫停直到外包公司有結果回傳(setTimeout裡設定的"匿名callback函式"回來"stack運算"然後"回傳結果")為止，並把結果"存放到result1變數裡"
// 而且結果會被回傳、放到 reuslt1 這個變數裡


// IIFE立即執行函式
( async function () { 實作await的功能 } )();  // 把原函式用()包住，並在其後加一個()執行，定義完function後立即執行該function
( async () => { 實作await的功能 } )();  //箭頭函式寫法


// 寫成IIFE立即執行函式
( async () => {    // 加一個async，main名字不重要還要想名字為了立即執行它很麻煩，所以常寫成IIFE立即執行函式。加一個async，變async函式，async函式讓await暫停有範圍，不會整個一人公司主程式全部卡住。
  let result1 = await doWork("刷牙", 2000);  // 加一個await暫停主程式
} )();


// ****** await / async的Promise物件使用 版本----最終產出******
// 開始 --> 刷牙2秒 --> 吃早餐3秒 --> 寫功課2秒
// let dt = new Date();                       // 開始執行
// console.log(`開始 ${dt.toISOString()}`);

// ( async () => {  
//     let result1 = await doWork("刷牙", 2000);
//     dt = new Date();          // dt 不能let dt，因為前面已經宣告過
//     console.log(`${result1} at ${dt.toISOString()}`);

//     let result2 = await doWork("吃早餐", 3000);
//     dt = new Date();       
//     console.log(`${result2} at ${dt.toISOString()}`);

//     let result3 = await doWork("寫功課", 2000);
//     dt = new Date();
//     console.log(`${result3} at ${dt.toISOString()}`);
// } )();







// ******原來的Promise物件使用 版本******

// doWork("刷牙", 2000).then((result) => {
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);

//   return doWork("吃早餐", 3000);   // Promise物件可以串起來，可以直接return下一件工作doWork("吃早餐", 3000);，就算沒寫return，then本身也會自動return一個空的Promise。很像callback，只是callback寫法是寫在一層一層裡，.then是攤平寫。
// })   // 不能加分號;
// .then((result) => {               // 因為return了一個Promise，可以.then()串接。
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);

//   return doWork("寫功課", 2000);
// })
// .then((result) => {
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);
// })
// .catch((err) => {
//     // 通常用err代表錯誤訊息，處理錯誤，catch()會抓在此以前出現過的Promise的所有rejected地方的錯誤，catch()出現錯誤以後所有程式碼會被跳過。 還記得try() catch()嗎？也是出現錯誤後的所有程式碼會被跳過。
//     console.error(err);
// });  // 串接完才能加分號;


