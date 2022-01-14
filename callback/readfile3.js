// readFile Promise小賴老師的版本

const { readFile } = require("fs"); //自NodeJS System讀進readFile，fs是NodeJS本身自己提供的Library

// Promise 物件代表一個即將完成、或失敗的非同步操作，以及它所產生的值。

let readFilePromise = new Promise((resolve, reject) =>{  //寫法2:也可以用一個變數接住它，或甚至再用function包他
// new Promise((resolve, reject) =>{    // 寫法1:只是new一個Promise
    readFile("test.txt", "utf-8", (err, data) => { // 處理非同步函數
        // callback函式設計通常參數是(err, data)，(讀不到檔案的錯誤資訊, 成功讀到之檔案內的資料內容)。
        if (err) {
            reject(err);  // 失敗
            return;  // 因這裡沒有再用function包他，所以要加return???
        }
        resolve(data);    // 成功

    });
});

console.log(readFilePromise);  // 我會拿到一個Promise物件。
// 會印出Promise { <pending> }，因為Promise才剛建立，readFile那一包還在外包公司處理，所以Promise狀態還是pending。
// 記得Promise只是為了改善callback地獄，完全沒有改變外包公司的機制！只是外包公司本來用callback函式方式通知你外包公司做完了，而Promise的通知你的方式稍微改一下了。 by 小賴老師
// me: 記得Promise只是為了改善callback地獄，完全沒有改變外包公司的機制！只是外包公司本來用callback函式方式(肉眼可以看到：callback函式裡還要繼續處理的程式繼續在stack繼續做運算了)通知你(人)外包公司做完了，(人肉眼看：繼續執行callback函式裡要執行的下一件事)。而Promise的通知方式稍微改一下了。(改為executor(resolve, reject)會呼叫resolve()或reject()執行成功或失敗狀態時，成功或失敗的對應函式內要做回傳的值，並改變Promise狀態。(人肉眼看：成功做了什麼resolve(做了什麼)，失敗做了什麼reject(做了什麼))。而對電腦來說，則是拿到Promise物件的原擱置狀態並呼叫resolve()或reject()分別執行不同的事然後轉換Promise物件的狀態，我覺得在電腦Promise物件內的運作原理裡還是有點像callback函式運作，但是callback函式的執行回傳內容不一樣，一個是回傳下一件要繼續做的事讓要做的事接著做，一個是回傳用Promise狀態和成功失敗要分別執行的函式內容。

readFilePromise.then().catch(); // 然後這個Promise物件物件可以.then()它和.catch它。

readFilePromise.then( (result) => {} ).catch( (err) => {} ); // 然後這個Promise物件物件可以.then()它和.catch它。.then是成功，用result去接成功的resolve結果資料內容data，.catch()是失敗，用err去接reject結果錯誤資料。
// 影片 2022.01.08下午 01:30:00左右

readFilePromise.then( (result) => {
    console.log(`這裡是Promise物件.then方法裡的回呼函式中的result變數所接住的 resolve函式執行結果,(即外包回傳之資料內容data): ${result}`);
} ).catch( (err) => {
    console.log("這裡是Promise物件的.catch方法裡的回呼函式中的err變數所接住的 reject函式執行結果,即外包回傳之錯誤資訊: ", err);  //err不用轉換成字串
} );