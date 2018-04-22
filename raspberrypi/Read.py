#!/usr/bin/env python
# -*- coding: utf8 -*-
#
#    Copyright 2014,2018 Mario Gomez <mario.gomez@teubi.co>
#
#    This file is part of MFRC522-Python
#    MFRC522-Python is a simple Python implementation for
#    the MFRC522 NFC Card Reader for the Raspberry Pi.
#
#    MFRC522-Python is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    MFRC522-Python is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Lesser General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with MFRC522-Python.  If not, see <http://www.gnu.org/licenses/>.
#

import requests
import RPi.GPIO as GPIO
import MFRC522
import signal

from multiprocessing import Process

# Disable errors for insecure
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

continue_reading = True

current_status = False

# Capture SIGINT for cleanup when the script is aborted
def end_read(signal,frame):
    global continue_reading
    print "\nStopping scanner."
    continue_reading = False
    GPIO.cleanup()

# Set room status
def set_room_status(occupied):
    print "Starting Room"
    data="{\"occupied\":" + str(occupied).lower() + "}"
    headers={'content-type': 'application/json'}
    try:
	r = requests.patch(url="https://iothack.me/v1/room/5adbcf8c96d0713ca46038e1", headers=headers, data=data, verify=False)
	print "Status Code:", r.status_code
    except requests.exceptions.RequestException as e:
	print "Error:", e

# Set light status
def set_light_status(status):
    print "Starting Light"
    urls={"On":"https://maker.ifttt.com/trigger/room_in_use/with/key/bqxtTWTzxbTA50nGUi0rmM",
	 "Off":"https://maker.ifttt.com/trigger/room_not_in_use/with/key/bqxtTWTzxbTA50nGUi0rmM"}

    try:
	r = requests.post(urls[status])
	if r.reason == "OK":
	    print "Success:", status 
    except:
	print "Error"

# Send data to endpoint that the card is detected
def card_detected():
    print "Room Occupied"

    room = Process(target = set_room_status(True))
    room.start()
    light = Process(target = set_light_status("On"))
    light.start()

# Send data to endpoint that the card is removed
def card_removed():
    print "Room Not Occupied"

    room = Process(target = set_room_status(False))
    room.start()
    light = Process(target = set_light_status("Off"))
    light.start()

# Function to check the card status for changes
def check_card_status(new_status):
    global current_status

    if current_status != new_status:
  	if new_status:
	    card_detected()
	else:
	    card_removed()

    current_status = new_status


# Hook the SIGINT
signal.signal(signal.SIGINT, end_read)

# Create an object of the class MFRC522
MIFAREReader = MFRC522.MFRC522()

# Welcome message
print "Scanner has started."
print "Press Ctrl-C to stop.\n"

# This loop keeps checking for chips. If one is near it will get the UID and authenticate
while continue_reading:

    # Scan for cards
    (status,_) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)
    (statusTwo,_) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)

    # Define a new status
    new_status = False

    # If a card is found
    new_status = status == MIFAREReader.MI_OK or statusTwo == MIFAREReader.MI_OK

    check_card_status(new_status)