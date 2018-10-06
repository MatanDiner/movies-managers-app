import React, { Component } from 'react';
import './movie.css';
import  {Jumbotron,Col,Button} from 'reactstrap';


class Movie extends Component{


render(){

  const table = (

    <table>
    
    <tr>
      <td className="tableTd">Year:</td>
      <td className="tableTd">{this.props.year}</td>
    </tr>
    <tr>
      <td className="tableTd">Runtime:</td>
      <td className="tableTd">{this.props.runtime}</td>
    </tr>
    <tr>
      <td className="tableTd">Genre:</td>
      <td className="tableTd">{this.props.genre}</td>
    </tr>
    <tr>
      <td className="tableTd">Director:</td>
      <td className="tableTd">{this.props.director}</td>
    </tr>
      
    </table>
    
    
    );

return <Col lg="3" md="6" xs="12"><Jumbotron>
<img className="img" src={require("../../../" + this.props.img)}/><br/>
<h1>{this.props.title}</h1><br/>
<div className="tableDiv">
  {table}
</div>

<div className="buttonsDiv">
<div className="editButton">
<Button color="primary" onClick={this.props.editClicked}>edit</Button>
</div>
<div className="deleteButton">
<Button color="primary" onClick={this.props.deleteClicked}>delete</Button>
</div>
</div>

</Jumbotron>
</Col>

}


}



export default Movie;