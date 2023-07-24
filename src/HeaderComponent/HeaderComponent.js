import React from 'react'
import backToSchoolLogo  from '../backToSchool.jpeg'
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
                    &ensp;Thank you for your willingness to help students in need start the school year off right! As you know, being 
                    prepared is an important step toward a student's success. Providing a backpack filled with needed school supplies is 
                    one way you can help them succeed. Choose a family below that you would like to purchase backpacks filled with the 
                    school supplies for.  Once you sign up, you will then receive an email with a link to a supply list specific to your student. 
                    You will then purchase the supplies and drop them off to Families for Families, 250 Braen Ave in Wyckoff on August 26th between 
                    10-12 to be delivered to the families (we can make arrangements for early drop offs). We will be adding more students to the list 
                    over the next few weeks. If there are no more students available, please check back later. Thank you! 
 
                </p>
            </div> 
            
        </div>
    )
}

export default HeaderComponent