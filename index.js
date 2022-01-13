const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
// inputFilePath - This is the path of the video to compress
// inputFilePath - This is the path where compressed video will be stored
function compressVideo(inputFilePath, outputFilePath, options) {
    const proc = new ffmpeg();    
    let resolution = "-s 360*480";
    if (options) {
        if (options.resolution) {
            resolution = options.resolution
        }
    }
    proc.addInput(inputFilePath)
    proc.outputOption([resolution])
    .output(outputFilePath) //'/video.mp4')
    .on('start', function(ffmpegCommand) {
        console.log('start', ffmpegCommand)
    })
    .on('progress', function(data) {
        console.log(data)
    })
    .on('error', function(error) {
        console.log('error', error);
    })
    .on('end', function() {
        return outputFilePath;
    });
    proc.run();
}

module.exports = compressVideo;