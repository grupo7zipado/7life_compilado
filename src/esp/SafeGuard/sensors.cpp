#include <Arduino.h>
#include <Wire.h>
#include <math.h>

#include <MAX30105.h>
#include "heartRate.h"
#include <Adafruit_MLX90614.h>

#include "config.h"
#include "sensors.h"

/* =====================================================
   OBJETOS DOS SENSORES
===================================================== */

MAX30105 particleSensor;
Adafruit_MLX90614 mlx;

/* =====================================================
   VARIÁVEIS DE LEITURA
===================================================== */

double temp = 0.0;
double spo2 = 0.0;
double abpm = 0.0;

/* =====================================================
   VARIÁVEIS INTERNAS MAX30102
===================================================== */

double avered = 0;
double aveir = 0;
double sumirrms = 0;
double sumredrms = 0;

int i = 0;
int Num = 200;

double ESpO2 = 95.0;
double FSpO2 = 0.7;
double frate = 0.95;

#define TIMETOBOOT 3000
#define SAMPLING 5
#define FINGER_ON 30000
#define MINIMUM_SPO2 80.0

const byte RATE_SIZE = 4;
byte rates[RATE_SIZE];

byte rateSpot = 0;
long lastBeat = 0;

float beatsPerMinute;
int beatAvg;

/* =====================================================
   CONFIGURA MAX30102
===================================================== */

void configMAX30102() {

  byte ledBrightness = 0x7F; 
  byte sampleAverage = 4; 
  byte ledMode = 3;
  int sampleRate = 200; 
  int pulseWidth = 411;
  int adcRange = 16384;

  particleSensor.setup(
    ledBrightness,
    sampleAverage,
    ledMode,
    sampleRate,
    pulseWidth,
    adcRange
  );
}

/* =====================================================
   INICIA SENSORES
===================================================== */

void initSensors() {

  particleSensor.begin(Wire);
  Wire.setClock(100000);

  configMAX30102();

  mlx.begin(0x5A, &Wire);
}

/* =====================================================
   LEITURA TEMPERATURA - MLX90614
===================================================== */

void readTemperature() {
  temp = mlx.readObjectTempC();
}

/* =====================================================
   LEITURA BPM E SPO2 - MAX30102
===================================================== */

void readSpo2Bpm() {

  uint32_t ir, red;
  double fred, fir;
  double SpO2 = 0;

  particleSensor.check();

  while (particleSensor.available()) {

    red = particleSensor.getFIFORed();
    ir  = particleSensor.getFIFOIR();

    /* BATIMENTO */
    if (checkForBeat(ir)) {

      long delta = millis() - lastBeat;
      lastBeat = millis();

      beatsPerMinute = 60 / (delta / 1000.0);

      if (beatsPerMinute < 255 && beatsPerMinute > 20) {

        rates[rateSpot++] = (byte)beatsPerMinute;
        rateSpot %= RATE_SIZE;

        beatAvg = 0;

        for (byte x = 0; x < RATE_SIZE; x++) {
          beatAvg += rates[x];
        }

        beatAvg /= RATE_SIZE;
        abpm = beatAvg;
      }
    }

    /* SPO2 */
    i++;

    fred = (double)red;
    fir  = (double)ir;

    avered = avered * frate + red * (1.0 - frate);
    aveir  = aveir  * frate + ir  * (1.0 - frate);

    sumredrms += (fred - avered) * (fred - avered);
    sumirrms += (fir - aveir) * (fir - aveir);

    if ((i % SAMPLING) == 0 && millis() > TIMETOBOOT) {
      if (ir < FINGER_ON) {
        ESpO2 = MINIMUM_SPO2;
      }
    }

    if ((i % Num) == 0) {

      double R =
        (sqrt(sumredrms) / avered) /
        (sqrt(sumirrms) / aveir);

      SpO2 = -23.3 * (R - 0.4) + 100;

      ESpO2 =
        FSpO2 * ESpO2 +
        (1.0 - FSpO2) * SpO2;

      sumredrms = 0.0;
      sumirrms = 0.0;
      i = 0;

      break;
    }

    particleSensor.nextSample();
  }

  spo2 = ESpO2;
}