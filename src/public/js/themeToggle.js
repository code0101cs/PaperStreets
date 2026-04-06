const themeToggle = document.getElementById("themeToggle");
const body = document.body;

function updateButtonText(theme) {
  if (!themeToggle) return;
  themeToggle.textContent =
    theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
}

const currentTheme = localStorage.getItem("theme") || "dark";
body.classList.remove("light", "dark");
body.classList.add(currentTheme);
updateButtonText(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const newTheme = body.classList.contains("dark") ? "light" : "dark";
    body.classList.remove("light", "dark");
    body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    updateButtonText(newTheme);
  });
}