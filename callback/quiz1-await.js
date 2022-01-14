// 解說setTimeout、Promise、async/await 外包機制

// 只有 setTimeout => 4-1-3-5-2
function test() {
  console.log(1);

  
    setTimeout(() => {  // 看到setTimeout，丟外包，不管幾秒，等stack空了才能回來。() => {}為匿名無預設參數箭頭函式。
      console.log(2);
      resolve();
    }, 0);


  console.log(3);

};

console.log(4);  // 主程式執行(stack)
test();
console.log(5);




// 包 Promise => 4-1-3-5-2 不變
function test() {
  console.log(1);

    new Promise((resolve, reject) => {

        setTimeout(() => {  // 看到setTimeout，丟外包，不管幾秒，等stack空了才能回來。() => {}為匿名無預設參數箭頭函式。
          console.log(2);
          resolve();
        }, 0);

    });
    
  console.log(3);

};

console.log(4);  // 主程式執行(stack)
test();
console.log(5);




// 有 async/await => 4-1-5-2-3  有變化
async function test() {
    console.log(1);
   
    await new Promise((resolve, reject) => {   // 看到 await以下至async function範圍內之程式碼 皆暫停，所以console.log(3);也被暫停了。但console.log(1);在await以上，所以會被執行不會被暫停。等到外包做完stack也空了，就把console.log(2);丟回stack做印出console.log(2);，此時await解鎖，然後console.log(3);才能被印出。
    // 但single thread看主程式一暫停不會放過搶cpu機會，所以馬上去做別的事，因此console.log(5);被先印出。

      setTimeout(() => {  // 匿名無參數箭頭函式
        console.log(2);
        resolve();
      }, 0);

    });
  
    console.log(3);

};
  
console.log(4);
test();
console.log(5);