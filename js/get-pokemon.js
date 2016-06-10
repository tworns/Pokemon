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
li.attr('class', 'list-group-item');
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
function search(data){
  var newDiv = $('<div style = "margin-left: auto; margin-right:auto; width: 50em;">');
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
// function weaknesses(data){
//   $.get({
//     url = data.types[0].type.url
//     success:
//   });
// }
function typeData(data){
  var type1 = data.types[0].type.name;
  var pkmnName = data.forms[0].name;
  var typeString = pkmnName + ": " + type1 + " type" ;
    var type2 = data.types[1];
  if(type2 !== null && type2 !== undefined) {
    typeString = typeString + " and "+ type2.type.name + " type" ;
  }
  typeString = typeString;
  return typeString;
}

$('#pkmnSubmit').on('click', function(e){
    e.preventDefault();
    var urlStr = 'https://pokeapi.co/api/v2/pokemon/' + $('#pkmnSearch').val();
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
