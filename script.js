const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const themeBtn = document.getElementById("themeBtn");
const projectsSection = document.getElementById("projects");

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeBtn.textContent = savedTheme === "light" ? "🌙" : "☀️";

themeBtn.addEventListener("click", () => {
  const nextTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", nextTheme);
  localStorage.setItem("theme", nextTheme);
  themeBtn.textContent = nextTheme === "light" ? "🌙" : "☀️";
});

const savedView = localStorage.getItem("projectView") || "business";
projectsSection.dataset.view = savedView;

document.querySelectorAll(".view-btn").forEach((btn) => {
  if (btn.dataset.view === savedView) btn.classList.add("active");

  btn.addEventListener("click", () => {
    projectsSection.dataset.view = btn.dataset.view;
    localStorage.setItem("projectView", btn.dataset.view);
    document.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});
