import React from 'react';
import './App.css';


const InventoryBox = ({items}) => {
    return (
        <div>
            <div className='inventoryBox'>
                <h1>Inventory</h1>
                <hr></hr>
                {
                    items.map((items) =>(
                        <h1>{items}</h1>
                    ))
                }
            </div>
        </div>    
    )
}

export default InventoryBox;

