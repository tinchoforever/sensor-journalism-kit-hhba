int photocellPin = 5;     //Pin al cual ponectamos el sensor de luz
int photocellReading; 

void setup(void) {
  // We'll send debugging information via the Serial monitor
  Serial.begin(9600);   
}
 
void loop(void) {
  photocellReading = analogRead(photocellPin);     //Realiza la medicion
  Serial.print("B"); 
  
  Serial.print(photocellReading);        //Envia la medicion
  
  Serial.print("E"); 
  delay(1000);		//Espera 100 milisegundos
}
