// twse.js 專門"撈資料"的模組。(模組化的axios部分練習 twse為台灣證交所縮寫)

// exports = module.exports = {};  ---> 程式底層

const axios = require("axios"); // 引入axios套件

// TODO: 撈取股票代碼搜尋時的中文名稱建議資料，以確認股票代碼是否存在
async function doQueryStockName(stockNo) {  // aync 回傳return的是一個promise並不是真正撈的資料，所以到父層呼叫doQueryStockName還要再await一次
    let queryStockName = await axios.get(
        "https://www.twse.com.tw/zh/api/codeQuery",
        {
        params: {
            query: stockNo,
        },
        }
    );

    return queryStockName.data;
    // console.log(queryStockName);印出來看會是一大包然後裡面包含data一包，我們只要data那一包，所以先在這裡侷限要把data那一包資料取出來。在crawler8-moduleApp.js裡匯入此模組後需要使用這裡此模組輸出的資料時，就不用再.data一次。
};


// FIXME: 撈取指定代碼及日期的股票價格資料，如日期、成交股數、成交金額、最高最低價格等
async function doQueryStockPrice(queryDate, stockNo) {

    // let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期，這段後來選擇不搬。

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

    return response.data;  // aync 回傳return的是一個promise並不是真正撈的資料，所以到父層呼叫doQueryStockName還要再await一次
};


module.exports = { doQueryStockName, doQueryStockPrice};


// return module.exports; ---> 程式底層
