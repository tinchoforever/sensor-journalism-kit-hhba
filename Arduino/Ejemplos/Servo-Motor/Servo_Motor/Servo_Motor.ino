#include <Servo.h> 
 
Servo myservo; 
 
int buttonPin = 2;  //Pin al que debo conectar el potenciometro 
int buttonState = 0;
int prevButtonState = 1;
 
void setup() 
{ 
  Serial.begin(9600); 
  myservo.attach(9);  // Pin al que debo conectar el servo
  pinMode(buttonPin, INPUT);
} 
 
void loop() 
{ 
  buttonState = digitalRead(buttonPin);    //Leo el estado del boton
  
  if(buttonState != prevButtonState){      //Chequeo si el estado del boton es distinto al anterior
    prevButtonState = buttonState;
    
    if (buttonState == HIGH) {     
      // turn LED on:    
      myservo.write(180);    // Seteo el angulo al servo
      Serial.println("pulsado");    //Envio por serial "pulsado"
    }else {
      // turn LED off:
      myservo.write(0);    // Seteo el angulo al servo
      Serial.println("NO pulsado"); 
    }   
  } 
  delay(1500);                           // Espero 1500 milisegundos
} 
