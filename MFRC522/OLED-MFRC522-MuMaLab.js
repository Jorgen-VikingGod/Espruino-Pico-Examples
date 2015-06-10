var g;
var nfc;

function onInit() {
  clearInterval();
  // set A5 and A7 pins to power the OLED display
  A5.write(0); // GND
  A7.write(1); // VCC
  // load custom fonts
  require("Font6x8").add(Graphics);
  require("Font8x16").add(Graphics);
  // initial SPI1 for MRFC522 NFC module
  SPI1.setup({sck:B3, miso:B4, mosi:B5 });
  nfc = require("MFRC522").connect(SPI1, B1/*CS*/);
  // OLED display SPI 4wire
  // GND = pico A5
  // VCC = pico A7
  // SCL = pico B13
  // SDA = pico B15
  // RST = pico B14
  // D/C = pico A6
  var spi = new SPI();
  spi.setup({mosi: B15, sck:B13});
  // OLED driver and graphic library
  // call updateTemp each 500 ms after initial OLED SPI
  g = require("SSD1306").connectSPI(spi, A6, B14, function() {
    setInterval(scanNFC, 500);
  });
}
// draw center aligned text
function drawCenterText(text, y) {
  g.drawString(text, (g.getWidth() - g.stringWidth(text))/2, y);
}
// scan NFC and draw display
function scanNFC() {
  // draw title
  g.setFont8x16();
  g.setColor(255,255,255);
  drawCenterText("NFC Reader",0);
  g.setFont6x8();
  // find cards
  nfc.findCards(function(card) {
    print("Found card "+card);
    card = JSON.stringify(card);
    if (card=="[4,19,153,221]") digitalPulse(LED1,1,500);
    if (card=="[0,121,205,3]")  digitalPulse(LED2,1,500);
    g.setColor(0,0,0);
    g.fillRect(0,16, 128,30);
    g.setColor(255,255,255);
    drawCenterText(card, 16);
   });
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

setWatch(function() {
  g.clear();
}, BTN, {repeat: true, edge: "falling", debounce: 50});

// call onInit() if it is first start
onInit();
