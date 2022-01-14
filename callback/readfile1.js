// readFile callback版

const { readFile } = require("fs"); //自NodeJS System讀進readFile

readFile("test.txt", "utf-8", (err, data) => {
    // callback函式設計通常參數是(err, data)，(讀不到檔案的錯誤資訊, 成功讀到之檔案內的資料內容)。
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);

    // 通常會串接著做insert data to MySQL的動作
});

 // insert data to MySQL的動作不能寫在外面這裡，
//  因為JS一但看到readFile非同步函式，stack就把readFile那包丟去外包公司另外做，
// 因此stack會先跳過readFile那一包，然後接著做這段主程式，但此時外包公司還沒做完外包工作會回傳data資料(何時做完也不知道)，所以這裡還沒接收到data任何資料，所以沒有資料內容(data)可以insert到資料庫。

 // 試著把他包成Promise版本！




// JS一但看到readFile非同步函式，stack就把readFile那包丟去外包公司另外做，外包公司工作流程如下：
// JS一但看到readFile非同步函，stack會先把
// readFile("test.txt", "utf-8", (err, data) => {
//    if (err) {
//        console.error(err);
//        return;
//    }
//    console.log(data);
// });
// 這一整包丟到外包公司處理讀檔，讀到檔案或沒讀到到檔案後，
// 再把
// (err, data) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// }
// 這包匿名callback函式丟到回Queue，讓event loop看到stack空時，傳回給stack再做運算。
