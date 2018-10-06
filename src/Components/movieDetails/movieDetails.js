import React,{Component} from 'react';
import './movieDetails.css'

    class movieDetails extends Component{
    
    state={
        form :{
        id:this.props.id,
        Title:{
            value:this.props.Title,
            validation:{
                required:true

            } ,
            valid:true,
            touched:false
        },
        Year:{
            value:this.props.Year,
            validation:{
                required:true,
                number:true
            } ,
            valid:true,
            touched:false
        },
        Runtime:{
            value:this.props.Runtime,
            validation:{
                required:true

            } ,
            valid:true,
            touched:false
        },
        Genre:{
            value:this.props.Genre,
            validation:{
                required:true

            } ,
            valid:true,
            touched:false
        },
        Director:{
            value:this.props.Director,
            validation:{
                required:true

            } ,
            valid:true,
            touched:false
        }
        
    },
    formIsValid:true,
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
    
        isValid = !isNaN(value) && isValid ;
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



     changeHandler = (event,elementIdentifier) =>{

        const updateForm = {...this.state.form};
        const UpdateElement = {...updateForm[elementIdentifier]};
        UpdateElement.value=event.target.value;

        UpdateElement.valid = this.checkValidations(UpdateElement.value,UpdateElement.validation);
        UpdateElement.touched = true;

        updateForm[elementIdentifier] = UpdateElement;

        let formIsValid = true;
        let counter = 0;
        for(let key in updateForm){
        counter++;
        if(counter>1){
        formIsValid = updateForm[key].valid && formIsValid;
       
        }
    }

        this.setState({form:updateForm,
                       formIsValid:formIsValid
        });
     }


     chooseStyle(valid,touched){
    
        const stylesArr = ["text","textInValid"];
        let style = stylesArr[0];
        if(!valid && touched){
           style = stylesArr.join(' ');
        }
       return style;
    }




render(){

const arr = [];
let counter = 0;
for(let key in this.state.form){
    counter++;
    if(counter>1){
    arr.push({
        id:key,
        value:this.state.form[key].value,
        valid:this.state.form[key].valid,
        touched:this.state.form[key].touched
    })
}
}



let form = null;
    form = (

         <form>
             
             {arr.map(arrElement=>(
                <div>
                <div className="content">
                <label>{arrElement.id}:</label>
                </div>
                <div className="textDiv">
                <input type={Text} defaultValue={arrElement.value} className={this.chooseStyle(arrElement.valid,arrElement.touched)} onChange={(event)=>this.changeHandler(event,arrElement.id)}/>
                </div>
                </div>
             )
             )}
            
            <div>
                
                <div className="OkButtonDiv">
                <button className="OkButton" disabled={!this.state.formIsValid} onClick={()=>this.props.saveClicked(this.state.form)}>save</button>
                </div>
                <div className="cancelButtonDiv">
                <button className="cancelButton" onClick={this.props.cancelClicked}>cancel</button>
                </div>
            </div>
            <div>
                  {this.state.ErrorMessage}
              </div>

        </form> 

    );


 return (
<div>

{form}

</div>
 );
 
}
}
export default movieDetails;


