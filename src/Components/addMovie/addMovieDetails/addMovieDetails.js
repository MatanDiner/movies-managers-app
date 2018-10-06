import React,{Component} from 'react'
import './addMovieDetails.css'

class AddMovieDetails extends Component{


    state={
        addForm :{
        id:this.props.id,
        Title:{
            value:"",
            validation:{
                required:true

            } ,
            valid:false,
        },
        Year:{
            value:"",
            validation:{
                required:true,
                number:true
            } ,
            valid:false,

         },
        Runtime:{
            value:"",
            validation:{
                required:true

            } ,
            valid:false,
           
         },
        Genre:{
            value:"",
            validation:{
                required:true

            } ,
            valid:false,
          
         },
        Director:{
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
    this.setState({ErrorMessage:<p className="addMessage">must be not empty!</p>});
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
        this.setState({ErrorMessage:<p className="addMessage">must be a number!</p>})
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
    
    const stylesArr = ["inputElement","inputInValid"];
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
                 
                <div className="elementDiv">
                <input className={this.chooseStyle(arrElement.valid)} type={Text} placeholder={arrElement.id} onChange={(event)=>this.changeHandler(event,arrElement.id)}/>
                </div>
             )
             )}
              
            <div>
                
                <div className="OkButtonDiv">
                    <button className="OkButton" disabled={!this.state.formIsValid} onClick={()=>this.props.addClicked(this.state.addForm)}>Add</button>
                </div>
                <div className="cancelButtonDiv">
                     <button className="cancelButton" onClick={this.props.cancelClicked}>Cancel</button>
                </div>
            </div>
              <div>
                  {this.state.ErrorMessage}
              </div>

        </form> 

    );

    return(

      <div>
            {form}
      </div>


    );


}


}


export default AddMovieDetails;