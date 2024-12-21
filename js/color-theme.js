// Sélection des éléments
const body = document.body;
const themeSwitch = document.getElementById("theme-switch");
const sunIcon = document.getElementById("moon-icon");
const moonIcon = document.getElementById("sun-icon");

// État initial : Mode sombre
let isDarkTheme = true;

// Afficher l'état initial
moonIcon.classList.add("active");

// Écouteur d'événement pour le changement de thème
themeSwitch.addEventListener("click", () => {
    if (isDarkTheme) {
        // Mode clair
        body.style.setProperty("--background-color", "#FFFFFF");

        // Icônes : afficher soleil
        moonIcon.classList.remove("active");
        sunIcon.classList.add("active");
    } else {
        // Mode sombre
        body.style.setProperty("--background-color", "#000000");

        // Icônes : afficher lune
        sunIcon.classList.remove("active");
        moonIcon.classList.add("active");
    }

    // Inverse l'état
    isDarkTheme = !isDarkTheme;
});