// sever.js  // 使用express框架建立一個網站server


const express = require("express");  // 引入 express
require("dotenv").config();

// 利用 express 這個 library 來建立一個 web app
let app = express();  // 習慣這樣寫，呼叫一個東西給你一個application

// 設port給它
const port = process.env.SERVER_PORT || 3000;
// MAC查已佔用IP $ lsof -n -i | grep LISTEN
// MAC查IP是否被用 $ lsof -n -i:3006


// listen它
app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});