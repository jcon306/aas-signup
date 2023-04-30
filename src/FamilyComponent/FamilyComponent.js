import React from 'react'
import TableRow from '../TableRowComponent/TableRowComponent';
import './FamilyComponent.css'


const FamilyComponent = ({ mothersFirstName, numberOfChildren, childNames, childAges, childGrades, childGenders, sponsorEmail }) => {
    if (!mothersFirstName) return <div />;
    return (
        <div>
            <table width={"100%"}>
                <tbody>
                    <TableRow 
                        mothersFirstName={mothersFirstName} 
                        numberOfChildren={numberOfChildren} 
                        childNames={childNames}
                        childGenders={childGenders} 
                        childAges={childAges}
                        childGrades={childGrades}
                        sponsorEmail={sponsorEmail}  
                    />
                </tbody>
            </table>
            <hr />
        </div>
    );
  }

export default FamilyComponent