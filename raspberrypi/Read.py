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

continue_reading = True

current_status = False

# Capture SIGINT for cleanup when the script is aborted
def end_read(signal,frame):
    global continue_reading
    print "Ctrl+C captured, ending read."
    continue_reading = False
    GPIO.cleanup()

# Send data to endpoint that the card is detected
def card_detected():
    print "Room Occupied"
    r = requests.post("http://bugs.python.org", data={'number': 12524, 'type': 'issue', 'action': 'show'})
    print r.status_code, r.reason

# Send data to endpoint that the card is removed
def card_removed():
    print "Room Not Occupied"
    r = requests.post("http://bugs.python.org", data={'number': 12524, 'type': 'issue', 'action': 'show'})
    print r.status_code, r.reason

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
print "Welcome to the MFRC522 data read example"
print "Press Ctrl-C to stop."

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
