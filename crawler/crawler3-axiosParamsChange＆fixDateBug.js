// 修改抓資料的代碼、日期設定方式。不用寫死設定方式；改用自動抓檔案代碼內容、今天日期

const axios = require("axios");
const { readFile } = require("fs");
const { exit } = require("process");

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
    // TODO:自動讀檔案stock.txt的資料，去確定接下來要撈資料的代碼(代表企業)的股票資訊。eg: 2330:台積電，2603:長榮。
    let stockNo = await doreadFile("stock.txt", "utf-8");  
    
    // TODO::自動抓到今天的日期，去確定接下來要撈的日期的股票資訊。
    // 我自己的日期轉換方式（超複雜＠＠;）
    let today = new Date();  
    let queryDay = today.getDate();  // 若為2號會只回覆2，所以要做處理加前面的0，讓它變02
    let queryMonth = today.getMonth();  // 一月會回覆0，要加１之外；若為2月會只回覆１所以除了要加１之外，還要做處理加前面的0，讓它變02
    let queryYear = today.getFullYear();  // 回覆為西元年，要轉成民國年

    // console.log(today);        // 印出

    // 處理 日
    if(queryDay < 10 ) {
        changeDay = "0" + queryDay;  // JS會自動轉換型別所以不用額外自己先將queryDate轉字串
    }
    else {
        changeDay = queryDay;
    }
    // console.log(changeDay);    // 印出看看
    
    // 處理 月
    if(queryMonth < 10) {
        changeMonth = "0" + (queryMonth + 1);  // JS會自動轉換型別所以不用額外自己先將queryDate轉字串
    }
    else{
        changeMonth = queryMonth + 1;
    }
    // console.log(queryMonth);  // 印出看看

    // 處理 年
    if(queryYear >= 1911) {
        changeYear = queryYear - 1911;
    }
    else {
        changeYear = "民國元年前出現之年份沒有在股票資料庫中";
    }
    // console.log(queryYear);  // 印出看看

    // 轉換成西元yyyymmdd 20220120
    queryDate = `${queryYear}${changeMonth}${changeDay}`;

    // 轉換成 民國yyy-mm-dd 111-01-20
    let dateArray = [changeYear, changeMonth, changeDay];
    let changeDate = dateArray.join("-");
    console.log(changeDate);   // 印出看看
    

    // let queryDate = moment().format("YYYYMMDD"); // 自動用今天的日期
    // 這之後會改用老師建議之npm 日期套件 moment，可以自由設定日期格式較簡潔

    // exit();  // 暫停程式來看看console.log印出來是不是我要的日期格式



    // TODO::這裡開始根據上方自定義的變數stockNo與queryDate去撈相對應的股票資料。
    // let response = await axios.get(
    //   `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${queryDate}&stockNo=${stockNo}`
    // );      //樣板字串方式的query string

    let response = await axios.get(
    "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    {
        // 把query string方式 改成 get方法 的config物件的 參數設定 方式
        // 這裡可以放一些設定
        // params: 放 query string 的參數
        params: {
        response: "json",
        date: queryDate,
        stockNo,  // 相當於寫stockNo: stockNo;
        },
    }
    );

    // console.log(response);  // 印出內容可見 0121-response.txt 檔案
    console.log(response.data);  // 印出內容可見 0121-responseData.txt 檔案
    
} catch (e) {
    console.error(e);  // console.error可以把error顯示在開發者工具的error分類區，e為err簡寫。(me:與瀏覽器監聽事件自動產生之物件event簡寫e無關，完全不是同一件事)
}
})();
