function demoLogin() {
  window.location.href = "dashboard.html";
}

function logout() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
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
});
