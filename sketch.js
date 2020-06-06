const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, target1,target2;
var backgroundImg,platform;
var shooter, slingshot;
var count=0;

var gameState = "onSling";

function preload() {
    //backgroundImg = loadImage("sprites/bg.png");
    getBackgroundImage();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    target1 = new TargetChild(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    target2 = new TargetChild(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    shooter = new ShooterChild(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(shooter.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
    background(backgroundImg);

    textSize(30);
    fill("black");
    text("Score: "+count,1005,50);

    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    target1.display();
    target1.score();
    log1.display();

    box3.display();
    box4.display();
    target2.display();
    target2.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    shooter.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(shooter.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}


function keyPressed(){
    if(keyCode === 32 && shooter.body.speed<1){
       //console.log(shooter.body.speed);
       slingshot.attach(shooter.body);
       shooter.trajectory=[];
       gameState="onSling";
       Matter.Body.setPosition(shooter.body,{x:200,y:50});
    }
}

async function getBackgroundImage(){
    var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata");
    var responseJSON=await response.json();
    console.log(responseJSON);

    var dateTime=await responseJSON.datetime;
    console.log(dateTime);
    var hour=dateTime.slice(11,13);
    console.log(hour);

    if(hour>=8 && hour<15){
        bg="sprites/bg1.jpg";
    }
    else{
        bg2="sprites/bg2.png";
    }
     backgroundImg=loadImage(bg);
}