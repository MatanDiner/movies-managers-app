import React,{Component} from 'react'
import classes from './addMovieForm.css'

class addMovieForm extends Component{


    state={
        addForm :{
        id:this.props.id,
        Title:{
            inputType:"text",
            value:"",
            validation:{
                required:true

            } ,
            valid:false,
        },
        Year:{
            inputType:"text",
            value:"",
            validation:{
                required:true,
                number:true
            } ,
            valid:false,

         },
        Runtime:{
            inputType:"text",
            value:"",
            validation:{
                required:true

            } ,
            valid:false,
           
         },
        Genre:{
            inputType:"text",
            value:"",
            validation:{
                required:true

            } ,
            valid:false,
          
         },
        Director:{
            inputType:"text",
            value:"",
            validation:{
                required:true

            } ,
            valid:false,
         
         }
        
    },
    formIsValid:false,
    ErrorMessage:""
}


checkValidations(value,rules){

let isValid = true;
let requiredflag = false;
if(rules.required){

isValid = value.trim() !== '' && isValid;
if(!isValid){
    this.setState({ErrorMessage:<p className={classes.addMessage}>must be not empty!</p>});
    requiredflag = true;
}
else{
this.setState({ErrorMessage:""})
}

}

if(rules.number){

    isValid = !isNaN(value)  && isValid ;
    if(!isValid){
        if(!requiredflag)
        this.setState({ErrorMessage:<p className={classes.addMessage}>must be a number!</p>})
}
else{
    this.setState({ErrorMessage:""})
}
}

return isValid;

}

changeHandler = (event,elementKey) =>{

    const addForm = {...this.state.addForm};
    const element = {...addForm[elementKey]};
    element.value = event.target.value;
    element.valid = this.checkValidations(element.value,element.validation);
   
    addForm[elementKey] = element;
    
    let formIsValid = true;
    let counter = 0;
    for(let key in addForm){
        counter++;
        if(counter>1){
        formIsValid = addForm[key].valid && formIsValid;
       
        }
    }

    this.setState({
        addForm:addForm,
        formIsValid:formIsValid
    })
}


chooseStyle(valid){
    
    const stylesArr = [classes.inputElement,classes.inputInValid];
    let style = stylesArr[0];
    if(!valid){
       style = stylesArr.join(' ');
    }
   return style;
}


render(){

    let addMovieArr = [];
    let counter = 0;
    for(let key in this.state.addForm){
        counter++;
        if(counter>1){
        addMovieArr.push({
            id:key,
            valid:this.state.addForm[key].valid
   
        }
        )
    }
    }

   

    let form = null;
    form = (

         <form>
             {addMovieArr.map(arrElement=>(
                 
                <div key={arrElement.id} className={classes.elementDiv}>
                <input className={this.chooseStyle(arrElement.valid)} type={arrElement.inputType} placeholder={arrElement.id} onChange={(event)=>this.changeHandler(event,arrElement.id)}/>
                </div>
             )
             )}
              
            <div className={classes.buttonsDiv}>
                
                <div className={classes.OkButtonDiv}>
                    <button className={classes.OkButton} disabled={!this.state.formIsValid} onClick={()=>this.props.addClicked(this.state.addForm)}>Add</button>
                </div>
                <div className={classes.cancelButtonDiv}>
                     <button className={classes.cancelButton} onClick={this.props.cancelClicked}>Cancel</button>
                </div>
            </div>
              <div>
                  {this.state.ErrorMessage}
              </div>

        </form> 

    );

    return(

      <div className={classes.formDiv}>
            {form}
      </div>


    );


}


}


export default addMovieForm;