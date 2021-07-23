const getYouTubeID = require("get-youtube-id");

exports.populateYoutubeThumbnail = (movies) => {
  var newMovies = []
  for (let i = 0; i < movies.length; i++) {
    var movie = movies[i];
    const url = movie.trailerURL;
    const id = getYouTubeID(url);
    const yt = "http://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
    movie.highlight = yt;
    newMovies.push(movie)
  }
  return newMovies;
};
