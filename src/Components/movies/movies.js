import React,{Component} from 'react';
import Movie from './movie/movie'

import  {Jumbotron,Row,Col} from 'reactstrap';

class Movies extends Component{


render(){

return <Row>{this.props.movies.map( (movie,index) => {

return <Movie
img={movie.img}
title={movie.Title}
year={movie.Year}
runtime={movie.Runtime}
genre={movie.Genre}
director={movie.Director}
key={movie.id}
editClicked={()=>this.props.editClicked(movie.id)}
deleteClicked={()=>this.props.deleteClicked(movie.id)}
/>

}

)
}</Row>
}
}

export default Movies;



