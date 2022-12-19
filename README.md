# Getting Started

This project uses FFMPEG to read the metadata for each video file in a folder and creates a JSON file of all the movies in the folder. FFMPEG needs to be installed seperately from this project. 

To install FFMPEG follow the instructions on how to install FFMPEG here: 

Windows: https://phoenixnap.com/kb/ffmpeg-windows
MacOS: https://phoenixnap.com/kb/ffmpeg-mac


In the project directory, you can run:

###  `npm install`

Installs the project dependancies.


### npx run-func createVideoList.js createVideoList('public/video')

Add videos to the video folder within the public folder and run this code to create the JSON file. When it is completed you will see the following location where the JSON file is outputted to:

Wrote file ./public/videos.json

