function flash_led1(led_on) {
  digitalWrite(LED1, led_on);
}
function pulse_led2() {
  digitalPulse(LED2, 1, 150);
}
// when button is pressed
setWatch(function() {
  console.log("Press at "+getTime());
  digitalWrite(LED2, 0);
  flash_led1(1); 
}, BTN, {repeat: true, edge: "rising", debounce: 50});
// when button is pressed
setWatch(function() {
  console.log("Release at "+getTime());
  flash_led1(0);
  pulse_led2(); 
}, BTN, {repeat: true, edge: "falling", debounce: 50});