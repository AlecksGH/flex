//I modified my second project to now use glmatrix and also added an articulated hand
//Once again, again, I took some of the elementary things from Eftychios Sifakis' github demos for the course, mostly Week3 Demo0 and Week5 Demo0. 
//I tried fiddling with another curve type, but not only are they not as intuitive for me, but there are just so many curves that it would be building the entire thing from basically scratch, and I just don't have the time for that. Beziers are good enough because of how the curves are purely aesthetic and collision or derivatives arent needed.
//All code was developed by me, Alex Jans, and Eftychios Sifakis, though his public GitHub, and whoever made gl-matrix-min
//Once again, enjoy. I think that the hand is pretty sweet, and if I had a bit more time I'd try to figure out how to make the zoom slider zoom directly on the hand
function setup() {

  var canvas = document.getElementById('myCanvas');
  var zoomslider = document.getElementById('zoomslider');
  zoomslider.value = 0;
  var slider0 = document.getElementById('slider0');
  slider0.value = 0;
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = -0;

  var pinkyslider = document.getElementById('pinkyslider');
  pinkyslider.value = 0;
  var ringslider = document.getElementById('ringslider');
  ringslider.value = 0;
  var middleslider = document.getElementById('middleslider');
  middleslider.value = 0;
  var indexslider = document.getElementById('indexslider');
  indexslider.value = 0;
  var thumbslider = document.getElementById('thumbslider');
  thumbslider.value = -10;

  function draw() {
    // use the sliders to get the angles
    var shoulder = slider0.value*0.005*Math.PI;
    var elbow = slider1.value*0.005*Math.PI;
    var wrist = slider2.value*0.005*Math.PI;
    var prot = pinkyslider.value*0.005*Math.PI;
    var rrot = ringslider.value*0.005*Math.PI;
    var mrot = middleslider.value*0.005*Math.PI;
    var irot = indexslider.value*0.005*Math.PI;
//create coordinate systems
	var Tbody_to_canvas = mat3.create();
	mat3.fromScaling(Tbody_to_canvas,[.33*(1+zoomslider.value * .05),.33*(1+zoomslider.value * .05)]);
	mat3.translate(Tbody_to_canvas,Tbody_to_canvas,[0 + (zoomslider.value * -10),400]);
        

	var Tupper_to_body = mat3.create();
	mat3.fromTranslation(Tupper_to_body,[300,300]);
        mat3.rotate(Tupper_to_body,Tupper_to_body,shoulder);

	var Tupper_to_canvas = mat3.create();
	mat3.multiply(Tupper_to_canvas, Tbody_to_canvas, Tupper_to_body);

	var Tfore_to_upper = mat3.create();
	mat3.fromTranslation(Tfore_to_upper,[650,100]);
        mat3.rotate(Tfore_to_upper,Tfore_to_upper,elbow);

	var Tfore_to_canvas = mat3.create();
	mat3.multiply(Tfore_to_canvas, Tupper_to_canvas, Tfore_to_upper);

	var Thand_to_fore = mat3.create();
	mat3.fromTranslation(Thand_to_fore,[-120,-500]);
        mat3.rotate(Thand_to_fore,Thand_to_fore,wrist);

	var Thand_to_canvas = mat3.create();
	mat3.multiply(Thand_to_canvas, Tfore_to_canvas, Thand_to_fore);

	var Tfingers_to_hand = mat3.create();
	mat3.fromTranslation(Tfingers_to_hand,[-40,-180]);
       // mat3.rotate(Tfingers_to_hand,Thand_to_fore,wrist);

	var Tfingers_to_canvas = mat3.create();
	mat3.multiply(Tfingers_to_canvas, Thand_to_canvas, Tfingers_to_hand);

    var context = canvas.getContext('2d');
    canvas.width = canvas.width;


    function moveToTx(loc,Tx){
	var res=vec2.create();
	vec2.transformMat3(res,loc,Tx); 
	context.moveTo(res[0],res[1]);
    }

    function lineToTx(loc,Tx){
	var res=vec2.create(); 
	vec2.transformMat3(res,loc,Tx); 
	context.lineTo(res[0],res[1]);
    }

    function bezierToTx(bez1,bez2,loc,Tx){
	var res1=vec2.create(); 
	var res2=vec2.create(); 
	var res0=vec2.create(); 
	vec2.transformMat3(res1,bez1,Tx); 
	vec2.transformMat3(res2,bez2,Tx); 
	vec2.transformMat3(res0,loc,Tx); 
	context.bezierCurveTo(res1[0],res1[1],res2[0],res2[1],res0[0],res0[1]);
    }
	

    function drawBody(Tx){
      //fill
      context.beginPath();
      moveToTx([0,0],Tx);
      lineToTx([100,0],Tx);
      lineToTx([100,100],Tx);

      if (slider0.value >=0){
         lineToTx([200,175],Tx);
      }else{
         lineToTx([200 + ((slider0.value * 1)*.4) , 175 + ((slider0.value * .75)*.4)],Tx);
      }  
      Tx = Tupper_to_canvas;
      if (slider0.value >=0){
         bezierToTx([-20,-175],[50,-175],[150,-100],Tx); //base delt on upper arm pos
      }else{
         bezierToTx([-20,-175],[50,-175 + (slider0.value * 1)] ,[150 ,-100],Tx);
      }
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "3d3e40";
      context.lineWidth = 4;
      context.stroke();

      if (slider0.value >=0){
      lineToTx([100+ (slider0.value * 4),100- (slider0.value * 2)],Tx);
      Tx = Tbody_to_canvas;
        bezierToTx([300 + (slider0.value * 0),500 + (slider0.value *2)],[400 + (slider0.value * 1),400 + (slider0.value * 4)],[300,600+(slider0.value * 3)],Tx); //move lat as well
      }else{
      lineToTx([100,100],Tx);
      Tx = Tbody_to_canvas
        bezierToTx([300,500],[400,400],[300,600],Tx)
      }
      lineToTx([250,775],Tx);
      lineToTx([245,950],Tx);
      lineToTx([0,950],Tx);
      context.closePath();
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 4;
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
      context.fill();
      //stroke
      context.beginPath();
      moveToTx([0,0],Tx);
      lineToTx([100,0],Tx);
      lineToTx([100,100],Tx);
      if (slider0.value >=0){
         lineToTx([200,175],Tx);
      }else{
         lineToTx([200 + ((slider0.value * 1)*.4) , 175 + ((slider0.value * .75)*.4)],Tx);
      }   
      Tx = Tupper_to_canvas;
      if (slider0.value >=0){
         bezierToTx([-20,-175],[50,-175],[150,-100],Tx); //base delt on upper arm pos
      }else{
         bezierToTx([-20,-175],[50,-175 + (slider0.value * 1)] ,[150 ,-100],Tx);
      }
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "3d3e40";
      context.lineWidth = 4;
      context.stroke();
      if (slider0.value >=0){
      moveToTx([100+ (slider0.value * 4),100- (slider0.value * 2)],Tx);
      Tx = Tbody_to_canvas;
        bezierToTx([300 + (slider0.value * 0),500 + (slider0.value *2)],[400 + (slider0.value * 1),400 + (slider0.value * 4)],[300,600+(slider0.value * 3)],Tx); //move lat as well
      }else{
      moveToTx([100,100],Tx);
      Tx = Tbody_to_canvas;
        bezierToTx([300,500],[400,400],[300,600],Tx)
      }
      lineToTx([250,775],Tx);
      lineToTx([245,950],Tx);
      lineToTx([0,950],Tx);
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 4;
      context.stroke();
//clean up
      if (slider0.value >=-55){
      }else{
 	 Tx = Tupper_to_canvas;
         context.beginPath();
         context.arc(55 + ((slider0.value * 1)*.3) , -72.4 + ((slider0.value * .75)*.9), 66, 0, 2 * Math.PI, false);
	 context.fill(); 
         Tx = Tbody_to_canvas;
      }   
    }
    function drawUpperArm(Tx){
      //lines to fill
      context.beginPath();
      moveToTx([150,-100],Tx);
      if ( slider1.value <=0){
        bezierToTx([300 -(slider1.value * .5),-150 + (slider1.value * 2)],[400+(slider1.value * 3),-100 + (slider1.value * .8)],[550+(slider1.value * 4),0],Tx); //CHANGE BEZIER BASED ON ROTATION OF FOREARM
      } else {
        bezierToTx([300 -(slider1.value * .5),-150 + (slider1.value * .5)],[400+(slider1.value * 1),-100 + (slider1.value * .3)],[550+(slider1.value * 1),0],Tx);
      }
      context.strokeStyle = "3d3e40";
      context.lineWidth = 4;
      lineToTx([650,100],Tx);
      bezierToTx([200,150],[300,150],[100,100],Tx);
      context.closePath();
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 4;
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
      context.fill();
      //over again to stroke
      context.beginPath();
      moveToTx([150,-100],Tx);
      if ( slider1.value <=0){
        bezierToTx([300 -(slider1.value * .5),-150 + (slider1.value * 2)],[400+(slider1.value * 3),-100 + (slider1.value * .8)],[550+(slider1.value * 4),0],Tx); //CHANGE BEZIER BASED ON ROTATION OF FOREARM
      } else {
        bezierToTx([300 -(slider1.value * .5),-150 + (slider1.value * .5)],[400+(slider1.value * 1),-100 + (slider1.value * .3)],[550+(slider1.value * 1),0],Tx);
      }
      context.strokeStyle = "3d3e40";
      context.lineWidth = 4;
      moveToTx([650,100],Tx);
      bezierToTx([200,150],[300,150],[100,100],Tx);
      moveToTx([200,0],Tx);
      bezierToTx([250 - (slider1.value*1),30],[300 + (slider1.value *1 ),40],[400 + (slider1.value *1 ),20],Tx);
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 4;
      context.stroke();

    }
    function drawForearm(Tx){
      //lines to fill
      context.beginPath();
      moveToTx([0,0],Tx);
      lineToTx([0,-200],Tx);
      bezierToTx([-5, -350],[-35, -450],[-35,-500],Tx);
      lineToTx([-150,-500],Tx);
      if(slider1.value >= 0){
        bezierToTx([-140,-475],[-130, -400],[-125,-300],Tx);
      }else{
        bezierToTx([-140,-475],[-130, -400+ (slider1.value *2)],[-125,-300 + (slider1.value *5)],Tx);
      }
      Tx = Tupper_to_canvas;
      if(slider2.value <= 0){
       bezierToTx([450,-100],[350 + (slider2.value * 2), 110],[650,100],Tx);
      } else {
        bezierToTx([450,-100],[350, 110],[650,100],Tx);
      }
      Tx = Tfore_to_canvas;
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
      context.fill();
      //lines to fill
      context.beginPath();
      moveToTx([0,0],Tx);
      lineToTx([0,-200],Tx);
      bezierToTx([-5, -350],[-35, -450],[-35,-500],Tx);
      moveToTx([-150,-500],Tx);
      if(slider1.value >= 0){
        bezierToTx([-140,-475],[-130, -400],[-125,-300],Tx);
      }else{
        bezierToTx([-140,-475],[-130, -400+ (slider1.value *2)],[-125,-300 + (slider1.value *5)],Tx);
      }
      Tx = Tupper_to_canvas;
      if(slider2.value <= 0){
       bezierToTx([450,-100],[350 + (slider2.value * 2), 110],[650,100],Tx);
      } else {
        bezierToTx([450,-100],[350, 110],[650,100],Tx);
      }
      Tx = Tfore_to_canvas;


      context.stroke();
    }
    function drawHand(Tx){
      //lines to fill
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 4;
      context.beginPath();
Tx = Tfore_to_canvas;
    moveToTx([-35,-500],Tx);
Tx = Thand_to_canvas
    lineToTx([-40,-180],Tx);
    lineToTx([-80,-140-pinkyslider.value*.15],Tx);
    bezierToTx([-90,-120-pinkyslider.value*.055],[-85,-120-pinkyslider.value*.03],[-65,-110],Tx);
    Tx = Tfore_to_canvas;

    lineToTx([-150,-500],Tx);
    Tx = Thand_to_canvas
context.fill();
    bezierToTx([-70,-30],[-75,-70],[-65,-110],Tx);
    bezierToTx([-85,-120],[-90,-120],[-80,-140],Tx);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
context.fill();
context.beginPath();
Tx = Tfore_to_canvas;
    moveToTx([-35,-500],Tx);
Tx = Thand_to_canvas

    bezierToTx([50,-80],[30,-110],[ -25,-160],Tx);
    lineToTx([-40,-180],Tx); 
    moveToTx([-80,-140-pinkyslider.value*.15],Tx);
    bezierToTx([-90,-120-pinkyslider.value*.055],[-85,-120-pinkyslider.value*.03],[-65,-110],Tx);
    Tx = Tfore_to_canvas;
 //   bezierToTx([-195,-570],[-190,-530],[-150,-500],Tx);
    moveToTx([-150,-500],Tx);
    Tx = Thand_to_canvas
    bezierToTx([-70,-30],[-75,-70],[-65,-110],Tx);
 //   bezierToTx([-85,-120],[-90,-120],[-80,-140],Tx);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
context.fill();
      context.stroke();
    }

    function drawFingers(Tx){




      //lines to fill
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 4;
//index fill
	context.beginPath();
	moveToTx([0,0],Tx);
        mat3.rotate(Tx,Tx,irot*2);
	bezierToTx([-35,20],[-55,20],[-75,30],Tx);
	bezierToTx([-85,30],[-90,30],[-95,40],Tx);
	lineToTx([-60,65],Tx);
	lineToTx([-80,-140],Thand_to_canvas);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
	context.beginPath();
	moveToTx([-95,40],Tx);
	var Tindex1 = mat3.create();
        mat3.translate(Tindex1, Tx, [-95,50]);
        mat3.rotate(Tindex1,Tindex1,irot*2.5);
	bezierToTx([-8,5],[-2,12],[0,13],Tindex1);
        lineToTx([18,30],Tindex1);
        lineToTx([25,35],Tindex1);


	var Tindex2 = mat3.create();
	mat3.translate(Tindex2, Tindex1, [35,35]);
	lineToTx([30,3],Tindex1);
	lineToTx([-60,65],Tx);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
	context.beginPath();
	moveToTx([30,3],Tindex1);
        mat3.rotate(Tindex2,Tindex2,irot*2);
	lineToTx([38,-15],Tindex2);
	lineToTx([30,3],Tindex1);
	bezierToTx([5,-38],[25,-40],[38,-15],Tindex2);
	lineToTx([25,35],Tindex1);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
	lineToTx([-60,65],Tx);
        mat3.rotate(Tx,Tx,irot*-2);
	lineToTx([-80,-140],Thand_to_canvas);
	//context.fill();

//index lines
	context.beginPath();
	moveToTx([0,0],Tx);
        mat3.rotate(Tx,Tx,irot*2);
	bezierToTx([-35,20],[-55,20],[-75,30],Tx);
	bezierToTx([-85,30],[-90,30],[-95,40],Tx);
	//context.stroke();
	var Tindex1 = mat3.create();
        mat3.translate(Tindex1, Tx, [-95,50]);
        mat3.rotate(Tindex1,Tindex1,irot*2.5);
	bezierToTx([-8,5],[-2,12],[0,13],Tindex1);
        lineToTx([18,30],Tindex1);
        lineToTx([25,35],Tindex1);

	context.stroke();
	var Tindex2 = mat3.create();
	mat3.translate(Tindex2, Tindex1, [35,35]);
        mat3.rotate(Tindex2,Tindex2,irot*2);
//FINGER TIP
	lineToTx([38,-15],Tindex2);
	moveToTx([30,3],Tindex1);
	bezierToTx([5,-38],[25,-40],[38,-15],Tindex2);
	moveToTx([30,3],Tindex1);
	lineToTx([-60,65],Tx);
        mat3.rotate(Tx,Tx,irot*-2);
	lineToTx([-80,-140],Thand_to_canvas);
	context.stroke();

//thumb lines
	let Th = Thand_to_canvas;
	context.beginPath();
	let shift = Math.abs(thumbslider.value*1)-10;
	moveToTx([-120,-45],Th);
	lineToTx([-145+shift*.5,-55+shift],Th);
	lineToTx([-140,-70+shift],Th);
	bezierToTx([-160-shift*2,-110+shift],[-115-thumbslider.value-7,-110+shift],[-105,-80+shift],Th);
	bezierToTx([-95,-77.5+shift],[-95,-72.5+shift],[-100,-70+shift],Th);
	context.fill();
	moveToTx([-115,-55],Th);
	bezierToTx([-95,-90],[-70,-90],[-50,-90],Th);
	context.stroke();
//thumb fill
	context.beginPath();
	moveToTx([-150,-500],Tfore_to_canvas);
	bezierToTx([-65,-3],[-85,-5],[-100,-25],Th);
	bezierToTx([-110,-26],[-117,-34],[-120,-45],Th);
	lineToTx([-115,-55],Th);
	bezierToTx([-95,-90],[-70,-90],[-50,-90],Th);
	context.fill();
//lines again
	context.beginPath();
	moveToTx([-150,-500],Tfore_to_canvas);
	bezierToTx([-65,-3],[-85,-5],[-100,-25],Th);
	bezierToTx([-110,-26],[-117,-34],[-120,-45],Th);
	context.stroke();


//middle fill
	context.beginPath();
	moveToTx([0,0],Tx);
        mat3.rotate(Tx,Tx,mrot*.8);
	bezierToTx([-50,20],[-65,20],[-85,35],Tx);
	bezierToTx([-95,37],[-100,40],[-105,50],Tx);
	lineToTx([-65,70],Tx);
	lineToTx([-50,-120],Thand_to_canvas);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
	context.beginPath();
	moveToTx([-105,50],Tx);
	var Tmiddle1 = mat3.create();
        mat3.translate(Tmiddle1, Tx, [-105,50]);
        mat3.rotate(Tmiddle1,Tmiddle1,mrot*1);
        lineToTx([18,40],Tmiddle1);
        lineToTx([25,45],Tmiddle1);
	lineToTx([45,13],Tmiddle1);
	lineToTx([-65,70],Tx);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
	context.beginPath();
	
	var Tmiddle2 = mat3.create();
	mat3.translate(Tmiddle2, Tmiddle1, [35,45]);
        mat3.rotate(Tmiddle2,Tmiddle2,mrot*.9);
	moveToTx([45,13],Tmiddle1);
	bezierToTx([30,-40],[45,-50],[43,-10],Tmiddle2);
        lineToTx([25,45],Tmiddle1);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
        mat3.rotate(Tx,Tx,mrot*-.8);
//middle lines
	context.beginPath();
	moveToTx([0,0],Tx);
        mat3.rotate(Tx,Tx,mrot*.8);
	bezierToTx([-50,20],[-65,20],[-85,35],Tx);
	bezierToTx([-95,37],[-100,40],[-105,50],Tx);
	context.stroke();
	var Tmiddle1 = mat3.create();
        mat3.translate(Tmiddle1, Tx, [-105,50]);
        mat3.rotate(Tmiddle1,Tmiddle1,mrot*1);
	//bezierToTx([2,5],[1,6],[0,7],Tmiddle1);
	context.stroke();
        lineToTx([18,40],Tmiddle1);
        lineToTx([25,45],Tmiddle1);
	
	var Tmiddle2 = mat3.create();
	mat3.translate(Tmiddle2, Tmiddle1, [35,45]);
        mat3.rotate(Tmiddle2,Tmiddle2,mrot*.9);
//FINGER TIP
	lineToTx([43,-10],Tmiddle2);
	moveToTx([45,13],Tmiddle1);
	bezierToTx([30,-40],[45,-50],[43,-10],Tmiddle2);
	moveToTx([45,13],Tmiddle1);
	lineToTx([-65,70],Tx);
        mat3.rotate(Tx,Tx,mrot*-.8);
	lineToTx([-50,-120],Thand_to_canvas);
	context.stroke();

//ring fill
	context.beginPath();
	moveToTx([0,0],Tx);
        mat3.rotate(Tx,Tx,rrot*(.9+prot*.5));
	bezierToTx([-35,20],[-55,20],[-75,30],Tx);
	bezierToTx([-85,30],[-90,30],[-95,40],Tx);
	lineToTx([-60,65],Tx);
	lineToTx([-80,-140],Thand_to_canvas);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
	context.beginPath();
	moveToTx([-95,40],Tx);
	var Tring1 = mat3.create();
        mat3.translate(Tring1, Tx, [-95,50]);
        mat3.rotate(Tring1,Tring1,rrot*2.5);
	bezierToTx([-8,5],[-2,12],[0,13],Tring1);
        lineToTx([18,30],Tring1);
        lineToTx([25,35],Tring1);
	lineToTx([30,3],Tring1);
	lineToTx([-60,65],Tx);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
	context.beginPath();
	var Tring2 = mat3.create();
	mat3.translate(Tring2, Tring1, [35,35]);
        mat3.rotate(Tring2,Tring2,rrot*2);
	moveToTx([30,3],Tring1);
	bezierToTx([5,-38],[25,-40],[38,-15],Tring2);
        lineToTx([25,35],Tring1);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
        mat3.rotate(Tx,Tx,rrot*(.9+prot*.5)*-1);
//ring lines
	context.beginPath();
	moveToTx([0,0],Tx);
        mat3.rotate(Tx,Tx,rrot*(.9+prot*.5));
	bezierToTx([-35,20],[-55,20],[-75,30],Tx);
	bezierToTx([-85,30],[-90,30],[-95,40],Tx);
	context.stroke();
	var Tring1 = mat3.create();
        mat3.translate(Tring1, Tx, [-95,50]);
        mat3.rotate(Tring1,Tring1,rrot*2.5);
	bezierToTx([-8,5],[-2,12],[0,13],Tring1);
        lineToTx([18,30],Tring1);
        lineToTx([25,35],Tring1);
	context.stroke();
	var Tring2 = mat3.create();
	mat3.translate(Tring2, Tring1, [35,35]);
        mat3.rotate(Tring2,Tring2,rrot*2);
//FINGER TIP
	lineToTx([38,-15],Tring2);
	moveToTx([30,3],Tring1);
	bezierToTx([5,-38],[25,-40],[38,-15],Tring2);
	moveToTx([30,3],Tring1);
	lineToTx([-60,65],Tx);
        mat3.rotate(Tx,Tx,rrot*(.9+prot*.5)*-1);
	lineToTx([-80,-140],Thand_to_canvas);
	context.stroke();

//pinky fill
	context.beginPath();
	moveToTx([0,0],Tx);
        mat3.rotate(Tx,Tx,prot*.65);
	bezierToTx([-30,20],[-45,20],[-65,35],Tx);
	bezierToTx([-75,37],[-80,40],[-85,50],Tx);
	lineToTx([-55,68],Tx);
	lineToTx([-80,-140],Thand_to_canvas);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
	context.beginPath();
	moveToTx([-85,50],Tx);
	var Tpinky1 = mat3.create();
        mat3.translate(Tpinky1, Tx, [-85,50]);
        mat3.rotate(Tpinky1,Tpinky1,prot*1);
	bezierToTx([2,5],[8,12],[10,13],Tpinky1);
	lineToTx([28,30],Tpinky1);
	lineToTx([35,35],Tpinky1);
	lineToTx([40,3],Tpinky1);
	lineToTx([-55,68],Tx);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
	context.beginPath();
	var Tpinky2 = mat3.create();
	mat3.translate(Tpinky2, Tpinky1, [35,35]);
        mat3.rotate(Tpinky2,Tpinky2,prot*.7);
	mat3.rotate(Tx,Tx,prot*-.65);
	moveToTx([40,3],Tpinky1);
	bezierToTx([5,-38],[27,-40],[33,-25],Tpinky2);
	lineToTx([35,35],Tpinky1);
	context.strokeStyle = "#aeb5bf";
	context.stroke();
	context.strokeStyle = "#3d3e40";
	context.fill();
//pinky lines
	context.beginPath();
	moveToTx([0,0],Tx);
        mat3.rotate(Tx,Tx,prot*.65);
	bezierToTx([-30,20],[-45,20],[-65,35],Tx);
	bezierToTx([-75,37],[-80,40],[-85,50],Tx);

	var Tpinky1 = mat3.create();
        mat3.translate(Tpinky1, Tx, [-85,50]);
        mat3.rotate(Tpinky1,Tpinky1,prot*1);
	bezierToTx([2,5],[8,12],[10,13],Tpinky1);
	lineToTx([28,30],Tpinky1);
	lineToTx([35,35],Tpinky1);

	var Tpinky2 = mat3.create();
	mat3.translate(Tpinky2, Tpinky1, [35,35]);
        mat3.rotate(Tpinky2,Tpinky2,prot*.7);
//FINGER TIP GOES HERE
	lineToTx([33,-25],Tpinky2);
	moveToTx([40,3],Tpinky1);
	bezierToTx([5,-38],[27,-40],[33,-25],Tpinky2);
	moveToTx([40,3],Tpinky1);
	lineToTx([-55,68],Tx);
	lineToTx([-80,-140],Thand_to_canvas);
	context.stroke();



    }
    function drawPec(Tx){
      context.fillStyle = "#aeb5bf";
      context.strokeStyle = "#3d3e40";
      context.lineWidth = 4;
      context.beginPath();
      Tx = Tupper_to_canvas;
      moveToTx([100,0],Tx);
      Tx = Tbody_to_canvas;
      lineToTx([225, 600],Tx);
      lineToTx([50, 590],Tx);
      moveToTx([200 + (slider0.value*1.5),225],Tx);
      lineToTx([20,300 + (slider0.value*.4)],Tx);
      context.fill();
      moveToTx([10,675],Tx);
      bezierToTx([100,700],[150,750],[150,900],Tx);
      context.stroke();
    }
    drawBody(Tbody_to_canvas);

    drawFingers(Tfingers_to_canvas);
    drawHand(Thand_to_canvas);
    drawForearm(Tfore_to_canvas);
    drawUpperArm(Tupper_to_canvas);
    drawPec(Tbody_to_canvas);
    
  }
  zoomslider.addEventListener("input",draw);
  slider0.addEventListener("input",draw);
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  pinkyslider.addEventListener("input",draw);
  ringslider.addEventListener("input",draw);
  middleslider.addEventListener("input",draw);
  indexslider.addEventListener("input",draw);
  thumbslider.addEventListener("input",draw);
  draw();
}
window.onload = setup;
