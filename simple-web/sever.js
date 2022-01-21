// sever.js 建立一個簡單的網站server

const http = require("http"); // NodeJS內建物件，不用安裝，引入即可
require("dotenv").config();

const server = http.createServer(function (request, response) {
    // TODO: 怎麼處理 request, 要負責回覆 response
    // TODO: 處理status code (HTTP狀態馬)
    // 1xx, 2xx, 3xx, 4xx, 5xx, 301, 302, 400用戶的錯, 500我們的錯

    // TODO: 處理路徑
    response.statusCode = 200;
    const path = request.url;
    console.log(path);

    switch (path) {
    case "/":
        response.end("Hello, Server EFG");
        break;
    case "/about":
        response.end("Hello, this is about");
        break;
    default:
        response.statusCode = 404;
        response.end();
    }  // 實務上不會這樣做，太繁複了，所以後來衍生出框架
});

// 做預設值
let port = process.env.SERVER_PORT || 3000;
server.listen(port, () => {
    console.log(`我們的簡易版 server 已經啟動，在 port ${port} 上`);
});
