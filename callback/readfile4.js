// readFile 使用NodeJS v16.13.1後內建的Promise物件 版本

const { readFile } = require("fs/promises"); //自NodeJS Library 的promises讀進readFile

// "用"Promise物件模板
readFile("test.txt", "utf-8")
  .then((result) => {
    console.log(`這是NodeJS v16.13.1後內建的 promise 版本 ${result}`);
  })
  .catch((err) => {
    console.error(err);
  });

  // 使用這種方式，就不用自己"包(做、建立)"Promise物件模板了，NodeJS內建的Promise物件會幫我包好Promise物件模板，我只要直接"用"Promise物件模板就好