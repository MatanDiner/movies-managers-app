import React,{Component} from 'react';
import Movie from './movie/movie'



class Movies extends Component{


render(){

return <div>{this.props.movies.map( (movie,index) => {

return <Movie

movie = {movie}
key={movie.id}
editClicked={()=>this.props.editClicked(movie)}
deleteClicked={()=>this.props.deleteClicked(movie.id)}
/>

}

)
}</div>
}
}

export default Movies;



