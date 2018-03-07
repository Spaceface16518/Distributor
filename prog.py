#!/usr/bin/env python

# IMPORTS
import urllib.request as get
import sys
import json

# FUNCTIONS
def request_file_contents(details):
    url_string = "https://api.github.com/repos/" + details["user"] + "/" + details["repository"] + "/" + details["file path"]
    return get.Request(url_string)

def download_file(file_data, dest):
    file_contents = None
    if file_data["contents"]:
        file_contents = file_data["content"]
    else:
        file_contents = get.Request(file_data["download"])
    f = open(file_data["meta"]["name"], "w")
    f.write(file_contents)


# MAIN
request_details = {}
if(sys.argv[1] == 'init'):
    print("Interogation mode activated. Please answer the following questions. Any question left blank will cause the program to malfunction.")
    request_details["user"] = input("Enter repository owner's username: ")
    request_details["repository"] = input("Enter repository name: ")
    request_details["file path"] = input("Enter path of file: ")
    request_details["destination"] = input("enter a destination path (must be absolute): ")
else:
        request_details["user"] = sys.argv[1].split("/")[0],
        request_details["repository"] = sys.argv[1].split("/")[2],
        request_details["file path"] = sys.argv[2]
        request_details["destination"] = sys.argv[3]

file_JSON_data = json.load(request_file_contents(request_details))
file = {
    "content": file_JSON_data["content"],
    "download": file_JSON_data["download_url"],
    "meta": file_JSON_data
}

download_file(file, request_details["destination"]) # function needed
print("Ending program")
exit()


