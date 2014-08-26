#include <Ultrasonic.h>

//Pines en los cuales se conectara el Ultrasonido
Ultrasonic ultrasonic(9,8); // (Trig PIN,Echo PIN)

void setup() {
  Serial.begin(9600); 
}

void loop()
{
  Serial.println(ultrasonic.Ranging(CM)); // Respuesta dek ultrasonido en CM 
  delay(100);    //Espera 100 milisegundos
}
