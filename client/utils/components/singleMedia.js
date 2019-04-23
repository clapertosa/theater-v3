import { default as getPlaceholder } from "../../utils/components/imagePlaceholder";

const BACKDROP_PATH_URL = "https://image.tmdb.org/t/p/w1400_and_h450_face";
const POSTER_PATH_URL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";
const CAST_PROFILE_PATH_URL = "https://image.tmdb.org/t/p/w138_and_h175_face";
const IMAGE_CARD_PATH_URL = "https://image.tmdb.org/t/p/w780";
const RECOMMENDATIONS_POSTER_PATH = "https://image.tmdb.org/t/p/w185";

export const sortData = data => {
  let sortedData = {};

  // Title
  sortedData.title =
    data.title || data.original_title || data.name || data.original_name;
  // Media Type
  sortedData.mediaType = data.media_type;
  // Backdrop
  sortedData.backdropPath = data.backdrop_path
    ? BACKDROP_PATH_URL + data.backdrop_path
    : "/static/images/logo.svg";
  // Poster
  sortedData.posterPath = data.poster_path
    ? POSTER_PATH_URL + data.poster_path
    : getPlaceholder(300, 450, "2b2d42", "edf2f4", "No Poster");
  // Overview
  sortedData.overview = data.overview || "";
  // Release Date
  sortedData.releaseDate = data.release_date || data.first_air_date || "TBA";
  // Runtime
  sortedData.runtime = data.runtime
    ? convertRuntime(data.runtime)
    : convertRuntime(data.episode_run_time);
  // Genres
  sortedData.genres = getGenresNames(data.genres) || "";
  // Director
  sortedData.director = getDirectorName(data.credits.crew);
  // Average Vote
  sortedData.voteAverage = data.vote_average;
  // Vote Count
  sortedData.voteCount = data.vote_count;
  // Homepage
  sortedData.homepage = data.homepage;
  // External IDs
  sortedData.externalIds = data.external_ids;
  // Cast
  sortedData.cast = data.credits.cast.map(member => {
    if (!member.profile_path) {
      member.profile_path = getPlaceholder(
        138,
        175,
        "2b2d42",
        "edf2f4",
        "No picture"
      );
    } else {
      member.profile_path = CAST_PROFILE_PATH_URL + member.profile_path;
    }
    return member;
  });
  // Images
  sortedData.images = data.images.backdrops.map(image => {
    image.file_path = IMAGE_CARD_PATH_URL + image.file_path;
    return image;
  });
  // Videos
  sortedData.videos = data.videos.results;
  // Recommendations
  sortedData.recommendations = data.recommendations.results.map(recommended => {
    recommended.poster_path =
      RECOMMENDATIONS_POSTER_PATH + recommended.poster_path;
    return recommended;
  });

  return sortedData;
};

const getGenresNames = genres => {
  let extractedGenres = "";
  for (let i = 0; i < genres.length; i++) {
    if (i < genres.length - 1) {
      extractedGenres += genres[i].name + ", ";
    } else {
      extractedGenres += genres[i].name;
    }
  }
  return extractedGenres;
};

const getDirectorName = crew => {
  let director = crew.filter(
    member =>
      member.department.toLowerCase() === "director" ||
      member.department.toLowerCase() === "directing"
  );

  return director.length > 0 ? director[0].name : "";
};

export const convertRuntime = runtime => {
  let convertedRuntime = "";
  let hours = 0;
  let minutes = 0;

  if (!runtime) {
    return convertedRuntime;
  }

  if (runtime <= 59 && runtime > 0) convertedRuntime = runtime + "min";
  else if (runtime >= 60) {
    let currentRuntime = runtime;
    while (currentRuntime >= 60) {
      currentRuntime -= 60;
      hours += 1;
    }
    minutes = currentRuntime;
    convertedRuntime = `${hours}h${minutes !== 0 ? ` ${minutes}min` : ""}`;
  }

  return convertedRuntime;
};
