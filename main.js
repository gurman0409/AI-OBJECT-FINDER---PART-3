objects = [];
status = "";
video = "";
value = "";

function setup() {
    canvas = createCanvas(220, 200);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(220, 200);
}

function draw() {
    image(video, 0, 0, 220, 200);
    if (status != "") {
        ObjectDetector.detect(video, gotResults);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("#FF0000");
            label = objects[i].label;
            confidence = objects[i].confidence;
            x = objects[i].x;
            y = objects[i].y;
            width = objects[i].width;
            height = objects[i].height;
            percent = floor(confidence * 100);
            noFill();
            stroke("#FF0000");
            rect(x, y, width, height);

            if(label == value)
            {
                video.stop();
                ObjectDetector.detect(video, gotResults);
                document.getElementById("objects").innerHTML = value + " Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(value + "Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("objects").innerHTML = value + " Not found";
            }
        }
    }
}

function gotResults(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results);
        objects = results;
    }
}

function start() {
    ObjectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    value = document.getElementById("input").value;
}

function modelLoaded() {
    console.log("Model loaded");
    status = true;
}