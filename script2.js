// Récupérer les éléments
const openPopup = document.getElementById("openPopup");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

if (openPopup && popup && closePopup) {
    openPopup.onclick = function() {
        popup.style.display = "flex";
    };

    closePopup.onclick = function() {
        popup.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    };
}
