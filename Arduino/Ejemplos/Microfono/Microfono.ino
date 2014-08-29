int soundSensorPin=A0; //pin al que conectamos el Microfono
int soundReading=0;

void setup(){
 Serial.begin(9600);
}

void loop(){
 soundReading=analogRead(soundSensorPin);
 
 //if(soundReading > 34){
   Serial.print("B"); 
   Serial.println(soundReading * 100);
  Serial.print("E"); 
   
     delay(1000);		//Espera 100 milisegundos
 //}
}
