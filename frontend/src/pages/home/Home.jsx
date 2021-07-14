import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import MovieList from '../../components/movieList/MovieList'

const movieList = ["Award-Winning", "Crime", "Action", "Documentaries", "Horror", "Sci-Fi", "Romance", "Children & Family", "Anime", "Fantasy"]

const Home = () => {
  return (
    <div className="bg-netflix-black overflow-hidden">
      <Navbar />
      <Featured type="movie"/>
      {movieList.map((movieTitle, index) => {
        return (
          <MovieList key={index} title={movieTitle}/>
        )
      })}
    </div>
  )
}

export default Home
