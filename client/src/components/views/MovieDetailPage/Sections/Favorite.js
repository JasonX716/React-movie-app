import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { Button } from 'antd';


function Favorite(props) {

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited]= useState(false)

     const variables = {
            userFrom: props.userFrom ,
            movieId: props.movieId,
            movieTitle: props.movieInfo.original_title ,
            movieImage: props.movieInfo.backdrop_path, 
            movieRunTime: props.movieInfo.runtime 
        }

    useEffect(() => {

      axios.post('/api/favorite/favoriteNumber', variables)
            .then(response => {
                if (response.data.success) {
                    setFavoriteNumber(response.data.favoriteNumber)
                } else {
                    alert('Failed to get Favorite Number')
                }
            })

        axios.post('/api/favorite/favorited', variables)
            .then(response => {
                if (response.data.success) {
                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get Favorite Information')
                }
            })
    
    }, [])

    const onClickFavorite = () => {
        if (Favorited) {
            //when we are already favorited 
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })

        } else {
            // when we are not favorited yet

            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Failed to Add To Favorite')
                    }
                })
        }
    }


    return (
        <div>
            <button onClick={onClickFavorite}> {Favorited ? " Remove from Favorites":"Add to Favorites"} {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite;
