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
}

// Fonctions pour relier les pages html entre elles
function pageAcceuil2() {
    window.location.href = 'acceuil2.html';
}
function pagePartie() {
    window.location.href = 'partie.html';
}
function redirectToAcceuil2() {
    window.location.href = 'C:/Users/yidir/Desktop/dd/acceuil2.html';
}





/////////////////////////////////////  Page Initialisation.html ///////////////////////////////////////////


// On créer la liste des joueurs si elle n'existe pas
if (listJoueur == undefined) {
	var listJoueur = []
}

// On créer la liste des fonctionnalitées si elle n'existe pas
if (listFonction == undefined) {
	var listFonction = []
}

var showPseudos = document.getElementById("choixPseudos");
var showMode = document.getElementById("choixModeJeu");
//
var showFonction = document.getElementById("choixFonction");
var showNbrFonction = document.getElementById("choixNbrFonction");



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

// Affichage de l'option de sélection du nombre de fonctionnalitées :
function afficherNbrFonction() {
    var pseudosInputs = document.querySelectorAll('input[name="pseudos[]"]');
    var tousRemplis = true;
    for (var i = 0; i < pseudosInputs.length; i++) {
        if (pseudosInputs[i].value.trim() === "") {
            tousRemplis = false;
			listJoueur = [] // On réinitialise la liste des joueurs
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
    // Vérifie que tous les champs de pseudos sont remplis
    var fonctionInputs = document.querySelectorAll('input[name="fonction[]"]');
    var tousRemplis = true;

    for (var i = 0; i < fonctionInputs.length; i++) {
        if (fonctionInputs[i].value.trim() === "") {
            tousRemplis = false;
			listFonction = [] // On réinitialise la liste des fonctionnalitées
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
            alert(listFonction[1])
        
        } else {
            alert("Veuillez remplir tous les champs de fonctionnalitées.");
        }
        
    }

/////////////////////////////////// Page Partie.html /////////////////////////////////////////////////

function commencerJeu() {
    // Récupérer les pseudos depuis localStorage

    var pseudosString = localStorage.getItem('pseudos');
    var fonctionString = localStorage.getItem('fonction')

    // Vérifier si des pseudos ont été stockés
    if (pseudosString) {
        // Convertir la chaîne JSON en tableau
        var pseudos = JSON.parse(pseudosString);

        // Faire quelque chose avec les pseudos (par exemple, les afficher)
        for (var i = 0; i < pseudos.length; i++) {
            listJoueur.push(pseudos[i]); // On enregistre les pseudos dans la liste pseudo
        }
        document.getElementById("nom_joueur").textContent = listJoueur[0];
    } else {
        // Aucun pseudo n'a été stocké
        console.log('Aucun pseudo n\'a été stocké.');
    }

    // Vérifier si les fonctionnalitées ont été stockés
    if (fonctionString) {
        // Convertir la chaîne JSON en tableau
        var fonction = JSON.parse(fonctionString);

        for (var i = 0; i < fonction.length; i++) {
            listFonction.push(fonction[i]); // On enregistre les fonctionnalitées dans la liste des fonctionnalitées
        }
        document.getElementById("nom_fonction").textContent = listFonction[0];
        document.getElementById("num_fonction").textContent = '1';
    } else {
        // Aucun pseudo n'a été stocké
        console.log('Aucune fonctionnalitée n\'a été stocké.');
    }

}



