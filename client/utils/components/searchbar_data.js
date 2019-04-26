import getPlaceholder from "./imagePlaceholder";

export const getTitle = media => {
  return (
    media.title || media.original_title || media.name || media.original_name
  );
};

export const getYear = media => {
  return (
    media.release_date? media.release_date.substring(0, 4) : "" || media.first_air_date? media.first_air_date.substring(0, 4): ""
  );
};

export const getImageUrl = media => {
  const POSTER_URL = "https://image.tmdb.org/t/p/w92";
  const PROFILE_URL = "https://image.tmdb.org/t/p/w185";

  if (media.poster_path) return POSTER_URL + media.poster_path;
  else if (media.profile_path) return PROFILE_URL + media.profile_path;
  else return getPlaceholder(50, 75, "No Image");
};

export const getUrl = media => {
  if (media.media_type === "movie") return `/movies?id=${media.id}`;
  else if (media.media_type === "tv") return `/series?id=${media.id}`;
  else if (media.media_type === "person") return `/person?id=${media.id}`;
};
