# OLED + RFID reader
---------------------------
<table>
  <tr>
    <td colspan="2">
Short example of reading RFID/NFC cards by RC522/MFRC522 module and display it on OLED display (4-wire SPI).
Everything is wired directly with breadboard wires to the Espruino Pico board. No external power supply needed.
Just Plugin to USB Port or power by USB battery pack.
    </td>
  </tr>
  <tr style="vertical-align: top;">
    <td width="50%">
      <strong>Table of Contents</strong>
      <ul>
        <li><a href="#spi-oled--rfid-rc522-link">SPI OLED + RFID RC522</a>
          <ul>
            <li><a href="#hardware">Hardware</a></li>
            <li><a href="#wiring-oled-display">Wiring OLED display</a></li>
            <li><a href="#wiring-rfid-rc522-module">Wiring RFID RC522 module</a></li>
            <li><a href="#initialize-oled-display">Initialize OLED display</a></li>
            <li><a href="#initialize-rfid-module">Initialize RFID module</a></li>
            <li><a href="#read-rfid-cards">Read RFID cards</a></li>
          </ul>
        </li>
      </ul>
    </td>
    <td>
      <img src="https://lh3.googleusercontent.com/iV0fTW4e7Zi2o_h5vra9jre4qSKy1DzSn7yM3W6k3eI=w1143-h858-no" alt="Espruino Pico OLED NFC" />
    </td>
  </tr>
</table>

## SPI OLED + RFID RC522 ([#link](OLED-MFRC522-MuMaLab.js))
----------------------------------------------------------------
### Hardware
* SPI OLED display ([aliexpress](http://www.aliexpress.com/item/Yellow-Blue-0-96-SPI-Serial-128x64-OLED-LCD-Display-Module-3-5V-For-Arduino-51SCM/32265963016.html))
* RFID RC522 module ([aliexpress](http://www.aliexpress.com/item/MFRC-522-RC522-RFID-RF-IC-card-sensor-module-to-send-S50-Fudan-card-keychain-for/1732292096.html))

### Wiring OLED display
| OLED | Pico | 
| ---- |------|
| GND  | A5   |
| VCC  | A7   |
| SCL  | B13  |
| SDA  | B15  |
| RST  | B14  |
| D/C  | A6   |

### Wiring RFID RC522 module
| RC522     | Pico | 
| --------- |------|
| GND       |	GND  |
| VCC	      | VDD  |
| CS/SS/SDA |	B1   |
| SCK	      | B3   |
| MISO      | B4   |
| MOSI      | B5   |

### Initialize OLED display
```js
var spi = new SPI();
spi.setup({mosi: B15, sck:B13});
// OLED driver and graphic library
var g = require("SSD1306").connectSPI(spi, A6, B14, function() {
  // display is connected...
  // do something 
});
```

### Initialize RFID module
We use the SPI1 port of the Espruino Pico board.
```js
// initial SPI1 for MRFC522 NFC module
  SPI1.setup({sck:B3, miso:B4, mosi:B5 });
  var nfc = require("MFRC522").connect(SPI1, B1/*CS*/);
```

### Read RFID cards
```js
// find cards
nfc.findCards(function(card) {
  print("Found card "+card);
  card = JSON.stringify(card);
  if (card=="[4,19,153,221]") digitalPulse(LED1,1,500);
  if (card=="[0,121,205,3]")  digitalPulse(LED2,1,500);
});
```
