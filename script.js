const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const themeBtn = document.getElementById("themeBtn");
const profileMenuBtn = document.getElementById("profileMenuBtn");
const profileDropdown = document.getElementById("profileDropdown");
const yearEl = document.getElementById("year");

function collapseProjectDetail(detail) {
  detail.classList.remove("is-open");
  detail.setAttribute("aria-hidden", "true");
}

function expandProjectDetail(detail) {
  detail.classList.add("is-open");
  detail.setAttribute("aria-hidden", "false");
}

function setReadMoreButton(btn, isOpen) {
  btn.textContent = isOpen ? "Read Less" : "Read More";
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function resetReadMoreInProject(project) {
  project.querySelectorAll(".project-detail").forEach((detail) => {
    collapseProjectDetail(detail);
  });

  project.querySelectorAll(".read-more-btn").forEach((btn) => {
    setReadMoreButton(btn, false);
  });
}

function setProjectView(project, view) {
  project.dataset.view = view;

  project.querySelectorAll(".view-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
}

function setThemeButtonLabel(theme) {
  if (!themeBtn) return;
  themeBtn.textContent = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
}

function closeProfileDropdown() {
  if (!profileDropdown || !profileMenuBtn) return;
  profileDropdown.hidden = true;
  profileMenuBtn.setAttribute("aria-expanded", "false");
}

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
}

if (nav) {
  document.querySelectorAll("#nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      closeProfileDropdown();
    });
  });
}

if (profileMenuBtn && profileDropdown) {
  profileMenuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = profileDropdown.hidden;
    profileDropdown.hidden = !isOpen;
    profileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".profile-menu")) {
      closeProfileDropdown();
    }
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (themeBtn) {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  setThemeButtonLabel(savedTheme);

  themeBtn.addEventListener("click", () => {
    const nextTheme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setThemeButtonLabel(nextTheme);
  });
}

document.querySelectorAll(".project").forEach((project) => {
  const projectId = project.dataset.projectId || "project";
  const storageKey = `projectView:${projectId}`;
  const savedView = localStorage.getItem(storageKey) || "business";

  setProjectView(project, savedView);
  resetReadMoreInProject(project);

  project.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      setProjectView(project, view);
      localStorage.setItem(storageKey, view);
      resetReadMoreInProject(project);
    });
  });
});

document.addEventListener("click", (event) => {
  const btn = event.target.closest(".read-more-btn");
  if (!btn) return;

  event.preventDefault();
  event.stopPropagation();

  const detailId = btn.dataset.detail;
  const detail = detailId ? document.getElementById(detailId) : btn.closest(".project-view")?.querySelector(".project-detail");
  if (!detail) return;

  const isOpen = detail.classList.contains("is-open");

  if (isOpen) {
    collapseProjectDetail(detail);
    setReadMoreButton(btn, false);
  } else {
    expandProjectDetail(detail);
    setReadMoreButton(btn, true);
  }
});
