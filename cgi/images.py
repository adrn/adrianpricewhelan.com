#!/usr/bin/env python
import sys, os
import json

from mod_python import apache

def index(req):
    page_html = "<html><body>"
    page_html += "<a href='/cgi/images.py/sdss'>sdss</a><br/>"
    page_html += "<a href='/cgi/images.py/astrophotography'>astrophotography</a><br/>"
    page_html += "<a href='/cgi/images.py/personal'>personal</a><br/>"
    page_html += "</body></html>"
    return page_html

def sdss(req):
    imDir = "/home2/adrian/personal_website/images/sdss/"
    images = []
    for file in os.listdir(imDir):
        if os.path.splitext(file)[1] == ".png" or os.path.splitext(file)[1] == ".jpg":
            images.append({'image' : os.path.join("/images", "sdss", file), \
                           'title' : os.path.splitext(file)[0],\
                           'thumb' : os.path.join("/images", "sdss", file),\
                           'description' : 'Another caption',\
                           'link' : os.path.join("/images", "sdss", file)})
    
    req.content_type = "application/json"
    return json.dumps(images)

def astrophotography(req):
    imDir = "/home2/adrian/personal_website/images/astrophotography/"
    images = []
    for file in os.listdir(imDir):
        if os.path.splitext(file)[1] == ".png" or os.path.splitext(file)[1] == ".jpg":
            images.append({'image' : os.path.join("/images", "astrophotography", file), \
                           'title' : os.path.splitext(file)[0],\
                           'thumb' : os.path.join("/images", "astrophotography", file),\
                           'description' : 'Another caption',\
                           'link' : os.path.join("/images", "astrophotography", file)})
    
    req.content_type = "application/json"
    return json.dumps(images)

def personal(req):
    imDir = "/home2/adrian/personal_website/images/personal/"
    images = []
    for file in os.listdir(imDir):
        if os.path.splitext(file)[1] == ".png" or os.path.splitext(file)[1] == ".jpg":
            images.append({'image' : os.path.join("/images", "personal", file), \
                           'title' : os.path.splitext(file)[0],\
                           'thumb' : os.path.join("/images", "personal", file),\
                           'description' : 'Another caption',\
                           'link' : os.path.join("/images", "personal", file)})
    
    req.content_type = "application/json"
    return json.dumps(images)