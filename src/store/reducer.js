import * as actionTypes from './actionsType'


const initialState = {

  movies: null,
  searchMovies:null,
  showAddMovieModal: false,
  showDeleteModal: false,
  deletedMovieId: "",
  showEditModal: false,
  isMovieNameExists: false,
  

  updatedMovie:null,
 

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setMoviesSuccess: return setMoviesSuccess(state, action); break;
    case actionTypes.Add_movie_success: return addMovieSuccess(state, action); break;
    case actionTypes.Add_movie_fail: return addMovieFail(state, action); break;
    case actionTypes.cancel_addMovieModal: return cancel_addMovieModal(state, action); break;
    case actionTypes.show_addMovieModal:return show_addMovieModal(state, action); break;
    case actionTypes.remove_movie: return removeMovie(state, action); break;
    case actionTypes.show_DeleteModal:return show_DeleteModal(state, action); break;
    case actionTypes.cancel_DeleteModal:return cancel_DeleteModal(state, action); break;
    case actionTypes.update_movie_fail: return updateMovieFail(state, action); break;
    case actionTypes.update_movie_success: return updateMovieSuccess(state, action); break;
    case actionTypes.show_Edit_Modal:return showEditModal(state,action);break;
    case actionTypes.cancel_showEditModal:return cancel_showEditModal(state,action);break;
    case actionTypes.remove_NameExistsMessage:return remove_NameExistsMessage(state,action);break;
    case actionTypes.SearchMovies:return SearchMovies(state,action);break;
    default: return state;
  }

}

const SearchMovies = (state,action) =>{
  return {
    ...state,
    searchMovies: action.movies,
  };
}

const remove_NameExistsMessage = (state,action) =>{
  return {
    ...state,
    isMovieNameExists: false,
  };
}


const cancel_DeleteModal = (state,action) =>{
  return {
    ...state,
    showDeleteModal: false
  };
}

const show_DeleteModal = (state,action) =>{
  return {
    ...state,
    showDeleteModal: true,
    deletedMovieId: action.movieId
  };
}

const show_addMovieModal = (state,action) =>{
  return {
    ...state,
    showAddMovieModal: true
  };
}

const cancel_showEditModal = (state,action) =>{
  return {
    ...state,
    showEditModal: false
  };
}

const showEditModal = (state,action) =>{
  const movie = state.movies[action.mIndex];
  return {
    ...state,
    showEditModal: true,
    updatedMovie: action.movie
  };
}

const cancel_addMovieModal = (state, action) => {
  return {
    ...state,
    showAddMovieModal: false,
    isMovieNameExists: false
  };
}

const setMoviesSuccess = (state, action) => {
  return {
    ...state,
    movies: action.moviesList,
    searchMovies: action.moviesList,
  };
}

const updateMovieSuccess = (state, action) => {
  return {
    ...state,
    movies: action.moviesList,
    showEditModal: false,
    searchMovies:action.moviesList
  };
}

const updateMovieFail = (state, action) => {
  return {
    ...state,
    isMovieNameExists: true,
    showEditModal: false
  };
}

const removeMovie = (state, action) => {
  return {
    ...state,
    movies: state.movies.filter(movie => movie.id !== state.deletedMovieId),
    showDeleteModal: false,
    searchMovies:state.movies.filter(movie => movie.id !== state.deletedMovieId),
  };
}


const addMovieFail = (state, action) => {
  return {
    ...state,
    isMovieNameExists: true,
    showAddMovieModal: false
  };

}

const addMovieSuccess = (state, action) => {
  return {
    ...state,
    movies: action.newMoviesList,
    showAddMovieModal: false,
    searchMovies:action.newMoviesList
  };

}




export default reducer;