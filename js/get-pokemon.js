var url = 'http://pokeapi.co/api/v2/pokemon/?limit=721';
var weakTo = "Double damage from: ";
var weakishTo = "| Half damage to: ";
var strongTo;

var template = $('.template')
  .detach()
  .removeClass('template');

function loadPokemon(pokemon) {
  $.each(pokemon.results, function(i, pokemon) {
    addPokemon(pokemon);
  });
}

function addPokemon(pokemon) {
  var li = template.clone();
  li.find('.pokemon-name a')
    .text(pokemon.name)
    .attr('href', pokemon.url)
    .attr('class', 'button');

  li.attr('data-id', pokemon.id);


  $('#pokemonList').append(li);
}
function sprite(data) {
  var replacementDiv = $('<div>');
  var front = $('<img>');
  var back = $('<img>');
  var frontDef = $('<img>');
  var backDef = $('<img>');
  var info = typeData(data);
  frontDef.attr('src',data.sprites.front_default);
  backDef.attr('src',data.sprites.back_default);
  front.attr('src', data.sprites.front_shiny);
  back.attr('src',data.sprites.back_shiny);
  replacementDiv.append(frontDef);
  replacementDiv.append(backDef);
  replacementDiv.append(front);
  replacementDiv.append(back);
  replacementDiv.append(info);
  $(this).replaceWith(replacementDiv);
}
function search(data){
  var newDiv = $('<div style = "margin: auto; width: 50em;">');
  var front = $('<img>');
  var back = $('<img>');
  var frontDef = $('<img>');
  var backDef = $('<img>');
  frontDef.attr('src',data.sprites.front_default);
  backDef.attr('src',data.sprites.back_default);
  front.attr('src', data.sprites.front_shiny);
  back.attr('src',data.sprites.back_shiny);
  newDiv.append(frontDef);
  newDiv.append(backDef);
  newDiv.append(front);
  newDiv.append(back);
  newDiv.append(typeData(data));
  newDiv.attr('id', "pkmnDisplay");
  $('#pkmnDisplay').replaceWith(newDiv);

}
function weak(data) {
  $(data).each( function(i, data){
  weakTo = weakTo+  data.damage_relations.double_damage_from[i].name +", ";
  });

  $(data).each(function(i,data){
    weakishTo = weakishTo+  data.damage_relations.half_damage_to[i].name +", ";
  });
  console.log(weakTo);
  return weakTo;
  }
function typeData(data){

  var type1 = data.types[0].type.name;
  var pkmnName = data.forms[0].name;
  var typeString = pkmnName + ": " + type1 + " type" ;
  var type2 = data.types[1];
  if(type2 !== null && type2 !== undefined) {
    typeString = typeString + ', ' + type2.type.name + " type" ;
  }
  // $.get({
  //   url : data.types[0].type.url,
  //   success: weak.bind(this),
  // });

  //strengths(data);
  //typeString = typeString +" "+ weakTo;
  //typeString = typeString+ " "+ weakishTo;

    console.log(typeString);
  weakTo = "Double damage from: ";
  weakishTo = "| Half damage to: ";
//  debugger;
  return typeString;
}

$('#pkmnSubmit').on('click', function(e){
    e.preventDefault();
    var urlStr = 'http://pokeapi.co/api/v2/pokemon/' + $('#pkmnSearch').val();
    $.get({
      url: urlStr,
      success: search.bind(this)
    });
});
$(document).on('click', 'a',function(e){
    e.preventDefault();
    var link = $(e.currentTarget);
    $.get({
      url: $(this).attr('href'),
      success: sprite.bind(this)
    });

});

$.get({
  url: url,
  success: loadPokemon
});
