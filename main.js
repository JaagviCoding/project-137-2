myStatus = "";
objects = [];

function preload()
{
 

}
function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
   

}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "status: Dectected Objects";
}
function draw()
{
    image(video,0,0,380,380);
    if(myStatus !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for( i = 0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: Objects Dectected";
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person")
            {
                document.getElementById("object_found").innerHTML = "Object Found";
               
            }
            else{
                document.getElementById("object_found").innerHTML = "Object Not Found";
                
            }
        }
            if(objects.length==0)
            {
                document.getElementById("object_found").innerHTML = "Object Not Found";
                
            }
    }
}
function modelLoaded()
{
    console.log("modelLoaded");
    myStatus = true;
}

function gotResult(error,results)
{
 if(error)
 {
     console.log(error);
 }
 console.log(results);
 objects = results;
}
