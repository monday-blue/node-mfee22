// exports = module.exports = {};
// exports 本身是一個物件

let name = "default";

function setName(newName) {
    name = newName;
}

function showName() {
    console.log(name);
}

module.exports = { setName, showName };

// return module.exports;