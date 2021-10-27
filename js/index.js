$('.messageFooter2').css("display", "none");

let nbMois = 12;
let heures = 35;
let nbHeures = 151.6;

// option SMIC

$("#smic").click(function () {
  let horairesbrut = "10.48";
  $("#input6").val(horairesbrut + " $");
});


// Option taux d'imposition :

let tabRate = ['25.5', '15', '50', '45', '25'];
let rate = 23;
let coeff = 0.77;

// Checkbox (un choix max) :

$("input[type=checkbox]").click(function () {
  var n = $("input:checked").length;
  if (n == 0) { // taux par défaut
    rate = "23";
  }
  if (n == 1) { // affection du taux en fonction du choix
    var index = $(this).val();
    rate = tabRate[index];
  }
  if (n == 2) {
    $("input:not(this)").prop("checked", false);
  }
  $('#taux').val(rate);
  rate = parseInt(rate);
  coeff = (100-rate)/100;
});


// Option nombre de mois

$("#mois").blur(function () {
  nbMois = parseInt($('#mois').val());
});


// Conversion du nb d'heures par semaine en nb d'heures par mois

$("#heures").blur(function () {
  let heures = $('#heures').val();
  nbHeures = 151.67*heures/35
});


// Initialisation du tableau de valeurs des inputtext :

let valeurs = [];
for(index=0;index<8;index++){
  valeurs.push("0");
  $('.inputtext').val(valeurs[index] + " €");
}


// Le contenu initial est effacé lorsque l'input a le focus :

$(".inputtext").focus(function () {
  $(this).val("");
});


// Le contenu est réinitialisé à '0 €' si l'input est vide
// sinon € est ajouté au nombre

$(".inputtext").blur(function () {

  let valeur = $(this).val();
  if (isNaN(valeur)|| valeur == 0){
    valeur = 0;
  }
  $(this).val((valeur + " €"));

  // Lorsque l'input perd le focus, s'il est non-nul, son contenu est transmis à l'input7 :

  // On supprime € de la valeur :
  let valeurInput = $(this).val();
  valeurInput.slice(valeurInput.length - 1);
  // alert("hello");
  valeurInput = parseInt(valeurInput);
  let input7;
  if((valeurInput != '0')||valeurInput != ""){
    let chaine = $(this).prop('id');
    index = parseInt(chaine.slice(chaine.length - 1));
    if(index == 0){
      input7 = parseInt($(this).val())  * coeff / (parseInt(nbMois)*parseInt(nbHeures));
    }
    if(index == 1){
      input7 = parseInt($(this).val()) / (parseInt(nbMois)*parseInt(nbHeures));
    }
    if(index == 2){
      input7 = parseInt($(this).val()) * coeff / parseInt(nbHeures);
    }
    if(index == 3){
      input7 = parseInt($(this).val()) / parseInt(nbHeures);
    }
    if(index == 4){
      input7 = parseInt($(this).val()) * coeff / (parseInt(nbHeures)/5);
    }
    if(index == 5){
      input7 = parseInt($(this).val()) / (parseInt(nbHeures)/5);
    }
    if(index == 6){
      input7 = parseInt($(this).val()) * coeff;
    }
    if(index == 7){
      input7 = parseInt($(this).val());
    }

    input7 = parseInt(100*input7)/100;
  
    // la valeur input7 est affecté à #input7
    $('#input7').val(input7+" €");
  
    // La valeur d'input7 est transmise aux autres input :
    $('#input6').val(input7 / coeff+" €");
    $('#input5').val(input7 * (heures / 5)+" €");
    $('#input4').val(input7 * heures / (coeff * 5)+" €");
    $('#input3').val(input7 * nbHeures +" €");
    $('#input2').val(input7 * nbHeures / coeff+" €");
    $('#input1').val(input7 * nbHeures * nbMois+" €");
    $('#input0').val(input7 * nbHeures * nbMois / coeff+" €");

    // On change le message du Footer en fonction des résultats obtenus :

    $('#messageFooter1').hide();
    $('.messageFooter2').css("display", "block");
    $('#span1').append (parseInt(input7 * nbHeures));
    $('#span2').append (parseInt(input7 * nbHeures / coeff));
    $('#span3').append (parseInt(rate));
    $('#span4').append (parseInt(input7 * nbHeures / coeff)-parseInt(input7 * nbHeures));
    
  }
});


