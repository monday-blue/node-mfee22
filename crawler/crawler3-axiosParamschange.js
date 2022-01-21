// 01.15 (六)
// 用 axios 的 params 設定方式，取代樣板字串query string抓資料設定方式
// from小賴老師github 01.20已複習理解

const axios = require('axios');
(async () => {
        try {
        // 根據變數去抓取資料
        let stockNo = 2330;
        let queryDate = "20220115";

        // let response = await axios.get(
        //   `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${queryDate}&stockNo=${stockNo}`
        // );     // 樣板字串方式的query string

        let response = await axios.get(
            "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
            {
                // 把query string方式 改成 get方法 的config物件的 參數設定 方式
                // 這裡可以放一些設定
                // params: 放 query string 的參數
                params: {
                    response: "json",
                    date: queryDate,
                    stockNo,   // 相當於寫stockNo: stockNo;
            },
            }
        );

        // console.log(response);    
        // reponse是抓到的一大包JSON資料物件{...}，內容超複雜可以試著讀讀看理解或許之後會有用到
        // 印出內容可見 0121-response.txt 檔案
        console.log(response.data);  
        // 我只要console.log出reponse變數存的JSON物件資料裡面，屬性data的資料內容，所以寫response.data。屬性data裡的資料也是JSON物件，裡面有眾多屬性存不同資料例如：{ "stat": "OK", "date": "20220121", "title": xxx, "fields": xxx, "data": [...[],[],[]] （data屬性裡面其實還有data屬性,神秘！） } 等等。
        // 印出內容可見 0121-responseData.txt 檔案

        } catch (e) {
        console.error(e);  
        // console.error可以把error顯示在開發者工具的error分類區，e為err簡寫。(me:與瀏覽器監聽事件自動產生之物件event簡寫e無關，完全不是同一件事)
    }
    
})();