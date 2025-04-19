// Store goal values & progress chart globally
let progressChart;
let bmiChart;

// Initialize dummy data (can be extended to localStorage later)
const defaultGoals = {
  steps: 10000,
  water: 3,
  sleep: 8
};

// Function to update chart with user inputs
function updateProgress() {
  const steps = parseInt(document.getElementById("steps").value);
  const water = parseFloat(document.getElementById("water").value);
  const sleep = parseFloat(document.getElementById("sleep").value);

  const stepGoal = parseInt(document.getElementById("stepGoal").value);
  const waterGoal = parseFloat(document.getElementById("waterGoal").value);
  const sleepGoal = parseFloat(document.getElementById("sleepGoal").value);

  const data = [steps, water, sleep];
  const goals = [stepGoal, waterGoal, sleepGoal];

  const percentage = [
    (steps / stepGoal) * 100,
    (water / waterGoal) * 100,
    (sleep / sleepGoal) * 100,
  ];

  if (progressChart) progressChart.destroy();

  const ctx = document.getElementById("progressChart").getContext("2d");
  progressChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Steps', 'Water (L)', 'Sleep (Hrs)'],
      datasets: [{
        label: 'Progress (%)',
        data: percentage.map(val => Math.min(val, 100)), // Cap at 100%
        backgroundColor: ['#00b4d8', '#90e0ef', '#0077b6'],
        borderRadius: 8,
      }]
    },
    options: {
      scales: {
        y: {
          max: 120,
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

// Function to calculate BMI
function calculateBMI() {
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const bmiLabel = document.getElementById("bmi-label");

  if (!height || !weight || height <= 0 || weight <= 0) {
    alert("Please enter valid height and weight.");
    return;
  }

  const heightInMeters = height / 100;
  const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  let status = "";
  let color = "#48cae4";

  if (bmi < 18.5) {
    status = "Underweight";
    color = "#f94144";
  } else if (bmi >= 18.5 && bmi < 25) {
    status = "Normal";
    color = "#43aa8b";
  } else if (bmi >= 25 && bmi < 30) {
    status = "Overweight";
    color = "#f9844a";
  } else {
    status = "Obese";
    color = "#f3722c";
  }

  bmiLabel.innerText = `Your BMI: ${bmi} (${status})`;

  if (bmiChart) bmiChart.destroy();

  const ctx = document.getElementById("bmiChart").getContext("2d");
  bmiChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [bmi, 40 - bmi],
        backgroundColor: [color, "#e0e0e0"],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '80%',
      rotation: -90,
      circumference: 180,
      plugins: {
        doughnutlabel: {
          labels: [
            {
              text: bmi,
              font: {
                size: '28'
              }
            },
            {
              text: status,
              font: {
                size: '16'
              }
            }
          ]
        },
        tooltip: { enabled: false },
        legend: { display: false }
      }
    }
  });
}
