const { dir } = require('console');
const fs = require('fs');
const path = require('path');
let videoFiles = [];

let vidlist = {"videolist": []};

let listFilesSync = function(dir) {
    let fileList = [];
    let FL = fs.readdirSync(dir);
    FL.forEach((file) => {
      const fullPath = './video/'+file;
        fileList.push(fullPath);

    });
    return fileList;
  }
  // return an object with the file path and file size
  let createJSON = function (file) {
    let ffmpeg = require('fluent-ffmpeg');
    let ffPath =file.replace('./', './public/');
    console.log(ffPath)
    ffmpeg.ffprobe(ffPath, function(err, metadata, index){
     if(!err){
      let filename = metadata.format.filename.replace(/^.*[\\\/]/, '').replace(/\.[^/.]+$/, "");
      let videoFile =  {
        filename: file,
        title: filename,
        thumb: 'https://via.placeholder.com/191x286/000000/FFFFFF/?text='+ filename,
        length: new Date(metadata.format.duration * 1000).toISOString().slice(11, 19),
        dimensions: metadata.streams[0].width +'x'+ metadata.streams[0].height
    }
    addFileToJSON(videoFile)
    }
    });
    
  }

  function addFileToJSON(videoFile){
    vidlist.videolist.push(videoFile);
    if(vidlist.videolist.length === videoFiles.length){
      const outFile = `./public/videos.json`;
      console.log(outFile)
      fs.writeFileSync(outFile, JSON.stringify(vidlist, null, 2));
     console.log(`Wrote file ${outFile}`);
    }
  }
  
  module.exports.createVideoList = function (directory) {
    const dirs = process.argv.slice(2);
    videoFiles = listFilesSync(directory);
    const JSONOBJ = videoFiles.map(createJSON);
};