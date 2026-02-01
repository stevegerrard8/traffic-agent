const ctx = document.getElementById('accidentChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      'Jan','Feb','Mar','Apr','May','Jun',
      'Jul','Aug','Sep','Oct','Nov','Dec'
    ],
    datasets: [{
      label: 'Accidents',
      data: [820, 760, 910, 1020, 1100, 980, 1200, 1300, 1150, 1080, 950, 870],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37,99,235,0.1)',
      fill: true,
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
