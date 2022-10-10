let bgImg;
let bg;
let monkey;
let monkeyImg;
let plataformaImg;
let plataformGroup;
let gameState = 0;
let bananaGroup;
let bananaImg;
let num;
let score = 0;
let banana;
let sound;
let sound_bg;
let soundJump;
let aguia;
let aguiaImage;
let aguiaGroup;

function preload(){
    bgImg = loadImage("./assets/Fundo1.jpg");
    monkeyImg = loadAnimation("./assets/monkey1.png","./assets/monkey1.png","./assets/monkey2.png","./assets/monkey2.png");
    bananaImg = loadImage("./assets/banana.png");
    plataformaImg = loadImage("./assets/baseTerra-removebg-preview.png");
    sound = loadSound("./assets/Trilha.mp3");
    soundJump = loadSound("./assets/jump.mp3");
    aguiaImage = loadImage ("./assets/aguia.png");
    sound_bg = loadSound("./assets/The Desert.mp3")
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    //bg = createSprite(300,490,2560,1440);
    //bg.addImage('bg',bgImg);
    //bg.x = bg.width/1;
    //bg.scale = 3;
    monkey = createSprite(width/7,height/2,200,200);
    monkey.addAnimation('monkey',monkeyImg);
    monkey.scale = 2;

    plataformGroup = createGroup();
    bananaGroup = createGroup();
    aguiaGroup = createGroup();
    monkey.setCollider("circle",0,0,25);
    monkey.debug = true;
  

    


}

function draw(){
    background(bgImg);
    
    // sound_bg.play();
    //     sound_bg.setVolume(0.3);
    //bg.velocityX = -4;
    //if(bg.x<0){
       // bg.x = bg.width/1;
    //}
    if(gameState == 0){
        swalStart();
    }
    else if(gameState == 1){
        textSize(50);
        fill("white");
        text(`Pontuação: ${score} ` ,15,45);
           
        

        if(keyDown("up_arrow")){
            monkey.velocityY = -10;
            soundJump.play();
        }

        if(keyCode===39){
         monkey.position.x += 3;
        }

        if(keyCode===37){
            monkey.position.x -= 3;
        }

        
        monkey.velocityY += 0.8;
        spawnPlataformas();
     
        if(bananaGroup.isTouching(monkey)){    
            removeBanana();
          //  banana.visible = false;
        }
        if(aguiaGroup.isTouching(monkey)){
            monkey.remove();
            gameState = 2;
        }

        if(monkey.y > height){
            gameState = 2;
        }
    }else if(gameState == 2){
        swalEnd();
    }
    
    monkey.collide(plataformGroup);
    spawnAguias();
    spawnBananas();
    drawSprites();
    
}

function spawnPlataformas(){
    if(frameCount%80===0){
     let plataform = createSprite(2000,500,300,75);
        plataform.addImage('plataform',plataformaImg);
        num =Math.round(random(350,700));
        plataform.y = num;
        plataform.velocityX = -7;
        plataformGroup.add(plataform);

        // plataform.lifetime  = 1200 ;
    }

}

function spawnAguias(){

if(frameCount %  90 ===0){
aguia = createSprite(0,0, 300, 75);
aguia.addImage("aguia", aguiaImage);
aguia.scale = 0.3;
aguia.x = Math.round(random(250,1400));
aguia.velocityY = 7;
aguia.velocityX = 5;
aguiaGroup.add(aguia);

}


}


function spawnBananas(){
    if(frameCount%240===0){
        banana = createSprite(2000,500,300,75);
        banana.addImage('banana',bananaImg);
        banana.scale = 0.13;
        banana.y = num-75;
        banana.velocityX = -7;
        bananaGroup.add(banana);
        banana.depth = monkey.depth;
    }
}

function removeBanana(){


    score += 1
    bananaGroup.destroyEach()




}

function swalStart(){
    swal({
        title: `Aperte para iniciar`,
        text: "Se prepare e capture as bananas!",
        text: "Utilize as setas para se mover",
        imageUrl:
          "https://cdn.icon-icons.com/icons2/368/PNG/128/Start_37108.png",
        imageSize: "100x100",
        confirmButtonText: "Jogar"
      },
      function(isConfirm){
        if(isConfirm){
            gameState = 1;
        }
      }
      );
}

function swalEnd(){
    swal({
        title: `Fim de Jogo`,
        text: "Oops você perdeu o jogo!",
        text: "Sua pontuação é: " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Obrigado por jogar"
      },
      function(isConfirm){
        if(isConfirm){
            location.reload();
        }
      }
      );
    
      

}