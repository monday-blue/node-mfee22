// 使用第三方axios套件 - Promise版本

const axios = require('axios'); // 引用axios(第三方套件)進檔案

// Make a request
// axios.get('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20211201&stockNo=2330&_=1641716312720')
axios.get('http://34.221.173.92:3000/data')  // 先改回小賴老師提供的網址，怕寫錯亂搞台灣證券交易所的網站
  .then(function (response) {
    // handle success
    console.log(response.data);  // response會回傳給你一個一大包的複雜物件，跟開發者工具有點關係，建議多看懂習慣一下。response.data只拿response物件裡的data，就會拿到JSON格式的資料了。
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });


  
