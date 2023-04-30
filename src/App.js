import React from 'react'
import HeaderComponent from './HeaderComponent/HeaderComponent';
import InfoComponent from './InfoComponent/InfoComponent';
import './App.css';
//import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

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
                   <div>
                   </div>
            </div>
        </div>
     )
}

export default App