var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var about = {
    title : 'HMI | About',
    heading : 'About',
    content : '<h1 class="center" >Nothing Much</h1>',
};

var contact = {
    title : 'HMI | Contact',
    heading : 'Contact',
    content : '<h1 class="center" >Soon we will be updating this section</h1>',
};

var feedback = {
    title : 'HMI | Feedback',
    heading : 'Feedback',
    content : '<h1 class="center" >Hey, there! I told you this is a prototype!!!</h1>',
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
                <nav class="w3-sidebar w3-bar-block w3-white w3-animate-left w3-text-grey w3-collapse w3-top w3-center" style="z-index:3;width:300px;font-weight:bold" id="mySidebar"><br>
                <a href="/" onclick="w3_close()" class="w3-bar-item w3-button"><h3 class="w3-padding-64 w3-center"><b> HMI </b></h3></a>

                <a href="about" onclick="w3_close()" class="w3-bar-item w3-button">About</a> 
                <a href="contact" onclick="w3_close()" class="w3-bar-item w3-button">Contact</a> 
                <a href="feedback" onclick="w3_close()" class="w3-bar-item w3-button">Feedback</a>
                <br/>
                <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-padding w3-hide-large">CLOSE</a>
                </nav>

                <!-- Top menu on small screens -->
                <header class="w3-container w3-top w3-hide-large w3-white w3-xlarge w3-padding-16 w3-center">
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
                <div class="w3-row w3-xlarge">
                    ${content}
                </div>
                
                <!-- End page content -->
                </div>

                <footer class="w3-bottom w3-hide-large w3-white w3-xlarge ">
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

                </body>
                </html> 
            `;
            return htmlTemplate;
}

var flow = {
    title : 'HMI | Flow',
    heading : 'Flow',
    parameter : 'flow',
};

var level = {
    title : 'HMI | Level',
    heading : 'Level',
    parameter : 'level',
};

var pressure = {
    title : 'HMI | Pressure',
    heading : 'Pressure',
    parameter : 'pressure',
}

var temperature = {
    title : 'HMI | Temperature',
    heading : 'Temperature',
    parameter : 'temperature',
}

function appTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var parameter = data.parameter;
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
                <nav class="w3-sidebar w3-bar-block w3-white w3-animate-left w3-text-grey w3-collapse w3-top w3-center" style="z-index:3;width:300px;font-weight:bold" id="mySidebar"><br>
                  <a href="/" onclick="w3_close()" class="w3-bar-item w3-button"><h3 class="w3-padding-64 w3-center"><b> HMI </b></h3></a>
                  
                  <a href="pressure" onclick="w3_close()" class="w3-bar-item w3-button">Pressure</a> 
                  <a href="flow" onclick="w3_close()" class="w3-bar-item w3-button">Flow</a> 
                  <a href="level" onclick="w3_close()" class="w3-bar-item w3-button">Level</a>
                  <a href="temperature" onclick="w3_close()" class="w3-bar-item w3-button">Temperature</a>
                  <br/>
                  <a href="javascript:void(0)" onclick="w3_close()" class="w3-bar-item w3-button w3-padding w3-hide-large">CLOSE</a>
                </nav>

                <!-- Top menu on small screens -->
                <header class="w3-container w3-top w3-hide-large w3-white w3-xlarge w3-padding-16 w3-center">
                  <span class="w3-left w3-padding"> ${heading}</span>
                  <a href="javascript:void(0)" class="w3-right w3-button w3-white" onclick="w3_open()">☰</a>
                </header>

                <!-- Overl ay effect when opening sidebar on small screens -->
                <div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style="cursor:pointer" title="close side menu" id="myOverlay"></div>

                <!-- !PAGE CONTENT! -->
                <div class="w3-main" style="margin-left:300px">

                  <!-- Push down content on small screens --> 
                  <div class="w3-hide-large" style="margin-top:83px"></div>
                  
                  <!-- Panel -->
                  <div class="container-fluid">
                    <div id="${parameter}" class="center" style="width: 100%; height: 350px;"></div>
                  </div>

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

                <footer class="w3-bottom w3-white w3-xlarge ">
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

                <script src="js/highcharts"></script>
                <script src="js/highcharts-more"></script>
                <script src="js/solid-gauge"></script>

                <script src="js/${parameter}"></script>

                </body>
                </html>

            `;
            return htmlTemplate;
}

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

app.get('/about', function (req, res) {
  res.send(mainTemplate(about));
});

app.get('/contact', function (req, res) {
    res.send(mainTemplate(contact));
});

app.get('/feedback', function (req, res) {
    res.send(mainTemplate(feedback));
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

var port = 2018;
app.listen(port, function () {
  console.log(`HMI Web app listening on port ${port}!`);
});