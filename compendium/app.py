#!/usr/bin/python3

import gi
gi.require_version('Gtk', '3.0')
gi.require_version('WebKit', '3.0')
from gi.repository import Gtk, WebKit

import os

def checkForDatabase():
    home = os.path.expanduser("~")
    return os.path.isdir(os.path.join(home, ".compendium"))

class App(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self)
        self.set_title("Compendium Manager")
        self.maximize()

        setup = checkForDatabase()
        self.webview = self.generateWebView(setup)

        self.connect("destroy", Gtk.main_quit)
        self.show_all()

    def generateWebView(self, setup):
        webview = WebKit.WebView()
        sc = Gtk.ScrolledWindow()

        sc.add(webview)
        self.add(sc)
 
        if not setup:
            webview.open("/home/tarantula/Packages/compendium.spack/compendium/Resources/ui/setup.html")
            return webview

        # else
        webview.open("http://127.0.0.1:8779")
        return webview


    def run(self):
        Gtk.main()
