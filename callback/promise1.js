// 吃早餐promise版本-製作流程詳述

// Promise 是一個"物件"，代表一個即將完成、或失敗的非同步操作，以及它所產生的值。

// 1. Promise 是一個物件
// 物件就要使用 new Promise()
// Promise() 是一個建構式函式(不一定要傳參數，有時需要傳參數)，他需要一個參數 為executor函式（ 即把 executor函式 以參數形式 傳進去 Promise函式建構式  裡面 ）
// 這個 executor 也是一個函式 function() ，他有固定長相，固定要兩個參數 resolve reject。resolve和reject好像也是function??????
// executor 英文：執行

new Promise( function (resolve, reject) { } ) ;  // function (resolve, reject) {  }  就是executor函式(匿名寫法，因為名字executor不重要)

new Promise( (resolve, reject) => { } ) ;  // 寫成箭頭函式

// 2. 代表一個即將完成、或失敗
// resolve 是成功的時候要呼叫的
// reject 是失敗的時候要呼叫的

// 3. 專門負責處理非同步的工作(即要去外包公司的工作)
// eg: setTimeout(() => {})


// 原callback寫法
// let doWork = function (job, timer, callback) {  
//   setTimeout(() => {  
//     callback(null, `完成工作 ${job}`);  
//   }, timer);
// };   // callback寫法

// 改Promise寫法
let doWork = function (job, timer) {  // 不需要參數callback函式了，原callback寫法裡的callback函式功能被Promise((resolve, reject) => {})取代。

    return new Promise((resolve, reject) => {  // 加return，resolve, reject為自命名函式，只是這樣命名resolve, reject大家比較看得懂這個函式在做什麼。

      setTimeout(() => {
        // 如果順利完成外包工作
        resolve(`完成工作 ${job}`);
        // 呼叫resolve，會把這一個 promise 物件的狀態變成 fulfilled
  
        // 如果發生錯誤沒完成外包工作
        // reject(err);   //setTimeout不會失敗所以先註解掉不使用
        // 呼叫reject，會把這一個 promise 物件的狀態變成 rejected
      }, timer);

    });

};
  
// 刷牙 --> 吃早餐 --> 寫功課
let work1Promise01 = doWork("刷牙", 2000);
console.log(work1Promise01);
console.log("-----------");

//印出
// Promise { <pending> } 
// -----------
// 空格(表示setTimeout正在外包處理)

// pending 英文：懸而未決的，即將來臨的
// Promise 物件會有狀態的移轉
// "Promise 物件剛new建立"的時候狀態會是 pending
// 空格(表示setTimeout正在外包處理)
// 要等如果順利完成外包工作，呼叫resolve函式，才會把這一個 promise 物件的狀態變成 fulfilled
// 要等如果發生錯誤沒完成外包工作，呼叫reject函式，才會把這一個 promise 物件的狀態變成 rejected

// 因此要寫
let work1Promise02 = doWork("刷牙", 2000);  // doWork("刷牙", 2000);本身回覆的是一個Promise物件 
// console.log(work1Promise02);       // 會印出Promise{<pending>} 
// console.log("==============");     // 不用寫只是用來印出比較
work1Promise02.then((result) => {   // 有一個 匿名callback函式(參數為變數result) 變數result 去接 doWork函式內，Promise new物件裡executor函式內所呼叫的resolve()或reject()所產生的值。(呼叫resolve()或reject()，Promise的pending狀態就會移轉成fulfilled或rejected。)
  console.log(result);              // then : 然後怎麼樣，promise允许你调用一个叫做"then"的方法(method)，让你指定一個"函数"作为"callback函数"，(me: then方法可以讓你再宣告一個匿名callback函式定義式，然後這個函式定義式中可以預設帶入參數result，預設帶入參數可為一個或多個參數、亦可為變數(藍色)或函式(黃色)...等等)。
  console.log("*******************"); 
});
// 印出
// 完成工作 刷牙
// *******************


// 再簡寫
doWork("刷牙", 2000).then((result) => {   // 直接doWork.then()
  console.log(result);              // then : 然後，promise允许你调用一个叫做“then”的方法(method)，让你指定一個函数作为callback函数。
  console.log("＠＠＠＠＠＠＠＠"); 
});



// 改寫：刷牙2秒 --> 吃早餐3秒 --> 寫功課2秒

// let dt = new Date();                       // 開始執行
// console.log(`開始 ${dt.toISOString()}`);

// doWork("刷牙", 2000).then((result) => {
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);

//   return doWork("吃早餐", 3000);   // Promise物件可以串起來，可以直接return下一件工作doWork("吃早餐", 3000);，就算沒寫return，then本身也會自動return一個空的Promise。
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
//   // 通常用err代表錯誤訊息，處理錯誤，catch()會抓在此以前出現過的Promise的所有rejected地方的錯誤，catch()出現錯誤以後所有程式碼會被跳過。 還記得try() catch()嗎？也是出現錯誤後的所有程式碼會被跳過。
//   console.error(err);
// });  // 串接完才能加分號;


// 之後專題禁止出現老舊的callback寫法，除非該語言函式庫沒有提供Promise寫法!


