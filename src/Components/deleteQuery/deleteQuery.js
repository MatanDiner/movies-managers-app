import React from 'react'
import classes from './deleteQuery.css'

const deleteQuery = (props) => (

    <div className={classes.deleteQuery}>
        <p className={classes.P_Query}>Are you sure that you want to delete the movie from the list?</p>
        <div className={classes.buttonsDiv}>
            <div className={classes.cancelButtonDiv}>
                <button className={classes.cancelButton} onClick={props.NoClicked}>No</button>
            </div>
            <div className={classes.OkButtonDiv}>
                <button className={classes.OkButton} onClick={props.YesClicked}>Yes</button>
            </div>
        </div>
    </div>


);

export default deleteQuery