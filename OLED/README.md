OLED + Temperature Sensor
=========================
two short examples of reading temperature by DS18B20 or DHT22 sensor and show it on OLED display (4-wire SPI) or (2-wire I2C).
Everything is wired directly with breadboard wires to the Espruino Pico board. No external power supply needed.
Just Plugin to USB Port or power by USB battery pack.

![Espruino Pico OLED temperature](https://lh3.googleusercontent.com/5kzBBdqbfAH_kP5pFFmHzpx-b7Ce-YlZUQrmy_RlCZc=w983-h737-no)

SPI OLED + DS18B20 ([#link](OLED-SPI-TempDS18B20-MuMaLab.js))
-------------------------------------
Wiring OLED display:
* GND = pico A5
* VCC = pico A7 
* SCL = pico B5
* SDA = pico B6 
* RST = pico B7 
* D/C = pico A8 

Wiring DS18B20 temperature sensor:
* GND = pico GND
* VCC = pico VDD
* OUT = pico A6

I2C OLED + DHT22 ([#link](OLED-I2C-TempDHT22-MuMaLab.js))
-------------------------------------
Wiring OLED display:
* GND = pico A5
* VCC = pico A7 
* SDL = pico B6 
* SDA = pico B7
 
Wiring DHT22 temperature sensor:
* pin1 = VCC = pico VDD
* pin2 = Data = pico A8
* pin3 = Not connected
* pin4 = GND = pico GND
