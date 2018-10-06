import React from 'react'
import './addMovie.css'

const addMovie = (props) => (

<div className="addMovieDiv">
<div className="addButtonDiv">
<button className="addButton" onClick={props.addMovieClicked}>Add</button>
</div>
    
</div>

);

export default addMovie; 