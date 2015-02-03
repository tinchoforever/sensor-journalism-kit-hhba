#include "DHT.h" 

#define DHTPIN A0     

#define DHTTYPE DHT11   


DHT dht(DHTPIN, DHTTYPE); 

void setup() {
  Serial.begin(9600);    
  dht.begin();            
}

void loop() {
  float t = dht.readTemperature(); 

  if (isnan(t) ) {
  } else {
    Serial.print("B"); 
    Serial.println(t);
    Serial.print("E");
  }
}
