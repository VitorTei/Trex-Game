var JOGAR = 1

var GAMEOVER = 0;

var estadoJogo = JOGAR;

var trex, trex_corredor;

var Solo, ImgSolo;

var SoloInvs;

var Nuvens, NuvemImg

var Obs, ObsImage1, ObsImage2, ObsImage3, ObsImage4, ObsImage5, ObsImage6;

var pontuacao=0;

var grupoNuvem;

var grupoObs;

var trexColisao;

var recomecarImg, fimDeJogoImg;

var recomecar;

var fimDeJogo;

var checkPoint, die, jump;

function preload(){
  
  trex_corredor = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  trexColisao = loadAnimation("trex_collided.png");
  
  ImgSolo = loadImage ("ground2.png")
  
  NuvemImg = loadImage ("cloud.png")
  
  ObsImage1=loadImage("obstacle1.png");
  ObsImage2=loadImage("obstacle2.png");
  ObsImage3=loadImage("obstacle3.png");
  ObsImage4=loadImage("obstacle4.png");
  ObsImage5=loadImage("obstacle5.png");
  ObsImage6=loadImage("obstacle6.png");
  
  recomecarImg = loadImage("restart.png");
  fimDeJogoImg = loadImage("gameOver.png");
  
  checkPoint = loadSound("checkPoint.mp3")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
}

function setup(){
  createCanvas(600,200)
  
trex = createSprite(50, 160, 40,50);
trex.addAnimation("running", trex_corredor);
trex.scale = 0.5;
    
trex.addAnimation("Colisao",trexColisao);

  Solo=createSprite(200,180,400,3);
  Solo.addImage(ImgSolo);
  Solo.x=width/2;
  
  SoloInvs=createSprite(300,190,600,3);
  SoloInvs.visible=false

  grupoNuvem= new Group();
  grupoObs= new Group();
  
  recomecar = createSprite(300,100,30,30);
  fimDeJogo = createSprite(300,60);
  
  recomecar.addImage(recomecarImg);
  recomecar.scale=0.5;
  recomecar.visible=false;
  
  fimDeJogo.addImage(fimDeJogoImg);
  fimDeJogo.scale=0.5;
  fimDeJogo.visible=false;
}

function draw(){
  
  background("white");
  
  if(estadoJogo === JOGAR){
    
    if(keyDown("space")&& trex.y>160){
    
    trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.5;
    
    Solo.velocityX=-5;
    
    if(Solo.x<0){ 
    Solo.x=width/2;}
    
    pontuacao=pontuacao+Math.round(frameRate()/60);
  
    if(pontuacao>0&&pontuacao%200===0){
      checkPoint.play();
    }
    
  GerarNuvens();
  GerarObs();  
    
    if(trex.isTouching(grupoObs)){
      estadoJogo=GAMEOVER;
    }
  }
  else if(estadoJogo===GAMEOVER){
    trex.velocityY=0;
    
    Solo.velocityX=0;
    
    grupoObs.setVelocityXEach(0);
    grupoNuvem.setVelocityXEach(0);
    grupoNuvem.setLifetimeEach(-1);
    grupoObs.setLifetimeEach(-1);
    trex.changeAnimation("Colisao",trexColisao);
    
    recomecar.visible=true;
    fimDeJogo.visible=true;
    
    if (mousePressedOver(recomecar)){
    reset();
  }
  }
  
  
  
  trex.collide(SoloInvs);
  
  text("SCORE "+pontuacao,500,20)
  

  
  drawSprites();
}


function reset(){
  estadoJogo=JOGAR;
  grupoObs.destroyEach();
  grupoNuvem.destroyEach();
  recomecar.visible=false;
  fimDeJogo.visible=false;
  trex.changeAnimation("running", trex_corredor);
  pontuacao=0;
}

function GerarNuvens(){

  if(frameCount%60===0){
  Nuvem = createSprite(610,70,20,10);
  Nuvem.addImage(NuvemImg);
  Nuvem.velocityX=-5;
  Nuvem.y=Math.round(random(15,75));
  Nuvem.lifetime=130;
  Nuvem.scale=0.7;
  grupoNuvem.add(Nuvem);
  }
}
  
 function GerarObs(){
   
  if(frameCount%60===0){
  Obs=createSprite(600,165);
  Obs.velocityX=-6;
  Obs.scale=0.5;
  Obs.lifetime=108;
  grupoObs.add(Obs);
  var Escolha=Math.round(random(1,6))
  
  switch(Escolha){
    case 1:Obs.addImage(ObsImage1);
    break;
    case 2:Obs.addImage(ObsImage2);
    break;
    case 3:Obs.addImage(ObsImage3);
    break;
    case 4:Obs.addImage(ObsImage4);
    break;
    case 5:Obs.addImage(ObsImage5);
    break;
    case 6:Obs.addImage(ObsImage6);
    break;
    default:break;
  }
  }
 } 
  
  
