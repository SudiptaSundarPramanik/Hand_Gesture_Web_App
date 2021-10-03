Webcam.set({
    width:300,
    height:350,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach(' #camera ');
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NTEXUSsiU/model.json", modelLoaded);
function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    })
}