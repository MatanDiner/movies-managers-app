import React, { Component } from 'react';
import './App.css';
import Movies from '../Components/movies/movies'
import axios from 'axios';
import Modal from '../Components/Modal/modal'
import MovieDetails from '../Components/movieDetails/movieDetails'
import DeleteQuery from '../Components/deleteQuery/deleteQuery'
import AddMovie from '../Components/addMovie/addMovie'
import AddMovieDetails from '../Components/addMovie/addMovieDetails/addMovieDetails'
import {connect} from 'react-redux'
import * as actionTypes from '../store/actions'
class App extends Component {
 
 
 
 componentDidMount(){

  axios.get('https://my-json-server.typicode.com/MatanDiner/jsonMovies/movies')
  .then(response => this.props.OnGetData(response.data)
  )
  .catch(error => {
    console.error(error)}
  );
 }

 

  render() {

let isMovieNameExists = null;
if(this.props.isMovieNameExists){

  isMovieNameExists = (

    <Modal>
      <div>
       <label>the name exists already,please choose diffrent name.</label>
       <div>
       <button className="OkButton" onClick={this.props.OnRemoveNameExistsMessage}>OK</button>
       </div>
        </div>
        </Modal>

  );

}


let addMovieModal = null;
if(this.props.showAddMovieModal){
   
  addMovieModal =(
<Modal>
    <AddMovieDetails
    addClicked={this.props.OnAddMovie}
    cancelClicked={this.props.OnCancelShowAddMovieModal}
    
    />
    
</Modal>

  );

}


    let editedMovie = null;
    if(this.props.showEditModal) {
      editedMovie =(
      <Modal>
      <MovieDetails
      id={this.props.movieDetailsForUpdating.id}
      Title={this.props.movieDetailsForUpdating.Title}
      Year={this.props.movieDetailsForUpdating.Year}
      Runtime={this.props.movieDetailsForUpdating.Runtime}
      Genre={this.props.movieDetailsForUpdating.Genre}
      Director={this.props.movieDetailsForUpdating.Director}
      cancelClicked={this.props.OnCancelShowEditModal}
      saveClicked={this.props.OnUpdateMovie}
      />
       
      </Modal> );
    
    }

  let deletedMovie = null;
  if(this.props.showDeleteModal){
    deletedMovie=(
<Modal>
<DeleteQuery

NoClicked={this.props.OnCancelShowDeleteModal}
YesClicked={this.props.OnRemoveMovie}
/>
</Modal>

    );
  }


    return (
      <div className='App'>
      <AddMovie
      addMovieClicked = {this.props.OnShowAddMovieModal}
      />
      {editedMovie}
      {deletedMovie}
      {addMovieModal}
      {isMovieNameExists}
      <Movies
      
      movies={this.props.moviesList}
      editClicked={this.props.OnShowEditModal}
      deleteClicked={this.props.OnShowDeleteModal}
      />
      </div>
    );
  
}
}

const mapStateToProps = state =>{

  return{
    moviesList : state.movies,
    showAddMovieModal:state.showAddMovieModal,
    showDeleteModal:state.showDeleteModal,
    showEditModal:state.showEditModal,
    movieDetailsForUpdating:state.movie,
    isMovieNameExists:state.isMovieNameExists
  };


}

const mapDisPatchToProps = disPatch =>{

  return{
    OnAddMovie : (movie) => disPatch ({type:actionTypes.Add_movie,movieObj:movie}),
    OnRemoveMovie : () => disPatch ({type:actionTypes.remove_movie}),
    OnUpdateMovie : (movie) => disPatch ({type:actionTypes.update_movie,movieUpdated:movie}),
    OnCancelShowAddMovieModal:()=>disPatch ({type:actionTypes.cancel_addMovieModal}),
    OnShowAddMovieModal:()=>disPatch ({type:actionTypes.show_addMovieModal}),
    OnShowDeleteModal:(mId)=>disPatch ({type:actionTypes.show_DeleteModal,movieId:mId}),
    OnCancelShowDeleteModal:()=>disPatch ({type:actionTypes.cancel_DeleteModal}),
    OnShowEditModal:(mId)=>disPatch ({type:actionTypes.showEditModal,movieId:mId}),
    OnCancelShowEditModal:()=>disPatch ({type:actionTypes.cancel_showEditModal}),
    OnRemoveNameExistsMessage:()=>disPatch ({type:actionTypes.remove_NameExistsMessage}),
    OnGetData:(data)=> disPatch ({type:actionTypes.setMovies,moviesList:data})
  };
}

export default connect(mapStateToProps,mapDisPatchToProps)(App);

