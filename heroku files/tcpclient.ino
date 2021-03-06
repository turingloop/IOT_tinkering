// tcpclient.ino
// demos basic tcp functionality
int button = D0;
TCPClient client; // now we have a client! C++ is great ...

String server = "172.20.10.2"; //local ip

//temperature sensor
double	temperatureC	=	0.0;	
int	analogPin=A0;
void setup()
{
  Serial.begin(9600);
  // Now open your Serial Terminal, and hit any key to continue!
  pinMode(button,INPUT_PULLUP);
   pinMode(analogPin,AN_INPUT);
}

void loop()
{
    if(digitalRead(button) == LOW) {
    double temp = getTemp();
  if (client.connect(server, 5000)) // connects to given IP address & port
  {                               // returns true iff it succeeds
    Serial.println("connected");
    client.println("GET /?temperature="+String(temp)+"&time=24  HTTP/1.1");   // prints data to server
    client.println("Host: 172.20.10.2");   // the obligatory Host header
    client.println("Content-Length: 0"); 
    client.println("User-agent: Particle Http Client"); // if this is omitted, an error -- 403 forbidden -- will be generated when connecting to timeapi.org
    client.println();                   // blank line after headers
  }
  
  delay(1000);
  

    }
}

//get temperature
double getTemp() {
        double	voltage= analogRead(analogPin)/4095.0	*3.3;
        temperatureC	=104.7*voltage-53.1;
        Serial.println(temperatureC);
        return temperatureC;
}