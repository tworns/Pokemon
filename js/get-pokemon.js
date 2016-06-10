var url = 'https://pokeapi.co/api/v2/pokemon/?limit=721';

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
    .attr('href', pokemon.url);

  li.attr('data-id', pokemon.id);

  $('#pokemonList').append(li);
}
function sprite(data) {
  var replacementDiv = $('<div>');
  var front = $('<img>');
  var back = $('<img>');
  var frontDef = $('<img>');
  var backDef = $('<img>');
  frontDef.attr('src',data.sprites.front_default);
  backDef.attr('src',data.sprites.back_default);
  front.attr('src', data.sprites.front_shiny);
  back.attr('src',data.sprites.back_shiny);
  replacementDiv.append(frontDef);
  replacementDiv.append(backDef);
  replacementDiv.append(front);
  replacementDiv.append(back);
  replacementDiv.append(typeData(data));
  $(this).replaceWith(replacementDiv);
  typeData(data, $(this).closest('li'));
}

function typeData(data){
  var type1 = data.types[0].type.name;
  var pkmnName = data.forms[0].name;
  var typeString = pkmnName + ": " + type1 + " type" ;
    var type2 = data.types[1];
  if(type2 !== null && type2 !== undefined) {
    typeString = typeString + " and "+ type2.type.name + " type" ;
  }
  return typeString;
}

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
