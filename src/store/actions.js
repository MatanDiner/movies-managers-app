import * as actionTypes from './actionsType'
import axios from 'axios'


export const SearchMovies =(movies) =>{
return{
    type:actionTypes.SearchMovies,
    movies:movies
}
}

export const remove_NameExistsMessage = (mId) =>{
   
    return{
        type: actionTypes.remove_NameExistsMessage 
        }
}

export const cancel_DeleteModal = (mId) =>{
   
    return{
        type: actionTypes.cancel_DeleteModal
        }
}

export const show_DeleteModal = (mId) =>{
   
    return{
         type: actionTypes.show_DeleteModal,
         movieId: mId  
        }
}


export const show_addMovieModal = () =>{
   
    return{
         type: actionTypes.show_addMovieModal  
        }
}


export const cancel_showEditModal = () =>{
   
    return{
         type: actionTypes.cancel_showEditModal 
        }
}

export const showEditModal = (movie) =>{
   
    return{
        type: actionTypes.show_Edit_Modal,
        movie:movie
    }
}

export const cancel_addMovieModal = () =>{
    return{
        type:actionTypes.cancel_addMovieModal
    }
}


const updateMovieFail = () => {
    return {
        type: actionTypes.update_movie_fail
    }
}

const updateMovieSuccess = (moviesList) => {
    return {
        type: actionTypes.update_movie_success,
        moviesList:moviesList
    }
}


export const updateMovie = (movieUpdated, moviesList) => {
    return dispatch => {
        const Title = movieUpdated.Title.value.replace(/[^\w\s]/gi, '').trim();
        const titleArr = Title.split(" ");
        let nameCapitalized = "";
        for (let i = 0; i < titleArr.length; i++) {
            if (i > 0) {
                nameCapitalized += " ";
            }
            nameCapitalized += titleArr[i].charAt(0).toUpperCase() + titleArr[i].toLowerCase().slice(1);
        }
        const moviesArr = moviesList.filter(movie => (movie.Title === nameCapitalized && movie.id !== movieUpdated.id));
        if (moviesArr.length > 0)
            dispatch(updateMovieFail());

        else {

            let updatedMovieIndex = null;
            for(let i in moviesList){
                if(moviesList[i]["id"] === movieUpdated.id){
                    updatedMovieIndex = i;
                }
            }

            const newMovieUpdated = {
                id: movieUpdated.id,
                Title: nameCapitalized,
                Year: movieUpdated.Year.value,
                Runtime: movieUpdated.Runtime.value,
                Genre: movieUpdated.Genre.value,
                Director: movieUpdated.Director.value,
                img:moviesList[updatedMovieIndex].img
            }
            
            moviesList.splice(updatedMovieIndex,1,newMovieUpdated);

            dispatch(updateMovieSuccess(moviesList));
            
        }

    }
}




export const removeMovie = () => {
    return {
        type: actionTypes.remove_movie
    }
}


const addMovieFail = () => {
    return {
        type: actionTypes.Add_movie_fail
    }
}

const addMovieSuccess = (newMoviesList) => {
    return {
        type: actionTypes.Add_movie_success,
        newMoviesList: newMoviesList
    }
}

export const addMovie = (movie, moviesList) => {

    return dispatch => {

        let TitleName = movie.Title.value.replace(/[^\w\s]/gi, '');

        const TitleNameArr = TitleName.split(" ");
        let newName = "";
        for (let i = 0; i < TitleNameArr.length; i++) {
            if (i > 0) {
                newName += " ";
            }
            newName += TitleNameArr[i].charAt(0).toUpperCase() + TitleNameArr[i].toLowerCase().slice(1);
        }


        const movieArr = moviesList.filter(movie => movie.Title === newName);
        if (movieArr.length > 0)
            dispatch(addMovieFail());

        else {

            const newMovie = {

                id: (parseInt(moviesList[moviesList.length - 1].id) + 1).toString(),
                Title: newName,
                Year: movie.Year.value,
                Runtime: movie.Runtime.value,
                Genre: movie.Genre.value,
                Director: movie.Director.value,
                img: "noImg"
            }

            const newMoviesList = moviesList.concat(newMovie)
            dispatch(addMovieSuccess(newMoviesList));

        }


    }

}


const setMoviesSuccess = (data) => {
    return {
        type: actionTypes.setMoviesSuccess,
        moviesList: data
    }

}

export const setMovies = () => {
    return dispatch => {
        axios.get('https://movies-managers-app.firebaseio.com/movies.json')
            .then(response =>{
                dispatch(setMoviesSuccess(response.data))
            })
            .catch(error => {
                console.error(error)
            }
            );
    }

}
