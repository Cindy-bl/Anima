function saisie(txt_defaut, nom_controle) {
  //vide le contenu de la zone de texte au clic
  if (document.getElementById(nom_controle).value == txt_defaut)
    document.getElementById(nom_controle).value = "";
} //si l'information contenue dans 'Input' en cours est le texte par défaut au moment du clic nous vidons son contenu avec "value='';"

// function retablir(txt_defaut, nom_controle) {
//   //réinitialise le texte par défaut si aucun changement n'a été détectée quand la sourie quitte la zone de saisie
//   if (document.getElementById(nom_controle).value == "");
//   document.getElementById(nom_controle).value = txt_defaut;
// } //l'inverse de la fonction saisie, si son contenue est vide "value==''" alors nous rechargeons l'information par défaut "value=txt_defaut"

function mev(txt_defaut, nom_controle) {
  //contrôle la validité de chacune des information inscrite par l'internaute
  let longueur = document.getElementById(nom_controle).value.length;
  if (nom_controle == "date_n") {
    if (!isValidDate(document.getElementById(nom_controle).value, "DMY")) {
      document.getElementById(nom_controle).style.border = "#CC3300 2px solid";
      document.getElementById("message").innerText =
        "Votre date de naissance doit être saisie au format jj/mm/aaaa";
      b_date = false;
    } else {
      document.getElementById("message").innerText = "";
      document.getElementById(nom_controle).style.border = "#333 1px solid";
      b_date = true;
    }
    if (nom_controle == "mail_inscr") {
      if (
        document.getElementById(nom_controle).value.indexOf("@") == -1 ||
        document.getElementById(nom_controle).value.indexOf(".") == -1
      ) {
        //avec indexOF je test la présence de '@' & '.'
        //Quand elle indique '-1' c'est que les caractères ne sont pas présent dans la chaîne de caractères
        document.getElementById(nom_controle).style.border =
          "#CC3300 2px solid";
        document.getElementById("message").innerText =
          "Votre mail ne semble pas correct, corrigez-le";
        b_mail = false; //on met en valeur l'endroit incriminé avec des bordures et en affichant un message explicatif
      } else if (
        document.getElementById(cmail_inscr).value != "" &&
        document.getElementById("cmail_inscr").value != "Confirmer le mail"
      ) {
        if (
          document.getElementById(nom_controle).value !=
          document.getElementById("cmail_inscr").value
        ) {
          document.getElementById(nom_controle).style.border =
            "#CC3300 2px solid";
          document.getElementById("message").innerText =
            "Les deux mails ne correspondent pas";
        } else {
          document.getElementById("message").innerText = "";
          document.getElementById(nom_controle).style.border = "#333 1px solid";
        }
      } else {
        document.getElementById("message").innerText = "";
        document.getElementById(nom_controle).style.border = "#333 1px solid";
      }
    } else if (nom_controle == "cmail_inscr") {
      if (
        document.getElementById(nom_controle).value.indexOf("@") == -1 ||
        document.getElementById(nom_controle).value.indexOf(".") == -1
      ) {
        document.getElementById(nom_controle).style.border = "CC3300 2px solid";
        document.getElementById("message").innerText =
          "Les deux mails ne correspondent pas";
        b_mail = false;
      } else {
        document.getElementById("message").innerText = "";
        document.getElementById(nom_controle).style.border = "#333 1px solid";
        b_mail = true;
      }
    } else if (nom_controle == "mp_inscr") {
      if (
        document.getElementById(nom_controle).value.length < 5 ||
        document.getElementById(nom_controle).value.length > 10
      ) {
        //permet de vérifier que comporte entre 5 et 10 caractères grâce à 'length'
        document.getElementById(nom_controle).style.border =
          "#CC3300 2px solid";
        document.getElementById("message").innerText =
          "Le mot de passe doit entre 5 et 10 caractères";
        b_mp = false;
      } else if (
        document.getElementById("mp_conf").value != "" &&
        document.getElementById("mp_conf").value != "Confirmer MP"
      ) {
        if (
          document.getElementById(nom_controle) !=
          document.getElementById("mp_conf").value
        ) {
          document.getElementById(nom_controle).style.border =
            "#CC3300 2px solid";
          document.getElementById("message").innerText =
            "Les deux mots de passe ne correspondent pas";
          b_mp = false;
        }
      } else {
        document.getElementById("message").innerText = "";
        document.getElementById(nom_controle).style.border = "#333 1px solid";
      }
    } else if (nom_controle == "mp_conf") {
      if (
        document.getElementById(nom_controle).value !=
        document.getElementById("mp_inscr").value
      ) {
        document.getElementById(nom_controle).style.border =
          "#CC3300 2px solid";
        document.getElementById("message").innerText =
          "Les mots de passe doivent être identiques";
        b_mp = false;
      } else {
        document.getElementById("message").innerText = "";
        document.getElementById(nom_controle).style.border = "#333 1px solid";
        b_mp = true;
      }
    }
  } else if (
    longueur < 4 ||
    document.getElementById(nom_controle).value == txt_defaut
  ) {
    document.getElementById(nom_controle).style.border = "#CC3300 2px solid"; //permet de mettre en évidence si il y'a un problème

    switch (nom_controle) {
      case "nom":
        b_nom = false;
        break;
      case "prénom":
        b_prenom = false;
        break;
      case "date_n":
        b_date = false;
        break;
      case "mail_inscr":
        b_mail = false;
        break;
      case "mp_inscr":
        b_mp = false;
        break;
    }//On commence par réaliser un contrôle commun à l'ensemble des zones saisie, pour vérifier que le texte n'est pas celui par défaut, ni insuffisant en nombre de caractères
    //D'où l'utilisation de 'length' afin de retourner la longueur de l'information saisie.
  } else {
    document.getElementById(nom_controle).style.border = "#333 1px solid";

    switch (nom_controle) {
      case "nom":
        b_nom = true;
        break;
      case "prénom":
        b_prenom = tru;
        break;
    }
  }
}

function isValidDate(dateStr, format) {
  //recupérée du web afin de prouver la validité de la date de naissance saisie par l'internaute
  if (format == null) {
    format = "MDY";
  }
  format = format.toUpperCase();
  if (format.length != 3) {
    format = "MDY";
  }
  if (
    format.indexOf("M") == -1 ||
    format.indexOf("D") == -1 ||
    format.indexOf("Y") == -1
  ) {
    format = "MDY";
  }
  if (format.substring(0, 1) == "Y") {
    let reg1 = /^\d{2}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
    let reg2 = /^\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}$/;
  } else if (format.substring(1, 2) == "Y") {
    let reg1 = /^\d{1,2}(\-|\/|\.)\d{2}\1\d{1,2}$/;
    let reg2 = /^\d{1,2}(\-|\/|\.)\d{4}\1\d{1,2}$/;
  } else {
    let reg1 = /^\d{1,2}(\/)\d{1,2}\1\d{2}$/;
    let reg2 = /^\d{1,2}(\/)\d{1,2}\1\d{4}$/;
  }

  if (reg1.test(dateStr) == false && reg2.test(dateStr) == false) {
    return false;
  }
  let parts = dateStr.split(RegExp.$1);

  if (format.substring(0, 1) == "M") {
    let mm = parts[0];
  } else if (format.substring(1, 2) == "M") {
    let mm = parts[1];
  } else {
    let mm = parts[2];
  }
  if (format.substring(0, 1) == "D") {
    let dd = parts[0];
  } else if (format.substring(1, 2) == "D") {
    let dd = parts[1];
  } else {
    let dd = parts[2];
  }
  if (format.substring(0, 1) == "Y") {
    let yy = parts[0];
  } else if (format.substring(1, 2) == "Y") {
    let yy = parts[1];
  } else {
    let yy = parts[2];
  }
  if (parseFloat(yy) <= 50) {
    yy = (parseFloat(yy) + 2000).toString();
  }
  if (parseFloat(yy) <= 99) {
    yy = (parseFloat(yy) + 1900).toString();
  }
  let dt = new Date(
    parseFloat(yy),
    parseFloat(mm) - 1,
    parseFloat(dd),
    0,
    0,
    0,
    0
  );
  if (parseFloat(dd) != dt.getDate()) {
    return false;
  }
  if (parseFloat(mm) - 1 != dt.getMonth()) {
    return false;
  }
  return true;
}
//source du cours qui a permis de réliser le code 
//https://www.bonbache.fr/formulaire-d-inscription-web-controle-en-javascript-239.html