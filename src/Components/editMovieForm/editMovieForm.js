import React, { Component } from 'react';
import classes from './editMovieForm.css'

class EditMovieForm extends Component {

    state = {
        form: {
            id: this.props.id,
            Title: {
                inputType: "text",
                value: this.props.Title,
                validation: {
                    required: true

                },
                valid: true,
                touched: false
            },
            Year: {
                inputType: "text",
                value: this.props.Year,
                validation: {
                    required: true,
                    number: true
                },
                valid: true,
                touched: false
            },
            Runtime: {
                inputType: "text",
                value: this.props.Runtime,
                validation: {
                    required: true

                },
                valid: true,
                touched: false
            },
            Genre: {
                inputType: "text",
                value: this.props.Genre,
                validation: {
                    required: true

                },
                valid: true,
                touched: false
            },
            Director: {
                inputType: "text",
                value: this.props.Director,
                validation: {
                    required: true

                },
                valid: true,
                touched: false
            }

        },
        formIsValid: true,
        ErrorMessage: ""
    }


    checkValidations(value, rules) {

        let isValid = true;
        let requiredflag = false;
        if (rules.required) {

            isValid = value.trim() !== '' && isValid;
            if (!isValid) {
                this.setState({ ErrorMessage: <p className={classes.addMessage}>must be not empty!</p> });
                requiredflag = true;
            }
            else {
                this.setState({ ErrorMessage: "" })
            }

        }

        if (rules.number) {

            isValid = !isNaN(value) && isValid;
            if (!isValid) {
                if (!requiredflag)
                    this.setState({ ErrorMessage: <p className={classes.addMessage}>must be a number!</p> })
            }
            else {
                this.setState({ ErrorMessage: "" })
            }
        }

        return isValid;

    }



    changeHandler = (event, elementIdentifier) => {

        const updateForm = { ...this.state.form };
        const UpdateElement = { ...updateForm[elementIdentifier] };
        UpdateElement.value = event.target.value;

        UpdateElement.valid = this.checkValidations(UpdateElement.value, UpdateElement.validation);
        UpdateElement.touched = true;

        updateForm[elementIdentifier] = UpdateElement;

        let formIsValid = true;
        let counter = 0;
        for (let key in updateForm) {
            counter++;
            if (counter > 1) {
                formIsValid = updateForm[key].valid && formIsValid;

            }
        }

        this.setState({
            form: updateForm,
            formIsValid: formIsValid
        });
    }


    chooseStyle(valid, touched) {

        const stylesArr = [classes.text, classes.textInValid];
        let style = stylesArr[0];
        if (!valid && touched) {
            style = stylesArr.join(' ');
        }
        return style;
    }




    render() {

        const arr = [];
        let counter = 0;
        for (let key in this.state.form) {
            counter++;
            if (counter > 1) {
                arr.push({
                    id: key,
                    inputType: this.state.form[key].inputType,
                    value: this.state.form[key].value,
                    valid: this.state.form[key].valid,
                    touched: this.state.form[key].touched
                })
            }
        }



        let form = null;
        form = (
            <div className={classes.formDiv}>
                <form>

                    <table>
                        <tbody>
                            {arr.map(arrElement => (
                                <tr key={arrElement.id}>
                                    <td>
                                        <label className={classes.textTitle}>{arrElement.id}:</label>
                                    </td>
                                    <td>
                                        <input type={arrElement.inputType} defaultValue={arrElement.value} className={this.chooseStyle(arrElement.valid, arrElement.touched)} onChange={(event) => this.changeHandler(event, arrElement.id)} />
                                    </td>
                                </tr>
                            )
                            )}
                            <tr>
                                <td>
                                    <button className={classes.OkButton} disabled={!this.state.formIsValid} onClick={() => this.props.saveClicked(this.state.form)}>save</button>
                                </td>
                                <td>
                                    <button className={classes.cancelButton} onClick={this.props.cancelClicked}>cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <label style={{color:"red"}}>{this.state.ErrorMessage}</label>
                                </td>
                            </tr>
                        </tbody>
                    </table>


                    {/*

                      {arr.map(arrElement => (
                        <div key={arrElement.id}>
                            <div className={classes.content}>
                                <label>{arrElement.id}:</label>
                            </div>
                            <div className={classes.textDiv}>
                                <input type={arrElement.inputType} defaultValue={arrElement.value} className={this.chooseStyle(arrElement.valid, arrElement.touched)} onChange={(event) => this.changeHandler(event, arrElement.id)} />
                            </div>
                        </div>
                    )
                  )}    

                    
                    <div className={classes.buttonsDiv}>

                        <div className={classes.OkButtonDiv}>
                            <button className={classes.OkButton} disabled={!this.state.formIsValid} onClick={() => this.props.saveClicked(this.state.form)}>save</button>
                        </div>
                        <div className={classes.cancelButtonDiv}>
                            <button className={classes.cancelButton} onClick={this.props.cancelClicked}>cancel</button>
                        </div>
                    </div>
                    <div>
                        {this.state.ErrorMessage}
                    </div>

                      */}

                </form>

            </div>

        );


        return form;


    }
}

export default EditMovieForm;


