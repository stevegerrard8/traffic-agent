function login() {
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app-screen").classList.remove("hidden");
  loadChart();
}

function logout() {
  document.getElementById("app-screen").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
}

function loadChart() {
  const ctx = document.getElementById("accidentChart");
  if (!ctx) return;

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        data: [820,760,910,1020,1100,980,1200,1300,1150,1080,950,870],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.15)",
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      responsive: true
    }
  });
}
