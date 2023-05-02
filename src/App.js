import React, { useState } from 'react'
import HeaderComponent from './HeaderComponent/HeaderComponent';
import InfoComponent from './InfoComponent/InfoComponent';
import './App.css';
//import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckChange = (e) => {
        setIsChecked(!isChecked)
    }

     return (
        <div>
            <div className= 'container'>
                    <div className='section first'>
                        <HeaderComponent />
                    </div>
                    <div className='section sortingBox'>
                        <input 
                            id="unfilledOnly"
                            type="checkbox" 
                            name="unfilledOnly"
                            checked={isChecked}
                            onChange={handleCheckChange}
                         />
                        <label className='sortingLabel' htmlFor="unfilledOnly">&ensp;Hide Filled Spots</label>
                    </div>
                    <div className='section first'>
                        <InfoComponent isChecked={isChecked} />
                    </div>
                   <div>
                   </div>
            </div>
        </div>
     )
}

export default App