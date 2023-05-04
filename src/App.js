import React, { useState } from 'react'
import HeaderComponent from './HeaderComponent/HeaderComponent';
import InfoComponent from './InfoComponent/InfoComponent';
import './App.css';
//import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [familySize, setFamilySize] = useState('--')
    const [familyGenders, setFamilyGenders] = useState('*')
    const [isChecked, setIsChecked] = useState(false)
    const [hideFilter, setHideFilter] = useState('*')
 

    const handleFamilySizeChange = (e) => {
        setFamilySize(e.target.value)
    }

    const handleFamilyGenderChange = (e) => {
        setFamilyGenders(e.target.value)
    }

    const handleHideChange = () => {
        if (isChecked) {
            setHideFilter('*')
        } else {
            setHideFilter('No')
        }
    }

    const handleCheckChange = (e) => {
        setIsChecked(!isChecked)
        handleHideChange()
    }
   return (          
        <div>
            <div className= 'container'>
                    <div className='section first'>
                        <HeaderComponent />
                    </div>
                    
                    <div className='section sorting'>
                        <label className='sortByLabel'>Sort families by:</label>
                        <label className='sizeLabel infoLabel'>Size</label>
                        <select
                            onChange={handleFamilySizeChange}
                            className='familySizeDropdown infoOption'>
                                <option value='--'></option>
                                <option value='*'>Any</option>
                                <option value='1'>1 Student</option>
                                <option value='2'>2 Students</option>
                                <option value='3'>3 Students</option>
                                <option value='4'>4 Students</option>
                                <option value='5'>5 Students</option>
                                <option value='6'>6 Students</option>
                                <option value='7'>7 Students</option>
                                <option value='8'>8 Students</option>
                                <option value='9'>9 Students</option>
                                <option value='10'>10 Students</option>                                    
                            </select>  
                        <label className='genderLabel infoLabel'>Gender</label>
                        <select
                            onChange={handleFamilyGenderChange}
                            className='genderDropdown infoOption'>
                                <option value='*'>Any</option>
                                <option value='Male'>All Males</option>
                                <option value='Female'>All Females</option>                                    
                         </select> 
                         <label className='filledLabel infoLabel' htmlFor="unfilledOnly">Hide Filled Spots</label>
                        <input
                            className='infoOption' 
                            id="unfilledOnly"
                            type="checkbox" 
                            name="unfilledOnly"
                            value={isChecked}
                            onChange={handleCheckChange}
                         />
                    </div>
                    <div className='section first'>
                        <InfoComponent 
                            familySizeFilter={familySize} 
                            familyGendersFilter={familyGenders} 
                            hideFilter={hideFilter}
                        />
                    </div>
            </div>
        </div>
     )
}

export default App