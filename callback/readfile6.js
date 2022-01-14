// readFile await/async 版本  ---小賴老師的寫法

const { readFile } = require("fs/promises");

(async () => {
  try {
    let result = await readFile("test.txt", "utf-8");
    console.log(`這是內建的 promise 版本 ${result}`);
  } catch (err) {
    console.error(err);
  }
})();




