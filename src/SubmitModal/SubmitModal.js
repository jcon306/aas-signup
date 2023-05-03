import React, { useState } from "react";
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
      fetch(process.env.REACT_APP_GS_URL_SUBMIT + mothersEmail)
            .then((response) => response.json())
            .then((data) => {
              if (data[0]["Sponsor Email"]) {
                alert("Sorry, somebody just filled this spot. Please choose another family");
                window.location.reload();
              } else if (!firstName || !lastName || !sponsorEmail) {
                alert('Please fill out all the information fields.')
              } 
              else {
                let childrenInfo = "";
                childNames.forEach((childName, index) => {
                  const childInfo = `${childName}, ${childGenders[index]}, ${childAges[index]} years old, Grade: ${childGrades[index]}`;
                  childrenInfo += `<p>${childInfo}</p>`;
                });

                const bodyData = {
                  "Sponsored": "Yes",
                  "Sponsor Email": sponsorEmail,
                  "Sponsor Last Name": lastName,
                  "Sponsor First Name": firstName,
                  "Sponsor Sign Up Date": new Date().toLocaleDateString('en-US')
                };
                fetch(process.env.REACT_APP_GS_URL_SUBMIT + mothersEmail, {
                  method: "PATCH",
                  mode: "cors",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(bodyData),
                })
                  .then((r) => {
                    if (r.status === 200) {
                      const config = {
                        SecureToken: process.env.REACT_APP_EJ_TOKEN,
                        To : sponsorEmail,
                        From : "consolinojoe@gmail.com",
                        Subject : "Thank you!",
                        Body : `Hello ${firstName}, thank you for your generosity! You have selected to support
                        ${mothersFirstName}'s ${numberOfChildren} students: <br /><br />Child Information:<br />${childrenInfo}<br />
                        Common needed supplies are: Pencils, pens, notebooks, markers and folders. Supplies can be dropped off anytime in August.<br />
                        Thank you once again for your generosity!<br /><br />
                        Sincerely,<br /><br />
                        Families For Families`
                      }
                      if (window.Email) {
                        window.Email.send(config).then(() =>{
                          alert("Sign up successful! Please check your inbox for a confirmation email. If you do not see it please check your spam folder.")
                          window.location.reload()
                        })

                      }
                     
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
