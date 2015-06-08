OLED + Temperature Sensor
=========================
short example to read current temperature by DS18B20 sensor and show it on OLED display (4-wire SPI)
Everything is wired directly with breadboard wires to the Espruino Pico board. No external power supply needed.
Just Plugin to USB Port or power by USB battery pack.

![Espruino Pico OLED temperature](https://lh3.googleusercontent.com/5kzBBdqbfAH_kP5pFFmHzpx-b7Ce-YlZUQrmy_RlCZc=w983-h737-no)

Wiring OLED
-----------
* GND = pico A5
* VCC = pico A7 
* SCL = pico B5
* SDA = pico B6 
* RST = pico B7 
* D/C = pico A8 

Wiring DS18B20
--------------
* GND = pico GND
* VCC = pico VDD
* OUT = pico A6

