const axios = require("axios");
const { readFile } = require("fs");

function doreadFile(filename, traslate){
    // let readFilePromise = new Promise((resolve, reject) =>{  
        return new Promise((resolve, reject) =>{    // 寫法1:只是new一個Promise
            readFile(filename, traslate, (err, data) => { // 處理非同步函數
                // callback函式設計通常參數是(err, data)，(讀不到檔案的錯誤資訊, 成功讀到之檔案內的資料內容)。
                if (err) {
                    reject(err);  // 失敗
                    return;  // 因這裡沒有再用function包他，所以要加return???
                }
                resolve(data);    // 成功
                
            });
        });
};


(async () => {
  try {
    // 根據變數去抓取資料
    let stockNo = await doreadFile("stock.txt", "utf-8");  // TODO:自動讀檔案stock.txt的資料，去撈該代碼所代表公司的股票資訊。2330:台積電，2603:長榮。

    let today = new Date();
    let queryDate = today.getDate();  // TODO::自動抓到今天的日期，並去撈今天的股票資訊。
    

    // let response = await axios.get(
    //   `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${queryDate}&stockNo=${stockNo}`
    // );

    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        // 這裡可以放一些設定
        // params: 放 query string 的參數
        params: {
          response: "json",
          date: queryDate,
          stockNo,
        },
      }
    );

    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
})();
