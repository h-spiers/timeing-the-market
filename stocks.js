var playerInMarket = false;

function add_new_market_value() {
    var prevValue = dailyValues[dailyValues.length - 1];
    var marketGainOrLoss = (Math.random() * (0.01)); //determines percentage market change
    var diceRoll = Math.random();
    if (diceRoll > 0.51) { //biased 2% towards increasing in value to try and replicate real market performance
        //console.log(prevValue * (1 - marketGainOrLoss))
        var marketChange = 1 - marketGainOrLoss; //market loses value
    }
    else {
        var marketChange = 1 + marketGainOrLoss; //market gains value
    }
    dailyValues.push(Math.floor(prevValue * marketChange)); //adds new market value to graph
    if (playerInMarket == true) { //SHOULD only change investment value if player hasn't sold
        investmentValue = investmentValue * marketChange;
    }
    document.getElementById('investmentValueLabel').innerHTML = 'Investment value: ' + investmentValue.toFixed(2);
}

function startStop() { //starts and stops simulation
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

function buy() { //SHOULD make investment value stop changing
    playerInMarket = true;
    investmentValue = investmentValue - 12.5 //simulates broker fees
}
function sell() { //SHOULD resume investment value changing
    playerInMarket = false;
    investmentValue = investmentValue - 12.5 //simulates broker fees
}

var daysElapsed = 1;
var dailyValues = [10000];
var investmentValue = 10000;
var gameRunning = false;
var marketChange = 0;
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

// chart configuration
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

var chart = new Chart(canvas, { //spawns graph
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
        console.log(playerInMarket)
    }
}, 200) //if game running, update market every 0.2 seconds
