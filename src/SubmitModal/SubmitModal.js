import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './SubmitModal.css';

const SubmitModal = ({ mothersFirstName, mothersEmail, numberOfChildren, childNames, childAges, childGrades, childGenders, hideModel }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [sponsorEmail, setSponsorEmail] = useState("");
    
    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };
  
    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    };
  
    const handleSponsorEmailChange = (event) => {
      setSponsorEmail(event.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      fetch(`https://sheet.best/api/sheets/b3bd3d89-c575-4f6f-b59a-81f9d5d5f16d/Email/${mothersEmail}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data[0]["Sponsor Email"]);
              if (data[0]["Sponsor Email"]) {
                alert("Sorry, somebody just filled this spot. Please choose another family");
                window.location.reload();
              } else if (!firstName || !lastName || !sponsorEmail) {
                alert('Please fill out all the information fields.')
              } 
              else {
                const bodyData = {
                  "Sponsored": "Yes",
                  "Sponsor Email": sponsorEmail,
                  "Sponsor Last Name": lastName,
                  "Sponsor First Name": firstName,
                  "Sponsor Sign Up Date": new Date().toLocaleDateString('en-US')
                };
                fetch(`https://sheet.best/api/sheets/b3bd3d89-c575-4f6f-b59a-81f9d5d5f16d/Email/${mothersEmail}`, {
                  method: "PATCH",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(bodyData),
                })
                  .then((r) => {
                    if (r.status === 200) {
                      alert("Sign up successful!");
                      window.location.reload()
                    } else if (r.status !== 200) {
                      alert("There was a problem signing up");
                    }
                  })
                  .catch((error) => {
                    console.log(error.message);
                  });
              }
            })
            .catch((error) => {
              console.error(error);
            });
          
    };
    
    
  return (
    
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog className="ModalDialog">
        <Modal.Header className="ModalHeader" closeButton>
          <Modal.Title className="ModalTitle">Backpack Sign Up</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label className="FormLabel">First Name</Form.Label>
              <Form.Control
                className="FormInput"
                type="text"
                placeholder="Enter first name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label className="FormLabel">Last Name</Form.Label>
              <Form.Control
                className="FormInput"
                type="text"
                placeholder="Enter last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="FormLabel">Email address</Form.Label>
              <Form.Control
                className="FormInput"
                type="email"
                placeholder="Enter email"
                value={sponsorEmail}
                onChange={handleSponsorEmailChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicMessage">
              <Form.Label>
                Thank you for your generosity! Please make sure the information
                below is the correct family you have choose to select. A
                confirmation email with the information will be sent to your
                email shortly.
              </Form.Label>
              <h6>{mothersFirstName}'s {numberOfChildren} student(s)</h6>
              <ul>
                {Array.isArray(childNames) && childNames.map((child, index) => {
                    return (
                    <li key={index}>
                        <p className="childInfoLine">
                        <span className="childName">{childNames[index]}</span>, {childGenders[index]}, 
                        {childAges[index]} year's old, Grade: {childGrades[index]}
                        </p>
                    </li>
                    );
                })}
            </ul>
            </Form.Group>
          <Modal.Footer className="ModelFooter">
            <Button variant="secondary" onClick={hideModel}>Close</Button>
            <Button variant="primary" type="submit">Submit</Button>
          </Modal.Footer>
          </Form>
        </Modal.Body>

        
      </Modal.Dialog>
    </div>
  );
}

export default SubmitModal;
