const ctx = document.getElementById("accidentChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["2019","2020","2021","2022","2023","2024"],
    datasets: [{
      label: "Total Accidents",
      data: [152000, 141000, 136000, 129000, 126000, 124532],
      borderWidth: 2,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  }
});
