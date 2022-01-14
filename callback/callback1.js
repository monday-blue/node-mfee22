// JS非同步外包公司概念釐清練習-1 吃早餐callback版本 流程詳述與最終版本

let doWork = function (job, timer, callback) {  // 因為不想預先設定做什麼工作，所以再傳入一個callback函式
    setTimeout(() => {  // 匿名無參數箭頭函式(為第一個callback函式，setTimeout本身的callback函式)：叫他做第二個callback函式：callback(null, `完成工作 ${job}`); 的內容 
      // callback函式 的設計上
      // 通常第一個參數會是錯誤（例如：計時失敗，讀檔案失敗）
      // 通常第二個參數會是結果（例如：計時成功，讀檔案成功）
      callback(null, `完成工作 ${job}`);  // 當setTimeout外包公司做完setTimeout工作後，回傳第二個callback函式：callback(null, `完成工作 ${job}`);到stack做完主程式(若外包公司所作失敗(計時通常不會失敗)，錯誤結果回傳：null; 若外包公司所做成功(完成計時)，成功結果回傳：`完成工作 ${job}`)
    }, timer);
  };
  

// 我想要：刷牙2秒 --> 吃早餐3秒 --> 寫功課2秒
// let dt = new Date();
// console.log(`開始 ${dt.toISOString()}`); 

// doWork("刷牙", 2000, (err, result) => {    
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);
// });

// doWork("吃早餐", 3000, (err, result) => {
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);
// });

// doWork("寫功課", 2000, (err, result) => {
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);
// });
// 這樣會印出：刷牙 --> 寫功課 --> 吃早餐，秒數設定也不是我要的

// 因為會 刷牙-->寫功課-->吃早餐 幾乎接連著一起丟到外包公司處理，刷牙與寫功課會先做完送到Queue(皆為2秒，但有進外包公司先後的順序)，然後吃早餐3秒才處理完，送到Queue

// 印出如下：
// 開始 2022-01-10T14:51:49.294Z
// 完成工作 刷牙 at 2022-01-10T14:51:51.305Z
// 完成工作 寫功課 at 2022-01-10T14:51:51.306Z
// 完成工作 吃早餐 at 2022-01-10T14:51:52.309Z
// 不是我要的



// 我想要：刷牙2秒 --> 吃早餐3秒 --> 寫功課2秒

let dt = new Date();                       // 開始執行
console.log(`開始 ${dt.toISOString()}`);    // 印出開始時間

doWork("刷牙", 2000, (err, result) => {    //* 遇到setTimeout整包去外包
  let dt = new Date();                    // 外包算完刷牙２秒丟回stack做完剩下兩行主程式
  console.log(`${result} at ${dt.toISOString()}`);

  doWork("吃早餐", 3000, (err, result) => {     //-- 再遇到setTimeout再整包去外包
    let dt = new Date();                       // 外包算完吃早餐3秒，丟回stack做完剩下兩行主程式
    console.log(`${result} at ${dt.toISOString()}`);  

    doWork("寫功課", 2000, (err, result) => {   //=== 又再遇到setTimeout再整包去外包
      let dt = new Date();                     // 外包算完寫功課2秒，丟回stack做完剩下兩行主程式
      console.log(`${result} at ${dt.toISOString()}`);
    });  //===

  }); //--

}); //*

// 印出結果如下：
// 開始 2022-01-10T15:11:25.302Z
// 完成工作 刷牙 at 2022-01-10T15:11:27.318Z
// 完成工作 吃早餐 at 2022-01-10T15:11:30.323Z
// 完成工作 寫功課 at 2022-01-10T15:11:32.325Z
// 是我想要的

// 但會產生回呼地獄callback hell






// 我的原先想法不對= =; 錯得離譜．．． 
//   function delay() {
//       let now = new Date().getTime();  // 抓現在的秒數
//       console.log(now);
//       while()
//   }

//   delay();



// 其他同學的想法錯誤部分：
// 開始時間T ---> 刷牙T+2 ---> 吃早餐T+5 ---> 寫功課T+7
// let dt = new Date();
// console.log(`開始 ${dt.toISOString()}`); 

// doWork("刷牙", 2000, (err, result) => {    
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);
// });

// doWork("吃早餐", 5000, (err, result) => {
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);
// });

// doWork("寫功課", 7000, (err, result) => {
//   let dt = new Date();
//   console.log(`${result} at ${dt.toISOString()}`);
// });

// 這樣會變成：
// 開始
// ｜<-刷牙2秒->｜
// ｜<--------吃早餐5秒-------->｜
// ｜<----------- ----寫功課7秒-------------->｜  
// 人不可能同時刷牙又吃早餐又寫功課!

// 但我要的是接著做：
// 開始
// ｜<-刷牙2秒->｜
//             ｜<--吃早餐3秒-->｜
//                             ｜<-寫功課2秒->｜  



// 查callback function時遇到問題？？？？？？
// https://ithelp.ithome.com.tw/articles/10192739
for( var i = 0; i < 5; i++ ) {  // var以 function(){ } 為作用域區分
  setTimeout( function() {
    console.log(i);
  }, 1000);
}
// 印出
// 5
// 5
// 5
// 5
// 5


for( let i = 0; i < 5; i++ ) {   // let以 { } 為作用域區分
  setTimeout( function() {
    console.log(i);
  }, 1000);
}
// 印出
// 0
// 1
// 2
// 3
// 4