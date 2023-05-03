import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import './TableRowComponent.css'
import SubmitModal from '../SubmitModal/SubmitModal';

function ChildInfo({ childNames, childGenders, childAges, childGrades }) {
  return (
    <ul>
      {Array.isArray(childNames) && childNames.map((child, index) => {
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

function TableRow({mothersFirstName,mothersEmail, numberOfChildren, childNames, childAges, childGrades, childGenders, sponsorEmail}) {
  //const [isExpanded, setIsExpanded] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const isExpanded = true

  // const handleRowClick = () => {
  //   setIsExpanded(true)
  // }

  const handleSignUpClick = (event) => {
    if (isExpanded) {
      event.stopPropagation();
    }
      setShowModal(true)
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <tr>
        <td>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              {!isExpanded ?
                <h6 className='motherInfo'> {mothersFirstName}'s {numberOfChildren} student(s)</h6> :
                <h6 className='motherInfo'> {mothersFirstName}'s {numberOfChildren} student(s)</h6>
              }
            </div>
            <div className="d-none d-md-block" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
              {sponsorEmail !== null ? <h6>Spot Filled</h6> : <h6>Available</h6>}
            </div>
            <div className='fixed-width'>
                {sponsorEmail ? (
                  <Button className="submitBtn" disabled={true}>Filled</Button>
                ) : (
                  <Button className="submitBtn" onClick={handleSignUpClick}>Sign Up</Button>
                )}
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
       <Modal show={showModal} onHide={handleCloseModal}>
        <SubmitModal
          mothersFirstName={mothersFirstName}
          mothersEmail={mothersEmail}
          numberOfChildren={numberOfChildren}
          childNames={childNames}
          childAges={childAges}
          childGrades={childGrades}
          childGenders={childGenders}
          hideModel={handleCloseModal}
        />
      </Modal>
    </>
  )
}

export default TableRow;
