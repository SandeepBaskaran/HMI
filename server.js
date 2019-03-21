var express = require('express');
var morgan = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');

var app = express();
app.use(morgan('combined'));

var data = {'flow':0,'level':0,'temperature':0};

var about = {
    title : 'WEB HMI | About',
    heading : 'About',
    content : `<div class="w3-container w3-card w3-white w3-margin-bottom">
                <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-dashboard fa-fw w3-margin-right w3-xmedium w3-text-teal"></i>Web-Based Remote Monitoring & Control System</h2>
                <div class="w3-container">
                  <h5 class="w3-opacity"><b>Abstract</b></h5>
                  <h6>Process Control applications ensure consistency, improves quality and reduce the labour costs across the industries. This paper outlines the problem of remotely monitoring, control, 
                    diagnosis, management, and maintenance of embedded devices located in different subnets and physical areas by using progressive web apps. Using the web application, real-time logging is carried out using the multitudinous software and personalized updates to users are sent via phone or email in addition to the alarm sensors. This remote monitoring web application is developed as a perfect fit for the small-scale process industries and laboratories. Here, devices such as sensors and transducers collect the measurements and send them to Raspberry Pi for further processing. The data can be visualized in web application and the input from the users can be fed again into the field devices.</h6>
                  <hr>
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity"><b>Working</b></h5>
                  <h6>The field devices and sensors collect the physical quantities as electrical units and send them into raspberry pi in the form of analogue signals. The received signals are converted into digital signals to process it further in Raspberry Pi. The converted data can be seen visually in numerical and graphical formats in the web application. Since the web application is created as a progressive web app, it can installed as a mobile app in the mobile phone for remote monitoring. Once the data is logged into web applications, users can access the application anytime to find the updated information. Users will also receive notifications via email or mobile phone when the critical value is reached. Alarm sensors can also be used to alert during unexpected emergencies. Using the web applications,  the authorized users can provide customized input to control the process variables remotely which will be reflected immediately. All the operations are accountable. Valid Login activity and unused session termination enhance the security of the application.</h6>
                  <hr>
                </div>
                <div class="w3-container">
                  <h5 class="w3-opacity"><b>Conclusion</b></h5>
                  <h6>Remote monitoring and controlling of process parameters using the web and mobile application is a fruitful way to maintain throughput, quality, yield, and energy efficiency in industries. Availability of equipment and web application at a reasonable price is a subsequent breakthrough.</h6><br>
                </div>
                
               </div>`,
};

var configuration = {
    title : 'WEB HMI | Configuration',
    heading : 'Configuration',
    content : `<div class="w3-container w3-padding-64 w3-theme-l5">
                  <div class="w3-row">
                    <div class="w3-col m5">
                    <div class="w3-padding-16"><span class="w3-medium w3-border-teal w3-bottombar">Configuration</span></div>
                      <img class="content-img" src="img/blockdia" width="950px" height="475px"/>
                    </div>
                    </div>
                   </div>
                </div>`,
};

var contact = {
    title : 'WEB HMI | Contact',
    heading : 'Contact',
    content : `<div class="w3-container w3-padding-64 w3-theme-l5">
                  <div class="w3-row">
                    <div class="w3-col m5">
                    <div class="w3-padding-16"><span class="w3-medium w3-border-teal w3-bottombar">Contact Us</span></div>
                      <h3>Address</h3>
                        <p><i class="fa fa-map-marker w3-text-teal w3-medium"></i>  Valliammai Engineering College <br> Chennai, TamilNadu</p>
                        <a class="w3-button w3-large w3-teal" href="https://www.github.com/SandeepBaskaran" target="_blank" title="Facebook"><i class="fa fa-github"></i></a>
                    </div>
                    </div>
                   </div>
                </div>`,
};

var feedback = {
    title : 'WEB HMI | Feedback',
    heading : 'Feedback',
    content : `<div class="w3-container w3-padding-64 w3-theme-l5">
                  <div class="w3-row">
                    <div class="w3-col m5">
                    <div class="w3-padding-16"><span class="w3-medium w3-border-teal w3-bottombar">Feedback</span></div>
                    <p>Just fill out the following feedback form to register your suggestion.</p>
                      <a class="w3-button w3-large w3-teal" href="#" target="_blank">Feedback Form</a>
                    </div>
                    </div>
                   </div>
                </div>`,
}

var control = {
    title : 'WEB HMI | Control',
    heading: 'Control',
    content: `<div class="w3-container w3-padding-64 w3-theme-l5">
                <h2 class="w3-text-grey w3-padding-16"><i class="fa fa-dashboard fa-fw w3-margin-right w3-xmedium w3-text-teal"></i>Control Panel</h2>
                
                        <h6 align="center">Pressure</h6>
                        <div align="center"> 
                            <button class="w3-button w3-teal w3-round-medium">ON/OFF</button>
                            <input type="number" id="thresholdPressure" name="threshold" min="0" max="200" class="w3-input w3-teal w3-round-medium">
                            <button class="w3-button w3-teal w3-round-medium">Log</button>
                        </div>
                        <h6 align="center">Flow</h6>
                        <div align="center"> 
                            <button class="w3-button w3-teal w3-round-medium">ON/OFF</button>
                            <input type="number" id="thresholdFlow" name="threshold" min="0" max="200" class="w3-input w3-teal w3-round-medium">
                            <button class="w3-button w3-teal w3-round-medium">Log</button>
                        </div>
                        <h6 align="center">Level</h6>
                        <div align="center"> 
                            <button class="w3-button w3-teal w3-round-medium">ON/OFF</button>
                            <input type="number" id="thresholdLevel" name="threshold" min="0" max="200" class="w3-input w3-teal w3-round-medium">
                            <button class="w3-button w3-teal w3-round-medium">Log</button>
                        </div>
                        <h6 align="center">Temperature</h6>
                        <div align="center">
                            <button class="w3-button w3-teal w3-round-medium">ON/OFF</button>
                            <input type="number" id="thresholdTemperature" name="threshold" min="0" max="200" class="w3-input w3-teal w3-round-medium">
                            <button class="w3-button w3-teal w3-round-medium">Log</button>
                        </div><br/>
                        <div align="center">
                            <button class="w3-button w3-teal w3-round-medium" onclick="setValues()"> Submit </button>
                        </div>
                
            </div>`,
}

function mainTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
        var htmlTemplate = `    
                <!DOCTYPE html>
                <html lang="en">
                <title> ${title} </title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no">
                <meta name="description" content="Web-based remote monitoring and control system">
                <meta name="keywords" content="hmi, dashboard, remote control, remote monitoring">
                <meta name="robots" content="index, nofollow">
                <meta name="web_author" content="Sandeep Baskaran">
                <meta name="language" content="India">
                <link rel="stylesheet" href="main.css">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                
                <!-- Favicon-->
                <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon">
                <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32">
                <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16">
                <link rel="manifest" href="manifest">
                <link rel="mask-icon" href="/img/safari-pinned-tab" color="#5bbad5">
                <meta name="msapplication-TileColor" content="#00aba9">
                <meta name="theme-color" content="#00CED1">
                <link rel="shortcut icon" href="/img/favicon">
                
                <link rel="icon" href="img/favicon" >

                <style>
                body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif}
                .w3-third img{margin-bottom: -6px; opacity: 0.8; cursor: pointer}
                .w3-third img:hover{opacity: 1}
                </style>
                <style>
                #activitygauge {
                margin: 0 auto;
                max-width: 400px;
                min-width: 380px;
                }

                #level {
                    width		: 100%;
                    height		: 400px;
                    font-size	: 11px;
                }

                .center {
                    position: absolute;
                    top: 50%;
                    text-align: center;
                    left: 0;
                    right: 0;
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                }	

                </style>
                <body class="w3-light-grey w3-content" style="max-width: 1600px;">

                <!-- Sidebar/menu -->
                <nav class="w3-sidebar w3-bar-block w3-black w3-animate-left w3-text-teal w3-collapse w3-top w3-center" style="z-index:3;width:300px;font-weight:bold" id="mySidebar"><br>
                <a href="/" onclick="w3_close()" class="w3-bar-item w3-button"><h3 class="w3-padding-64 w3-center"><b> WEB HMI </b></h3></a>
                <hr>
                <a href="configuration" onclick="w3_close()" class="w3-bar-item w3-button">Configuration</a>
                <a href="control" onclick="w3_close()" class="w3-bar-item w3-button">Control</a>
                <a href="about" onclick="w3_close()" class="w3-bar-item w3-button">About</a>
                <a href="contact" onclick="w3_close()" class="w3-bar-item w3-button">Contact</a> 
                <a href="feedback" onclick="w3_close()" class="w3-bar-item w3-button">Feedback</a>
                <br/>
                <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-padding w3-hide-large">CLOSE</a>
                </nav>

                <!-- Top menu on small screens -->
                <header class="w3-container w3-top w3-hide-large w3-white w3-medium w3-padding-16 w3-center">
                <span class="w3-left w3-padding"> ${heading} </span>
                <a href="javascript:void(0)" class="w3-right w3-button w3-white" onclick="w3_open()">☰</a>
                </header>

                <!-- Overlay effect when opening sidebar on small screens -->
                <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

                <!-- !PAGE CONTENT! -->
                <div class="w3-main" style="margin-left:300px">

                <!-- Push down content on small screens --> 
                <div class="w3-hide-large" style="margin-top:83px"></div>
                
                <!-- Content -->
                <div class="w3-row w3-medium">
                    ${content}
                </div>
                
                <!-- End page content -->
                </div>

                <footer class="w3-bottom w3-hide-large w3-white w3-medium ">
                    <h6 style="text-align: center">Web-based Remote Monitoring & Control System</h6>
                </footer>

                <script>
                // Script to open and close sidebar
                function w3_open() {
                    document.getElementById("mySidebar").style.display = "block";
                    document.getElementById("myOverlay").style.display = "block";
                }
                
                function w3_close() {
                    document.getElementById("mySidebar").style.display = "none";
                    document.getElementById("myOverlay").style.display = "none";
                }

                </script>

                


                    <script>
                function setValues(){


                var thresholdPressure = parseInt(document.getElementById("thresholdPressure").value);
                var thresholdFlow = parseInt(document.getElementById("thresholdFlow").value);
                var thresholdLevel = parseInt(document.getElementById("thresholdLevel").value);
                var thresholdTemperature = parseInt(document.getElementById("thresholdTemperature").value);

                if(thresholdPressure < 0 || thresholdPressure > 200)
                    alert("Invalid Pressure value");
                else if(thresholdFlow < 0 || thresholdFlow > 60)
                    alert("Invalid Flow value");
                else if(thresholdLevel < 0 || thresholdLevel > 100)
                    alert("Invalid Level value");
                else if(thresholdTemperature < 0 || thresholdTemperature > 200)
                    alert("Invalid Temperature value");
                else{


                alert("Pressure: "+ thresholdPressure.toString()+"   Flow: "+thresholdFlow.toString()+"   Level: "+thresholdLevel.toString()+"   Temperature: "+thresholdTemperature.toString()); 


                $.ajax({
                    url: 'http://192.168.0.107:5000/setThreshold',
                    type: 'get',
                    data: {thresholdPressure:thresholdPressure,thresholdFlow : thresholdFlow, thresholdLevel : thresholdLevel, thresholdTemperature : thresholdTemperature},
                    success: function (data) {
                        alert("success");
                    },
                    error: function (xhr, status, error) {
                        alert('Error: ' + error.message);
                       // alert(status)
                       // alert(error)
                      }
                  });



            }

        }

</script>






                

                </body>
                </html> 
            `;
            return htmlTemplate;
}

var flow = {
    title : 'WEB HMI | Flow',
    heading : 'Flow',
    parameter : 'flow',
};

var level = {
    title : 'WEB HMI | Level',
    heading : 'Level',
    parameter : 'level',
};

var pressure = {
    title : 'WEB HMI | Pressure',
    heading : 'Pressure',
    parameter : 'pressure',
}

var temperature = {
    title : 'WEB HMI | Temperature',
    heading : 'Temperature',
    parameter : 'temperature',
}

function appTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var parameter = data.parameter;
    var buttons = data.buttons;
        var htmlTemplate = `    
                <!DOCTYPE html>
                <html lang="en">
                <title> ${title} </title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, user-scalable=no">
                <meta name="description" content="Web-based remote monitoring and control system">
                <meta name="keywords" content="hmi, dashboard, remote control, remote monitoring">
                <meta name="robots" content="index, nofollow">
                <meta name="web_author" content="Sandeep Baskaran">
                <meta name="language" content="India">
                <link rel="stylesheet" href="main.css">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu">

                <!-- Favicon-->
                <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon">
                <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32">
                <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16">
                <link rel="manifest" href="manifest">
                <link rel="mask-icon" href="/img/safari-pinned-tab" color="#5bbad5">
                <meta name="msapplication-TileColor" content="#00aba9">
                <meta name="theme-color" content="#ffffff">
                <link rel="shortcut icon" href="/img/favicon">

                <link rel="icon" href="img/favicon" >

                <style>
                body,h1,h2,h3,h4,h5 {font-family: "Raleway", sans-serif;
                    background-color: #ffffff;
                }
                .col{
                  float: left;
                  width: 50%;
                }
                .center {
                    margin-top: 20%;
                    text-align: center;
                    left: 20%;
                    right: 0;
                    -ms-transform: translateY(-50%);
                    transform: translateY(-50%);
                }   

                </style>

                <body class="w3-content" style="max-width: 1600px;">

                <!-- Sidebar/menu -->
                <nav class="w3-sidebar w3-bar-block w3-black w3-animate-left w3-text-teal w3-collapse w3-top w3-center" style="z-index:3;width:300px;font-weight:bold" id="mySidebar"><br>
                  <a href="/" onclick="w3_close()" class="w3-bar-item w3-button"><h3 class="w3-padding-64 w3-center"><b> WEB HMI </b></h3></a>
                  <hr>
                  <a href="pressure" onclick="w3_close()" class="w3-bar-item w3-button">Pressure</a> 
                  <a href="flow" onclick="w3_close()" class="w3-bar-item w3-button">Flow</a> 
                  <a href="level" onclick="w3_close()" class="w3-bar-item w3-button">Level</a>
                  <a href="temperature" onclick="w3_close()" class="w3-bar-item w3-button">Temperature</a>
                  <a href="control" onclick="w3_close()" class="w3-bar-item w3-button">Control</a>
                  <br/>
                  <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-padding w3-hide-large">CLOSE</a>
                </nav>

                <!-- Top menu on small screens -->
                <header class="w3-container w3-top w3-hide-large w3-white w3-medium w3-padding-16 w3-center">
                  <span class="w3-left w3-padding"> ${heading}</span>
                  <a href="javascript:void(0)" class="w3-right w3-button w3-white" onclick="w3_open()">☰</a>
                </header>

                <!-- Overl ay effect when opening sidebar on small screens -->
                <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

                <!-- !PAGE CONTENT! -->
                <div class="w3-main container" style="margin-left:300px">

                  <!-- Push down content on small screens --> 
                  <div class="w3-hide-large" style="margin-top:83px"></div>
                  
                  <!-- Panel -->
                    <div id="${parameter}" class="center" style="width: 100%; height: 350px;"></div>

                    <div class="w3-container w3-white" style="width: device-width">
                        <h6 style="text-align: center">
                        <a href="pressure">Pressure</a> | 
                        <a href="flow">Flow</a> | 
                        <a href="level">Level</a> | 
                        <a href="temperature">Temperature</a>
                        </h6>
                     </div>
                 
                  
                  <!-- End page content -->
                </div>

                <footer class="w3-bottom w3-white w3-medium ">
                  <h6 style="text-align: center">Web-based Remote Monitoring & Control System</h6>
                </footer>

                <script>
                // Script to open and close sidebar
                function w3_open() {
                    document.getElementById("mySidebar").style.display = "block";
                    document.getElementById("myOverlay").style.display = "block";
                }
                 
                function w3_close() {
                    document.getElementById("mySidebar").style.display = "none";
                    document.getElementById("myOverlay").style.display = "none";
                }

                </script>

                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

                <script src="js/highcharts"></script>
                <script src="js/highcharts-more"></script>
                <script src="js/solid-gauge"></script>

                <script src="js/${parameter}"></script>

                </body>
                </html>

            `;
            return htmlTemplate;
}


app.post('/hmi', urlencodedParser, function (req, res) {

data['flow'] = req.body.flow;
data['level'] = req.body.level;
data['temperature'] = req.body.temperature;
console.log(data);
res.end("Data Recieved");

});

app.get('/HMI', function (req,res) {
var url_parts = url.parse(request.url, true);
});

app.get('/getData', function (req,res) {
console.log(data);
res.send(JSON.stringify(data));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/main.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'main.css'));
});

app.get('/pressure', function (req, res) {
    res.send(appTemplate(pressure));
});

app.get('/temperature', function (req, res) {
    res.send(appTemplate(temperature));
});

app.get('/level', function (req, res) {
    res.send(appTemplate(level));
});

app.get('/flow', function (req, res) {
    res.send(appTemplate(flow));
});

app.get('/manifest', function (req, res) {
    res.sendFile(path.join(__dirname, 'manifest.json'));
});

app.get('/js/temperature', function (req, res) {
    res.sendFile(path.join(__dirname, 'js', 'temperature.js'));
});

app.get('/js/pressure', function (req, res) {
    res.sendFile(path.join(__dirname, 'js', 'pressure.js'));
});

app.get('/js/level', function (req, res) {
    res.sendFile(path.join(__dirname, 'js', 'level.js'));
});

app.get('/js/flow', function (req, res) {
    res.sendFile(path.join(__dirname, 'js', 'flow.js'));
});

app.get('/js/highcharts', function (req, res) {
    res.sendFile(path.join(__dirname, 'js', 'highcharts.js'));
});

app.get('/js/highcharts-more', function (req, res) {
    res.sendFile(path.join(__dirname, 'js', 'highcharts-more.js'));
});

app.get('/js/solid-gauge', function (req, res) {
    res.sendFile(path.join(__dirname, 'js', 'solid-gauge.js'));
});

app.get('/404', function (req, res){
    res.send('<h1 style="text-align: center">ERROR:404 not found</h1>');
});

app.get('/configuration', function (req, res) {
  res.send(mainTemplate(configuration));
});

app.get('/control', function (req, res) {
  res.send(mainTemplate(control));
});

app.get('/about', function (req, res) {
  res.send(mainTemplate(about));
});

app.get('/contact', function (req, res) {
    res.send(mainTemplate(contact));
});

app.get('/feedback', function (req, res) {
    res.send(mainTemplate(feedback));
});

app.get('/img/blockdia', function (req, res) {
    res.sendFile(path.join(__dirname, 'img', 'blockdia.png'));
});

app.get('/img/android-chrome-192x192', function (req, res) {
    res.sendFile(path.join(__dirname, 'img', 'android-chrome-192x192.png'));
});

app.get('/img/android-chrome-512x512', function (req, res) {
    res.sendFile(path.join(__dirname, 'img', 'android-chrome-512x512.png'));
});

app.get('/img/apple-touch-icon', function (req, res) {
  res.sendFile(path.join(__dirname, 'img', 'apple-touch-icon.png'));
});

app.get('/img/favicon-32x32', function (req, res) {
  res.sendFile(path.join(__dirname, 'img', 'favicon-32x32.png'));
});

app.get('/img/favicon-16x16', function (req, res) {
  res.sendFile(path.join(__dirname, 'img', 'favicon-16x16.png'));
});

app.get('/img/safari-pinned-tab', function (req, res) {
    res.sendFile(path.join(__dirname, 'img', 'safari-pinned-tab.svg'));
});

app.get('/img/favicon', function (req, res) {
    res.sendFile(path.join(__dirname, 'img', 'favicon.ico'));
});

app.get('/img/mstile-150x150', function (req, res) {
    res.sendFile(path.join(__dirname, 'img', 'mstile-150x150.png'));
});

var port = 2019;
app.listen(port, function () {
  console.log(`WEB HMI Web app listening on port ${port}!`);
});
