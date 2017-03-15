#!/usr/bin/python3

import os

class FileStore(object):
    def __init__(self):
        print("| FILESTORE")


class Network(object):
    virtualDir = "/network/"

class Local(FileStore):
    virtualDir = "/local/"
    physicalDir = "~"

    def __init__(self):
        FileStore.__init__(self)

        self.list = []

    def load(self):
        print("| > Loading list")

