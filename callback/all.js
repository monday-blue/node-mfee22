// Promise.all()方法解說

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

// 當三件事情全部都做完的時候(同時外包三件事情出去，如果是readFile就不確定誰先完成回來)，就會回來
Promise.all([p1, p2, p3]).then((values) => {
  console.log(values);
});

// 放入陣列[p1, p2, p3]
// values會用陣列的結果回傳回來

// 印出 // 大概會等3秒，setTimeout以外包處理時間最久的為主要等待時間，回傳的陣列排序會依[p1, p2, p3]位置順序印出，並非以外包公司完成先後順序印出。
// [ '完成工作 刷牙', '完成工作 吃早餐', '完成工作 寫功課' ]