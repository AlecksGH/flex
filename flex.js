//Once again, I have no idea if there is a mandatory header. I still couldn't find one, and assignment 1 hasn't been graded yet so I can't check if points were deducted from that one. 
//Also once again, I took some of the elementary things from the github demos, mostly Week3 Demo0. 
//I also learned about "bezierCurveTo()" from Googling "js canvas curves" and that being the first result. After seeing the documentation I recognised it from some graphic design software I have so used it. I understand that they will quickly become useless as there is little information about the curve that can be derived, so things like collisions are almost impossible. But as my need for curves is for purely aesthetic reasons, I decided I'd keep using them. 
//All code was developed by me, Alex Jans, and Eftychios Sifakis, though his public GitHub. 
//I hope you enjoy. The code is messy, but I think the result is very neat. The muscles flex with the movements of the joints. I tried to fix the lower bit of the hand, but can't without moving the skeleton and rewriting that whole bit, and seeing as that would only gain a slightly prettier frame 1, I decided against that.
//PS: My girlfriend wanted me to add nipples but I feel like that would be very weird.
function setup() {

  var canvas = document.getElementById('myCanvas');
  var slider0 = document.getElementById('slider0');
  slider0.value = 0;
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = -0;
  function draw() {
    var context = canvas.getContext('2d');
    canvas.width = canvas.width;
    // use the sliders to get the angles
    var shoulder = slider0.value*0.005*Math.PI;
    var elbow = slider1.value*0.005*Math.PI;
    var wrist = slider2.value*0.005*Math.PI;

    function drawBody(){
      //fill
      context.beginPath();
      context.moveTo(0,0);
      context.lineTo(100,0);
      context.lineTo(100,100);

      if (slider0.value >=0){
         context.lineTo(200,175);
      }else{
         context.lineTo(200 + ((slider0.value * 1)*.4) , 175 + ((slider0.value * .75)*.4));
      }  
      context.save(); 
      context.translate(300,300);
      context.rotate(shoulder);
      if (slider0.value >=0){
         context.bezierCurveTo(-20,-175,50,-175,150,-100); //base delt on upper arm pos
      }else{
         context.bezierCurveTo(-20,-175,50,-175 + (slider0.value * 1) ,150 ,-100);
      }
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "3d3e40";
      context.lineWidth = 10;
      context.stroke();

      if (slider0.value >=0){
      context.lineTo(100+ (slider0.value * 4),100- (slider0.value * 2));
      context.restore();
        context.bezierCurveTo(300 + (slider0.value * 0),500 + (slider0.value *2),400 + (slider0.value * 1),400 + (slider0.value * 4),300,600+(slider0.value * 3)); //move lat as well
      }else{
      context.lineTo(100,100);
      context.restore();
        context.bezierCurveTo(300,500,400,400,300,600)
      }
      context.lineTo(250,775);
      context.lineTo(245,950);
      context.lineTo(0,950);
      context.closePath();
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 10;
      context.fill();
      //stroke
      context.beginPath();
      context.moveTo(0,0);
      context.lineTo(100,0);
      context.lineTo(100,100);
      if (slider0.value >=0){
         context.lineTo(200,175);
      }else{
         context.lineTo(200 + ((slider0.value * 1)*.4) , 175 + ((slider0.value * .75)*.4));
      }   
      context.save(); 
      context.translate(300,300);
      context.rotate(shoulder);
      if (slider0.value >=0){
         context.bezierCurveTo(-20,-175,50,-175,150,-100); //base delt on upper arm pos
      }else{
         context.bezierCurveTo(-20,-175,50,-175 + (slider0.value * 1) ,150 ,-100);
      }
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "3d3e40";
      context.lineWidth = 10;
      context.stroke();
      if (slider0.value >=0){
      context.moveTo(100+ (slider0.value * 4),100- (slider0.value * 2));
      context.restore();
        context.bezierCurveTo(300 + (slider0.value * 0),500 + (slider0.value *2),400 + (slider0.value * 1),400 + (slider0.value * 4),300,600+(slider0.value * 3)); //move lat as well
      }else{
      context.moveTo(100,100);
      context.restore();
        context.bezierCurveTo(300,500,400,400,300,600)
      }
      context.lineTo(250,775);
      context.lineTo(245,950);
      context.lineTo(0,950);
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 10;
      context.stroke();
//clean up
      if (slider0.value >=-55){
      }else{
 	 context.save();
         context.translate(300,300);
         context.rotate(shoulder);
         context.beginPath();
         context.arc(55 + ((slider0.value * 1)*.3) , -72.4 + ((slider0.value * .75)*.9), 66, 0, 2 * Math.PI, false);
	 context.fill(); 
	 context.restore();
      }   
    }
    function drawUpperArm(){
      //lines to fill
      context.beginPath();
      context.moveTo(150,-100);
      if ( slider1.value <=0){
        context.bezierCurveTo(300 -(slider1.value * .5),-150 + (slider1.value * 2),400+(slider1.value * 3),-100 + (slider1.value * .8),550+(slider1.value * 4),0); //CHANGE BEZIER BASED ON ROTATION OF FOREARM
      } else {
        context.bezierCurveTo(300 -(slider1.value * .5),-150 + (slider1.value * .5),400+(slider1.value * 1),-100 + (slider1.value * .3),550+(slider1.value * 1),0);
      }
      context.strokeStyle = "3d3e40";
      context.lineWidth = 10;
      context.lineTo(650,100);
      context.bezierCurveTo(200,150,300,150,100,100);
      context.closePath();
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 10;
      context.fill();
      //over again to stroke
      context.beginPath();
      context.moveTo(150,-100);
      if ( slider1.value <=0){
        context.bezierCurveTo(300 -(slider1.value * .5),-150 + (slider1.value * 2),400+(slider1.value * 3),-100 + (slider1.value * .8),550+(slider1.value * 4),0); //CHANGE BEZIER BASED ON ROTATION OF FOREARM
      } else {
        context.bezierCurveTo(300 -(slider1.value * .5),-150 + (slider1.value * .5),400+(slider1.value * 1),-100 + (slider1.value * .3),550+(slider1.value * 1),0);
      }
      context.strokeStyle = "3d3e40";
      context.lineWidth = 10;
      context.moveTo(650,100);
      context.bezierCurveTo(200,150,300,150,100,100);
      context.moveTo(200,0);
      context.bezierCurveTo(250 - (slider1.value*1),30,300 + (slider1.value *1 ),40,400 + (slider1.value *1 ),20);
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 10;
      context.stroke();

    }
    function drawForearm(){
      //lines to fill
      context.beginPath();
      context.moveTo(0,0);
      context.lineTo(0,-200);
      context.bezierCurveTo(-5, -350,-35, -450,-35,-500);
      context.lineTo(-150,-500);
      if(slider1.value >= 0){
        context.bezierCurveTo(-140,-475,-130, -400,-125,-300);
      }else{
        context.bezierCurveTo(-140,-475,-130, -400+ (slider1.value *2),-125,-300 + (slider1.value *5));
      }
      context.save();
      context.rotate(-1*elbow);
      context.translate(-650,-100);
      if(slider2.value <= 0){
       context.bezierCurveTo(450,-100,350 + (slider2.value * 2), 110,650,100);
      } else {
        context.bezierCurveTo(450,-100,350, 110,650,100);
      }
      context.restore();

      context.fill();
      //lines to fill
      context.beginPath();
      context.moveTo(0,0);
      context.lineTo(0,-200);
      context.bezierCurveTo(-5, -350,-35, -450,-35,-500);
      context.moveTo(-150,-500);
      if(slider1.value >= 0){
        context.bezierCurveTo(-140,-475,-130, -400,-125,-300);
      }else{
        context.bezierCurveTo(-140,-475,-130, -400+ (slider1.value *2),-125,-300 + (slider1.value *5));
      }
      context.save();
      context.rotate(-1*elbow);
      context.translate(-650,-100);
      if(slider2.value <= 0){
       context.bezierCurveTo(450,-100,350 + (slider2.value * 2), 110,650,100);
      } else {
        context.bezierCurveTo(450,-100,350, 110,650,100);
      }
      context.restore();

      context.stroke();
    }
    function drawHand(){
      //lines to fill
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 10;
      let shift = slider2.value * 1.5 + 20;
      context.beginPath()

      context.moveTo(0,0);
      if (slider2.value >= 0){
        context.lineTo(-10, -100+shift);
      } else {
        context.lineTo(-10-shift/2, -100+2*shift);
      }

      context.lineTo(-50, -190+shift);
      context.lineTo(-175, -190+shift);

      context.lineTo(-225 ,-215+shift);
      context.lineTo(-225,-140+shift);
      context.lineTo(-250,-140+shift);
      context.lineTo(-250,-90+shift);
      context.save();
      context.rotate(-1*wrist);
      context.translate(35,500);
      if (slider2.value >= 0){
        context.bezierCurveTo(-200,-540+(slider2.value*0),-175,-560+(slider2.value*1),-150,-500);
      } else {
        context.bezierCurveTo(-200,-540-(slider2.value*2),-175,-560-(slider2.value*2),-150,-500)
      }
      context.restore();
      context.fill();

     //lines to stroke

      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 10;
      context.beginPath()
      context.moveTo(0,0);
      if (slider2.value >= 0){
        context.lineTo(-10, -100+shift);
      } else {
        context.lineTo(-10-shift/2, -100+2*shift);
      }
      context.lineTo(-50, -190+shift);
      context.lineTo(-175, -190+shift);

      context.lineTo(-225 ,-215+shift);
      context.lineTo(-225,-140+shift);
      context.lineTo(-250,-140+shift);
      context.lineTo(-250,-90+shift);
      context.save();
      context.rotate(-1*wrist);
      context.translate(35,500);
      if (slider2.value >= 0){
        context.bezierCurveTo(-200,-540+(slider2.value*0),-175,-560+(slider2.value*1),-150,-500);
      } else {
        context.bezierCurveTo(-200,-540-(slider2.value*2),-175,-560-(slider2.value*2),-150,-500)
      }
      context.restore();
      context.stroke();
      //drawing fingers
      context.beginPath();
      context.moveTo(-175, -190+shift);
      context.lineTo(-190, -190+shift);
      context.lineTo(-190, -140+shift);
      context.moveTo(-225, -140+shift);
      context.lineTo(-175, -140+shift);
      context.bezierCurveTo(-175,-120+shift,-175,-100+shift,-233,-100+shift)
      context.moveTo(-177,-115+shift);
      context.lineTo(-60, -115+shift);
      context.lineTo(-60, -155+shift);
      context.lineTo(-75, -155+shift);
      context.moveTo(-150, -115+shift);
      context.lineTo(-150, -190+shift);
      context.moveTo(-110, -115+shift);
      context.lineTo(-110, -190+shift);
      context.stroke();
    }
    function drawPec(){
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 10;
      context.beginPath();
      context.save();
      context.translate(300,300);
      context.rotate(shoulder);
      context.moveTo(100,0);
      context.restore();
      context.lineTo(225, 600);
      context.lineTo(50, 590);
      context.moveTo(200 + (slider0.value*1.5),225);
      context.lineTo(20,300 + (slider0.value*.4));
      context.fill();
      context.moveTo(10,675);
      context.bezierCurveTo(100,700,150,750,150,900);
      context.stroke();
    }
    context.scale(.33, .33);
    context.translate(0,400);
    context.save();
    drawBody();
    context.translate(300,300);
    context.rotate(shoulder);
    context.save();
    context.translate(650,100);
    context.rotate(elbow);
    context.save();
    context.translate(-35,-500);
    context.rotate(wrist);
    context.save();
    drawHand();
    context.restore();
    context.restore();
    drawForearm();
    context.restore();
    drawUpperArm();
    context.restore();
    context.restore();
    drawPec();
    context.restore();
  }
  slider0.addEventListener("input",draw);
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  draw();
}
window.onload = setup;
