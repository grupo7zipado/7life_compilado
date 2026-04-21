#ifndef SENSORS_H
#define SENSORS_H

extern double temp;
extern double spo2;
extern double abpm;

void initSensors();       // Inicia os sensores
void readTemperature();   // Leitura de temperatura
void readSpo2Bpm();       // Leitura de SPO2 e BPM

#endif