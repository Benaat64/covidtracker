










function showCSS() {
    var cssContent = document.getElementById("cssContent");
    cssContent.classList.toggle("show");
}



// Récupérer l'élément du sac et de l'inventaire
var sac = document.getElementById("monSac");
var inventaire = document.getElementById("monInventaire");

// Variable pour suivre l'état de l'inventaire
var inventaireOuvert = false;

// Fonction pour basculer l'affichage de l'inventaire
function toggleInventaire() {
    if (inventaireOuvert) {
        inventaire.style.display = "none";
    } else {
        inventaire.style.display = "block";
    }
    // Inverser l'état de l'inventaire
    inventaireOuvert = !inventaireOuvert;
}

// Ajouter un écouteur d'événements au clic sur le sac
    sac.addEventListener("click", function() {
    // Appeler la fonction pour basculer l'affichage de l'inventaire
    toggleInventaire();

    // Positionner l'inventaire sous le sac
    inventaire.style.top = sac.offsetTop + sac.offsetHeight + "px";
    inventaire.style.left = sac.offsetLeft + "px";
});

// Cacher l'inventaire si l'utilisateur clique en dehors de celui-ci
document.addEventListener("click", function(event) {
    if (event.target !== sac && event.target !== inventaire) {
        inventaire.style.display = "none";
        // Réinitialiser l'état de l'inventaire
        inventaireOuvert = false;
    }
});