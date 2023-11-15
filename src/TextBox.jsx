import React from 'react';
import './App.css';


const TextBox = ({title, description, question, options}) => {
    return (
        <div>
            <div className='textBox'>
                <h1>{title}</h1>
                <p>{description}</p>
                <p>{question}</p>
                {options.map((options) =>(
                   <button onClick={() => {options.action()}}>{options.option}</button> 
                ))

                }
            </div>
        </div>    
    )
}

export default TextBox;

