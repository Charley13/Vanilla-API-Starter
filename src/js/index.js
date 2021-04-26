import { DOMSelectors } from "./DOM";
import { genres } from "./genre";

const key = "3ceeb0be36d2113b833a10b0d26ff3e9";

const query = async function () {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=3ceeb0be36d2113b833a10b0d26ff3e9&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=4000&vote_average.gte=8&with_watch_monetization_types=flatrate`
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
    alert("hey something did a bad");
  }
};
query();
