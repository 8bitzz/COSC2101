import "./movieList.css";

const movies = [{
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
},
{
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
},
{
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
}, {
  imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOE8BkcaKw4AEzl86cvEk12xlqTOA12txqdbdL_7VFhfoxkT1IOfPRHkd9gkR25ZPu9Mo&usqp=CAU",
  length: "1 hour 14 mins",
  limit: "16+",
  year: "1999",
  desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt, laudantium ea sapiente commodi esse atque soluta itaque",
  genre: "Action"
},  
]

const MovieList = ({ title }) => {
  return (
    <div className="w-full mt-4">
      <span className="text-white text-2xl font-bold ml-12">{title}</span>
      <div className="wrapper text-white relative">
        <div className="sliderArrow absolute inset-y-0 left-0 z-40 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mt-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
        <div className="movieContainer">
          {movies.map((movie, index) => {
            return (
              <MovieItem movie={movie} key={index} />
            );
          })}
        </div>
        <div className="sliderArrow absolute inset-y-0 right-0 z-40 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mt-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

const MovieItem = ({movie}) => {
  return (
    <div className="bg-gray-50 w-60 h-36 mr-2 movieItem">
      <img
        src={movie.imgSrc}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default MovieList;
