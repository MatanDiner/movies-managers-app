import * as actionTypes from './actions'


const initialState ={

    movies : []
    ,
    showAddMovieModal:false,
    showDeleteModal:false,
    deletedMovieId:"",
    showEditModal:false,
    movie:{
        id:"",
        Title:"",
        Year:"",
        Runtime:"",
        Genre:"",
        Director:"",
    },
    isMovieNameExists:false,
    lastId:0
} 

const reducer = (state = initialState,action) =>{
switch(action.type){
    case actionTypes.Add_movie:
   
    let TitleName = action.movieObj.Title.value.replace(/[^\w\s]/gi, '');
    
    const TitleNameArr = TitleName.split(" ");
    let newName = "";
    for(let i=0;i<TitleNameArr.length;i++){
        if(i>0){
            newName += " ";
        }
        newName += TitleNameArr[i].charAt(0).toUpperCase() + TitleNameArr[i].toLowerCase().slice(1) ;
    }

    const movieArr = state.movies.filter(movie => movie.Title === newName);
    if(movieArr.length>0)
     return{
        ...state,
        isMovieNameExists:true,
        showAddMovieModal:false
     };
     else{

    const newMovie = {

        id:  (parseInt(state.lastId) + 1).toString() ,
        Title:newName,
        Year:action.movieObj.Year.value,
        Runtime:action.movieObj.Runtime.value,
        Genre:action.movieObj.Genre.value,
        Director:action.movieObj.Director.value,
        img:"assets/images/noImg.jpg"
        }
      return{
        ...state,
        movies:state.movies.concat(newMovie),
        showAddMovieModal:false,
        lastId:newMovie.id
      };
    }
      case actionTypes.cancel_addMovieModal:
      return{
          ...state,
          showAddMovieModal:false,
          isMovieNameExists:false
      };
      case actionTypes.show_addMovieModal:
      return{
          ...state,
          showAddMovieModal:true
      };
    case actionTypes.remove_movie:
      return{
        ...state,  
        movies:state.movies.filter(movie => movie.id !== state.deletedMovieId),
        showDeleteModal:false
      };
      case actionTypes.show_DeleteModal:
      return{
         ...state,
         showDeleteModal:true,
         deletedMovieId:action.movieId
      };
      case actionTypes.cancel_DeleteModal:
      return{
         ...state,
         showDeleteModal:false
      };
      case actionTypes.update_movie:

        const Title = action.movieUpdated.Title.value.replace(/[^\w\s]/gi, '')

        const titleArr = Title.split(" ");
        let nameCapitalized = "";
        for(let i=0;i<titleArr.length;i++){
            if(i>0){
                nameCapitalized += " ";
            }
           nameCapitalized += titleArr[i].charAt(0).toUpperCase() + titleArr[i].toLowerCase().slice(1) ;
        }


      const moviesArr = state.movies.filter(movie => (movie.Title === nameCapitalized && movie.id !== action.movieUpdated.id) );
      if(moviesArr.length>0)
       return{
          ...state,
          isMovieNameExists:true,
          showEditModal:false
       };
       else{

       const newMovieUpdated = {

        id: action.movieUpdated.id,
        Title:nameCapitalized,
        Year:action.movieUpdated.Year.value,
        Runtime:action.movieUpdated.Runtime.value,
        Genre:action.movieUpdated.Genre.value,
        Director:action.movieUpdated.Director.value
        }

       const oldMovies = [...state.movies]

       oldMovies.map(movie=>{

        if(movie.id==newMovieUpdated.id){
            movie.Title=newMovieUpdated.Title;
            movie.Year=newMovieUpdated.Year;
            movie.Runtime=newMovieUpdated.Runtime;
            movie.Genre=newMovieUpdated.Genre;
            movie.Director=newMovieUpdated.Director;

         }

       })
      return{
        ...state,
        movies:oldMovies,
        showEditModal:false
      };
    }
      case actionTypes.showEditModal:
      const movies = state.movies.filter((movie => movie.id === action.movieId));
      return{
          ...state,
          showEditModal:true,
          movie:movies[0]
      };
      case actionTypes.cancel_showEditModal:
      return{
          ...state,
          showEditModal:false
      };
      case actionTypes.remove_NameExistsMessage:
      return{
        ...state,
        isMovieNameExists:false,       
      } ;
      case actionTypes.setMovies:
      const dataLength = parseInt(action.moviesList.length)-1;
      const lastId = action.moviesList[dataLength].id;
      return{
       ...state,
       movies:action.moviesList,
       lastId:lastId
      };
      default:
      return state;
}

}


export default reducer;