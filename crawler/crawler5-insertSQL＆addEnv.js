// 使用 npm 的 mysql2 第三方資料庫套件，將股票代碼與中文名稱撈出來並insert進資料庫 
// from azole複習理解
// 這部分很重要，要自己寫一遍

const axios = require("axios");
const { readFile } = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql2");  // TODO: [1]安裝mysql2 [2]引用mysql2
require("dotenv").config();  // 引入dotenv套件，不需用變數去接

(async () => {
  // TODO: [3]連線資料庫(server端)  ps.此時你的程式(client端)
  // TODO: [4]用dotenv套件隱藏重要敏感資訊(.env 與 .env.example)
  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    // TODO: [5]根據變數存的股票代號去抓取資料
    // 從 stock.txt 中讀出檔案代碼
    let stockNo = await readFile("stock.txt", "utf-8");
    // TODO: 撈取股票代碼搜尋時的中文名稱建議資料，以確認股票代碼是否存在
    let queryStockName = await axios.get(
      "https://www.twse.com.tw/zh/api/codeQuery",
      {
        params: {
          query: stockNo,
        },
      }
    );
    // console.log(queryStockName);
    // console.log(queryStockName.data);  // 印出內容可參考0121-queryStockName-data2330.txt 
    // console.log(queryStockName.data.suggestions); 
    if (
      !queryStockName.data.suggestions ||
      queryStockName.data.suggestions[0] === "(無符合之代碼或名稱)"
    ) {
      throw new Error("查無此代表");
    }

    // 可以到這裡，表示有資料
    // TODO: 處理撈來的股票搜尋資料，留下股票的中文名稱
    let stockData = queryStockName.data.suggestions[0];
    let stockDatas = stockData.split("\t");
    let stockName = stockDatas[1];

    // TODO: [7]儲存股票代碼與中文名稱進資料庫
    // 「 後端工程師負責操作資料庫，不能相信任何來自前端的資料！ 」
    // 「 有prepare或escape字眼的第三方資料庫套件才能安心使用！ 」
    // Using prepared statements
    // to protect from SQL Injection attacks (保護資料庫不被SQL注入攻擊)
    // "INSERT INTO stocks (id, name) VALUES (?, ?)", [stockNo, stockName]   // VALUES (?, ?)", [stockNo, stockName] 這樣寫mysql2會自動幫你去除變數裡存的'等特殊字元，並自動再串接好資料，再insert進資料庫。
    // connection.prepare / connection.execute先用這個

    let saveNameResult = await connection.execute(
      "INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)",  // SQL語法
      [stockNo, stockName]
    );
    console.log(saveNameResult);  // 印出存入的資料看看

    // 若資料庫內已有相同資料要重複insert要在SQL語法加 "IGNORE"
    // 不然console.log會出現重複insert資料的錯誤提示 Error: Duplicate entry '2330' for key 'PRIMARY'

    // FIXME: 抓取該代碼及設定日期的股票資料，如日期、成交股數、成交金額、最高最低價格等
    //以下註解程式碼好像在此頁程式主要功能中，不需要，所以先註解
    // let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期

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

    // console.log(response.data);
  } catch (e) {
    console.error(e);
  }
  // TODO: [8]關掉與資料庫的連線，不然你的程式會關不掉
  connection.end();
})();
