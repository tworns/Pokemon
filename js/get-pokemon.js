var url = 'https://pokeapi.co/api/v2/pokemon/?limit=6&offset=20';

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
  $(this).replaceWith(replacementDiv);
  typeData(data, $(this).closest('li'));
}

function typeData(data, element){

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
