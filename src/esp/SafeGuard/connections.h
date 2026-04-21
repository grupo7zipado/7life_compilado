#ifndef CONNECTIONS_H
#define CONNECTIONS_H

#include <Arduino.h>

// Funções WiFi
void initWiFi();                // Inicia o WiFi

void maintainWiFi();            // Reconecta o Wifi
bool wifiConnected();           // Retorna estado do Wifi

#endif