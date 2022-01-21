// azole版本的完整版簡易爬蟲 ---> 模組化axios撈資料部分練習---搬移流程

// const axios = require("axios");  // 模組化後主程式不需要axios套件，可刪除
const { readFile } = require("fs/promises");
const moment = require("moment");
// const mysql = require("mysql2");
const { exit } = require("process");
// require("dotenv").config();

//引入自己寫的模組
const twse = require("./crawler-module/twse.js");
const converter = require("./crawler-module/converter.js");
const twseSaver = require("./crawler-module/twseSaver.js");
const connection = require("./crawler-module/dbConnect.js");


(async () => {
  // TODO: 連線資料庫(server端)  ps.此時你的程式(client端)
  // TODO: 用dotenv套件隱藏重要敏感資訊(.env 與 .env.example)
  //
  // //////
  // let connection = mysql.createConnection({
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   user: process.env.DB_USER,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_NAME,
  // })
  // //////


  try {
    // TODO: 根據變數存的股票代號去抓取資料
    // 從 stock.txt 中讀出檔案代碼
    let stockNo = await readFile("stock.txt", "utf-8");
    // 抓取股票中文名稱，順便確認股票代碼是否存在
    
    // //////////////
    // TODO: 撈取股票代碼搜尋時的中文名稱建議資料，以確認股票代碼是否存在
    let stockNameData = await twse.doQueryStockName(stockNo);  
    // 子層async doQueryStockName方法因為回傳的是一個Promise物件而非已經是撈到的資料，所以前面依然要加await。
    // 
    // ↑↑↑現在最上方是全部匯入const doQueryStockName = require("./crawler-Module/doQueryStockName.js");，所以這邊要寫使用doQueryStockName這個檔案名物件(在這個檔變成變數：藍色)，裡面的.doQueryStockName方法(黃色)。

    // let stockNameData = await doQueryStockName(stockNo);
    // ↑↑↑如果最上方寫部分引入const { doQueryStockName } = require("./crawler-Module/doQueryStockName.js");，這裡就可以直接寫let queryStockName = await doQueryStockName(stockNo);
    // 
    // 原來被模組取代掉的撈股票代碼部份如下：
    // let queryStockName = await axios.get(
    //   "https://www.twse.com.tw/zh/api/codeQuery",
    //   {
    //     params: {
    //       query: stockNo,
    //     },
    //   }
    // );

    // console.log(queryStockName);
    // console.log(queryStockName.data);
    // console.log(queryStockName.data.suggestions);
    // //////////////
    // console.log(stockNameData);  // 印印看模組化後有無問題，能否撈資料
    // exit();  // 暫停

    
    // //////////////
    let stockName = converter.parseStockName(stockNameData);
    //
    // if (
    //   !stockNameData.suggestions ||   // ////改stockNameData並去掉.data
    //   stockNameData.suggestions[0] === "(無符合之代碼或名稱)"
    // ) {    // ////去掉.data
    //   throw new Error("查無此代表");
    // }

    // // 可以到這裡(沒進if)，表示有資料
    // // TODO: 處理撈來的股票搜尋資料，留下股票的中文名稱
    // let stockData = stockNameData.suggestions[0];   // ////去掉.data
    // let stockDatas = stockData.split("\t");
    // let stockName = stockDatas[1];
    // //////////////

    // TODO: 儲存股票代碼與中文名稱進資料庫
    // Using prepared statements
    // to protect from SQL Injection attacks
    let saveNameResult = await twseSaver.saveStockName(connection, stockNo, stockName);
    // 
    // //////
    // let saveNameResult = await connection.execute(
    //   "INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)",
    //   [stockNo, stockName]
    // );
    console.log(saveNameResult);
    // //////


    // FIXME: 撈取指定代碼及日期的股票價格資料，如日期、成交股數、成交金額、最高最低價格等
    // ////////////
    let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期

    let stockPriceData = await twse.doQueryStockPrice(queryDate, stockNo);
    // 
    // 原來被模組取代掉的撈股票代碼部份如下：
    // let response = await axios.get(
    //   "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    //   {
    //     // 這裡可以放一些設定
    //     // params: 放 query string 的參數
    //     params: {
    //       response: "json",
    //       date: queryDate,
    //       stockNo,
    //     },
    //   }
    // );
    // ////////////
    // console.log(stockPriceData);  // 印印看模組化後有無問題，能否撈資料
    // exit();  // 暫停

    // 模組化後，stockPriceData取代掉原來的response.data

    // FIXME: 處理指定代碼及日期的股票資料，如日期、成交股數、漲跌價差等資料格式，以能正確儲存進資料庫。
    let processData = converter.convertPrice(stockPriceData, stockNo)
    // /////////
    // let processData = stockPriceData.data.map((d) => {
    //   // FIXME: 日期格式資料111/01/03轉為 西元yyyy-mm-dd
    //   let dateArr = d[0].split("/");
    //   dateArr[0] = Number(dateArr[0]) + 1911;
    //   d[0] = dateArr.join("-");
    //   // FIXME: 將每個格式資料的千分逗點,都處理去掉(對每一個欄位處理千分逗點)
    //   d = d.map((value) => {
    //     return value.replace(/[,]+/g, "");
    //   });
    //   // FIXME: 將股票代碼塞到欄位第一個，即每筆資料value的第0個索引為股票代碼，['2330', '2022-01-03', '7073,703,302', ......])
    //   d.unshift(stockNo);
    //   return d;
    // });
    // console.log(processData);
    // /////////


    // FIXME: 把處理好的資料存進資料庫
    // connection.execute -> 處理 bulk insert 的 prepare statement 會有點小問題
    // --> 回傳的是 promise 可以被 await
    // connection.query
    // 回傳的不是 promise，不能被 await
    //
    let savePriceResult = await twseSaver.saveStockPrice(connection, processData);
    //
    // //////////
    // let savePriceResult = await connection
    //   .promise()
    //   .query(
    //     "INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
    //     [processData]
    //   );
    console.log(savePriceResult);
    // //////////

  } catch (e) {
    console.error(e);
  }
  // TODO: 關掉與資料庫的連線，不然你的程式會關不掉
  connection.end();
})();