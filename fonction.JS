// gestion des effets sonores : 
const audio = new Audio("select.mp3");

const son = () => {
  const audio = new Audio();
  audio.src = "./enter.mp3";
  audio.play();
};

/*
// On vérifie si la page est "accueil2.html" :
if (window.location.href.indexOf("accueil2.html") > -1){
    document.getElementById("reprendre").addEventListener("click", chargerPartie);
}
*/


// On vérifie si la page est "initilisation.html" :
if (window.location.href.indexOf("initiallisation.html") > -1) {
	document.getElementById("suivant1").addEventListener("click", afficherPseudos);
	document.getElementById("suivant2").addEventListener("click", afficherNbrFonction);
    document.getElementById("suivant3").addEventListener("click", afficherFonction);
    document.getElementById("suivant4").addEventListener("click", afficherModeJeu);
	document.getElementById("commencerJeu").addEventListener("click", pagePartie);
    

    
/////////////AFFICHER LE NOMBRE DE PSEUDOS ET DE FONCTIONNALITES//////// 

// Récupérer l'élément du formulaire pour le nombre de pseudos
var slide = document.getElementById("nbrJoueurs");

// Récupérer l'élément où afficher la valeur du nombre de pseudos
var out = document.getElementById("value");

// Utiliser une fonction fléchée pour définir l'action lors de l'input
slide.addEventListener("input", () => out.textContent = slide.value);

// Appeler la fonction initiale pour afficher la valeur initiale
out.textContent = slide.value;
//Meme chose pour les fonctionnalités 
var slide1 = document.getElementById("nbrFonction");
var out1 = document.getElementById("value1");
slide1.addEventListener("input", () => out1.textContent = slide1.value);
out1.textContent = slide1.value;

}



// On vérifie si la page est "partie.html" :
if (window.location.href.indexOf("partie.html") > -1) {
	window.addEventListener("load", commencerJeu);
    document.getElementById("validerAvis1").addEventListener("click", validAvis1);
    document.getElementById("validerAvis2").addEventListener("click", validAvis2);
}

// Fonctions pour relier les pages html entre elles
function pageAcceuil2() {
    window.location.href = 'acceuil2.html';
}
function pagePartie() {
    var modeJeu = document.getElementById('modeJeu').value;
    localStorage.setItem('regle', JSON.stringify(modeJeu));
    localStorage.setItem('pseudos', JSON.stringify(listJoueur));
    window.location.href = 'partie.html';
}
function redirectToAcceuil2() {
    window.location.href = 'C:/Users/yidir/Desktop/dd/acceuil2.html';
}

///////////////////////////////////// Page accueil2.html ///////////////////////////////////

/*
function chargerPartie(){
    document.getElementById("choixFichier").click();
}

// Ajoutez un gestionnaire d'événements pour le changement de fichier sélectionné
document.getElementById("choixFichier").addEventListener("change", function(event) {
    // Accédez au fichier sélectionné
    var fichier = event.target.files[0];
    // Faites quelque chose avec le fichier, par exemple, affichez son nom
    alert("Fichier sélectionné : " + fichier.name);
});
*/



/////////////////////////////////////  Page Initialisation.html ///////////////////////////////////////////

//// VARIABLES GLOBALES //////
// On créer la liste des joueurs si elle n'existe pas

if (listJoueur == undefined) {
	var listJoueur = [];
}

// On créer la liste des fonctionnalitées si elle n'existe pas
if (listFonction == undefined) {
	var listFonction = [];
}

var noteJoueur = []; // Liste qui contient le vote des joueurs à chaque fonctionnalitée
var noteFonction = []; // Liste qui contient le niveau de difficulté de chaque fonctionnalitée
var tourVote = 1; // Tour de vote par rapport à 1 fonctionnalitée (par exemple, si les joueurs n'ont pas encore
                  // voté la fonctionnalité 3, ils sont au tour 1 ; si ils ont déjà voté 4 fois, ils sont au tour 5)

var showPseudos = document.getElementById("choixPseudos");
var showMode = document.getElementById("choixModeJeu");
//
var showFonction = document.getElementById("choixFonction");
var showNbrFonction = document.getElementById("choixNbrFonction");



function afficherPseudos() {
    son();
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

// Affichage de l'option de sélection du nombre de fonctionnalitées :
function afficherNbrFonction() {
    son();
    var pseudosInputs = document.querySelectorAll('input[name="pseudos[]"]');
    var tousRemplis = true;
    for (var i = 0; i < pseudosInputs.length; i++) {
        if (pseudosInputs[i].value.trim() === "") {
            tousRemplis = false;
			listJoueur = []; // On réinitialise la liste des joueurs
            break; // Pas besoin de continuer la vérification si un champ est vide
        }
		else {
			listJoueur.push(pseudosInputs[i].value.trim()) // On ajoute les joueurs à la liste des joueurs 
		}
    }
    
    if (tousRemplis) {
        // Stockage des pseudos dans localStorage
        localStorage.setItem('pseudos', JSON.stringify(listJoueur));

        //afficher le choix du nombre de fonctionnalitées : 
        showNbrFonction.style.visibility = "visible";
        showNbrFonction.classList.add("show");
        showNbrFonction.style.opacity="1";
        
    } else {
        alert("Veuillez remplir tous les champs de pseudos.");
    }
        
}

// Affichage de l'option de saisie des noms des fonctionnalitées : 
function afficherFonction() {
    son();
    var nbrFonction = document.getElementById("nbrFonction").value;
    var champsFonction = document.getElementById("champsFonction");
    


    // Vérifie que le nombre de fonctionnalitées est valide
    if (nbrFonction >= 1 && nbrFonction <= 15) {
        // Efface le contenu précédent
        champsFonction.innerHTML = '';

        // Génère les champs de saisie pour les pseudos
        for (var i = 1; i <= nbrFonction; i++) {
            champsFonction.innerHTML += `Fonctionnalitée ${i}: <input type="text" name="fonction[]"><br>`;
        }

        // Affiche la section des fonctionnalitées : 
        showFonction.style.visibility = "visible";
        showFonction.classList.add("show");
        showFonction.style.opacity="1";

    } else {
        alert("Veuillez choisir un nombre de fonctionnalitées entre 3 et 12.");
    }
    
}

// Fonction pour afficher la section du mode de jeu
function afficherModeJeu() {
    son();
    // Vérifie que tous les champs de pseudos sont remplis
    var fonctionInputs = document.querySelectorAll('input[name="fonction[]"]');
    var tousRemplis = true;

    for (var i = 0; i < fonctionInputs.length; i++) {
        if (fonctionInputs[i].value.trim() === "") {
            tousRemplis = false;
			listFonction = []; // On réinitialise la liste des fonctionnalitées
            break; // Pas besoin de continuer la vérification si un champ est vide
        }
		else {
			listFonction.push(fonctionInputs[i].value.trim()) // On ajoute les fonctionnalitées à la liste des fonctionnalitées
		}
    }
    
        if (tousRemplis) {
            // Stockage des pseudos dans localStorage
            localStorage.setItem('fonction', JSON.stringify(listFonction));

            //afficher le menu mode de jeu
            showMode.style.visibility = "visible";
            showMode.classList.add("show");
            showMode.style.opacity="1";
            
        
        } else {
            alert("Veuillez remplir tous les champs de fonctionnalitées.");
        }
        
    }

/////////////////////////////////// Page Partie.html /////////////////////////////////////////////////
// Variables globales utilisées sur la page "partie.html" : 

var voteMin, voteMax, joueurMin, joueurMax, regle;
var cartes = document.querySelectorAll(".cartes");


function commencerJeu() {
    son();
    // Récupérer les pseudos depuis localStorage
    var pseudosString = localStorage.getItem('pseudos');
    var fonctionString = localStorage.getItem('fonction');
    regle = localStorage.getItem('regle');

    // Vérifier si des pseudos ont été stockés
    if (pseudosString) {
        // Convertir la chaîne JSON en tableau
        var pseudos = JSON.parse(pseudosString);

        // On enregistre les pseudos dans la liste pseudo
        for (var i = 0; i < pseudos.length; i++) {
            listJoueur.push(pseudos[i]);
        }
        document.getElementById("nom_joueur").textContent = listJoueur[0];
        document.getElementById("num_joueur").textContent = '1';
    } else {
        // Aucun pseudo n'a été stocké
        console.log('Aucun pseudo n\'a été stocké.');
    }

    // Vérifier si les fonctionnalités ont été stockés
    if (fonctionString) {
        // Convertir la chaîne JSON en tableau
        var fonction = JSON.parse(fonctionString);

        for (var i = 0; i < fonction.length; i++) {
            listFonction.push(fonction[i]); // On enregistre les fonctionnalitées dans la liste des fonctionnalités
        }
        document.getElementById("nom_fonction").textContent = listFonction[0];
        document.getElementById("num_fonction").textContent = '1';
    } else {
        // Aucun pseudo n'a été stocké
        console.log('Aucune fonctionnalitée n\'a été stocké.');
    }

}


// ANIMATION DES CARTES


function handleMouseUp(carte) {

    // On identifie le joueur qui a voté : 
    joueurActuel = parseInt(document.getElementById("num_joueur").textContent);
    joueurActuel -= 1;
    noteJoueur.push(carte.id);

    // On vérifie si son vote est le plus petit :  
    if (
        (voteMin === undefined || parseInt(voteMin) > parseInt(noteJoueur[joueurActuel])) &&
        ((noteJoueur[joueurActuel] !== '???') && (noteJoueur[joueurActuel] !== 'cafe'))
    ) {
        
        voteMin = noteJoueur[joueurActuel];
        joueurMin = listJoueur[joueurActuel];
    }

    // On vérifie si son vote est le plus élevé : 
    if (
        (voteMax === undefined || parseInt(voteMax) < parseInt(noteJoueur[joueurActuel])) &&
        ((noteJoueur[joueurActuel] !== '???') && (noteJoueur[joueurActuel] !== 'cafe'))
    ) {
        
        voteMax = noteJoueur[joueurActuel];
        joueurMax = listJoueur[joueurActuel];
    }
    joueurActuel += 1;

    // On vérifie si le joueur qui a voté est le dernier joueur de la liste ou non :
    if (joueurActuel < listJoueur.length) {
        // Tant que le dernier joueur de la liste n'a pas voté, on passe au joueur suivant :

        document.getElementById("nom_joueur").textContent = listJoueur[joueurActuel];
        document.getElementById("num_joueur").textContent = joueurActuel + 1;
        return;
    } else if (voteMin === undefined) {

        // Si la variable min n'est pas définie, cela signifie que tous les joueurs ont choisi le café ou l'interrogation :
        
        // On vérifie si tous les joueurs ont choisi le café : 
        if (noteJoueur.every(element => element === 'cafe')) {
            alert('la partie a été mise en pause !');
            finPartie();
            return;
        } else {
            // Tous ou certains joueurs ont choisi la carte '???' :
            alert('Tout le monde doit revoter !');
            noteJoueur = [];
            document.getElementById("num_joueur").textContent = '1';
            document.getElementById("nom_joueur").textContent = listJoueur[0];
            return;
        }
    // On vérifie s'il y a unanimité : 
    } else if (voteMin == voteMax) {
        noteFonction.push(noteJoueur[0]);
        tourFonction();
        return;
    } else if (tourVote === 1) {
        // Si c'est le premier tour de vote, il y a débat
        debat(joueurMin, voteMin, joueurMax, voteMax);
        return;
    } else if (regle === 'unanimité') {
        // Si ce n'est pas le premier tour de vote, on applique des traitements spécifiques aux règles choisies.
        debat(joueurMin, voteMin, joueurMax, voteMax);
        return;
    } else if (regle === 'moyenne') {
        var som = 0;
        var div = 0;
        for (i = 0; i < noteJoueur.length; i++) {
            if (noteJoueur[i] !== 'cafe' && noteJoueur[i] !== '???') {
                som += noteJoueur[i];
                div += 1;
            }
        }
        som /= div;
        som = Math.ceil(som); // On arrondi le nombre vers le haut
        while (![1, 2, 3, 5, 8, 13, 20, 40, 100].includes(som)) {
            som += 1;
        }
        noteFonction.push(som);
        tourFonction();
        return;
    }
}

function handleMouseEnter(carte) {
    carte.classList.add("transition");
}

function handleMouseLeave(carte) {
    carte.classList.remove("transition");
}

function handleClick(carte) {
    audio.play();
    handleMouseUp(carte);
}

cartes.forEach(function (carte) {
    carte.addEventListener("mouseenter", function () {
        handleMouseEnter(carte);
    });

    carte.addEventListener("mouseleave", function () {
        handleMouseLeave(carte);
    });

    carte.addEventListener("mouseup", function () {
        handleClick(carte);
    });
});


// Fonction qui affiche la fenêtre de débat :

function debat(joueurMin, voteMin, joueurMax, voteMax){
    noteJoueur = []; // on réinitialise la liste des avis des joueurs car ils vont devoir à nouveau voter
    document.getElementById("num_joueur").textContent = '1';
    document.getElementById("nom_joueur").textContent = listJoueur[0];

    // On masque les cartes :
    var hideCartes = document.getElementById("deck");
    hideCartes.style.visibility = "hidden";
    hideCartes.classList.remove("show");
    hideCartes.style.opacity = "0";

    // On cache le nom du joueur qui doit choisir sa carte
    var hideSidebar = document.getElementById("sidebar");
    hideSidebar.style.visibility = "hidden";
    hideSidebar.classList.remove("show");
    hideSidebar.style.opacity = "0";

    // On affiche la première zone de débat 
    var showDebat = document.getElementById("debat1");
    showDebat.style.visibility = "visible";
    showDebat.classList.add("show");
    showDebat.style.opacity="1";
    document.getElementById("min_joueur").textContent = joueurMin;
    document.getElementById("min_vote").textContent = voteMin;
    document.getElementById("max_joueur").textContent = joueurMax;
    document.getElementById("max_vote").textContent = voteMax;

}

function validAvis1() {
    var avis = document.querySelector('#debat1 textarea').value;

    var jsonData = { avis1: 'Avis 1 : ' + avis };

    try {
        // Tentative de stockage dans le Local Storage
        localStorage.setItem('avisData', JSON.stringify(jsonData));
        alert('Données enregistrées avec succès dans le Local Storage!');
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de l\'enregistrement dans le Local Storage:', error);
        alert('Erreur lors de l\'enregistrement dans le Local Storage. Veuillez consulter la console pour plus d\'informations.');
    }
    // On masque la première zone de débat : 
    document.getElementById('zone_debat1').value = '';
    var hideDebat = document.getElementById("debat1");
    hideDebat.style.visibility = "hidden";
    hideDebat.classList.remove("show");
    hideDebat.style.opacity = "0";

    // On affiche la seconde zone de débat : 
    var showDebat = document.getElementById("debat2");
    showDebat.style.visibility = "visible";
    showDebat.classList.add("show");
    showDebat.style.opacity = "1";
}



function validAvis2(){
    var avis2 = document.querySelector('#debat1 textarea').value;
    var jsonData = { validAvis2: 'Avis 2 : ' + avis2 };

    try {
        // Tentative de stockage dans le Local Storage
        localStorage.setItem('avisData', JSON.stringify(jsonData));
        alert('Données enregistrées avec succès dans le Local Storage!');
    } catch (error) {
        // Gestion des erreurs
        console.error('Erreur lors de l\'enregistrement dans le Local Storage:', error);
        alert('Erreur lors de l\'enregistrement dans le Local Storage. Veuillez consulter la console pour plus d\'informations.');
    }

    // On masque la seconde zone de débat : 
    document.getElementById('zone_debat2').value = '';
    var hideDebat = document.getElementById("debat2");
    hideDebat.style.visibility = "hidden";
    hideDebat.classList.remove("show");
    hideDebat.style.opacity = "0";

    // On affiche les cartes 
    var showCartes = document.getElementById("deck");
    showCartes.style.visibility = "visible";
    showCartes.classList.add("show");
    showCartes.style.opacity="1";


    // On affiche le pseudo du joueur qui doit voter : 
    var showSidebar = document.getElementById("sidebar");
    showSidebar.style.visibility = "visible";
    showSidebar.classList.add("show");
    showSidebar.style.opacity="1";
    voteMin = undefined;
    voteMax = undefined;
    joueurMin = undefined;
    joueurMax = undefined;
}


// Fonction qui s'occupe de la gestion des fonctionnalités débattues
function tourFonction() {
    document.getElementById('avis1').textContent = '';
    document.getElementById('avis2').textContent = '';

    fonctionActuelle = parseInt(document.getElementById("num_fonction").textContent); // Fonctionnalité actuellement débattu 
    
    if (fonctionActuelle < listFonction.length) { // Tant que toutes les fonctionnalités n'ont pas été votées, on passe à la suivante :
        document.getElementById("nom_fonction").textContent = listFonction[fonctionActuelle];
        document.getElementById("num_fonction").textContent = parseInt(fonctionActuelle) + 1;
        document.getElementById("nom_joueur").textContent = listJoueur[0];
        document.getElementById("num_joueur").textContent = '1';
        noteJoueur = [];
    } else {
        // function fin de partie
        alert('fin de la partie !')
        finPartie();
        window.location.reload();
    }
}


function finPartie(){
// On prépare le fichier JSON qui sera sauvegardé : 
    const data = {
        listeDesJoueur: listJoueur,
        listeDesFontion : listFonction,
        noteDesFonction : noteFonction,
        modeDeJeu : regle
    };

    // On converti data en format JSON : 
    const jsonData = JSON.stringify(data, null, 2);

    // On créer un objet Blob à partir de la chaîne JSON
    const blob = new Blob([jsonData], { type: 'application/json' });

    // On créer un lien pour télécharger le fichier JSON : 
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'NotesFonctionnalites.json';

    // Ajout du lien à la page
    document.body.appendChild(link);

    // Clic automatique sur le lien pour déclencher le téléchargement
    link.click();

    // Suppression du lien de la page
    document.body.removeChild(link);

    console.log('Données sauvegardées avec succès dans le fichier "resultatPlanning.json"');
    window.location.href = 'acceuil2.html';
    

}



