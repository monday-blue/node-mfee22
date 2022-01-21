// 根據輸入代碼變數，去找這個代碼所對應的中文名有或沒有
const axios = require("axios");
const { readFile } = require("fs/promises");
const moment = require("moment");  // 匯入老師建議之 npm 日期套件 moment，可以用來自由設定日期格式較簡潔

(async () => {
  try {
    // 根據變數去抓取資料
    // 從 stock.txt 中讀出檔案代碼
    let stockNo = await readFile("stock.txt", "utf-8");
    // 抓取股票中文名稱，順便確認股票代碼是否存在
    let queryStockName = await axios.get(
      "https://www.twse.com.tw/zh/api/codeQuery",
      {
        params: {
          query: stockNo,  
          // 在證券交易所網站搜尋框打2或23、233、2330時，開發者工具裡network裡會都出現query東西，https://www.twse.com.tw/zh/api/codeQuery?query=2330&_=1642748004994 裡的 ?query=2330，因此將query參數設定為stockNo變數
        },
      }
    );
    // console.log(queryStockName);
    // console.log(queryStockName.data);
    // console.log(queryStockName.data.suggestions);
    // 印出內容可參考 0121-queryStockName-data2330.txt 
    // queryStockName印出裡面會有一個屬性：
    // data: {
    // query: '2330',
    // suggestions: [ '2330\t台積電', '2330R\t台積甲', '2330T\t台積丙' ]
    // }
    if (
      !queryStockName.data.suggestions ||
      queryStockName.data.suggestions[0] === "(無符合之代碼或名稱)"
    ) {
      throw new Error("查無此代表");
    }

    // 可以到這裡，表示有資料
    let stockData = queryStockName.data.suggestions[0];  // suggestions[0]為陣列第一個
    // console.log(stockData);  // 印出：2330\t台積電 (\t是大空格不會印出)
    let stockDatas = stockData.split("\t");
    // console.log(stockDatas); // 印出陣列：[ '2330', '台積電' ]
    let stockName = stockDatas[1];  // stockDatas[1]為陣列第二個
    // console.log(stockName);  // 印出：台積電
    

    let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期
    // 改用老師建議之 npm 日期套件 moment，可以自由設定日期格式較簡潔

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
