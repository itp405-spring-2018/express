function on(event, callbackFunction) {
  callbackFunction(5);
}

on('click', function(number) {
  console.log('hi');
});
