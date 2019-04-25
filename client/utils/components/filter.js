export const getYears = () => {
  let years = [];
  for (let i = new Date().getFullYear(); i >= 1900; i--) {
    years.push({ text: i, value: i });
  }

  years.unshift({ text: "Any", value: "" });

  return years;
};

export const getSortValues = type => {
  return [
    { text: "Popularity Desc", value: "popularity.desc" },
    { text: "Popularity Asc", value: "popularity.asc" },
    type === "movie"
      ? { text: "Release Date Desc", value: "release_date.desc" }
      : { text: "First Air Date Desc", value: "first_air_date.desc" },
    type === "movie"
      ? { text: "Release Date Asc", value: "release_date.asc" }
      : { text: "First Air Date Asc", value: "first_air_date.asc" },
    { text: "Vote Average Desc", value: "vote_average.desc" },
    { text: "Vote Average Asc", value: "vote_average.asc" }
  ];
};

export const getGenres = (type, query = "") => {
  let genres;

  if (type === "movie") {
    genres = [
      {
        id: 28,
        name: "Action"
      },
      {
        id: 12,
        name: "Adventure"
      },
      {
        id: 16,
        name: "Animation"
      },
      {
        id: 35,
        name: "Comedy"
      },
      {
        id: 80,
        name: "Crime"
      },
      {
        id: 99,
        name: "Documentary"
      },
      {
        id: 18,
        name: "Drama"
      },
      {
        id: 10751,
        name: "Family"
      },
      {
        id: 14,
        name: "Fantasy"
      },
      {
        id: 36,
        name: "History"
      },
      {
        id: 27,
        name: "Horror"
      },
      {
        id: 10402,
        name: "Music"
      },
      {
        id: 9648,
        name: "Mystery"
      },
      {
        id: 10749,
        name: "Romance"
      },
      {
        id: 878,
        name: "Science Fiction"
      },
      {
        id: 10770,
        name: "TV Movie"
      },
      {
        id: 53,
        name: "Thriller"
      },
      {
        id: 10752,
        name: "War"
      },
      {
        id: 37,
        name: "Western"
      }
    ];
  } else {
    genres = [
      {
        id: 10759,
        name: "Action & Adventure"
      },
      {
        id: 16,
        name: "Animation"
      },
      {
        id: 35,
        name: "Comedy"
      },
      {
        id: 80,
        name: "Crime"
      },
      {
        id: 99,
        name: "Documentary"
      },
      {
        id: 18,
        name: "Drama"
      },
      {
        id: 10751,
        name: "Family"
      },
      {
        id: 10762,
        name: "Kids"
      },
      {
        id: 9648,
        name: "Mystery"
      },
      {
        id: 10763,
        name: "News"
      },
      {
        id: 10764,
        name: "Reality"
      },
      {
        id: 10765,
        name: "Sci-Fi & Fantasy"
      },
      {
        id: 10766,
        name: "Soap"
      },
      {
        id: 10767,
        name: "Talk"
      },
      {
        id: 10768,
        name: "War & Politics"
      },
      {
        id: 37,
        name: "Western"
      }
    ];
  }

  if (query.trim().length > 0) {
    const regexStr = "(?=.*" + query.split(" ").join(")(?=.*") + ")";
    const searchRegex = new RegExp(regexStr, "gi");
    genres = genres.filter(genre => genre.name.match(searchRegex) !== null);
  }

  return genres;
};

export const getProfileImageUrl = profilePath => {
  const URL = "https://image.tmdb.org/t/p/w45";

  if (profilePath) return URL + profilePath;
  else return "https://via.placeholder.com/45x68/fff?text=No%20Image";
};
