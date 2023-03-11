const baseUrl = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/`;
const search = document.getElementById("store_nav_search_term");

// loading screen
window.addEventListener("load", function () {
  document.getElementById("loader").style.display = "none";
  document.getElementById("page-frame").style.display = "block";
});

//get All games

const getAllGames = async () => {
  try {
    const url = `${baseUrl}games`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//get list of games: features or search

const getGames = async () => {
  let url = "";
  try {
    if (search.value) {
      url = `${baseUrl}games?q=${search.value}`;
    } else {
      url = `${baseUrl}features`;
    }
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//render games

const renderGames = async () => {
  try {
    const data = await getGames();
    const gameList = document.getElementById("game-list");
    gameList.innerHTML = "";
    data.data.forEach((game) => {
      const gameDiv = document.createElement("div");
      if (game.price === 0) {
        gameDiv.innerHTML = `<div class="game-wrapper">
            <div class="game-cover">
              <img class="game_header_image_full" src="${game["header_image"]}" data-id="${game.appid}" border="0">
              <div class="game-info">
                <p class="game-title">${game.name}</p>
                <p class="game-price">FREE</p>
              </div>
            </div>
          </div>`;
      } else {
        gameDiv.innerHTML = `<div class="game-wrapper">
              <div class="game-cover">
                <img class="game_header_image_full" src="${game["header_image"]}" data-id="${game.appid}" border="0">
                <div class="game-info">
                  <p class="game-title">${game.name}</p>
                  <p class="game-price">$${game.price}</p>
                </div>
              </div>
            </div>`;
      }
      gameList.appendChild(gameDiv);
    });
  } catch (error) {
    console.log("error", error);
  }
};

document.getElementById("search-btn").addEventListener("click", () => {
  renderGames();
});

//get list of all genres

const getGenres = async () => {
  try {
    const url = `${baseUrl}genres`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// get games by genre
const getGamesByGenre = async (genre) => {
  try {
    const url = `${baseUrl}games?genres=${genre}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//render games by genre
const renderGamesByGenre = async (genre) => {
  try {
    const data = await getGamesByGenre(genre);
    const gameList = document.getElementById("game-list");
    gameList.innerHTML = "";
    data.data.forEach((game) => {
      const gameDiv = document.createElement("div");
      // gameDiv.setAttribute("onclick", "renderNewGamePage()");
      if (game.price === 0) {
        gameDiv.innerHTML = `<div class="game-wrapper">
        <div class="game-cover">
          <img class="game_header_image_full" src="${game["header_image"]}" data-id="${game.appid}" border="0">
          <div class="game-info">
            <p class="game-title">${game.name}</p>
            <p class="game-price">FREE</p>
          </div>
        </div>
      </div>`;
      } else {
        gameDiv.innerHTML = `<div class="game-wrapper">
          <div class="game-cover">
            <img class="game_header_image_full" src="${game["header_image"]}" data-id="${game.appid}" border="0">
            <div class="game-info">
              <p class="game-title">${game.name}</p>
              <p class="game-price">$${game.price}</p>
            </div>
          </div>
        </div>`;
      }
      gameList.appendChild(gameDiv);

      // add event listener for new single page
      gameDiv.addEventListener("click", (e) => {
        const gameIdValue = e.target.getAttribute("data-id");
        renderNewGamePage(gameIdValue);
      });
    });
  } catch (error) {
    console.log("error", error);
  }
};

//render genres
const renderGenres = async () => {
  try {
    const data = await getGenres();
    const genreCategory = document.getElementById("category");
    genreCategory.innerHTML = "";
    data.data.forEach((genre) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.innerHTML = `<div class="category-wrapper">
      <div class="category-name">${genre.name}</div>
      </div>`;
      genreCategory.appendChild(categoryDiv);

      //add event listener for each genre
      categoryDiv.addEventListener("click", (e) => {
        let genreValue = e.target.textContent;
        renderGamesByGenre(genreValue);
        //change home page title
        const homePageTitle = document.getElementById("page-title");
        homePageTitle.innerHTML = `${genreValue} Games`;
      });
    });
  } catch (error) {
    console.log("error", error);
  }
};

// Get game details

const getGameDetails = async (id) => {
  try {
    const url = `${baseUrl}single-game/${id}`;
    const res = await fetch(url);
    const dataGame = await res.json();
    return dataGame;
  } catch (error) {
    console.log("error", error);
  }
};

//render single game page

const renderNewGamePage = async (id) => {
  try {
    const data = await getGameDetails(id);
    const gameArea = document.getElementById("game-area");
    gameArea.innerHTML = `
    <div class="home-page-content">
      <h2 class="home-page-title" id="page-title">${data.data.name}</h2>
    </div>`;
    const gameField = document.createElement("div");
    gameField.setAttribute("id", "single-game-field");
    gameField.classList.add("game-field");
    gameField.innerHTML = ` <div id="game-list" class="game-list">
    <div class="game-container">
        <div class="img-container">
            <img src="${data.data["header_image"]}" alt="${data.data.name}">
        </div>
        <div class="info-container">
            <div class="game-details">
                <h3 class="game-title">${data.data.name}</h3>
                <p class="game-description">Description: ${data.data.description}</p>
            </div>
            <div class="game-more-information">
                <p class="release-date">Release date: ${data.data["release_date"]}</p>
                <p class="developer">Developer: ${data.data.developer}</p>
                <p class="publisher">Publisher: ${data.data.developer}</p>
            </div>
        </div>
    </div>
    <div class="tags-container">
        <div class="tag-intro">Popular user-defined tags for this product:</div>
        <div class="tags" id="tags">
            <div class="tag">${data.data.steamspy_tags[0]}</div>
            <div class="tag">${data.data.steamspy_tags[1]}</div>
        </div>  
    </div>
    </div>`;
    // gameField.appendChild(gameList);
    gameArea.appendChild(gameField);

    const tagsArea = document.getElementById("tags");
    console.log("tags area", tagsArea);
    tagsArea.innerHTML = "";
    data.data["steamspy_tags"].forEach((element) => {
      const tagsDiv = document.createElement("div");
      tagsDiv.classList.add("tag");
      tagsDiv.textContent = `${element}`;
      tagsArea.appendChild(tagsDiv);
    });

    // add event listener for game by tags
    gameField.addEventListener("click", (e) => {
      const gameTagValue = e.target.textContent;
      renderGamesByTag(gameTagValue);
    });
  } catch (error) {
    console.log("error", error);
  }
};

//get tag list

const getGamesByTag = async (tag) => {
  try {
    const url = `${baseUrl}games?steamspy_tags=${tag}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

//render game by tag
const renderGamesByTag = async (tag) => {
  try {
    const data = await getGamesByTag(tag);
    const gameArea = document.getElementById("game-area");
    gameArea.classList.add("responsive-page");
    gameArea.innerHTML = `<div class="responsive-page responsive-page-content">
    <h2 class="responsive-page responsive-page-title" id="page-title">
     ${tag} GAMES
    </h2>
    </div>`;
    const gameList = document.createElement("div");
    gameList.setAttribute("id", "game-list");
    gameList.classList.add("responsive-page", "game-list");
    gameArea.appendChild(gameList);
    data.data.forEach((game) => {
      const gameAreaDiv = document.createElement("div");
      if (game.price === 0) {
        gameAreaDiv.innerHTML = `
          <div class="responsive-page game-wrapper">
            <div class="responsive-page game-cover">
              <img class="responsive-page game_header_image_full" src="${game["header_image"]}" data-id="${game.appid}" border="0">
              <div class="responsive-page game-info">
                <p class="responsive-page game-title">${game.name}</p>
                <p class="responsive-page game-price">FREE</p>
              </div>
            </div>
          </div>`;
      } else {
        gameAreaDiv.innerHTML = `
          <div class="responsive-page game-wrapper">
            <div class="responsive-page game-cover">
              <img class="responsive-page game_header_image_full" src="${game["header_image"]}" data-id="${game.appid}" border="0">
              <div class="responsive-page game-info">
                <p class="responsive-page game-title">${game.name}</p>
                <p class="responsive-page game-price">$${game.price}</p>
              </div>
            </div>
          </div>`;
      }
      gameList.appendChild(gameAreaDiv);

      // add event listener for new single page
      const gameDiv = gameAreaDiv.childNodes[0];
      gameDiv.addEventListener("click", (e) => {
        const gameIdValue = e.target.getAttribute("data-id");
        renderNewGamePage(gameIdValue);
      });
    });
  } catch (error) {
    console.log("error", error);
  }
};

// render games from all game list
const renderGamesAll = async () => {
  try {
    const data = await getAllGames();
    const gameList = document.getElementById("game-list");
    gameList.innerHTML = "";
    data.data.forEach((game) => {
      const gameDiv = document.createElement("div");
      if (game.price === 0) {
        gameDiv.innerHTML = `<div class="game-wrapper">
        <div class="game-cover">
          <img class="game_header_image_full" src="${game["header_image"]}" data-id="${game.appid}" border="0">
          <div class="game-info">
            <p class="game-title">${game.name}</p>
            <p class="game-price">FREE</p>
          </div>
        </div>
      </div>`;
      } else {
        gameDiv.innerHTML = `<div class="game-wrapper">
          <div class="game-cover">
            <img class="game_header_image_full" src="${game["header_image"]}" data-id="${game.appid}" border="0">
            <div class="game-info">
              <p class="game-title">${game.name}</p>
              <p class="game-price">$${game.price}</p>
            </div>
          </div>
        </div>`;
      }
      gameList.appendChild(gameDiv);

      // add event listener for single game details
      gameDiv.addEventListener("click", (e) => {
        const gameIdValue = e.target.getAttribute("data-id");
        renderNewGamePage(gameIdValue);
      });
    });
  } catch (error) {
    console.log("error", error);
  }
};

renderGenres();
renderGamesAll();
