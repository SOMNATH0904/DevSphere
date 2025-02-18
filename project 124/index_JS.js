const API_KEY="YOUR_API_KEY";

const speechRecognition=window.webkitSpeechRecognition //Google Chrome 
||
window.SpeechRecognition;  //Firefox


//To get a Battery
let batteryPromise = navigator.getBattery();
batteryPromise.then(batteryCallback1);

function batteryCallback1(batteryObject) {
   printBatteryStatus(batteryObject);
}
function printBatteryStatus(batteryObject) {
    const batteryLevel = batteryObject.level*100;
    // console.log("Percentage", batteryLevel+"%");
    document.getElementById('ram').innerHTML = "Battery: " + batteryLevel + "%";
}

//Temperature
getWeatherDetails1();
function getWeatherDetails1()
{
    if("geolocation" in navigator)
    {
        navigator.geolocation.getCurrentPosition(async function(position){
            let lat=position.coords.latitude;
            let lon=position.coords.longitude;

            const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

            let response = await fetch(api_url);

            let data = await response.json();

            manipulateWeatherData(data);

        });
    }
}
function manipulateWeatherData(data)
{
    let city=data.name;
    let temp=data.main.temp;
    let humidity=data.main.humidity;
    let weather_Name = data.weather[0].main;

    let icon=data.weather[0].icon;
    let description=data.weather[0].main;
    //console.log(data);
    // let msg=`Current temperature is ${temp} degree celcius and humidity is ${humidity} grams of water vapour per kilogram`;
    // Speak(msg);
    //We can use other data if we want to show on screen
    let imageUrl = `https://openweathermap.org/img/w/${icon}.png`;

    let image = `<img src="${imageUrl}" height="90" width="90">`;
    // document.write(image);
    document.getElementById('tempValue').innerHTML = `${temp}`;
    document.getElementById('humidityValue').innerHTML = `${humidity}` + "*";
    document.getElementById('weatherImage').innerHTML = image;
    document.getElementById('weather_Name').innerHTML = weather_Name;
    
}
//Get Date
getDate1();
function getDate1()
{
    var d = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    document.getElementById("monthValue").innerHTML = months[d.getMonth()];
    document.getElementById("dateValue").innerHTML = d.getDate();
    document.getElementById("timeValue").innerHTML = d.getHours() + ":" + d.getMinutes();
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    document.getElementById("weekDayValue").innerHTML = days[d.getDay()];
}

// jarvisStartingReply();
function startListening()
{
    const recong = new speechRecognition();
    recong.start();

    recong.onresult =function(data)
    {
        handleResults(data);
    }
}
function handleResults(data)
{
    let text=data.results[0][0].transcript;
    text = text.toLowerCase();
    console.log(text);

    ProcessCommand(text);
}
function ProcessCommand(UserText)
{
        if(UserText.includes("push enable"))
        {
            // UserText=UserText.slice(16);
            // Speak('Searching initiated...'+UserText);
            // searchOnGoogle(UserText);
        }
        else
        {

        }
    }

function Speak(TEXT)
{
    const utter = new SpeechSynthesisUtterance();

    utter.text = TEXT;
    utter.voice = window.speechSynthesis.getVoices()[1];
    window.speechSynthesis.speak(utter);
    window.speechSynthesis.getVoices().forEach(i=>{
        console.log(i);
    });
}

function jarvisStartingReply()
      {
        Speak("please wait...system initializing...backing up configurations...gathering audio and video files...");
        Speak("system initialized...");
        Speak("i am online and ready... say push enable to talk... or simply click arc reactor...");
        startListening();
      }
