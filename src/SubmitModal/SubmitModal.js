import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './SubmitModal.css';

const SubmitModal = ({ mothersFirstName, numberOfChildren, childNames, childAges, childGrades, childGenders }) => {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Backpack SignUp</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label className="FormLabel">First Name</Form.Label>
              <Form.Control
                className="FormInput"
                type="text"
                placeholder="Enter first name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label className="FormLabel">Last Name</Form.Label>
              <Form.Control
                className="FormInput"
                type="text"
                placeholder="Enter last name"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label className="FormLabel">Email address</Form.Label>
              <Form.Control
                className="FormInput"
                type="email"
                placeholder="Enter email"
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
                        <span className="childName">{childNames[index]}</span>, {childGenders[index]}, {childAges[index]} year's old, Grade: {childGrades[index]}
                        </p>
                    </li>
                    );
                })}
            </ul>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" closeButton>Close</Button>
          <Button variant="primary">Send Message</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default SubmitModal;
