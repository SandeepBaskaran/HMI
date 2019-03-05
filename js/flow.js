
Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });
  
  Highcharts.chart('flow', {
    chart: {
      type: 'spline',
      animation: Highcharts.svg, // don't animate in old IE
      marginRight: 10,
      events: {
        load: function () {
  
          // set up the updating of the chart each second
          var series = this.series[0];
          setInterval(function () {
            var hmiData;
              var point,
                  y;

              $.ajax({
                      url: 'http://127.0.0.1:2019/getData',
                      type: 'GET',
                      data: {},
                      success: function (data) {
                          hmiData = JSON.parse(data);
                          if (chartSpeed) {
                          point = chartSpeed.series[0].points[0];
                          var x = (new Date()).getTime(),
                          y = parseInt(hmiData['flow']);
                          if (y < 0 || y > 2) {
                          y = point.y - 0.5;
                          }

                  point.update(y);
                }
                      },
                      error: function (xhr, status, error) {
                          //alert('Error: ' + error.message);
                         // alert(status)
                         // alert(error)
                        }
                    });
            /*var x = (new Date()).getTime(), // current time
              y = Math.random();*/
            series.addPoint([x, y], true, true);
          }, 1000);
        }
      }
    },
    title: {
      text: 'Flow'
    },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
    yAxis: {
      title: {
        text: 'Value'
      },
      plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
      }]
    },
    tooltip: {
      formatter: function () {
        return '<b>' + this.series.name + '</b><br/>' +
          Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
          Highcharts.numberFormat(this.y, 2);
      }
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    series: [{
      name: 'Random data',
      data: (function () {
        // generate an array of random data
        var data = [],
          time = (new Date()).getTime(),
          i;
  
        for (i = -19; i <= 0; i += 1) {
          data.push({
            x: time + i * 1000,
            y: Math.random()
          });
        }
        return data;
      }())
    }]
  });