import React from 'react'
import './deleteQuery.css'

const deleteQuery = (props) =>(

    <div>
        <p>Are you sure that you want to delete the movie from the list?</p>
        <div className="No">
               <button className="cancelButton" onClick={props.NoClicked}>No</button>
        </div>
        <div className="Yes">
              <button className="OkButton" onClick={props.YesClicked}>Yes</button>
        </div>
    </div>


);

export default deleteQuery