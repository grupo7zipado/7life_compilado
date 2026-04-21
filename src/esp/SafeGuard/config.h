#ifndef CONFIG_H
#define CONFIG_H

// OLED
#define SCREEN_WIDTH 128     // Largura do display
#define SCREEN_HEIGHT 64     // Altura do display
#define OLED_RESET -1        // Pino de reset do display (-1 significa que o display não usa pino físico de reset)

// Pinos
#define SDA_PIN 8            // SDA I2C
#define SCL_PIN 9            // SCL I2C

#define BUZZER_PIN 10        // Piezo

// WiFi
#define WIFI_SSID "Rede"     // Nome da rede
#define WIFI_PASS "Senha"    // Senha da rede

#endif
