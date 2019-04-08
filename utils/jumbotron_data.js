export default data => {
  let medias;
  const movies = data.movies.filter(element => element.backdrop_path);
  const series = data.series.filter(element => element.backdrop_path);

  medias = movies.reduce((movie, v, i) => {
    return movie.concat(v, series[i]);
  }, []);

  return medias.length > 5 ? medias.splice(0, 5) : medias;
};
