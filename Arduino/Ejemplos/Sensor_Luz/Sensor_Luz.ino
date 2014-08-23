int photocellPin = 0;     //Pin al cual ponectamos el sensor de luz
int photocellReading; 

void setup(void) {
  // We'll send debugging information via the Serial monitor
  Serial.begin(9600);   
}
 
void loop(void) {
  photocellReading = analogRead(photocellPin);     //Realiza la medicion
 
  Serial.println(photocellReading);        //Envia la medicion
  
  delay(100);		//Espera 100 milisegundos
}
