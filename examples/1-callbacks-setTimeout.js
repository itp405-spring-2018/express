function doSomethingAsync(callback) {
  setTimeout(function() {
    callback();
  }, 1500);
}

console.log(1);
doSomethingAsync(function() {
  console.log(3);
});
console.log(2);
