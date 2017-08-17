// https://api.coindesk.com/v1/bpi/historical/close.json?start=2015-08-17&end=2017-08-16
function showResults(json) {
	console.log(json)
  var ctx = $("#bitcoinChart").get(0).getContext("2d");
  var data = generateDataSet(getDates(json), getPrices(json));
  var tempChart = new Chart(ctx).Line(data, { bezierCurve: true, responsive: true  });
}


function launchBitcoinApp() {

	fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${formatDate(1)}&end=${formatDate()}`, {
		method: 'GET',
	}).then(res => res.json()).then(json => {
		showResults(json);
		oneDayAgo(json)
    
	})

}


function getDates(json){
  return Object.keys(json.bpi).filter(date => date.slice(-2) == "01")
}

function getPrices(json){
  return getDates(json).map(date => json.bpi[date])
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


function formatDate(y = 0, m = 0, d = 0) {
    var today = new Date,
        month = '' + (today.getMonth() + 1 - m),
        day = '' + (today.getDate() - d),
        year = (today.getFullYear() - y);

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


function oneDayAgo(json){
	let price = json.bpi[formatDate(0,0,1)]	
  oneDayAgoDiv = document.getElementById("one-day-ago")
	oneDayAgoDiv.innerHTML = price

	// let price = json.bpi[formatDate(0,0,7)]	
 //  oneDayAgoDiv = document.getElementById("one-week-ago")
	// oneDayAgoDiv.innerHTML = price

	// let price = json.bpi[formatDate(0,0,1)]	
 //  oneDayAgoDiv = document.getElementById("one-day-ago")
	// oneDayAgoDiv.innerHTML = price
}




jQuery(document).ready(function($) {

});