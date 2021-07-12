import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'

const Home = () => {
  return (
    <div className="bg-netflix-black">
      <Navbar />
      <Featured type="movie"/>
    </div>
  )
}

export default Home
