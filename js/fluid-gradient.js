// Variables pour stocker la position actuelle et la position cible des gradients
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;

// Ajustez ce facteur pour rendre le mouvement plus fluide
const dampingFactor = 0.1;

// Créer une texture de grainy noise
const grainyNoise = document.createElement("canvas");
grainyNoise.style.position = "fixed";
grainyNoise.style.top = 0;
grainyNoise.style.left = 0;
grainyNoise.style.width = "200%";
grainyNoise.style.height = "200%";
grainyNoise.style.pointerEvents = "none"; // Ignorer les clics
grainyNoise.classList.add('exclude-noise');
grainyNoise.style.zIndex = "-1"; // Place noise behind other elements
grainyNoise.style.mixBlendMode = "overlay"; // Mélange le bruit avec les gradients
grainyNoise.style.opacity = "0.25"; // Ajustez l'opacité pour plus ou moins de bruit
document.body.appendChild(grainyNoise);
document.querySelectorAll('.social-buttons').forEach(button => {
    button.classList.add('exclude-noise');
});

const grainyCtx = grainyNoise.getContext("2d");
grainyNoise.width = window.innerWidth;
grainyNoise.height = window.innerHeight;

// Fonction pour générer une texture bruitée
function generateNoise() {
    const excludedElements = Array.from(document.querySelectorAll('.exclude-noise'));
    const imageData = grainyCtx.createImageData(grainyNoise.width, grainyNoise.height);
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const value = Math.random() * 255; // Valeur aléatoire pour chaque pixel
        pixels[i] = value;     // Rouge
        pixels[i + 1] = value; // Vert
        pixels[i + 2] = value; // Bleu
        pixels[i + 3] = Math.random() * 150 + 100; // Augmenter l'opacité
    }

    // Ajouter des particules blanches
    for (let i = 0; i < 500; i++) { // Petites particules blanches
        const x = Math.floor(Math.random() * grainyNoise.width);
        const y = Math.floor(Math.random() * grainyNoise.height);
        const size = Math.random() * 2 + 1; // Taille aléatoire entre 1 et 3
        const index = (y * grainyNoise.width + x) * 4;
        pixels[index] = 255;     // Rouge
        pixels[index + 1] = 255; // Vert
        pixels[index + 2] = 255; // Bleu
        pixels[index + 3] = Math.random() * 100 + 155; // Augmenter l'opacité des particules
        for (let dx = -size; dx <= size; dx++) {
            for (let dy = -size; dy <= size; dy++) {
                const newIndex = ((y + dy) * grainyNoise.width + (x + dx)) * 4;
                if (newIndex >= 0 && newIndex < pixels.length) {
                    pixels[newIndex] = 255; // Rouge
                    pixels[newIndex + 1] = 255; // Vert
                    pixels[newIndex + 2] = 255; // Bleu
                    pixels[newIndex + 3] = Math.random() * 100 + 155; // Opacité
                }
            }
        }
    }

    // Ajouter des grosses particules blanches
    for (let i = 0; i < 100; i++) { // Moins nombreuses mais plus grandes
        const x = Math.floor(Math.random() * grainyNoise.width);
        const y = Math.floor(Math.random() * grainyNoise.height);
        const size = Math.random() * 6 + 4; // Taille aléatoire entre 4 et 10
        for (let dx = -size; dx <= size; dx++) {
            for (let dy = -size; dy <= size; dy++) {
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance <= size) {
                    const newIndex = ((y + dy) * grainyNoise.width + (x + dx)) * 4;
                    if (newIndex >= 0 && newIndex < pixels.length) {
                        pixels[newIndex] = 255; // Rouge
                        pixels[newIndex + 1] = 255; // Vert
                        pixels[newIndex + 2] = 255; // Bleu
                        pixels[newIndex + 3] = Math.random() * 100 + 200; // Opacité
                    }
                }
            }
        }
    }
        const x = Math.floor(Math.random() * grainyNoise.width);
        const y = Math.floor(Math.random() * grainyNoise.height);
        const size = Math.random() * 2 + 1; // Taille aléatoire entre 1 et 3
        const index = (y * grainyNoise.width + x) * 4;
        pixels[index] = 255;     // Rouge
        pixels[index + 1] = 255; // Vert
        pixels[index + 2] = 255; // Bleu
        pixels[index + 3] = Math.random() * 100 + 155; // Augmenter l'opacité des particules
        for (let dx = -size; dx <= size; dx++) {
            for (let dy = -size; dy <= size; dy++) {
                const newIndex = ((y + dy) * grainyNoise.width + (x + dx)) * 4;
                if (newIndex >= 0 && newIndex < pixels.length) {
                    pixels[newIndex] = 255; // Rouge
                    pixels[newIndex + 1] = 255; // Vert
                    pixels[newIndex + 2] = 255; // Bleu
                    pixels[newIndex + 3] = Math.random() * 100 + 155; // Opacité
                }
            }
        }


excludedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    grainyCtx.clearRect(
        rect.left,
        rect.top,
        rect.width,
        rect.height
    );
});
    grainyCtx.putImageData(imageData, 0, 0);
}
// Appelle la génération de bruit plusieurs fois pour renouveler
function animateNoise() {
    generateNoise();
    requestAnimationFrame(animateNoise);
}


// Écouteur de mouvement pour le curseur
document.addEventListener("mousemove", (event) => {
    const { clientX: x, clientY: y } = event;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Mettre à jour les cibles des coordonnées
    targetX = (x / width) * 100; // Coordonnée X en pourcentage
    targetY = (y / height) * 100; // Coordonnée Y en pourcentage
});

// Fonction pour animer le mouvement des gradients
function animateGradients() {
    // Interpolation fluide pour atteindre la position cible
    currentX += (targetX - currentX) * dampingFactor;
    currentY += (targetY - currentY) * dampingFactor;

    // Appliquer les gradients de manière dynamique
document.body.style.backgroundImage = `
    radial-gradient(circle at ${currentX}% ${currentY}%, 
    hsla(0, 100%, 50%, 0.8) 0%, transparent 50%),
    radial-gradient(circle at ${currentX - 10}% ${currentY - 10}%, 
    hsla(245, 100%, 56%, 0.6) 10%, transparent 60%),
    radial-gradient(circle at ${currentX + 15}% ${currentY + 15}%, 
    hsla(0, 100%, 64%, 0.5) 20%, transparent 70%),
    radial-gradient(circle at ${currentX - 20}% ${currentY + 20}%, 
    #0014f0 30%, transparent 80%),
    radial-gradient(circle at ${currentX + 20}% ${currentY - 20}%, 
    hsla(26, 93%, 45%, 0.6) 40%, transparent 90%)
`;

    // Répéter l'animation
    requestAnimationFrame(animateGradients);
}


// Lancer les animations
animateNoise();
animateGradients();
