const textElement1 = document.getElementById('text');
const textElement2 = document.getElementById('text2');
const formUsername = document.querySelector('.formconnexion__username');
const formPassword = document.querySelector('.formconnexion__password');
const formButton = document.querySelector('.formconnexion__button');

const textToDisplay1 = "VOTRE HISTOIRE"; // Premier texte à afficher
const textToDisplay2 = "CONNECTEZ-VOUS"; // Deuxième texte à afficher

let index1 = 0;
let index2 = 0;

function displayLetterByLetter1() {
    if (index1 < textToDisplay1.length) {
        textElement1.textContent += textToDisplay1[index1];
        index1++;
        setTimeout(displayLetterByLetter1, 100); // Délai de 100 millisecondes entre chaque lettre
    }
}

function displayLetterByLetter2() {
    if (index2 < textToDisplay2.length) {
        textElement2.textContent += textToDisplay2[index2];
        index2++;
        setTimeout(displayLetterByLetter2, 100); // Délai de 100 millisecondes entre chaque lettre
    } else {
        // Une fois que le texte 2 est entièrement affiché, appeler la fonction pour faire apparaître l'élément username
        setTimeout(displayFormUsername, 500); // Délai de 1 seconde après l'affichage du texte 2
    }
}

function displayFormUsername() {
    // Afficher l'élément username
    formUsername.style.opacity = '1'; 

    // Une fois que l'élément username est entièrement affiché, appeler la fonction pour faire apparaître l'élément password
    setTimeout(displayFormPassword, 700); // Délai de 1 seconde après l'affichage de l'élément username
}

function displayFormPassword() {
    // Afficher l'élément password
    formPassword.style.opacity = '1';
    setTimeout(displayFormButton, 700);
    
    
    
}

function displayFormButton() {
    formButton.style.visibility='visible';
    
    
    console.log(formButton);
}





displayLetterByLetter1(); // Démarre l'affichage du premier texte

setTimeout(() => {
    displayLetterByLetter2(); // Démarre l'affichage du deuxième texte
}, 1500); // Attendre 1500 millisecondes avant de démarrer le deuxième texte


