# OLED + Temperature Sensor
---------------------------
<table>
  <tr>
    <td colspan="2">
Two short examples of reading temperature by DS18B20 or DHT22 sensor and show it on OLED display (4-wire SPI) or (2-wire I2C).
Everything is wired directly with breadboard wires to the Espruino Pico board. No external power supply needed.
Just Plugin to USB Port or power by USB battery pack.
    </td>
  </tr>
  <tr style="vertical-align: top;">
    <td width="50%">
      <strong>Table of Contents</strong>
      <ul>
        <li><a href="#spi-oled--ds18b20-link">SPI OLED + DS18B20</a>
          <ul>
            <li><a href="#hardware">Hardware</a></li>
            <li><a href="#wiring-oled-display">Wiring OLED display</a></li>
            <li><a href="#wiring-ds18b20-temperature-sensor">Wiring DS18B20 temperature sensor</a></li>
          </ul>
        </li>
        <li><a href="#i2c-oled--dht22-link">I2C OLED + DHT22</a>
          <ul>
            <li><a href="#hardware-1">Hardware</a></li>
            <li><a href="#wiring-oled-display-1">Wiring OLED display</a></li>
            <li><a href="#wiring-dht22-temperature-sensor">Wiring DS18B20 temperature sensor</a></li>
          </ul>
        </li>
      </ul>
    </td>
    <td>
      <img src="https://lh3.googleusercontent.com/5kzBBdqbfAH_kP5pFFmHzpx-b7Ce-YlZUQrmy_RlCZc=w983-h737-no" alt="Espruino Pico OLED temperature" />
    </td>
  </tr>
</table>

## SPI OLED + DS18B20 ([#link](OLED-SPI-TempDS18B20-MuMaLab.js))
----------------------------------------------------------------
### Hardware
* SPI OLED display ([aliexpress](http://www.aliexpress.com/item/Yellow-Blue-0-96-SPI-Serial-128x64-OLED-LCD-Display-Module-3-5V-For-Arduino-51SCM/32265963016.html))
* Temperature sensor ([aliexpress](http://www.aliexpress.com/item/1Pcs-New-DC5V-DS18B20-Digital-Temperature-Sensor-Module-for-Arduino-Hot-Sale/2054488934.html))

### Wiring OLED display
| OLED | Pico | 
| ---- |------|
| GND  | A5   |
| VCC  | A7   |
| SCL  | B5   |
| SDA  | B6   |
| RST  | B7   |
| D/C  | A8   |

### Wiring DS18B20 temperature sensor
| DS18B20 | Pico | 
| ------- |------|
| GND     | GND  |
| OUT     | A6   |
| VCC     | VDD  |

## I2C OLED + DHT22 ([#link](OLED-I2C-TempDHT22-MuMaLab.js))
------------------------------------------------------------
### Hardware
* I2C OLED display ([aliexpress](http://www.aliexpress.com/item/Free-Shipping-0-96-Blue-New-10Pcs-lot-128X64-OLED-LCD-LED-Display-Module-For-Arduino/32359916218.html))
* Temperature sensor ([aliexpress](http://www.aliexpress.com/item/1pcs-DHT22-digital-temperature-and-humidity-sensor-Temperature-and-humidity-module-AM2302-replace-SHT11-SHT15/1956275791.html))

### Wiring OLED display
| OLED | Pico | 
| ---- |------|
| GND  | A5   |
| VCC  | A7   |
| SDL  | B6   |
| SDA  | B7   |
 
### Wiring DHT22 temperature sensor
| DHT22   | Pico | 
| ------- |------|
| 1: VCC  | VDD  |
| 2: DATA | A8   |
| 3: N/C  | N/C  |
| 4: GND  | GND  |
> N/C = not connected
