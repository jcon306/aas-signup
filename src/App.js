import React from 'react'
import HeaderComponent from './HeaderComponent/HeaderComponent';
import InfoComponent from './InfoComponent/InfoComponent';
//import data from './data';
import './App.css';
//import axios from 'axios'

function App() {
     return (
        <div>
            <div className= 'container'>
                    <div className='section first'>
                        <HeaderComponent />
                    </div>  
                    <div className='section first'>
                        <InfoComponent />
                    </div>
                   
            </div>
        </div>
     )
}

export default App