export const getTitle = media => {
  return (
    media.name || media.original_name || media.title || media.original_title
  );
};

export const getImageUrl = media => {
  const POSTER_URL = "https://image.tmdb.org/t/p/w92";
  const PROFILE_URL = "https://image.tmdb.org/t/p/w185";

  if (media.poster_path) return POSTER_URL + media.poster_path;
  else if (media.profile_ath) return PROFILE_URL + media.profile_ath;
  else return "https://via.placeholder.com/50x75/fff?text=No%20Image";
};

export const getUrl = media => {
  if (media.media_type === "movie") return `movie?id=${media.id}`;
  else if (media.media_type === "tv") return `series?id=${media.id}`;
  else if (media.media_type === "person") return `person?id=${media.id}`;
};
