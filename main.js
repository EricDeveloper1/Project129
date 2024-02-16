Status = "";
song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload() {
    song_1 = loadSound("Ed_Sheeran_-_Shape_Of_You_talkglitz.tv.mp3");
    song_2 = loadSound("Shawn Mendes - Stitches.mp3");
}

function setup() {
    canvas = createCanvas(700, 500);
    canvas.position(400, 235);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("poseNet is Initialized");
}

function gotPoses(results) {
    if (results > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
    }
}

function draw() {
    image(video, 0, 0, 700, 500);
    Status = song_1.isPlaying();
    stroke('#a16ffc');
    fill('#a16ffc');

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song_2.stop();
        document.getElementById("song_name").innerHTML = "Shape of You- Ed Sheeran";
    }
}