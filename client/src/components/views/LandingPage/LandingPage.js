import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import { Typography, Row } from 'antd';
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';
import Searchbox from './Sections/Searchbox'
// import Movielist from './Sections/Movielist';
const {Title} = Typography;

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    const [searchValue, setSearchValue] = useState('');

    
//fetch data from api
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
        
       
    }, [])

    const fetchMovies = (path) => {
         fetch(path)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setMovies([...Movies, ...response.results])
            setCurrentPage(response.page)
        })
    }

    const handleClick = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)

    }

   const getMovieRequest = async (searchValue) => {

    const url = `https://api.themoviedb.org/3/movie/${searchValue}?api_key=450039fa18a24d4904b6b3402bf63238`

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
        setMovies(responseJson.Search);
    }
};

    useEffect(() => {
        getMovieRequest(searchValue)
    }, [searchValue])
      
    

    return (
        
           <div style={{ width:'100', margin: 0}}>

                {Movies[0] &&  
                    <MainImage image={`${IMAGE_URL}/w1280${Movies[0].backdrop_path && Movies[0].backdrop_path}`}  title={Movies[0].original_title} text={Movies[0].overview}/>
                }
                {/*Search for movies*/}
                {/* <Searchbox searchValue={searchValue} setSearchValue={setSearchValue}/>;
                <div>;
                    <Movielist Movies={Movies}/>;
                </div>; */}
                
                    {/*body*/}
                     <div style={{width: '85%', margin: '1rem auto' }}>
                         <Title level={2}>Movies by latest</Title>
                         <hr/>

                        {/*Grid Cards*/}

                        <Row gutter={[16, 16]}>
                            {Movies && Movies.map((movie, index) => (
                                <React.Fragment key={index}>

                                    <GridCard
                                        image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                                        movieId={movie.id}
                                    
                                    
                                    />

                                </React.Fragment>
                            ))}


                        </Row>


                        {/*load More Button*/}
                        <br/>
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <button onClick={handleClick}>Load More</button>


                        </div>

                     </div>

           </div>
        
    )
}

export default LandingPage
