import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from "@mui/material/Paper";

import Divider from '@mui/material/Divider';

import MoviePoster from "../components/movieDetailsPoster.jsx";
import MovieTitle from "../components/movieDetailsTitle.jsx";
import MovieReleaseDate from "../components/movieDetailsReleaseDate.jsx"
import MovieOverview from "../components/movieDetailsOverview.jsx";
import MovieRating from "../components/movieDetailsRating";
import MovieGenres from "../components/movieDetailsGenres.jsx";
import {getMovieDetails} from "../api/tmdb.jsx";
import {useLoaderData} from "react-router-dom";
import MovieFavoriteIcon from "../components/favoriteIcon.jsx";
import {useQuery} from "@tanstack/react-query";
import {supabase} from "../api/supabaseClient.js";
import React, {useContext} from "react";
import {useFavoritesData} from "../hooks/useFavoritesData.js";
import Reviews from "../components/reviews.jsx"
import AppContext from "../context/appContext.jsx";
import {useGetUserFromSession} from "../hooks/useGetUserFromSession.js";


import SeeSimilarMoviesLink from "../components/similarMoviesLink";
import Cast from "../components/cast.jsx";
import Link from "@mui/material/Link";

export async function loader (props) {
    const movie = await getMovieDetails(props.params.id)
    return movie
}

function checkIfMovieInList (movie, dbData) {
    for(let i = 0; i < dbData.length; i++){
        if (dbData[i].item_id === movie.id){
            return true
        }
    }
}



export default function DetailsPage (props) {
    const movie = useLoaderData()
    const {user, setUser} = useContext(AppContext)

    useGetUserFromSession(setUser)

    return (
        <Container sx={{width: "100%", mt:"10%",}} >
            <Paper   component="div" sx={{pt:5}}>
                <Grid  container spacing={2}sx={{m:3}} >
                    <Grid xs={12} sm={6} >
                        <MoviePoster poster_path={movie.poster_path} />
                    </Grid>
                    <Grid xs={12} sm={6}>
                        <MovieTitle title={movie.title} />
                        <MovieReleaseDate release_date={movie.release_date} />
                        <MovieOverview overview={movie.overview} />
                        <MovieRating vote_average={movie.vote_average} vote_count={movie.vote_count} />
                        <Divider sx={{py:2}} />
                        <MovieGenres genres={movie.genres} />
                        <Divider sx={{py:2}} />
                        <MovieFavoriteIcon type={'movie'} movie={movie} />
                        <SeeSimilarMoviesLink movie={movie} />
                        <br/>
                        <Link href={`/movie/${movie.id}/cast`} > Cast</Link>
                    </Grid>
                </Grid>

            </Paper>
            <Paper>
                <Reviews movie={movie}/>
            </Paper>
        </Container>

    )
}