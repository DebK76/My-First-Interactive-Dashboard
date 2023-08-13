// PokeStat Project Logic Script
// "What a f*ckin' amalgamation."

// Fetches Pokémon data from a static JSON file
async function fetchData() {
  try {
    const response = await fetch('static/data/pokemon.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    throw error;
  }
}

// Creates dropdown options from the provided keys (Pokémon names)
function createDropdownOptions(keys) {
  const fragment = document.createDocumentFragment();
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = 'Select a Pokémon';
  fragment.appendChild(defaultOption);

  keys.forEach((key) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    fragment.appendChild(option);
  });

  return fragment;
}

// Processes the JSON data and populates the Pokémon dropdowns
async function processJSONData() {
  try {
    const jsonData = await fetchData();
    if (jsonData) {
      const keys = Object.keys(jsonData); // Extract Pokémon names

      const dropdown1 = document.getElementById('pokemon-dropdown-1');
      const dropdown2 = document.getElementById('pokemon-dropdown-2');

      const options = createDropdownOptions(keys);
      dropdown1.appendChild(options.cloneNode(true));
      dropdown2.appendChild(options.cloneNode(true));

      return jsonData; // Return JSON data for further processing
    }
  } catch (error) {
    console.error('Error processing JSON data:', error);
    throw error;
  }
}

// Logs the selected Pokémon names from the dropdowns
function comparePokemons() {
  const dropdown1 = document.getElementById('pokemon-dropdown-1');
  const dropdown2 = document.getElementById('pokemon-dropdown-2');

  console.log('Selected Pokémon 1:', dropdown1.value);
  console.log('Selected Pokémon 2:', dropdown2.value);
}

let jsonData;
let pokemonNames;
processJSONData()
  .then((data) => {
    jsonData = data;
    pokemonNames = Object.keys(jsonData);
  })
  .catch((error) => {
    console.error('Error processing JSON data:', error);
  });

// Code to handle Pokémon comparison when the button is clicked
const button = document.getElementById('compare-button');
let chart1, chart2;

button.addEventListener('click', function() {
  const dropdown1 = document.getElementById('pokemon-dropdown-1');
  const dropdown2 = document.getElementById('pokemon-dropdown-2');
  const selectedPokemon1 = dropdown1.value;
  const selectedPokemon2 = dropdown2.value;

  const pokemon1Data = jsonData[selectedPokemon1]['stats'];
  const pokemon2Data = jsonData[selectedPokemon2]['stats'];

  addImage(selectedPokemon1, "pokemon-image1"); 
  addImage(selectedPokemon2, "pokemon-image2");
  chart1 = ChartJsBarChart(pokemon1Data, selectedPokemon1, "canvas-bar-chart1", chart1); 
  chart2 = ChartJsBarChart(pokemon2Data, selectedPokemon2, "canvas-bar-chart2", chart2);
});


// Function to create and render a Chart.js Bar Chart
function ChartJsBarChart(data, name, canvasId, existingChart) {
  // Destroy existing chart if it exists
  if (existingChart) {
    existingChart.destroy();
  }

  // Julia palette
  const colors = [
    '#A8E6CF', '#DCE8B4', '#FFD3B6', '#FFAAA5', '#D46A6A',
    '#AA96DA', '#7EB5A6', '#FFC3A7', '#D4A5A5', '#7795A1',
  ];

  var ctx = document.getElementById(canvasId).getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(d => d.name), // Labels from Pokémon attributes
      datasets: [{
        label: name,
        data: data.map(d => d.base_stat), // Stats for the bars
        backgroundColor: data.map((_, index) => colors[index % colors.length]),
        borderColor: data.map((_, index) => colors[index % colors.length]),
        borderWidth: 1,
        borderRadius: 5 // Rounded edges for aesthetics
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true, title: { display: true, text: 'Base Stat' } },
        y: { title: { display: true, text: 'Attributes' } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

// Async function to add a Pokémon's image to a specified div
async function addImage(pokemonname, imageDivId) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonname}`);
    const data = await response.json();
    const imageUrl = data.sprites.front_default; // Get front sprite
    document.getElementById(imageDivId).src = imageUrl; // Set image source
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
  }
}

// Function to reset canvas
function resetCanvas(containerId, canvasId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.id = canvasId; // Set the exact canvas ID
  container.appendChild(canvas);
}

// Reset button functionality
const reset = document.getElementById('reset-button');
reset.addEventListener('click', function() {
  resetCanvas('bar-chart1', 'canvas-bar-chart1');
  resetCanvas('bar-chart2', 'canvas-bar-chart2');
  // Clear the contents of the image divs
  document.getElementById('pokemon-image1').src = '';
  document.getElementById('pokemon-image2').src = '';
})

// Search Bar Functionality
const searchInput = document.getElementById('search-bar');
const autocompleteList = document.getElementById('autocomplete-list');
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  const matchedPokemons = pokemonNames.filter(pokemon => pokemon.toLowerCase().includes(searchText));

  autocompleteList.innerHTML = '';
  matchedPokemons.forEach(pokemon => {
    const originalPokemonName = pokemon; // Original name casing
    const option = document.createElement('div');
    option.textContent = pokemon;
    option.classList.add('autocomplete-option');
    option.addEventListener('click', () => {
      searchInput.value = originalPokemonName;
      autocompleteList.innerHTML = '';

      // Populate sprite card with selected Pokémon's image
      addImage(originalPokemonName, 'pokemon-sprite');
      document.getElementById('pokemon-name').textContent = originalPokemonName;
       // Populate the stats chart, types, and abilities
    height = jsonData[originalPokemonName]['height'];
    weight = jsonData[originalPokemonName]['weight'];
    dynamicListData = jsonData[originalPokemonName]['abilities'];
    types = jsonData[originalPokemonName]['types'];

    // Set height, weight, and radar chart
    pokemonHeightElement.textContent = `${height} m`;
    pokemonWeightElement.textContent = `${weight} kg`;
    makeRadarChart(jsonData[originalPokemonName]['stats'].map(stat => stat['base_stat']), originalPokemonName);

    // Populate abilities list
    dynamicListElement.innerHTML = '';
    dynamicListData.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name;
      dynamicListElement.appendChild(li);
    });

    // Populate types list with images
    pokemonTypesElement.innerHTML = ''; // Clear previous types
    types.forEach(item => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = `static/icons/${item.name}.png`;
      img.alt = item.name;
      img.width = 32;
      img.height = 32;
      li.appendChild(img);
      pokemonTypesElement.appendChild(li);
    });
    });
    autocompleteList.appendChild(option);
  });
});
// Enable or disable Enter key functionality for search input
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const originalPokemonName = searchInput.value; // Get current value
    searchInput.value = ''; // Clear input
    autocompleteList.innerHTML = ''; // Clear suggestions
    addImage(originalPokemonName.toLowerCase(), 'pokemon-sprite'); // Load image
    document.getElementById('pokemon-name').textContent = originalPokemonName; // Set name
  }
});

// Variables for displaying Pokemon data
let height, weight, dynamicListData, types;
const pokemonHeightElement = document.getElementById('pokemon-height');
const pokemonWeightElement = document.getElementById('pokemon-weight');
const dynamicListElement = document.getElementById('dynamic-list');
const pokemonTypesElement = document.getElementById('pokemon-types'); // To display types

// Event listener for Enter key to display data
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    dynamicListElement.innerHTML = '';
    pokemonTypesElement.innerHTML = ''; // Clear previous types
    height = jsonData[searchInput.value]['height'];
    weight = jsonData[searchInput.value]['weight'];
    dynamicListData = jsonData[searchInput.value]['abilities'];
    types = jsonData[searchInput.value]['types'];

    // Set height, weight, and radar chart
    pokemonHeightElement.textContent = `${height} m`;
    pokemonWeightElement.textContent = `${weight} kg`;
    makeRadarChart(jsonData[searchInput.value]['stats'].map(stat => stat['base_stat']), searchInput.value);

    // Populate abilities list
    dynamicListData.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name;
      dynamicListElement.appendChild(li);
    });

    // Populate types list with images
    types.forEach(item => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = `static/icons/${item.name}.png`;
      img.alt = item.name;
      img.width = 32;
      img.height = 32;
      li.appendChild(img);
      pokemonTypesElement.appendChild(li);
    });
  }
});

// Hide autocomplete list when clicked outside
document.addEventListener('click', event => {
  if (!searchInput.contains(event.target)) {
    autocompleteList.innerHTML = '';
  }
});

// Radar Chart Function to create and render a radar chart
const makeRadarChart = function (stats, pokemonName) {
  const data = {
    labels: ['HP', 'Atk', 'Def', 'Sp. Atk', 'Sp. Def', 'Speed'],
    datasets: [{
      label: pokemonName,
      data: stats,
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderColor: 'rgba(255, 0, 0, 1)',
      borderWidth: 3
    }]
  };

  const config = {
    type: 'radar',
    data: data,
    options: {
      scales: {
        r: {
          ticks: {
            stepSize: 40,
            max: 255 // Max value
          }
        }
      },
      elements: {
        line: {
          borderWidth: 3
        }
      }
    },
  };

  const ctx = document.getElementById('stat-chart').getContext('2d');
  if (window.chart) {
    window.chart.destroy(); // Destroy existing chart if there is one
  }
  window.chart = new Chart(ctx, config); // Create or update the chart
}
