// converter.js 專門"處理撈來的資料"的模組

// exports = module.exports = {};  ---> 程式底層

// TODO: 處理撈來的股票搜尋資料，留下股票的中文名稱
function parseStockName(stockNameData) {
    if (
        !stockNameData.suggestions ||   // ////改stockNameData並去掉.data
        stockNameData.suggestions[0] === "(無符合之代碼或名稱)"
      ) {    // ////去掉.data
        throw new Error("查無此代表");
      }
  
      // 可以到這裡(沒進if)，表示有資料
      let stockData = stockNameData.suggestions[0];   // ////去掉.data
      let stockDatas = stockData.split("\t");
      return stockDatas[1];
}


// FIXME: 處理指定代碼及日期的股票資料，如日期、成交股數、漲跌價差等資料格式，以能正確儲存進資料庫。
function convertPrice(stockPriceData, stockNo) {
    let processData = stockPriceData.data.map((d) => {
        // FIXME: 日期格式資料111/01/03轉為 西元yyyy-mm-dd
        let dateArr = d[0].split("/");
        dateArr[0] = Number(dateArr[0]) + 1911;
        d[0] = dateArr.join("-");
        // FIXME: 將每個格式資料的千分逗點,都處理去掉(對每一個欄位處理千分逗點)
        d = d.map((value) => {
            return value.replace(/[,]+/g, "");
        });
        // FIXME: 將股票代碼塞到欄位第一個，即每筆資料value的第0個索引為股票代碼，['2330', '2022-01-03', '7073,703,302', ......])
        d.unshift(stockNo);
        return d;
    });
    
    return processData;
}

module.exports = {parseStockName, convertPrice}

// return module.exports; ---> 程式底層