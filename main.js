img = "";
status = "";
objects = [];

function preload() {
   
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = creatureCapture(VIDEO);
    video.hide();
    video.size(380, 380);

    objectDetector = ml5.objectDetector('cocossd' , modelLodaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLodaded() {
    console.log("Model is loaded! :)");
    status = true;
   
}

function gotResult(error, results) {
if (error) {
    console.log(error);
}
    console.log(results);

    objects = results;

}

function draw() {
    image(video, 0, 0, 640, 420);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video , gotResult);
       
        for (i = 0 ; i< objects.length ; i++) {
            
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected : " + objects.length;

            fill(r, g, b);
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%" , objects[i].x , objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

        }
    }
}