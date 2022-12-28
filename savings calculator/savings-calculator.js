const dailySpending = 30;
const monthlySalary = 2000;

// Calculate possible daily savings
const dailySavings = monthlySalary / 30 - dailySpending;
console.log(`Daily savings: $${dailySavings}`);

// Calculate possible weekly savings
const weeklySavings = dailySavings * 7;
console.log(`Weekly savings: $${weeklySavings}`);

// Calculate possible monthly savings
const monthlySavings = dailySavings * 30;
console.log(`Monthly savings: $${monthlySavings}`);

// Calculate possible annual savings
const annualSavings = monthlySavings * 12;
console.log(`Annual savings: $${annualSavings}`);

