import React from 'react'
import './InfoComponent.css'
import { data } from '../data'
import FamilyComponent from '../FamilyComponent/FamilyComponent'

const InfoComponent = () => {
    return (
        <>
            <div className='data-container'>
                {data.map((data, key) => {
                    return (
                        <div key={key}>
                            <FamilyComponent
                                key={key}
                                mothersFirstName={data["Mother's First Name"]}
                                numberOfChildren={data["Number Of Children"]}
                                childNames={data["Child Name(s)"]}
                                childGenders={data["Child Gender(s)"]}
                                childAges={data["Child Age(s)"]}
                                childGrades={data["Child Grade(s)"]}
                                sponsorEmail={data["Sponsor Email"]}
                            />
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default InfoComponent