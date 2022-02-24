/*
Basic idea::
explore JSON file to get information about data to be fetched
1>make two pages with nevigator(Onsen UI)
2>first page fetch api and extract name from it and list it out using Unsen Ui
3>create a second page and pass pokemon name so we can compare and get URL for details of that pokemon
4>page2 => fetch data(pokemon name) => get URl(of perticular pokemon) => extract data => set UI with one card
*/

document.addEventListener('init', async function (event) {
  console.log(event);
  //common code area for both the pages
  var page = event.target;

  const url = "https://pokeapi.co/api/v2/pokemon?limit=100";

  const response = await fetch(url);

  //code area for page 1
  if (page.id === 'page1') {

    ons.ready(async () => {
      const data = await response.json();
      var PokeNameList = [];
      for (let i = 0; i < 100; i++) {

        PokeNameList += `<ons-list-item modifier="noeffect" tappable>${data.results[i].name}</ons-list-item>`

      }
      document.getElementById("infinite-list").innerHTML = PokeNameList;
    }
    );



    page.querySelector('#infinite-list').onclick = function (event) {
      document.querySelector('#myNavigator').pushPage('page2', { data: { url: event.target.innerHTML } }); //tried to pass object but failed to get data


    }
    //code area for page 2
  } else if (page.id === 'page2') {
    const data = await response.json();

    var pokeName = page.data.url;
    var pokeUrl;

    for (let i = 0; i < 100; i++) {
      if (pokeName === data.results[i].name) {
        pokeUrl = data.results[i].url;  //get url from pokemonname
        break;   //may be we can reduce some time complexity by using break statement
      }
    }

    document.querySelector('#pID').innerHTML = pokeName


    displayData(pokeUrl);

    async function displayData(url) {
      const response = await fetch(url);
      const data = await response.json();

      document.querySelector('#pokeImage').src = data.sprites.other.dream_world.front_default;

      for (let i = 0; i <= 5; i++) {
        document.querySelector('#effort' + (i + 1)).innerHTML = data.stats[i].effort;
        document.querySelector('#baseStat' + (i + 1)).innerHTML = data.stats[i].base_stat;
      }
      var typeList = []
      for (let i = 0; i < data.types.length; i++) {

        typeList += `<ons-list-item >${data.types[i].type.name}</ons-list-item>`

      }
      document.querySelector('#type').innerHTML = typeList
    }
  }
});