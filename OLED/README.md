# OLED + Temperature Sensor
---------------------------
two short examples of reading temperature by DS18B20 or DHT22 sensor and show it on OLED display (4-wire SPI) or (2-wire I2C).
Everything is wired directly with breadboard wires to the Espruino Pico board. No external power supply needed.
Just Plugin to USB Port or power by USB battery pack.

![Espruino Pico OLED temperature](https://lh3.googleusercontent.com/5kzBBdqbfAH_kP5pFFmHzpx-b7Ce-YlZUQrmy_RlCZc=w983-h737-no)

## SPI OLED + DS18B20 ([#link](OLED-SPI-TempDS18B20-MuMaLab.js))
----------------------------------------------------------------
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
