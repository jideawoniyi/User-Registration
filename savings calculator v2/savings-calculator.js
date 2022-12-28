const calculateButton = document.getElementById("calculate");
calculateButton.addEventListener("click", calculateSavings);

function calculateSavings() {
  const dailySpending = document.getElementById("daily-spending").value;
  const monthlySalary = document.getElementById("monthly-salary").value;

  // Calculate possible daily savings
  const dailySavings = monthlySalary / 30 - dailySpending;
  document.getElementById("daily-savings").textContent = dailySavings.toFixed(2);

  // Calculate possible weekly savings
  const weeklySavings = dailySavings * 7;
  document.getElementById("weekly-savings").textContent = weeklySavings.toFixed(2);

  // Calculate possible monthly savings
  const monthlySavings = dailySavings * 30;
  document.getElementById("monthly-savings").textContent = monthlySavings.toFixed(2);

  // Calculate possible annual savings
  const annualSavings = monthlySavings * 12;
  document.getElementById("annual-savings").textContent = annualSavings.toFixed(2);
}
