
var gaugeOptions = {

  chart: {
    type: 'solidgauge'
  },

  title: null,

  pane: {
    center: ['50%', '85%'],
    size: '100%',
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
      innerRadius: '60%',
      outerRadius: '100%',
      shape: 'arc'
    }
  },

  tooltip: {
    enabled: false
  },

  // the value axis
  yAxis: {
    stops: [
      [0.1, '#55BF3B'], // green
      [0.5, '#DDDF0D'], // yellow
      [0.9, '#DF5353'] // red
    ],
    lineWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    title: {
      y: -70
    },
    labels: {
      y: 16
    }
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        y: 5,
        borderWidth: 0,
        useHTML: true
      }
    }
  }
};

// The speed gauge
var levelChart = Highcharts.chart('level', Highcharts.merge(gaugeOptions, {
  
  title: {
      text: 'Level'
    },

  yAxis: {
    min: 0,
    max: 200,
  },

  credits: {
    enabled: false
  },

  series: [{
    data: [0],
    dataLabels: {
      format: '<div style="text-align:center"><span style="font-size:25px;color:' +
        ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
           '<span style="font-size:12px;color:silver">Metre</span></div>'
    },
    tooltip: {
      valueSuffix: ' Metre'
    }
  }]

}));



// Bring life to the dials
setInterval(function () {

var hmiData;
// Speed
  var point,
    newVal;

$.ajax({
        url: 'http://192.168.1.7:2019/getData',
        type: 'GET',
        data: {},
        success: function (data) {
            hmiData = JSON.parse(data);
            if (levelChart) {
            point = levelChart.series[0].points[0];
            console.log(hmiData['level']);
            newVal = parseInt(hmiData['level']);
            if (newVal < 0 || newVal > 200) {
            newVal = point.y - 10;
            }

    point.update(newVal);
  }
        },
        error: function (xhr, status, error) {
            //alert('Error: ' + error.message);
           // alert(status)
           // alert(error)
          }
      });

}, 1000);


