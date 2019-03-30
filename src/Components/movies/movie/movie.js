import React, { Component } from 'react';
import classes from './movie.css';
//import { Jumbotron, Col, Button } from 'reactstrap';


class Movie extends Component {


  render() {
    let card = null;
    if (this.props.movie) {


      let movieArr = [];


      movieArr.push({

        ...this.props.movie
      })

      card = (

        <div className={classes.movieCard}>
          <div className={classes.cardContentDiv}>
            <table>
              <tbody>

                <tr>
                  <td colSpan="2">
                    <img src={require("../../../assets/images/" + movieArr[0].img + ".jpg")} />
                  </td>
                </tr>

                <tr>
                  <td colSpan="2">
                    <h1 className={classes.textOverFlow}>{movieArr[0].Title}</h1>
                  </td>
                </tr>

                {movieArr.map(item => {

                  return Object.keys(item).map((key, index) => {

                    if (key !== "Title" && key !== "img" && key !== "id")
                      return <tr key={index}>
                        <td className={classes.tableTd}>{key}:</td>
                        <td className={classes.tableTd}>{item[key]}</td>
                      </tr>
                  })

                })

                }


              </tbody>
            </table>


            <div className={classes.buttonsDiv}>
              <div className={classes.editButton}>
                <button  onClick={this.props.editClicked}>edit</button>
              </div>
              <div className={classes.deleteButton}>
                <button  onClick={this.props.deleteClicked}>delete</button>
              </div>
            </div>


          </div>

        </div>


      )

    }


    return card;




  }


}



export default Movie;