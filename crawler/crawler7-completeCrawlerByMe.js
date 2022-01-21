// 01.16（日）
// 完成簡易版爬蟲 -- 自練習


const axios = require("axios");
const { readFile } = require("fs/promises");
const moment = require("moment");
const mysql = require("mysql2");
require("dotenv").config();

( async () => {
  // TODO: 連線資料庫(server端)  ps.此時你的程式(client端)
  // TODO: 用dotenv套件隱藏重要敏感資訊(.env 與 .env.example)
  let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
        // TODO: 根據變數存的股票代號去抓取資料
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
        // console.log(queryStockName.data);
        // console.log(queryStockName.data.suggestions);

        if (
          !queryStockName.data.suggestions ||
          queryStockName.data.suggestions[0] === "(無符合之代碼或名稱)"
        ) {
          throw new Error("查無此代表");
        }; // if



        // 可以到這裡(沒進if)，表示有資料
        // TODO: 處理撈來的股票搜尋資料，留下股票的中文名稱
        let stockData = queryStockName.data.suggestions[0];
        let stockDatas = stockData.split("\t");
        let stockName = stockDatas[1];
        

        // TODO: 儲存股票代碼與中文名稱進資料庫
        // Using prepared statements
        // to protect from SQL Injection attacks
        let saveNameResult = await connection.execute(
          "INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)",
          [stockNo, stockName]
        );
        // console.log(saveNameResult); // 印出儲存進資料庫的股票代碼與名稱來看看


        // FIXME: 撈取指定代碼及日期的股票價格資料，如日期、成交股數、成交金額、最高最低價格等
        let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期去抓資料

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

        // console.log(response.data);  // 印出從證券交易網站(此時是server response)撈出之指定代碼及日期的股票資料來看看，可參考 0121-responseData.txt
        
        // FIXME: 處理指定代碼及日期的股票資料，如日期、成交股數、漲跌價差等資料格式，以能正確儲存進資料庫。

        let processDataArr = response.data.data.map( (value, index) => {

            // FIXME: 日期格式資料111/01/03轉為 西元yyyy-mm-dd
            let dateArr = value[0].split('/');  // dateArr為傳回的新陣列['111', '01', '03']
            dateArr[0] = Number(dateArr[0])+1911;  // dateArr會更新為['2022', '01', '03']
            value[0] = dateArr.join('-');  // value[0]為輪流帶入之資料陣列的第一個陣列索引資料['2022-01-03', '7073,703,302', ......]
                    
            // value[0] = value[0].replace('/', '-'); //只會代換第一個/，錯

            // FIXME: 成交股數格式資料73,703,302轉為 73703302        
            // value[1] = value[1].replace(/,/g, "");
            // value[1] = value[1].replace(',', '');  //只會代換第一個,，錯
            // value[1] = parseInt(value[1], 10);  //最後是要字串不用轉數字，錯

            // FIXME: 將每個格式資料的千分逗點,都處理去掉
            // for(let i = 0; i < response.data.data.length; i++) {
            //   value[i] = value[i].replace(/,/g, "");
            // }
            // 錯誤，在map裡response.data.data.lenght不能讀，還是作用域問題屬性value不能讀??????，TypeError: Cannot read properties of undefined (reading 'replace')

            // value[index] = value[index].replace(/,/g, "");  
            // 錯誤，map帶入的index是每個value的index，並不是每個value裡資料的索引index，要搞清楚

            // 對每一個欄位處理千分逗點 by Azole
            value = value.map( (everyItemsInValue) => {
              return everyItemsInValue.replace(/[,]+/g, "");
            } );   // [,]+ ??????
            
            // FIXME: 確認漲跌價差有+-號是否可存進資料庫
            // 可以的喔

            // FIXME: 將股票代碼塞到欄位第一個，即每筆資料value的第0個索引為股票代碼，['2330', '2022-01-03', '7073,703,302', ......])
            value.unshift(stockNo);
            
            return value;
        }); // map
        console.log(processDataArr);  // 印出處理後的資料來看看
        
        // FIXME: 把整理好的資料存進資料庫
        // connection.execute -> mysql2套件 在處理 bulk insert 的 prepare statement 會有點小問題bug
        // connection.execute --> 回傳的是 promise 可以被 await
        // 
        // let savePriceResult = await connection.execute(
        //   "INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
        //   [processDataArr]
        // );
        // 

        // connection.query ---> 回傳的不是 promise，不能被 await
        // 因此加.promise()讓它變成promise，就可以了
        let savePriceResult = await connection
        .promise()
        .query(
          "INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
          [processDataArr]
        );

        console.log(savePriceResult); // 印出要存入stock_prices資料表的資料來看看

  } // try
  catch (e) {
    console.error(e);
  } // catch
  
  // TODO: 關掉與資料庫的連線，不然你的程式會關不掉
  connection.end();

})();  // async
