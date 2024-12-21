const themeSwitch = document.getElementById("theme-switch");
const sunIcon = document.getElementById("moon-icon");
const moonIcon = document.getElementById("sun-icon");

// État initial : Mode sombre
let isDarkTheme = localStorage.getItem('isDarkTheme');
if (isDarkTheme === null) {
    isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    localStorage.setItem('isDarkTheme', isDarkTheme);
} else {
    isDarkTheme = isDarkTheme === 'true';
}

if (isDarkTheme) {
    moonIcon.classList.add("active");
    document.documentElement.style.setProperty("--background-color", "#000000");
} else {
    sunIcon.classList.add("active");
    document.documentElement.style.setProperty("--background-color", "#FFFFFF");
}

// Écouteur d'événement pour le changement de thème
themeSwitch.addEventListener("click", () => {
    // Toggle the theme state
isDarkTheme = !isDarkTheme;
localStorage.setItem('isDarkTheme', isDarkTheme);

    // Update the background color
    document.documentElement.style.setProperty(
        "--background-color",
        isDarkTheme ? "#000000" : "#FFFFFF"
    );

    // Update icons
    if (isDarkTheme) {
        sunIcon.classList.remove("active");
        moonIcon.classList.add("active");
    } else {
        moonIcon.classList.remove("active");
        sunIcon.classList.add("active");
    }

    // Update the gradient theme by dispatching a custom event
    const themeChangeEvent = new CustomEvent('themeChange', {
        detail: { isDarkTheme: isDarkTheme }
    });
    document.dispatchEvent(themeChangeEvent);
});