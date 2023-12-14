// On vérifie si la page est "initilisation.html" :
if (window.location.href.indexOf("initiallisation.html") > -1) {
	document.getElementById("suivant1").addEventListener("click", afficherPseudos);
	document.getElementById("suivant2").addEventListener("click", afficherModeJeu);
	var slide = document.getElementById("nbrJoueurs");
	var out = document.getElementById("value");

	out.innerHTML=slide.value;
	slide.oninput=function(){
	out.innerHTML=this.value;
	
	}
}

// Fonction pour relier les pages html entre elles
function pageAcceuil2() {
    window.location.href = 'acceuil2.html';
}
function pagePartie() {
    window.location.href = 'partie.html';
}
function redirectToAcceuil2() {
    window.location.href = 'C:/Users/yidir/Desktop/dd/acceuil2.html';
}


// On vérifie si la page est "partie.html" :
if (window.location.href.indexOf("partie.html") > -1) {
	window.addEventListener("load", commencerJeu);
}

if (listJoueur == undefined) {
	var listJoueur = []
}

var showPseudos = document.getElementById("choixPseudos");
var showMode = document.getElementById("choixModeJeu");



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

            //afficher le menu mode de jeu
            showMode.style.visibility = "visible";
            showMode.classList.add("show");
            showMode.style.opacity="1";
            alert(listJoueur[1])
        
        } else {
            alert("Veuillez remplir tous les champs de pseudos.");
        }
        
    }
function commencerJeu() {
    // Récupérer les pseudos depuis localStorage
    var pseudosString = localStorage.getItem('pseudos');

    // Vérifier si des pseudos ont été stockés
    if (pseudosString) {
        // Convertir la chaîne JSON en tableau
        var pseudos = JSON.parse(pseudosString);

        // Faire quelque chose avec les pseudos (par exemple, les afficher)
        for (var i = 0; i < pseudos.length; i++) {
            console.log('Joueur ' + (i + 1) + ': ' + pseudos[i]);
        }
    } else {
        // Aucun pseudo n'a été stocké
        console.log('Aucun pseudo n\'a été stocké.');
    }
}


