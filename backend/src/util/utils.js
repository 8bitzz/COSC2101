const getYouTubeID = require("get-youtube-id");

exports.populateYoutubeThumbnail = (movies) => {
  for (const movie of movies) {
    const url = movie.trailerURL;
    const id = getYouTubeID(url);
    const yt = "http://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
    movie.highlight = yt;
  }
  return movies;
};
