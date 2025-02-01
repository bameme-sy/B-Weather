// Récupérer les éléments
const openPopup = document.getElementById("openPopup");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

// Ouvrir la pop-up
openPopup.onclick = function() {
    popup.style.display = "flex";
};

// Fermer la pop-up
closePopup.onclick = function() {
    popup.style.display = "none";
};

// Fermer la pop-up si on clique en dehors de la fenêtre
window.onclick = function(event) {
    if (event.target === popup) {
        popup.style.display = "none";
    }
};
