#include "config.h"
#include "display.h"
#include "sensors.h"
#include "connections.h"

#include <Wire.h>


void setup() {

  Wire.begin(SDA_PIN, SCL_PIN);

  initDisplay();
    showBootScreen();

  initSensors();
  initWiFi();

}

static unsigned long lastHeart = 0;
static unsigned long lastTemp = 0;
static unsigned long lastDisplay = 0;

void loop() {

  maintainWiFi();

  if (millis() - lastHeart > 20) {
    lastHeart = millis();

    readSpo2Bpm();
  }

  if (millis() - lastTemp > 1000) {
    lastTemp = millis();

   readTemperature();
  }

  if (millis() - lastDisplay > 500) {
    lastDisplay = millis();

    showMainScreen(abpm, spo2, temp);
  }
}
