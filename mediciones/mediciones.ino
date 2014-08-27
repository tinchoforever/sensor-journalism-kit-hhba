// This Arduino sketch reads DS18B20 "1-Wire" digital temperature sensors.
//
// This sketch was based on a sketch by Hacktronics.
 
#include <OneWire.h>
#include <DallasTemperature.h>
 
// Data wire is plugged into pin 5 on the Arduino
#define ONE_WIRE_BUS 5
 
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(ONE_WIRE_BUS);
 
// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);
 
// The address of the DS18B20
DeviceAddress waterTemp = { 0x28, 0xFF, 0x16, 0x37, 0x2D, 0x04, 0x00, 0xD9 };
 
void setup(void)
{
  // Start serial
  Serial.begin(9600);
   
  // Start up the library
  sensors.begin();
   
  // Set the resolution to 10 bit (good enough?)
  sensors.setResolution(waterTemp, 10);
 
  Serial.println("Setup Complete.");  
}
 
void printTemperature(DeviceAddress deviceAddress)
{
  float tempC = sensors.getTempC(deviceAddress);
  if (tempC == -127.00) {
    Serial.print("Error getting temperature");
  } else {
    Serial.print(tempC);
  }
}
 
void loop(void)
{ 
  delay(2000);
  sensors.requestTemperatures();
  printTemperature(waterTemp);
}
