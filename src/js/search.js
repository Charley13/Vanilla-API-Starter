import { DOMSelectors } from "./DOM";
import { genres } from "./genre";

const listen = function () {
  DOMSelectors.searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    DOMSelectors.grid.innerHTML = "";
    const searchParams = DOMSelectors.searchArea.value;
    const searchQuery = async function () {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=3ceeb0be36d2113b833a10b0d26ff3e9&language=en-US&query=${searchParams}&page=1&include_adult=false`
        );
        const data = await response.json();
        console.log(data.results);
        data.results.forEach((movie) => {
          let genreArray = [];
          const addGenre = function () {
            genres.forEach((element) => {
              if (movie.genre_ids.includes(element.id)) {
                genreArray.push(element.name);
                return genreArray;
              }
            });
          };
          addGenre();
          console.log(genreArray);
          DOMSelectors.grid.insertAdjacentHTML(
            "beforeend",
            `<div class="movie-card">
            <div class="movie-card-front">
              <img
                src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                alt=""
                class="poster"
              />
            </div>
            <div class="movie-card-back">
              <h3 class="movie-card-header">${movie.original_title}</h3>
              <div class="score-box">
                <p class="user-score">Community Score</p>
                <p class="user-score">${movie.vote_average}</p>
              </div>
      
              <div class="release-box">
                <p class="release-date">Released</p>
                <p class="release-date">${movie.release_date}</p>
              </div>
      
              <div class="movie-genres">
               ${genreArray}
              </div>
            </div>
          </div>`
          );
        });
      } catch (error) {
        console.log(error);
        alert("uh oh");
      }
    };
    searchQuery();
  });
};
listen();
