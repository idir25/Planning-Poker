document.getElementById("suivant1").addEventListener("click", afficherPseudos);
document.getElementById("suivant2").addEventListener("click", afficherModeJeu);
document.getElementById("commencerJeu").addEventListener("click", commencerJeu);
var showPseudos = document.getElementById("choixPseudos");
var showMode = document.getElementById("choixModeJeu");


function redirectToAcceuil2() {
    window.location.href = 'C:/Users/yidir/Desktop/dd/acceuil2.html';
}

function afficherPseudos() {
    var nbrJoueurs = document.getElementById("nbrJoueurs").value;
    var champsPseudos = document.getElementById("champsPseudos");
    


    // Vérifie que le nombre de joueurs est valide
    if (nbrJoueurs >= 3 && nbrJoueurs <= 12) {
        // Efface le contenu précédent
        champsPseudos.innerHTML = '';

        // Génère les champs de saisie pour les pseudos
        for (var i = 1; i <= nbrJoueurs; i++) {
            champsPseudos.innerHTML += `Joueur ${i}: <input type="text" name="pseudos[]"><br>`;
        }

        // Affiche la section des pseudos
        showPseudos.style.visibility = "visible";
        showPseudos.classList.add("show");
        showPseudos.style.opacity="1";

    } else {
        alert("Veuillez choisir un nombre de joueurs entre 3 et 12.");
    }
}

// Fonction pour afficher la section du mode de jeu
function afficherModeJeu() {
    // Vérifie que tous les champs de pseudos sont remplis
    var pseudosInputs = document.querySelectorAll('input[name="pseudos[]"]');
    var tousRemplis = true;

    for (var i = 0; i < pseudosInputs.length; i++) {
        if (pseudosInputs[i].value.trim() === "") {
            tousRemplis = false;
            break; // Pas besoin de continuer la vérification si un champ est vide
        }
    }

    if (tousRemplis) {

        showMode.style.visibility = "visible";
        showMode.classList.add("show");
        showMode.style.opacity="1";
        
    } else {
        alert("Veuillez remplir tous les champs de pseudos.");
    }
}

function commencerJeu() {
    alert("Le jeu commence!");
}

var slide = document.getElementById("nbrJoueurs");
var out = document.getElementById("value");

 out.innerHTML=slide.value;
 slide.oninput=function(){
   out.innerHTML=this.value;
};
