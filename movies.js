const axios = require('axios');
const NodeCache = require( "node-cache" );
const moviesCache = new NodeCache();

class Movie{
    constructor(
        title,
        overview
      ) {
        this.title = title;
        this.overview = overview;
      }
}

exports.movies = async function (req, res) {
  let searchQuery = req.query.searchQuery;
  if(moviesCache.get(searchQuery) != undefined){
    res.send(moviesCache.get(searchQuery));
    console.log('data already enterd');
  }else{
      let moviesAPI= await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}&page=1&include_adult=false`);
      console.log(moviesAPI);
      let movieData = moviesAPI.data
      if(!movieData){
          let err = Error("500 Server Error");
          err.status = 500;
          next(err);
      }
      moviesCache.set(searchQuery,movieData, 3600);
      res.send(movieData);

    }

};