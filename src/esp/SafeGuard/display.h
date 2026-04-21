#ifndef DISPLAY_H
#define DISPLAY_H

void initDisplay();                                     // Inicia o display

void showBootScreen();                                  // Tela de inicio do display
void showMainScreen(float abpm, int spo2, float temp);  // Dashboard do display
void showAlertScreen(const char* msg);                  // Ainda não utilizada Mensagem do display

#endif