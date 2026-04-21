#include "display.h"
#include "config.h"
#include "bitmaps.h"
#include "connections.h"

#include <Wire.h>
#include <Adafruit_GFX.h>                               
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// --------------------------------------------------
// Inicializa OLED
// --------------------------------------------------
void initDisplay() {
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    while (true);
  }

  display.clearDisplay();
  display.setTextColor(WHITE);
  display.display();
}

// --------------------------------------------------
// Tela inicial
// --------------------------------------------------
void showBootScreen() {

  // Logo 1
  display.clearDisplay();
  display.drawBitmap(0, 0, epd_bitmap_7Life__5_, 128, 64, WHITE);
  display.display();
  delay(2000);

  // Logo 2
  display.clearDisplay();
  display.drawBitmap(0, 0, epd_bitmap_SafeGuard__6_, 128, 64, WHITE);
  display.display();
  delay(2000);

  display.clearDisplay();
  display.display();
}

// --------------------------------------------------
// Tela principal
// --------------------------------------------------
void showMainScreen(float abpm, int spo2, float temp) {

  display.clearDisplay();

  // BPM
  display.drawBitmap(0, 8, epd_bitmap_coracao, 16, 16, WHITE);
  display.setCursor(22, 8);
  display.print("BPM: ");
  display.print(abpm, 0);

  // Oxigenação
  display.drawBitmap(0, 28, epd_bitmap_gota_de_sangue, 16, 16, WHITE);
  display.setCursor(22, 28);
  display.print("O2: ");
  if (spo2 > 0 && spo2 <= 100) {
  display.print(spo2);
  } else {
  display.print("--");
  }
  display.print("%");

  // Temperatura
  display.drawBitmap(0, 48, epd_bitmap_termometro, 16, 16, WHITE);
  display.setCursor(22, 48);
  display.print("TEMP: ");
  display.print(temp, 1);
  display.print("C");

  
  // Wifi
  if (wifiConnected()) {
    display.drawBitmap(110, 0, epd_bitmap_wifi, 16, 16, WHITE);
  } else {
    display.fillRect(110, 0, 16, 16, BLACK);
  }

  display.display();
}
