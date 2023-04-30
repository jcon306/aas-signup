import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import './TableRowComponent.css'

function ChildInfo({ childNames, childGenders, childAges, childGrades }) {
  return (
    <ul>
      {childNames.map((child, index) => {
        return (
          <li key={index}>
            <p className="childInfoLine">
              <span className="childName">{childNames[index]}</span>, {childGenders[index]}, {childAges[index]} year's old, Grade: {childGrades[index]}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function TableRow({mothersFirstName, numberOfChildren, childNames, childAges, childGrades, childGenders, sponsorEmail}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleRowClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <tr onClick={handleRowClick}>
        <td>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {!isExpanded ?
                <h6 className='motherInfo'>&rArr; {mothersFirstName}'s {numberOfChildren} student(s)</h6> :
                <h6 className='motherInfo'>&dArr; {mothersFirstName}'s {numberOfChildren} student(s)</h6>
              }
            </div>
            <div className="d-none d-md-block" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
              {sponsorEmail === '' ? <h6>Not Filled</h6> : <h6>Filled By {sponsorEmail}</h6>}
            </div>
            <div className='fixed-width'>
              <Button className="submitBtn" disabled={sponsorEmail !== ""}>
                {sponsorEmail !== "" ? "Filled" : "Sign Up"}
              </Button>
            </div>
          </div>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td>
            <ChildInfo
              childNames={childNames}
              childGrades={childGrades}
              childAges={childAges}
              childGenders={childGenders}
            />
          </td>
        </tr>
      )}
    </>
  )
}

export default TableRow;
