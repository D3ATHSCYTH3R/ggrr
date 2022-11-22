status="";
objects=[];
function preload(){

}
function setup(){
    canvas= createCanvas(390,325);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video,0,0,390,325);
    if (status != ""){
        c.detect(video, gotResults);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status - Detected";
            document.getElementById("idk").innerHTML="Objects Amount - "+objects.length;

            fill("red");
            confidence=floor(object[i].confidence*100);
            label=objects[i].label;
            text(label + "  " + confidence + "%" ,object[i].x +15,object[i].y +15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        
        if(objects[i].label==inp){
            video.stop();
            c.detect(gotResults);
            
            var synth = window.speechSynthesis;
            utterThis= new SpeechSynthesisUtterance(inp+"found");
            synth.speak(utterThis);

        }
        else{
            document.getElementById("idk").innerHTML=inp+"NOT FOUND";
        }
        }
    
    
    }

    
}
function g(){
    c=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting";
    inp=document.getElementById("input").value;
}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    consolee.log(results);
    objects=results;
}