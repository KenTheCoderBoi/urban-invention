song=""

var right_wrist_confidence=0
var left_wrist_confidence=0

right_wrist_x=0
right_wrist_y=0


left_wrist_x=0
left_wrist_y=0

function preload(){
song = loadSound("ぬｔ.mp3")//loads the song//
}
function setup(){
    canvas = createCanvas(600,500)//creates canvas//
    canvas.position(470,250)
    video= createCapture(VIDEO)//creates video feed//
    video.hide()
    posenet = ml5.poseNet(video,modelLoaded)//loades model//
    posenet.on('pose',gotPoses)//turns posenet on//
}
function modelLoaded(){
    console.log("model loaded")//sends message to console//
}
function gotPoses(results){
    if (results.length > 0){
        console.log(results)
        right_wrist_confidence = results[0].pose.keypoints[10].score//sets confidence of wrists//
        left_wrist_confidence = results[0].pose.keypoints[9].score


        right_wrist_x = results[0].pose.rightWrist.x //gets wrist x and y//
        right_wrist_y = results[0].pose.rightWrist.y

        left_wrist_x = results[0].pose.leftWrist.x//gets wrist x and y//
        left_wrist_y = results[0].pose.leftWrist.y

        console.log(right_wrist_x,right_wrist_y)
        console.log(left_wrist_x,left_wrist_y)
        console.log(right_wrist_confidence)
        console.log(left_wrist_confidence)
    }
}
function draw(){
    image(video,0,0,600,500)
    stroke("red")
    fill("red")

    circle(right_wrist_x, right_wrist_y, 25);//creates  circles to track wrist//
    circle(left_wrist_x, left_wrist_y, 25);

    if(left_wrist_confidence>0.4){
        volumenumber = Number(left_wrist_y)//turns string into number//
        volumefloored = floor(volumenumber)//floors to reduce decimals//
        volume = volumefloored/500//divides by 500 to properly set volume//
        document.getElementById("volumedisk").innerHTML = "volume:"+volume+""//sets html to volume//
        song.setVolume(volume)//sets volume//
    }
    if(right_wrist_confidence>0.4){
        if(right_wrist_y>400){
            song.rate(4)//sets speed//
        document.getElementById("speeddisk").innerHTML = "speed:"+ 2 +"X"//sets html for speed//
        }
        else if(right_wrist_y>350){
        song.rate(2)//sets speed//
        document.getElementById("speeddisk").innerHTML = "speed:"+ 2 +"X"//sets html for speed//
        }else if(right_wrist_y>200) {
            song.rate(1.5)//sets speed//
            document.getElementById("speeddisk").innerHTML = "speed:"+ 1.5 +"x" //sets html for speed//
        }else if (right_wrist_y>20) {
            song.rate(1)//sets speed//
            document.getElementById("speeddisk").innerHTML = "speed:"+ 1 +"x"//sets html for speed//
        }
}
}
function play(){
    song.play()
    song.setVolume(1.5)
    song.rate(1)
}
