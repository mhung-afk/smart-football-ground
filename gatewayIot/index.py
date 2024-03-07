import json
import sys
import time
import requests
import os
from dotenv import load_dotenv
from Adafruit_IO import MQTTClient
import serial.tools.list_ports
load_dotenv()

ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
AIO_USERNAME = os.getenv('AIO_USERNAME')
AIO_KEY = os.getenv('AIO_KEY')
API_BASE_URL = os.getenv('API_BASE_URL')

MAP_DEVICE_TO_AIO_FEED_ID = {
    "LED": "sas-led",
    "LED_AUTO": "sas-led-auto",
    "LCD": "sas-lcd",
    "PUMP": "sas-pump",
    "PUMP_AUTO": "sas-pump-auto",
    "DOOR": "sas-door",
    "TEMP": "sas-temperature",
    "HUMIDITY": "sas-humidity",
    "MOISTURE": "sas-soil-sensor"
}
MAP_DEVICE_TO_NAME_STORE_AS_DB = {
    "LED": "led",
    "LED_AUTO": "ledAutomatic",
    "PUMP": "pump",
    "PUMP_AUTO": "pumpAutomatic",
    "DOOR": "door",
    "TEMP": "airTemperature",
    "HUMIDITY": "airHumidity",
    "MOISTURE": "soilMoisture"
}


def get_key_from_dic(my_dict, val):
    for key, value in my_dict.items():
        if val == value:
            return key

    return "key doesn't exist"


def get_port():
    return "/dev/ttyACM0"  # If your platform is not linux, please command this

    ports = serial.tools.list_ports.comports()
    n = len(ports)
    com_port = ""
    for i in range(0, n):
        port = ports[i]
        str_port = str(port)
        if "USB Serial Device" in str_port:
            split_port = str_port.split(" ")
            com_port = split_port[0]
    return com_port


def connected(client):
    print("Connect successfully.")
    for feed in MAP_DEVICE_TO_AIO_FEED_ID:
        feed_id = MAP_DEVICE_TO_AIO_FEED_ID[feed]
        client.subscribe(feed_id)


def subscribe(client, userdata, mid, granted_qos):
    print("Subscribe successfully.")


def disconnected(client):
    print("Disconnected successfully.")
    sys.exit(1)


def message(client, feed_id, payload):
    print("Collect data: " + feed_id + " " + payload)
    if is_microbit_connected:
        split_data = str(payload).split("-", 1)
        product_id = split_data[0]
        device = get_key_from_dic(MAP_DEVICE_TO_AIO_FEED_ID, feed_id)
        ser.write((product_id[-6:] + ":" + device + ":" + split_data[1] + "#").encode())


# data start with '!' & end with '#'
def process_data(data):
    data = data.replace("!", "")
    data = data.replace("#", "")
    split_data = data.split(":")
    if split_data[1] in MAP_DEVICE_TO_AIO_FEED_ID.keys():
        # data : id-value
        url = API_BASE_URL + "/adafruit/socket-io/send-data"
        payload = {
            "productId": split_data[0],
            "value": split_data[2],
            "device": MAP_DEVICE_TO_NAME_STORE_AS_DB[split_data[1]]
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + ACCESS_TOKEN
        }
        requests.post(url, data=json.dumps(payload), headers=headers)

        feed_id = MAP_DEVICE_TO_AIO_FEED_ID[split_data[1]]
        client.publish(feed_id, split_data[0] + "-" + split_data[2])


def read_serial():
    bytes_to_read = ser.inWaiting()
    if bytes_to_read > 0:
        # global msg
        # msg = msg + ser.readline(bytes_to_read).decode("UTF-8").strip()
        msg = ser.readline(bytes_to_read).decode("UTF-8").strip()

        while ("#" in msg) and ("!" in msg):
            start = msg.find('!')
            end = msg.find('#')
            process_data(msg[start:end + 1])
            if end == len(msg):
                msg = ""
            else:
                msg = msg[end + 1:]


# msg = ""
is_microbit_connected = False
if get_port() != "None":
    ser = serial.Serial(port=get_port(), baudrate=115200)
    is_microbit_connected = True

client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    if is_microbit_connected:
        read_serial()

    time.sleep(1)
