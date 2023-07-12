import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import emailjs from '@emailjs/browser';
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
                      const templateParams = {
                        sponsorEmail: sponsorEmail,
                        firstName: firstName,
                        message: `Thank you for participating in our Adopt A Student Program!! You have chosen to sponsor 
                            ${mothersFirstName}'s ${numberOfChildren} student(s): <br /><br />${childrenInfo}<br />`                           
                    };
                    // emailjs.send('<YOUR_SERVICE_ID>','<YOUR_TEMPLATE_ID>', templateParams, '<YOUR_PUBLIC_KEY>')
                    emailjs.send("service_y7z7za8","template_gj7t0y6", templateParams, process.env.REACT_APP_EJ_API)
	                    .then((response) => {
	                        // console.log('SUCCESS!', response.status, response.text);
                          alert('Thank you! Your sign up was successful! Please check your inbox for a confirmation email. If you do not see it, please check your spam folder.')
                          window.location.reload()
	                      }, (err) => {
	                        // console.log('FAILED...', err);
                          alert('Email failed to send. Please try again, or email Families for Families if the problem continues')

	                      });                     
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
              Once you hit submit, a confirmation email will be sent shortly. <span style={{color: 'red'}}>If you do not see it, please check your spam folder.</span> 
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
