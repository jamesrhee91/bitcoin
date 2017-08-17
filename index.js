// https://api.coindesk.com/v1/bpi/historical/close.json?start=2015-08-17&end=2017-08-16

function showResults(json) {
	console.log(json)
  var ctx = $("#bitcoinChart").get(0).getContext("2d");
  var data = generateDataSet(getDates(json), getPrices(json));
  var tempChart = new Chart(ctx).Line(data, { bezierCurve: true, responsive: true  });
}

function launchBitcoinApp() {

	fetch('https://api.coindesk.com/v1/bpi/historical/close.json?start=2016-07-17&end=2017-08-16', {
		method: 'GET',
	}).then(res => res.json()).then(json => showResults(json))
}

function getDates(json){
  return Object.keys(json.bpi)
}

function getPrices(json){
  return Object.values(json.bpi)
}

function generateDataSet(labels, data) {
  return {
    labels: labels,
    datasets: [
      {
        label : 'Bitcoin Price',fillColor : 'rgba(220,220,220,0.2)', strokeColor : 'rgba(220,220,220,1)', pointColor : 'rgba(220,220,220,1)', pointStrokeColor : '#fff', pointHighlightFill : '#fff', pointHighlightStroke : 'rgba(220,220,220,1)', 
        data: data
      }
    ]
  }
}

jQuery(document).ready(function($) {

});