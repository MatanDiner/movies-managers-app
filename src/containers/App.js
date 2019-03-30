import React, { Component } from 'react';
import './App.css';
import Layout from '../Components/Layout/layout'
import Movies from '../Components/movies/movies'
import Modal from '../Components/Modal/modal'
import DeleteQuery from '../Components/deleteQuery/deleteQuery'
import AddMovieForm from '../Components//addMovieForm/addMovieForm'
import EditMovieForm from '../Components/editMovieForm/editMovieForm'
import { connect } from 'react-redux'
import * as actions from '../store/actions'
import Search from '../Components/Search/Search'
import Spinner from '../Components/Spinner/Spinner'
class App extends Component {

  state = {
    searchValue: "",
    moviesFilter_found_movies: true
  }

  componentDidMount() {
    this.props.OnSetMovies();
  }

  addMovieHandler = (movie) => {
    this.props.OnAddMovie(movie, this.props.moviesList);
  }

  updateMovieHandler = (movie) => {
    this.props.OnUpdateMovie(movie, this.props.moviesList);
  }


  changedHandler = (e) => {

    const value = e.target.value.toLowerCase();
    const movies = this.props.moviesList.filter(movie => movie.Title.toLowerCase().includes(value));
    this.props.onSearchMovies(movies);
    this.setState({
      searchValue: value,
      moviesFilter_found_movies: movies.length > 0
    })
  }



  render() {
    let notFound = null;
    if (!this.state.moviesFilter_found_movies) {
      notFound = <div><h4 style={{ color: "red" }}>Not Found</h4></div>
    }

    let isMovieNameExists = null;
    if (this.props.isMovieNameExists) {

      isMovieNameExists = (

        <Modal>
          <div style={{ textAlign: "center" }}>
            <label>the name exists already,please choose diffrent name.</label>
            <div style={{ marginTop: "15px" }}>
              <button className="OkButton" onClick={this.props.OnRemoveNameExistsMessage}>OK</button>
            </div>
          </div>
        </Modal>

      );

    }


    let addMovieModal = null;
    if (this.props.showAddMovieModal) {

      addMovieModal = (
        <Modal>
          <AddMovieForm
            addClicked={this.addMovieHandler}
            cancelClicked={this.props.OnCancelShowAddMovieModal}

          />

        </Modal>

      );

    }


    let editedMovie = null;
    if (this.props.showEditModal) {
      editedMovie = (
        <Modal>
          <EditMovieForm
            id={this.props.movieDetailsForUpdating.id}
            Title={this.props.movieDetailsForUpdating.Title}
            Year={this.props.movieDetailsForUpdating.Year}
            Runtime={this.props.movieDetailsForUpdating.Runtime}
            Genre={this.props.movieDetailsForUpdating.Genre}
            Director={this.props.movieDetailsForUpdating.Director}
            cancelClicked={this.props.OnCancelShowEditModal}
            saveClicked={this.updateMovieHandler}
          />

        </Modal>);

    }

    let deletedMovie = null;
    if (this.props.showDeleteModal) {
      deletedMovie = (
        <Modal>
          <DeleteQuery

            NoClicked={this.props.OnCancelShowDeleteModal}
            YesClicked={this.props.OnRemoveMovie}
          />
        </Modal>

      );
    }
    
    let movies = <Layout><Spinner/></Layout>;
    if(this.props.moviesList && this.props.searchMovies){
    movies = (
      <Layout addMovieClicked={this.props.OnShowAddMovieModal}>
        {editedMovie}
        {deletedMovie}
        {addMovieModal}
        {isMovieNameExists}

        <div style={{ textAlign: "center" ,marginTop:"10px"}}>
          <Search value={this.state.searchValue} changed={this.changedHandler} />
          {notFound}
        </div>

        <Movies

          movies={this.props.searchMovies}
          editClicked={this.props.OnShowEditModal}
          deleteClicked={this.props.OnShowDeleteModal}
        />
      </Layout>
    )
    }
    
    return movies;

      

  

  }
}

const mapStateToProps = state => {

  return {
    moviesList: state.movies,
    searchMovies:state.searchMovies,
    showAddMovieModal: state.showAddMovieModal,
    showDeleteModal: state.showDeleteModal,
    showEditModal: state.showEditModal,
    movieDetailsForUpdating: state.updatedMovie,
    isMovieNameExists: state.isMovieNameExists
  };


}

const mapDisPatchToProps = disPatch => {

  return {
    OnSetMovies: () => disPatch(actions.setMovies()),
    OnAddMovie: (movie, moviesList) => disPatch(actions.addMovie(movie, moviesList)),
    OnRemoveMovie: () => disPatch(actions.removeMovie()),
    OnUpdateMovie: (movie, movieIndex, moviesList) => disPatch(actions.updateMovie(movie, movieIndex, moviesList)),
    OnCancelShowAddMovieModal: () => disPatch(actions.cancel_addMovieModal()),
    OnShowAddMovieModal: () => disPatch(actions.show_addMovieModal()),
    OnShowDeleteModal: (mId) => disPatch(actions.show_DeleteModal(mId)),
    OnCancelShowDeleteModal: () => disPatch(actions.cancel_DeleteModal()),
    OnShowEditModal: (mIndex) => disPatch(actions.showEditModal(mIndex)),
    OnCancelShowEditModal: () => disPatch(actions.cancel_showEditModal()),
    OnRemoveNameExistsMessage: () => disPatch(actions.remove_NameExistsMessage()),
    onSearchMovies: (movies) => disPatch(actions.SearchMovies(movies))
  };
}

export default connect(mapStateToProps, mapDisPatchToProps)(App);

