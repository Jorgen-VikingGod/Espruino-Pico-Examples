var g;
var tempSensor;

function onInit() {
  clearInterval();
  // Analog pin A6 to read temperature from Dallas DS18B20 sensor
  // temp sensor is powered by pins VDD and GND of pico
  var ow = new OneWire(A6);
  tempSensor = require("DS18B20").connect(ow);
  // set A5 and A7 pins to power the OLED display
  A5.write(0); // GND
  A7.write(1); // VCC
  // load custom fonts
  require("Font6x8").add(Graphics);
  require("Font8x16").add(Graphics);
  // OLED display SPI 4wire
  // GND = pico GND
  // VCC = pico VDD 
  // SCL = pico B5
  // SDA = pico B6 
  // RST = pico B7 
  // D/C = pico A8 
  var spi = new SPI();
  spi.setup({mosi: B6, sck:B5});
  // OLED driver and graphic library
  // call updateTemp each 500 ms after initial OLED SPI 
  g = require("SSD1306").connectSPI(spi, A8, B7, function() {
    setInterval(updateTemp, 500);
  });
}
// helper function to map one range to another
// e.g.
// var value = 5;
// var newValue = map(value, [0,10], [0,20]);
// > newValue = 10
function map(value, srcRange, dstRange){
  if (value < srcRange[0] || value > srcRange[1]){
    return NaN; 
  }
  var srcMax = srcRange[1] - srcRange[0],
      dstMax = dstRange[1] - dstRange[0],
      adjValue = value - srcRange[0];
  return (adjValue * dstMax / srcMax) + dstRange[0];
}
// draw left aligned text
function drawLeftString(text, y) {
  g.drawString(text, 0, y);
}
// draw center aligned text
function drawCenterText(text, y) {
  g.drawString(text, (g.getWidth() - g.stringWidth(text))/2, y);
}
// draw center caligned text with inverted rect behind
function drawCenterTextBlock(text, y, fontHeight) {
  var textWidth = g.stringWidth(text);
  var centerX = (g.getWidth() - textWidth)/2;
  g.setColor(255, 255, 255);
  g.fillRect(centerX-1, y, centerX+textWidth, y+fontHeight);
  g.setColor(0, 0, 0);
  g.drawString(text, centerX, y);
}
// draw right aligned text
function drawRightString(text, y) {
  g.drawString(text, (g.getWidth() - g.stringWidth(text)), y);
}
// draw triangle
function drawTriangle(x0,y0, x1,y1, x2,y2) {
  g.drawLine(x0,y0, x1,y1);
  g.drawLine(x1,y1, x2,y2);
  g.drawLine(x2,y2, x0,y0);
}
// draw temp. grid and scale
function drawTemp() {
  g.clear();
  g.setColor(255,255,255);
  drawTriangle(64,0,  0,50, 128,50);
  drawTriangle(64,0, 20,50, 108,50);
  drawTriangle(64,0, 40,50,  88,50);
  g.drawLine(64,0, 64,50);
  g.setColor(0,0,0);
  g.fillRect(0, 0, 128, 40);
  g.drawLine(0,50, 128);
  g.setFont6x8();
  g.setColor(255,255,255);
  drawLeftString("0",54);
  drawCenterText("25",54);
  drawRightString("50",54);
}
// draw temp. gauge 
function drawTempGauge(newFuellevel) {
  g.setColor(255,255,255);
  g.drawLine(64,0, newFuellevel,  58);
  g.drawLine(65,0, newFuellevel+1,58);
  g.drawLine(66,0, newFuellevel+2,58);
}
// update screen and get temperature 
function updateTemp() {
  var temperature = tempSensor.getTemp();
  // round to 0.1
  temperature = Math.round(temperature*10)/10;
  // map temp value to pixel scale (0 to 50°C) >> (0 to 128 pixel)
  var tempLevel = map(temperature, [0,50], [0,128]);
  // draw scale and texts
  drawTemp();
  // draw gauge
  drawTempGauge(tempLevel);
  // draw title
  g.setColor(0,0,0);
  g.fillRect(40, 0, 85, 15);
  g.setFont8x16();
  g.setColor(255,255,255);
  drawCenterText("Temperature",0);
  // draw current temperature 
  drawCenterTextBlock(""+temperature+"'C", 16, 16);
  // draw MunichMakerLab logo
  drawLogo();
  // update display
  g.flip(); 
}
// draw MunichMakerLab logo by binary data (0 = black, 1 = white)
function drawLogo() {
  var img = {
    width : 30, height : 48, bpp : 1,
    transparent : 0,
    buffer : new Uint8Array([
      0b00000000, 0b00000000, 0b01000000, 0b00000000, 0b00000000, 0b00000011, 
      0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 
      0b00000000, 0b11000000, 0b00000000, 0b00000000, 0b00000011, 0b00000000, 
      0b00000000, 0b00000000, 0b00001100, 0b00000000, 0b00000000, 0b00000000, 
      0b01100000, 0b00000000, 0b00000000, 0b00000001, 0b10000000, 0b00000000, 
      0b00111100, 0b00001110, 0b00000001, 0b11110001, 0b11111000, 0b01110111, 
      0b10001111, 0b11100111, 0b11110011, 0b11101111, 0b01111111, 0b10011111, 
      0b11111111, 0b10011111, 0b11111110, 0b01111111, 0b11111111, 0b11111111, 
      0b11111001, 0b11110111, 0b11111110, 0b11111011, 0b11100111, 0b11001100, 
      0b11111001, 0b11001111, 0b10011111, 0b00000011, 0b11100010, 0b00111110, 
      0b01111100, 0b00011111, 0b10000000, 0b11111001, 0b11110000, 0b01111110, 
      0b00000011, 0b11100111, 0b11000001, 0b11111000, 0b00001111, 0b10011111, 
      0b00000111, 0b11000000, 0b00111110, 0b01111100, 0b00010111, 0b00000000, 
      0b11111001, 0b11110000, 0b01011100, 0b00000011, 0b11100111, 0b11000001, 
      0b01110000, 0b00001111, 0b10001110, 0b00000111, 0b10000000, 0b00111100, 
      0b00000000, 0b00001100, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 
      0b00000000, 0b00000100, 0b01010010, 0b10010100, 0b01001001, 0b00011011, 
      0b01001011, 0b01010010, 0b10110100, 0b01111101, 0b00101111, 0b01001000, 
      0b11110001, 0b01010100, 0b10101101, 0b00101011, 0b01000101, 0b01001100, 
      0b10010100, 0b01001001, 0b00000000, 0b00000000, 0b00000000, 0b00000000, 
      0b01000100, 0b01100100, 0b10011110, 0b11100001, 0b10110011, 0b10010110, 
      0b01000010, 0b01000111, 0b11001011, 0b01110001, 0b11001110, 0b00010101, 
      0b00111101, 0b10100100, 0b00101100, 0b01010100, 0b10010100, 0b11011110, 
      0b10011000, 0b00000000, 0b00000000, 0b00000000, 0b00000110, 0b00000000, 
      0b11110000, 0b01111100, 0b00011000, 0b00000011, 0b11000011, 0b11111000, 
      0b01100000, 0b00011111, 0b10001110, 0b00110001, 0b10000000, 0b01100110, 
      0b00111000, 0b11000110, 0b00000001, 0b10011000, 0b11111110, 0b00011000, 
      0b00001110, 0b01110011, 0b10001100, 0b01100000, 0b00111111, 0b11001110, 
      0b00011001, 0b11111101, 0b11111111, 0b10111000, 0b11100111, 0b11110111, 
      0b00001110, 0b01111111, 0b00000000, 0b00000000, 0b00000000, 0b00000000,
    ]).buffer
  };
  g.setColor(0,0,0);
  g.fillRect(98, 16, 128, 64);
  g.setColor(255,255,255);  
  g.drawImage(img, 98, 16);
}
// call onInit() if it is first start
onInit();
