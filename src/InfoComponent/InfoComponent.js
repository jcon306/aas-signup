import React, { useEffect, useState } from 'react';
import './InfoComponent.css';
import FamilyComponent from '../FamilyComponent/FamilyComponent';

const InfoComponent = () => {
  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    fetch('https://sheet.best/api/sheets/b3bd3d89-c575-4f6f-b59a-81f9d5d5f16d')
      .then((response) => response.json())
      .then((data) => {
        setFetchedData(data);
        // console.log(data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
