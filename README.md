# Project Epsilon 4 - PokeStats Interactive Guide
*Project Three Repository for Group Four, designated codename Epsilon Four*


## Background
Upon assignment of the project's requirements, we set out to create a dashboard sourced from a ***JSON*** file containing Pokemon data. The dashboard would be a web application that would allow users to search for Pokemon and display their stats, types, and abilities, along with a stats comparison feature. It is essentially a stats-centered Pokedex for competitive team building in the Pokemon games.

## Component Breakdown
Though the core of the project consists of the ***HTML***, ***CSS***, and ***JavaScript*** files, this section will cover every component of the project, listed in the following subcategories:
* *[HTML](#HTML)*
* *[CSS](#CSS)*
* *[JavaScript](#JavaScript)*
* *[JSON](#JSON)*
* *[Jupyter Notebook](#Jupyter)*
* *[SQLite](#SQLite)*
* *[Directories](#Directories)*

#### HTML
The `index.html` file serves as the main structure for the Pokémon statistics guide. The page is split into distinct sections, including a welcome header, a search bar, a detailed Pokémon view with sprites and stats, a comparison section, and a footer. The visuals are enhanced with ***Bootstrap 4.3.1*** for responsive design and ***Font Awesome 4.7.0*** for icons. Interactive charts are enabled by integrating ***Chart.js***, ***D3.js***, and ***Plotly*** libraries, providing detailed graphical representations of Pokémon data. Additionally, ***jQuery***, ***Popper.js***, and ***Bootstrap's JS*** are utilized to add interactivity to the page. This unique combo of libraries makes for an interactive and visually appealing Pokémon guide that adapts to various screen sizes.

#### CSS
The `style.css` file provides the custom styling that brings the Pokémon statistics guide to life. It defines the specific layout, colors, typography, and transitions that align with the Pokémon theme. In combination with **Bootstrap 4.3.1**, the CSS ensures a sleek and responsive user interface across various devices. Whether it's the fancy fonts, Pokémon-specific icons, or dynamic charts, the ***CSS*** works in unison with the ***HTML*** and ***JavaScript*** to create a visually engaging and intuitive experience for Pokémon enthusiasts. From the Pokeball buttons to the dragon icons, every pixel is crafted to immerse users in the Pokémon world.

#### JavaScript
The `script.js` file is the backbone of the Pokémon statistics guide. It contains the code that enables the interactive features of the page, including the search bar, the Pokémon comparison, and the charts. The ***JavaScript*** is powered by ***D3.js***, ***Plotly***, and ***Chart.js*** libraries, which are used to create the interactive charts and graphs. The ***JavaScript*** also utilizes ***jQuery*** and ***Bootstrap's JS*** to add interactivity to the page. The ***JavaScript*** is the glue that holds the page together, allowing users to search for Pokémon, compare their stats, and view their data in a variety of charts.

#### JSON
The `pokemon.json` file is the source of the Pokémon data. It contains the data for 890 Pokémon (Generation 1 to 8), including their names, types, abilities, and stats. The ***JSON's*** data is sourced from [this GitHub repository](https://github.com/DetainedDeveloper/Pokedex/tree/master), which itself was sourced from webscraping. The ***JSON*** is parsed and filtered using ***Python*** in the ***Jupyter Notebook***, and the resulting data is stored in a ***SQLite*** database. The ***JSON*** is the foundation of the project, providing the data that is used to create the Pokémon statistics guide.

#### Jupyter
The `databook.ipynb` file is the ***Jupyter Notebook*** that parses and filters the ***JSON*** data. It utilizes ***Python*** and ***Pandas*** to read the ***JSON*** file and store the data in a ***SQLite*** database. The ***Jupyter Notebook*** is the first step in the data pipeline, taking the raw ***JSON*** data and converting it into a ***SQLite*** database that can be accessed by the ***JavaScript***. The ***Jupyter Notebook*** is the first step in the data pipeline, taking the raw ***JSON*** data and converting it into a ***SQLite*** database as per the assignment requirements.

#### SQLite
The `pokedex.db` file is the ***SQLite*** database that stores the Pokémon data. It contains the data for 890 Pokémon (Generation 1 to 8), including their names, types, abilities, and stats. The ***SQLite*** database is created by the ***Jupyter Notebook***, the process of which is described above.

#### Directories
The directories are as follows:
* `master` - Contains this `README.md`, `index.html`, `databook.ipynb`, `pokedex.db`, and the `static` directory.
* `static` - Contains the `css`, `data`, `icons`, and `js` directories.
* `css` - Contains the `style.css` file.
* `data` - Contains the `pokemon.json` file.
* `icons` - Contains all the image files used in this project.
* `js` - Contains the `script.js` file.

## Usage
This webpage is hosted on ***GitHub Pages*** and can be accessed [here](https://LM95A1.github.io/Project-Epsilon-4). The webpage can also be accessed locally by cloning this repository and opening the `index.html` file and utilizing ***VS Code's Live Server*** extension.