import React, { useEffect, useState } from 'react';
import './InfoComponent.css';
import FamilyComponent from '../FamilyComponent/FamilyComponent';

const InfoComponent = ({ isChecked }) => {
  const [fetchedData, setFetchedData] = useState([]);
  let URL 

  if (isChecked) {
    URL = `https://sheet.best/api/sheets/b3bd3d89-c575-4f6f-b59a-81f9d5d5f16d/Sponsored/No`
  } else {
    URL = 'https://sheet.best/api/sheets/b3bd3d89-c575-4f6f-b59a-81f9d5d5f16d'
  }
 
    useEffect(() => {
       fetch(URL)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (isChecked && data[0]["Sponsor Email"]) {
            //setFetchedData(data)
            //console.log(data)
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
