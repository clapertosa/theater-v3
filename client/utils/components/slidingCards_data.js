export default data => {
  const medias = data.filter(element => element.backdrop_path);

  return medias;
};
