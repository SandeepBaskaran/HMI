import RPi.GPIO as GPIO# Import GPIO library
import time, sys# Import time library
import numpy as np# Numpy package for dummy values
import requests
from flask import Flask, request
import json
from threading import Thread

payload = {'flow':5, 'temperature':80,'level':100}; #initial values for pay load
values = {"thresholdPressure":0,"thresholdFlow":0,"thresholdLevel":0,"thresholdTemperature":0};
app = Flask(__name__);

#Ultrasonic sensor and relay pins


GPIO.setmode(GPIO.BCM)                     #Set GPIO pin numbering
GPIO.setwarnings(False);
TRIG = 23                                  #Associate pin 23 to TRIG
ECHO = 24                                  #Associate pin 24 to ECHO
in1 = 17                                    #Relay IN 1 pin
in2 = 18                                    #Relay IN 2 pin

#Water flow sensor pins

FLOW_SENSOR = 22

GPIO.setup(TRIG,GPIO.OUT)                  #Set pin as GPIO out
GPIO.setup(ECHO,GPIO.IN)                   #Set pin as GPIO in
GPIO.setup(in1, GPIO.OUT)
GPIO.setup(in2, GPIO.OUT)

GPIO.output(in1, False)
GPIO.output(in2, False)



GPIO.setmode(GPIO.BCM)
GPIO.setup(FLOW_SENSOR, GPIO.IN, pull_up_down = GPIO.PUD_UP)

global count, start_counter
count = 0


def countPulse(channel):
   global count,start_counter;
   if start_counter == 1:
      count = count+1
      flow = count / (60 * 7.5)

GPIO.add_event_detect(FLOW_SENSOR, GPIO.FALLING, callback=countPulse)



fieldnames = ['TimeStamp', 'Pressure', 'Flow', 'Level', 'Temperature'];
while True:
    #print "Starting setup...."
    try:
            tempStore = open("/sys/bus/w1/devices/28-03119779c0c6/w1_slave")# change this number to the Device ID of your sensor
            data = tempStore.read()
            tempStore.close()
            tempData = data.split("\n")[1].split(" ")[9]
            temperature = float(tempData[2: ])
            temperature = temperature / 1000
            if(int(temperature) < 200):
                print  "Temperature: %.3f Celcius" % (temperature)
                payload["temperature"] = int(temperature);
            else:
                payload["temperature"] = int(np.random.randint(1,200,1));
    except KeyboardInterrupt:
            GPIO.cleanup()# print("Program Exited Cleanly")
    try:
        
        start_counter = 1
        time.sleep(1)
        start_counter = 0
        flow = (count * 60 * 2.25 / 1000)
        print "Flow: %.3f Liter/min" % (flow)
        payload["flow"] = int(flow);
        count = 0
    except KeyboardInterrupt:
        print '\ncaught keyboard interrupt!, bye'
        GPIO.cleanup()
        sys.exit()

    GPIO.output(TRIG, False)                 #Set TRIG as LOW
    #print "Waitng For Sensor To Settle"
    time.sleep(2)                            #Delay of 2 seconds
    GPIO.output(TRIG, True)                  #Set TRIG as HIGH
    time.sleep(0.00001)                      #Delay of 0.00001 seconds
    GPIO.output(TRIG, False)                 #Set TRIG as LOW
    while GPIO.input(ECHO)==0:               #Check whether the ECHO is LOW
        pulse_start = time.time()              #Saves the last known time of LOW pulse
    while GPIO.input(ECHO)==1:               #Check whether the ECHO is HIGH
        pulse_end = time.time()                #Saves the last known time of HIGH pulse 
    pulse_duration = pulse_end - pulse_start #Get pulse duration to a variable
    distance = pulse_duration * 17150        #Multiply pulse duration by 17150 to get distance
    distance = round(distance, 2)            #Round to two decimal points
  
    if distance > 0 and distance < 101:      #Check whether the distance is within range
        print "Level:",distance - 0.5,"cm"  #Print distance with 0.5 cm calibration
        payload["level"] = int(distance - 0.5);
    else:
        payload["level"] = int(np.random.randint(1,100,1));

    if payload["level"] <= values["thresholdLevel"]:
       GPIO.output(in1, True);
    else:
       GPIO.output(in1, False);
       
    if payload["temperature"] <= values["thresholdTemperature"]:
       GPIO.output(in2, True);
    else:
       GPIO.output(in2, False);
   
    print(payload);
  
    r = requests.post("http://192.168.0.104:2019/hmi", data=payload) #Send the data
    print(r.text)
    time.sleep(1);

      
'''    
@app.route('/setThreshold',  methods=['GET'])
def setThreshold():
  values["thresholdPressure"] = int(request.args.get('thresholdPressure'));
  values["thresholdFlow"] = int(request.args.get('thresholdFlow'));
  values["thresholdLevel"] = int(request.args.get('thresholdLevel'));
  values["thresholdTemperature"] = int(request.args.get('thresholdTemperature'));
  print(values);
  return "Values set!";


thread = Thread(target = threaded_function, args = (10, ))
thread.start()

if __name__ == "__main__":
    app.run(debug = True,host='0.0.0.0')

'''


