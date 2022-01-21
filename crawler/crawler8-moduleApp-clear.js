// azole版本的完整版簡易爬蟲 ---> 模組化axios撈資料部分練習---最終清理產出！！

// 引入套件
const { readFile } = require("fs/promises");
const moment = require("moment");
const { exit } = require("process");

//引入自己寫的模組
const twse = require("./crawler-module/twse.js");
const converter = require("./crawler-module/converter.js");
const twseSaver = require("./crawler-module/twseSaver.js");
const connection = require("./crawler-module/dbConnect.js");
// TODO: 連線資料庫(server端)  ps.此時你的程式(client端)
// TODO: 用dotenv套件隱藏重要敏感資訊(.env 與 .env.example)

(async () => {

  try {
    // TODO: 根據變數存的股票代號去抓取資料
    // 從 stock.txt 中讀出檔案代碼
    let stockNo = await readFile("stock.txt", "utf-8");

    
    // TODO: 撈取股票代碼搜尋時的中文名稱建議資料，以確認股票代碼是否存在
    let stockNameData = await twse.doQueryStockName(stockNo);  
    // 子層async doQueryStockName方法因為回傳的是一個Promise物件而非已經是撈到的資料，所以前面依然要加await。

    // TODO: 處理撈來的股票搜尋資料，留下股票的中文名稱   
    let stockName = converter.parseStockName(stockNameData);

    // TODO: 儲存股票代碼與中文名稱進資料庫
    // Using prepared statements
    // to protect from SQL Injection attacks
    let saveNameResult = await twseSaver.saveStockName(connection, stockNo, stockName);

    console.log(saveNameResult);



    // FIXME: 撈取指定代碼及日期的股票價格資料，如日期、成交股數、成交金額、最高最低價格等
    let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期

    let stockPriceData = await twse.doQueryStockPrice(queryDate, stockNo);

    // FIXME: 處理指定代碼及日期的股票資料，如日期、成交股數、漲跌價差等資料格式，以能正確儲存進資料庫。
    let processData = converter.convertPrice(stockPriceData, stockNo)

    // FIXME: 把處理好的資料存進資料庫

    let savePriceResult = await twseSaver.saveStockPrice(connection, processData);

    console.log(savePriceResult);

  } catch (e) {
    console.error(e);
  }
  // TODO: 關掉與資料庫的連線，不然你的程式會關不掉
  connection.end();

})();