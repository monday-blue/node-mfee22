// readFile await/async 版本  ---我的寫法

const { readFile } = require("fs"); //自NodeJS System讀進readFile，fs是NodeJS本身自己提供的Library

// 還是要有Promise
let readFilePromise = new Promise((resolve, reject) =>{  //寫法2:也可以用一個變數接住它，或甚至再用function包他
// new Promise((resolve, reject) =>{    // 寫法1:只是new一個Promise
    readFile("test.tx", "utf-8", (err, data) => { // 處理非同步函數
        // callback函式設計通常參數是(err, data)，(讀不到檔案的錯誤資訊, 成功讀到之檔案內的資料內容)。
        if (err) {
            reject(err);  // 失敗
            return;  // 因這裡沒有再用function包他，所以要加return???
        }
        resolve(data);    // 成功
        
    });
});

// *******我的寫法 ----不能catch error?????*****
// (async function () {
//     let readFileResult = await readFilePromise;
//     console.log(readFileResult);
// })();

// 印出
// 2022.01.08 MFEE22 readFile test in NodeJS class.
// 但是這樣會不知道怎麼catch error?????


// ******* 我的換成小賴老師的寫法 ----只能用try catch處理錯誤 *****
(async () => {
    try {
      let readFileResult = await readFilePromise;
      console.log(readFileResult);
    } catch (err) {
      console.error(err);
    }
  })();




