module.exports = {
  getYears: () => {
    let years = [];
    for (let i = new Date().getFullYear(); i >= 1900; i--) {
      years.push(i);
    }

    years.unshift("Any");

    return years;
  },

  getSortValues: type => {
    return [
      "Popularity Desc",
      "Popularity Asc",
      type === "movie" ? "Release Date Desc" : "First Air Date Desc",
      type === "movie" ? "Release Date Asc" : "First Air Date Asc",
      "Vote Average Desc",
      "Vote Average Asc"
    ];
  },

  getGenres: (type, query = "") => {
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
  },

  getProfileImageUrl: profilePath => {
    const PROFILE_URL = "https://image.tmdb.org/t/p/w45";

    if (profilePath) return PROFILE_URL + profilePath;
    else return "https://via.placeholder.com/45x68/fff?text=No%20Image";
  }
};
