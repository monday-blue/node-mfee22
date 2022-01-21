// exports = module.exports = {};  程式底層會自動偷偷塞這段程式碼，{}分配記憶體空間。
// exports 本身是一個物件。

let name = "defult name";

function setName(newName) {
    name = newName;
}

function showName() {
    console.log(name);
}

// exports = { setName, showName };  // 這樣寫不行，return出的module.exports裡等於沒東西

module.exports = { setName, showName };

// return module.exports;   程式底層會自動偷偷塞這段程式碼(實際做什麼不知道，但可能做的概念像這樣)