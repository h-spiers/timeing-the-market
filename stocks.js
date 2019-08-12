function add_new_market_value() {
    var prevValue = dailyValues[dailyValues.length - 1];
    var marketGainOrLoss = (Math.random() * (0.01));
    var diceRoll = Math.random();
    if (diceRoll > 0.51) { //biased 2% towards increasing in value to try and replicate real market performance
        console.log(prevValue * (1 - marketGainOrLoss))
        var marketChange = 1 - marketGainOrLoss;
    }
    else {
        var marketChange = 1 + marketGainOrLoss;
    }
    dailyValues.push(Math.floor(prevValue * marketChange));
    document.getElementById('investmentValueLabel').innerHTML = 'Investment value: ' + prevValue;
    if (playerInMarket == true) {
        investmentValue = investmentValue * marketChange;
    }
}

function startStop() {
    var btn = document.getElementById('start_stop');
    if (btn.value == "Start") {
        btn.value = "Stop";
        gameRunning = true;
    }
    else {
        btn.value = "Start";
        gameRunning = false;
    }
}

function buy() {
    playerInMarket = true;
}
function sell() {
    playerInMarket = false;
}

var daysElapsed = 1;
var dailyValues = [10000];
var investmentValue = 10000;
var gameRunning = false;
var playerInMarket = false;
var canvas = document.getElementById('stockChart');

var data = {
    labels: [1, 2, 3, 4, 5],
    datasets: [{
        data: dailyValues,
        fill: false,
        backgroundColor: 'rgba(208, 73, 73, 1)',
        borderColor: 'rgba(208, 73, 73, 1)'
    }]
};

var options = {
    legend: { display: false },
    elements: {
        line: { tension: 0 },
        point: { radius: 0 }
    }, //removes bezier smoothing
    responsive: true,
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Days elapsed'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Value'
            }
        }]
    }
};

var chart = new Chart(canvas, {
    type: 'line',
    data: data,
    options: options
});

setInterval(function () {
    if (gameRunning) {
        daysElapsed++;
        add_new_market_value();
        chart.data.labels.push(daysElapsed);
        chart.update();
    }
}, 200)