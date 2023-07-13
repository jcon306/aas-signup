import React from 'react'
import TableRow from '../TableRowComponent/TableRowComponent';
import './FamilyComponent.css'


const FamilyComponent = ({ parentFirstName, parentEmail, numberOfChildren, childNames, childAges, childGrades, childGenders, sponsorEmail }) => {
    if (!parentFirstName) return <div />;
    return (
        <div>
            <table width={"100%"}>
                <tbody>
                    <TableRow 
                        parentFirstName={parentFirstName} 
                        parentEmail={parentEmail}
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