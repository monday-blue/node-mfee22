// dbConnect.js  專門"連線"的模組

// exports = module.exports = {};  ---> 程式底層

const mysql = require("mysql2");  // 引入套件
require("dotenv").config();

// TODO: 連線資料庫(server端)  ps.此時你的程式(client端)
// TODO: 用dotenv套件隱藏重要敏感資訊(.env 與 .env.example)
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

module.exports = connection;  // 不再重分配一個物件記憶體給它，而是直接將connection物件export出去

// return module.exports; ---> 程式底層