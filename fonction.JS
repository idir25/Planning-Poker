const audio = new Audio("select.mp3");

const son = ()=>{
const audio = new Audio();
audio.src = "./enter.mp3"
audio.play();
};


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

if (window.location.href.indexOf("acceuil2.html") > -1) {
    document.querySelector(".btn1").addEventListener("click", ()=>{
        son();
    });

}

// Fonctions pour relier les pages html entre elles
function pageAcceuil2() {
    window.location.href = 'acceuil2.html'
}
function pagePartie() {
    son();
    var modeJeu = document.getElementById('modeJeu').textContent;
    localStorage.setItem('regle', JSON.stringify(modeJeu));
    localStorage.setItem('pseudos', JSON.stringify(listJoueur));
    window.location.href = 'partie.html';
    
}
function redirectToAcceuil2() {
    window.location.href = 'C:/Users/yidir/Desktop/dd/acceuil2.html';
    
}





/////////////////////////////////////  Page Initialisation.html ///////////////////////////////////////////

//// ATTENTION : IL Y A PLUSIEURS VARIABLES GLOBALES //////
// On créer la liste des joueurs si elle n'existe pas
var voteMin, voteMax, joueurMin, joueurMax;
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
			listFonction = []; // On réinitialise la liste des fonctionnalités
            break; // Pas besoin de continuer la vérification si un champ est vide
        } else {
            listFonction.push(fonctionInputs[i].value.trim()); // On ajoute les fonctionnalités à la liste des fonctionnalités
        }
    }

    if (tousRemplis) {
        var modeJeu = document.getElementById('modeJeu').value;
        localStorage.setItem('modeJeu', modeJeu);
        // Stockage des pseudos dans localStorage
        localStorage.setItem('fonction', JSON.stringify(listFonction));

        // Afficher le menu mode de jeu
        showMode.style.visibility = "visible";
        showMode.classList.add("show");
        showMode.style.opacity = "1";
    } else {
        alert("Veuillez remplir tous les champs de fonctionnalités.");
    }
}





    /////////////////////////////////// Page Partie.html /////////////////////////////////////////////////


    





    


    function commencerJeu() {
    var cartes = document.querySelectorAll(".cartes");

    // ANIMATION DES CARTES
    cartes.forEach(function (carte) {
      carte.addEventListener("mouseenter", () => {
          carte.classList.add("transition");
          
          carte.addEventListener("click", ()=>{
            audio.play();
            })
      });
      //   ANNULER L'EFFET DE L'ANIMATION QUAND ON SORS DE LA CARTE
      carte.addEventListener("mouseleave", () => {
        carte.classList.remove("transition");
      });
    });

    
    // Vérifier si un mode de jeu a été stocké
    var pseudosString = localStorage.getItem('pseudos');
    var fonctionString = localStorage.getItem('fonction');
    var regle = localStorage.getItem('regle');
    var modeJeu = localStorage.getItem('modeJeu');
    
    
    // Convertir la chaîne JSON en tableau (PSEUDOS)
    var pseudos = JSON.parse(pseudosString);
    // Faire quelque chose avec les pseudos (par exemple, les afficher)
    for (var i = 0; i < pseudos.length; i++) {
        listJoueur.push(pseudos[i]); // On enregistre les pseudos dans la liste pseudo
    }
    document.getElementById("nom_joueur").textContent = listJoueur[0];
    document.getElementById("num_joueur").textContent = '1';
    
    
    // Convertir la chaîne JSON en tableau (FONCTIONNALITES)
    var fonction = JSON.parse(fonctionString);
    for (var i = 0; i < fonction.length; i++) {
        listFonction.push(fonction[i]); // On enregistre les fonctionnalitées dans la liste des fonctionnalitées
    }
    document.getElementById("nom_fonction").textContent = listFonction[0];
    document.getElementById("num_fonction").textContent = '1';
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    function gestionModeJeu() {
        
        if (modeJeu) {
            // Afficher le mode de jeu sélectionné
            alert('Mode de jeu sélectionné : ' + modeJeu);
        } else {
            // Aucun mode de jeu n'a été stocké
            console.log('Aucun mode de jeu n\'a été stocké.');
        }
        
        // Gérer le mode de jeu spécifique
        if (modeJeu == 'unanimité') {
            gererUnanimite();
        } else if (modeJeu == 'moyenne') {
            gererMoyenne();
        }
    }
    
    // Fonction pour gérer le mode de jeu "Moyenne"
    function gererMoyenne() {
        var indexJoueurs = 0;
        var cartesChoisies = [];
        var valeursAutorisees = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];
    
        function updateInterface() {
            document.getElementById("nom_joueur").textContent = listJoueur[indexJoueurs];
            document.getElementById("num_joueur").textContent = (indexJoueurs + 1).toString();
        }
    
        cartes.forEach(function (carte) {
            carte.addEventListener("click", () => {
                var valeurCarte = parseInt(carte.id);
    
                if (valeursAutorisees.includes(valeurCarte)) {
                    cartesChoisies.push(valeurCarte);
                } else {
                    alert("Veuillez choisir une carte avec une valeur autorisée.");
                    return;
                }
                indexJoueurs++;
                if (indexJoueurs < listJoueur.length) {
                    updateInterface();
                } else {
                    if (cartesChoisies.length > 0) {
                        valeursAutorisees.sort((a, b) => a - b);
                        var carteMoyenne = Math.round(cartesChoisies.reduce((a, b) => a + b) / cartesChoisies.length);
                        var carteLaPlusProche = valeursAutorisees.reduce((prev, curr) =>
                            Math.abs(curr - carteMoyenne) < Math.abs(prev - carteMoyenne) ? curr : prev
                        );
                        alert('La carte moyenne choisie est : ' + carteLaPlusProche);
                        window.location.reload();

                    } else {
                        alert("Aucune carte choisie. Veuillez choisir une carte avec une valeur autorisée.");
                    }
                }
            });
        });
    }
    
    // Fonction pour gérer le mode de jeu "Unanimité"
    function gererUnanimite() {
        var indexJoueurs = 0;
        var cartesChoisies = {};
    
        function updateInterface() {
            document.getElementById("nom_joueur").textContent = listJoueur[indexJoueurs];
            document.getElementById("num_joueur").textContent = (indexJoueurs + 1).toString();
        }
    
        cartes.forEach(function (carte) {
            carte.addEventListener("click", () => {
                var joueurActuel = listJoueur[indexJoueurs];
                cartesChoisies[joueurActuel] = carte.id;
                
                indexJoueurs++;
                if (indexJoueurs < listJoueur.length) {
                    updateInterface();
                } else {
                    var cartesUniques = new Set(Object.values(cartesChoisies));
                    if (cartesUniques.size === 1) {
                        alert('Unanimité sur la carte ' + Array.from(cartesUniques)[0]);
                    } else {
                        alert("Certains joueurs ne sont pas d'accord sur le choix de la carte.");
                        alert("LA PARTIE EST RELANCE");
                        window.location.reload();
                    }
                }
            });
        });
    }
    // Appel de la fonction principale
    

    // Déclarer en dehors de la fonction pour la rendre accessible à fonctionnalite
    
    gestionModeJeu();
    
}
var indexFonction = 0; // Variable pour suivre l'index actuel de la fonctionnalité
var fonctionnaliteSuivante = document.getElementById("suivant");

fonctionnaliteSuivante.addEventListener("click", () => {
indexFonction++; 
if (indexFonction < listFonction.length) {
    document.getElementById("nom_fonction").textContent = listFonction[indexFonction];
    document.getElementById("num_fonction").textContent = (indexFonction + 1).toString();


} else {
    // Si nous atteignons la fin de la liste, on peux choisir de réinitialiser à zéro ou effectuer d'autres actions.
    console.log('Fin des fonctionnalités.');
    alert("FIN DE LA PARTIE !")
}
});


// Fonction qui affiche la fenêtre de débat :
function debat(listJoueur, joueurMax, voteMax){
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
    
    // On affiche la zone de débat 
    var showDebat = document.getElementById("debat1");
    showDebat.style.visibility = "visible";
    showDebat.classList.add("show");
    showDebat.style.opacity="1";
    alert(joueurMin);
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

    var hideDebat = document.getElementById("debat1");
    hideDebat.style.visibility = "hidden";
    hideDebat.classList.remove("show");
    hideDebat.style.opacity = "0";

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

    var hideDebat = document.getElementById("debat2");
    hideDebat.style.visibility = "hidden";
    hideDebat.classList.remove("show");
    hideDebat.style.opacity = "0";

    var showCartes = document.getElementById("deck");
    showCartes.style.visibility = "visible";
    showCartes.classList.add("show");
    showCartes.style.opacity="1";

    var showSidebar = document.getElementById("sidebar");
    showSidebar.style.visibility = "visible";
    showSidebar.classList.add("show");
    showSidebar.style.opacity="1";
}


// Fonction qui s'occupe de la gestion des fonctionnalités débattues
function tourFonction() {
    document.getElementById('avis1').textContent = '';
    document.getElementById('avis2').textContent = '';
    fonctionActuelle = parseInt(document.getElementById("num_fonction").textContent); // Fonctionnalité actuellement débattu 
    fonctionActuelle -= 1;
    alert(listFonction.length + 'pas bon');
    if (fonctionActuelle < listFonction.length) { // Tant que le dernier joueur de la liste n'a pas voté, on passe au joueur suivant :
        fonctionActuelle += 1;
        document.getElementById("nom_fonction").textContent = listFonction[fonctionActuelle];
        document.getElementById("num_fonction").textContent = parseInt(fonctionActuelle) + 1;
    } else {
        // function fin de partie
        alert('fin de la partie !')
    }
}

//ACTUALISER LES FONCTIONNALTES QUAND ON CLIQUE SUR SUIVANT




// ANIMATION DES CARTES

// var cartes = document.querySelectorAll(".cartes");

// cartes.forEach(function (carte) {
//     carte.addEventListener("mouseenter", () => {
//       carte.classList.add("transition");
  
//       carte.addEventListener("mouseup", () => {
//         // Gestion des événements liés aux cartes : 
//         joueurActuel = parseInt(document.getElementById("num_joueur").textContent);
//         joueurActuel -= 1;
//         noteJoueur.push(carte.id);
  
//         if (
//           (voteMin === undefined || parseInt(voteMin) > parseInt(noteJoueur[joueurActuel])) &&
//           (noteJoueur[joueurActuel] !== '???' && noteJoueur[joueurActuel] !== 'cafe')
//         ) {
//           alert(noteJoueur[joueurActuel]);
//           voteMin = noteJoueur[joueurActuel];
//           joueurMin = listJoueur[joueurActuel];
//         }
  
//         if (
//           (voteMax === undefined || parseInt(voteMax) < parseInt(noteJoueur[joueurActuel])) &&
//           (noteJoueur[joueurActuel] !== '???' && noteJoueur[joueurActuel] !== 'cafe')
//         ) {
//           alert(noteJoueur[joueurActuel]);
//           voteMax = noteJoueur[joueurActuel];
//           joueurMax = listJoueur[joueurActuel];
//         }
  
//         joueurActuel += 1;
//         if (joueurActuel < listJoueur.length) {
//           // Tant que le dernier joueur de la liste n'a pas voté, on passe au joueur suivant :
//           alert('joueur suivant');
//           document.getElementById("nom_joueur").textContent = listJoueur[joueurActuel];
//           document.getElementById("num_joueur").textContent = joueurActuel + 1;
//         } else if (voteMin === undefined) {
//           // Si la variable min n'est pas définie, cela signifie que tous les joueurs ont choisi le café ou l'interrogation :
//           if (noteJoueur[1] === 'cafe') {
//             // function fin de partie
//             alert('fin de la partie !');
//           } else {
//             alert('Tout le monde doit revoter !');
//             noteJoueur = [];
//             document.getElementById("num_joueur").textContent = '1';
//             document.getElementById("nom_joueur").textContent = listJoueur[0];
//           }
//         } else if (voteMin == voteMax) {
//           alert("C pas normal");
//           tourFonction();
//         } else if (tourVote === 1) {
//           // Si c'est le premier tour de vote, il y a débat
//           debat(joueurMin, voteMin, joueurMax, voteMax);
//         } else if (regle === 'unanimité') {
//           // Si ce n'est pas le premier tour de vote, on applique des traitements spécifiques aux règles choisies.
//           debat(joueurMin, voteMin, joueurMax, voteMax);
//         } else if (regle === 'moyenne') {
//           var som = 0;
//           var div = 0;
//           for (i = 0; i < noteJoueur.length; i++) {
//             if (noteJoueur[i] !== 'cafe' && noteJoueur[i] !== '???') {
//               som += noteJoueur[i];
//               div += 1;
//             }
//           }
//           som /= div;
//           som = Math.ceil(som); // On arrondi le nombre vers le haut
//           while (![1, 2, 3, 5, 8, 13, 20, 40, 100].includes(som)) {
//             som += 1;
//           }
//           noteFonction.push(som);
//           tourFonction();
//         } else if (regle === 'majoritéRelative') {
//           // function majRelative()
//         }
//       });
//       // Fin de la fonction d'écoute du click sur les cartes.
//     });


// //   ANNULER L'EFFET DE L'ANIMATION QUAND ON SORS DE LA CARTE
//   carte.addEventListener("mouseleave", () => {
//     carte.classList.remove("transition");
//   });
// });


