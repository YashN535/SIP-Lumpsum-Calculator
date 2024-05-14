function calculate() {
  var amount = parseFloat(document.getElementById("amount").value);
  var rate = parseFloat(document.getElementById("rate").value);
  var time = parseFloat(document.getElementById("time").value);
  var type = document.querySelector(
    'input[name="investmentType"]:checked'
  ).value;
  var resultDiv = document.getElementById("result");
  var totalInvestment = 0;
  var interestEarned = 0;
  var maturityAmount = 0;

  if (type === "sip") {
    for (var i = 0; i < time; i++) {
      totalInvestment += amount * 12;
      interestEarned += (amount * 12 * rate) / 100;
    }
    maturityAmount = totalInvestment + interestEarned;
  } else if (type === "lumpsum") {
    totalInvestment = amount;
    interestEarned = (amount * rate * time) / 100;
    maturityAmount = totalInvestment + interestEarned;
  }

  resultDiv.innerHTML =
    "<b>Total Investment:</b> ₹" +
    totalInvestment.toFixed(2) +
    "<br>" +
    "<strong>Interest Earned:</strong> ₹" +
    interestEarned.toFixed(2) +
    "<br>" +
    "<strong>Maturity Amount:</strong> ₹" +
    maturityAmount.toFixed(2);

  // Chart data
  var chartData = {
    labels: ["Total Investment", "Interest Earned"],
    datasets: [
      {
        label: "Amount",
        data: [totalInvestment, interestEarned],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  var chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  // Get the canvas element
  var ctx = document.getElementById("myChart").getContext("2d");

  // Create the chart
  new Chart(ctx, {
    type: "doughnut",
    data: chartData,
    options: chartOptions,
  });
}
