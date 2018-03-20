const fs = require("fs");

function doSomethingAsync(callback) {
  return new Promise(function(resolve, reject) {
    fs.readFile("hello.txt", { encoding: "utf8" }, function(error, contents) {
      if (error) {
        reject(error);
      } else {
        resolve(contents);
      }
    });
  });
}

console.log(1);
doSomethingAsync().then(
  function(contents) {
    console.log(contents);
  },
  function(error) {
    console.error("Error", error);
  }
);
console.log(2);
