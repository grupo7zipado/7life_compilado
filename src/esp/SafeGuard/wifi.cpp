#include "connections.h"
#include "config.h"

#include <WiFi.h>

static unsigned long lastReconnectAttempt = 0;
static const unsigned long reconnectInterval = 5000; // 5s

void initWiFi() {

  WiFi.mode(WIFI_STA);
  WiFi.setSleep(false);
  WiFi.begin(WIFI_SSID, WIFI_PASS);

  lastReconnectAttempt = millis();
}

void maintainWiFi() {

  if (WiFi.status() == WL_CONNECTED) return;

  if (millis() - lastReconnectAttempt >= reconnectInterval) {

    lastReconnectAttempt = millis();

    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASS);
  }
}

bool wifiConnected() {
  return WiFi.status() == WL_CONNECTED;
}