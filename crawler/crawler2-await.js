// 使用第三方axios套件 - await版本

const axios = require('axios'); // 引用axios(第三方套件)進檔案

// Make a request
(async () => {
    // let axiosResult = axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20211201&stockNo=2330&_=1641716312720');
    let axiosResult = await axios.get('http://34.221.173.92:3000/data');  // 先寫小賴老師提供的網址，怕寫錯亂搞台灣證券交易所的網站
    try {
        console.log(axiosResult.data);
    }
    catch {
        console.log(error);
    }
})();

// 印出
// {
//     orderNo: 'AB0001',
//     amount: 1000,
//     details: [
//       { productId: 1, count: 1, price: 500 },
//       { productId: 2, count: 2, price: 250 }
//     ]
//   }


    


    
