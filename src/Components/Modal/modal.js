import React from 'react';
import './modal.css';
import  {Col} from 'reactstrap';

const Modal = (props) =>(


<div className="Modal">
    {props.children}
</div>


);

export default Modal;