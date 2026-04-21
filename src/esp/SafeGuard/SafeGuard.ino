#include "config.h"
#include "display.h"
#include "sensors.h"

#include <Wire.h>


void setup() {

  Wire.begin(SDA_PIN, SCL_PIN);
  initSensors();
  initDisplay();

  showBootScreen();
}

void loop() {
 readTemperature();
 readSpo2Bpm();

  showMainScreen(abpm, spo2, temp);

}