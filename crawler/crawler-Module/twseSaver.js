// twseSaver.js 專門"儲存資料"的模組

// exports = module.exports = {};  ---> 程式底層

// TODO: 儲存股票代碼與中文名稱進資料庫
async function saveStockName(connection, stockNo, stockName) {
    let saveNameResult =  await connection.execute(
        "INSERT IGNORE INTO stocks (id, name) VALUES (?, ?)",
        [stockNo, stockName]
    );

    return saveNameResult;
}


// FIXME: 把處理好的資料存進資料庫
async function saveStockPrice(connection, processData) {
    return await connection
    .promise()
    .query(
        "INSERT IGNORE INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
        [processData]
    );
}

module.exports = {saveStockName, saveStockPrice}

// return module.exports; ---> 程式底層