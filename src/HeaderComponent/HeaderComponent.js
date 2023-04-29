import React from 'react'
import  backToSchoolLogo  from '../backToSchool.jpeg'
import './HeaderComponent.css'

const HeaderComponent = () => {
    return (
        <div className='header-container'>
            <div className='header-pic'>
                <img 
                    src={backToSchoolLogo} 
                    alt='Back to school logo'  
                />
            </div>
             <div className='header-text'>
                <h1>Adopt A Student Sign Up</h1> 
                <hr /> 
                <p>
                    &ensp;Thank you for your willingness to support families with students in need this back to school season as a partnership with Families 
                    for Families. Your support is critical for helping to fill the backpacks of young children! Sign up below to sponsor a family of students. 
                    Then purchase the supplies and drop them off to 250 Braen Ave in Wyckoff on September ------ (detailed instructions will 
                    be given after signing up) to be delivered to the families. We are also in need of delivery drivers from --- to deliver the supplies. 
                    Suggested supplies include pencils, notebooks, folders or anything else you would like to include 
                </p>
            </div> 
            
        </div>
    )
}

export default HeaderComponent