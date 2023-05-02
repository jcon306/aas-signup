import React, { useEffect, useState } from 'react';
import './InfoComponent.css';
import FamilyComponent from '../FamilyComponent/FamilyComponent';

const InfoComponent = ({ isChecked }) => {
  const [fetchedData, setFetchedData] = useState([]);
  let URL 

  if (isChecked) {
    URL = process.env.REACT_APP_GS_URL_SORT
  } else {
    URL = process.env.REACT_APP_GS_URL
  }
 
    useEffect(() => {
       fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          if (isChecked && data[0]["Sponsor Email"]) {

            return
          } else {
            setFetchedData(data)
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, [URL, isChecked]);

  return (
    <>
      <div className="data-container">
        {fetchedData.map((data, key) => {
            const childNames = data["Child Name(s)"].split(", ");
            const childAges = data["Child Age(s)"].split(", ");
            const childGenders = data["Child Gender(s)"].split(", ");
            const childGrades = data["Child Grade(s)"].split(", ");
          return (
            <div key={key}>
              <FamilyComponent
                key={key}
                mothersFirstName={data["Mother's First Name"]}
                mothersEmail={data["Email"]}
                numberOfChildren={data["Number Of Children"]}
                childNames={childNames}
                childGenders={childGenders}
                childAges={childAges}
                childGrades={childGrades}
                sponsorEmail={data["Sponsor Email"]}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default InfoComponent;
