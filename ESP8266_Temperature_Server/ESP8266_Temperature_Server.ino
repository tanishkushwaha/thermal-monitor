#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <WebSocketsServer.h>
#include <Hash.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <FS.h>

#define ONE_WIRE_BUS D3

OneWire oneWire(ONE_WIRE_BUS);

DallasTemperature sensors(&oneWire);

String TEMPERATURE = "NA";

ESP8266WiFiMulti WiFiMulti;

ESP8266WebServer server(80);
WebSocketsServer webSocket = WebSocketsServer(81);

#define USE_SERIAL Serial

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {

    switch(type) {
        case WStype_DISCONNECTED:
            USE_SERIAL.printf("[%u] Disconnected!\n", num);
            break;
        case WStype_CONNECTED:
            {
                IPAddress ip = webSocket.remoteIP(num);
                USE_SERIAL.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);
				
				// send message to client
				webSocket.sendTXT(num, TEMPERATURE);
            }
            break;
        case WStype_TEXT:
            USE_SERIAL.printf("[%u] get Text: %s\n", num, payload);

            // send message to client
            // webSocket.sendTXT(num, "message here");

            // send data to all connected clients
            // webSocket.broadcastTXT("message here");

            if (strcmp((char*)payload, "ping") == 0) {
                // If the client sent "ping", respond with "pong"
                Serial.println((char*) payload);
                webSocket.sendTXT(num, "pong");
            }

            break;  
        case WStype_BIN:
            USE_SERIAL.printf("[%u] get binary length: %u\n", num, length);
            hexdump(payload, length);

            // send message to client
            // webSocket.sendBIN(num, payload, length);
            break;
    }

}

// Route handling functions
void handleRoot() {
//  server.send(200, "text/html", html);

    Serial.println("Got a hit!");
     
    File file = SPIFFS.open("/index.html", "r");
      if (file) {
        server.streamFile(file, "text/html");
        file.close();
      } else {
        server.send(404, "text/plain", "File not found");
  }
}

void setup() {
  
    // USE_SERIAL.begin(921600);
    USE_SERIAL.begin(115200);
    sensors.begin();

    //Serial.setDebugOutput(true);
    USE_SERIAL.setDebugOutput(true);

    USE_SERIAL.println();
    USE_SERIAL.println();
    USE_SERIAL.println();

    for(uint8_t t = 4; t > 0; t--) {
        USE_SERIAL.printf("[SETUP] BOOT WAIT %d...\n", t);
        USE_SERIAL.flush();
        delay(1000);
    }

    WiFiMulti.addAP("OnePlus Nord", "527gsh29ns8wnw");

    while(WiFiMulti.run() != WL_CONNECTED) {
        delay(100);
    }

    webSocket.begin();
    webSocket.onEvent(webSocketEvent);

    // SPIFFS
    if (SPIFFS.begin()) {
      Serial.println("SPIFFS mounted");
    } else {
      Serial.println("Failed to mount SPIFFS");
      return;
    }

    // WebServer Routes
    server.on("/", handleRoot);

    // Start the server
    server.begin();
    Serial.println("HTTP server started");
}

void loop() 
{
  server.handleClient();
  webSocket.loop();

  sensors.requestTemperatures(); 

  float tempC = sensors.getTempCByIndex(0);

  if(tempC != DEVICE_DISCONNECTED_C) 
  {
    if(String((int) tempC) != TEMPERATURE) {
      Serial.println(tempC);
      TEMPERATURE = String((int) tempC);
      webSocket.broadcastTXT(TEMPERATURE);
    }
  } 
  else
  {
    webSocket.broadcastTXT("NA");
  }
}
