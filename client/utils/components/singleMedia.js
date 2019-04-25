export const sortData = data => {
  let sortedData = {};

  // Title
  sortedData.title =
    data.title || data.original_title || data.name || data.original_name;
  // Media Type
  sortedData.mediaType = data.media_type;
  // Backdrop
  sortedData.backdropPath = data.backdrop_path
    ? data.backdrop_path
    : "/static/images/logo.svg";
  // Poster
  sortedData.posterPath = data.poster_path;
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
  sortedData.cast = data.credits.cast;
  // Images
  sortedData.images = data.images.backdrops;
  // Videos
  sortedData.videos = data.videos.results.filter(
    video => video.site.toLowerCase() === "youtube"
  );
  // Recommendations
  sortedData.recommendations = data.recommendations.results;

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
      member.department.toLowerCase() === "production" ||
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
