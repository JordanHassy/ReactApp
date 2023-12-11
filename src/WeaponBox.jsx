import React from 'react';
import './App.css';


const WeaponBox = ({item}) => {
    return (
        <div>
            <div className='weaponBox'>
                <h1>Weapon</h1>
                <hr></hr>
                {
                    <h1>{item}</h1>
                }
            </div>
        </div>    
    )
}

export default WeaponBox;

