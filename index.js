// https://api.coindesk.com/v1/bpi/historical/close.json?start=2015-08-17&end=2017-08-16
function showResults(json) {
	console.log(json)
  var ctx = $("#bitcoinChart").get(0).getContext("2d");
  var data = generateDataSet(getDates(json), getPrices(json));
  var tempChart = new Chart(ctx).Line(data, { bezierCurve: true, responsive: true, hover: {mode: 'nearest', intersect: true } });
}











function launchBitcoinApp() {

	fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${formatDate(1)}&end=${formatDate()}`, {
		method: 'GET',
	}).then(res => res.json()).then(json => {
		showResults(json);
		oneDayAgo(json);
    oneWeekAgo(json);
		oneMonthAgo(json);
		oneYearAgo(json);
		getCurrentPrice();

	})

}

function getCurrentPrice() {
	fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`, {
		method: 'GET',
	}).then(res => res.json()).then(json => currentPrice(json))
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

function currentPrice(json){
	let price = json.bpi.USD.rate_float
  currentPriceDiv = document.getElementById("current-price")
	currentPriceDiv.innerHTML = price
	priceDifference()
}

function priceDifference() {
	let currentPricePrint = document.getElementById("current-price").innerHTML
	let oneDayAgoPrice = document.getElementById("one-day-ago").innerHTML
	let oneWeekAgoPrice = document.getElementById("one-week-ago").innerHTML
	let oneMonthAgoPrice = document.getElementById("one-month-ago").innerHTML
	let oneYearAgoPrice = document.getElementById("one-year-ago").innerHTML

	document.getElementById("one-day-ago-diff").innerHTML = Number( parseFloat(currentPricePrint) - parseFloat(oneDayAgoPrice)).toFixed(2)

	if (parseFloat(currentPricePrint) - parseFloat(oneDayAgoPrice) > 0) {
		document.getElementById('one-day-ago-pic').src = "./images/green.png"
	} else {
		document.getElementById('one-day-ago-pic').src = "./images/red.png"
	}

	document.getElementById("one-week-ago-diff").innerHTML = Number( parseFloat(currentPricePrint) - parseFloat(oneWeekAgoPrice)).toFixed(2)

	if (parseFloat(currentPricePrint) - parseFloat(oneWeekAgoPrice) > 0) {
		document.getElementById('one-week-ago-pic').src = "./images/green.png"
	} else {
		document.getElementById('one-week-ago-pic').src = "./images/red.png"
	}

	document.getElementById("one-month-ago-diff").innerHTML = Number( parseFloat(currentPricePrint) - parseFloat(oneMonthAgoPrice)).toFixed(2)

	if (parseFloat(currentPricePrint) - parseFloat(oneMonthAgoPrice) > 0) {
		document.getElementById('one-month-ago-pic').src = "./images/green.png"
	} else {
		document.getElementById('one-month-ago-pic').src = "./images/red.png"
	}

	document.getElementById("one-year-ago-diff").innerHTML = Number( parseFloat(currentPricePrint) - parseFloat(oneYearAgoPrice)).toFixed(2)

	if (parseFloat(currentPricePrint) - parseFloat(oneYearAgoPrice) > 0) {
		document.getElementById('one-year-ago-pic').src = "./images/green.png"
	} else {
		document.getElementById('one-year-ago-pic').src = "./images/red.png"
	}

}


function oneDayAgo(json){
	let price = json.bpi[formatDate(0,0,1)]
  oneDayAgoDiv = document.getElementById("one-day-ago")
	oneDayAgoDiv.innerHTML = price
}

function oneWeekAgo(json){
	let price = json.bpi[formatDate(0,0,7)]
  oneWeekAgoDiv = document.getElementById("one-week-ago")
	oneWeekAgoDiv.innerHTML = price
}

function oneMonthAgo(json){
	let price = json.bpi[formatDate(0,1)]
  oneMonthAgoDiv = document.getElementById("one-month-ago")
	oneMonthAgoDiv.innerHTML = price
}

function oneYearAgo(json){
	let price = json.bpi[formatDate(1)]
  oneYearAgoDiv = document.getElementById("one-year-ago")
	oneYearAgoDiv.innerHTML = price
}




jQuery(document).ready(function($) {
	launchBitcoinApp()

	let chartForm = document.getElementById("chart-form")
	chartForm.addEventListener("submit", function(e){
		e.preventDefault()
		let startDate = document.getElementById("start-date-input").value
		let endDate = document.getElementById("end-date-input").value
		fetch(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`, {
			method: 'GET',
		}).then(res => res.json()).then(json => showResults(json))

	})
});
