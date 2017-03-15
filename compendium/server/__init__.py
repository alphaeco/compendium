#!/usr/bin/python3

import os, socket

class Server():
    def __init__(self):

        self.FilestoreBuffer = None

        if self.FilestoreBuffer == None:
            print("| > Local Database Missing...")
            print("| > Begin Database Setup...\n")


        print("| > Compendium Server Initialized...")

    def add(self, name, Filestore):
        print("| > Compendium Server Appending Filestore '{}'".format(name))

    def run(self):
        print("| > Running server httpd...")
