import React from 'react'
import classes from'./layout.css'
const layout = (props) => (

    <div>
        <div className={classes.header}>

            <div>
                <div className={classes.addButtonDiv}>
                    <button className={classes.addButton} onClick={props.addMovieClicked}>Add</button>
                </div>

            </div>

        </div>
        <main>
            <div className={classes.main}>
            {props.children}
            </div>
        </main>
    </div>

)

export default layout;