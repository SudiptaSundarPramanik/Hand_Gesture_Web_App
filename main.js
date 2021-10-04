Webcam.set({
    width:300,
    height:350,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach(' #camera ');
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/NTEXUSsiU/model.json",modelLoaded);
function modelLoaded(){
    console.log('Model Loaded');
}
function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    })
}
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="The first prediction is "+Prediction_1;
    speak_data_2="And the second prediction is "+Prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    utterThis.rate=0.5;
    synth.speak(utterThis);
}
function gotResult(error,results){
    if(error){
        console.error();
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        Prediction_1=results[0].label;
        Prediction_2=results[1].label;
        speak();
        if(results[0].label=="Victory"){
            document.getElementById("hope_emoji").innerHTML="&#x270C;";
        }
        if(results[0].label=="Best"){
            document.getElementById("hope_emoji").innerHTML="&#x1F44D;";
        }
        if(results[0].label=="Awesome"){
            document.getElementById("hope_emoji").innerHTML="&#x1F44C;";
        }
        if(results[0].label=="Up Arrow"){
            document.getElementById("hope_emoji").innerHTML="&#x261D;";
        }
        if(results[0].label=="Down Arrow"){
            document.getElementById("hope_emoji").innerHTML="&#x1F447;";
        }
        if(results[1].label=="Victory"){
            document.getElementById("fail_emoji").innerHTML="&#x270C;";
        }
        if(results[1].label=="Best"){
            document.getElementById("fail_emoji").innerHTML="&#x1F44D;";
        }
        if(results[1].label=="Awesome"){
            document.getElementById("fail_emoji").innerHTML="&#x1F44C;";
        }
        if(results[1].label=="Up Arrow"){
            document.getElementById("fail_emoji").innerHTML="&#x261D;";
        }
        if(results[1].label=="Down Arrow"){
            document.getElementById("hope_emoji").innerHTML="&#x1F447;";
        }
    }
}