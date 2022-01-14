// Promise.race()方法解說

let doWork = function (job, timer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(`完成工作 ${job}`); // 會把這一個 promise 物件的狀態變成 fulfilled

        // 如果發生錯誤
        // reject(err)
        // 會把這一個 promise 物件的狀態變成 rejected
        }, timer);
    });
};

let p1 = doWork("刷牙", 2000);
let p2 = doWork("吃早餐", 3000);
let p3 = doWork("寫功課", 2000);

// 當三個中只要有其中一個做完，就會回覆
Promise.race([p1, p2, p3]).then((value) => {
console.log(value);
});

// 印出  // 比誰先做完，刷牙和寫功課同樣setTimeout時間，但刷牙還是先於寫功課丟到外包公司，所以會先回到Queue先回到stack運算並回傳值
// 完成工作 刷牙