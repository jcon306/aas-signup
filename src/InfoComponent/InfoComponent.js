import React, { useEffect, useState } from 'react';
import './InfoComponent.css';
import FamilyComponent from '../FamilyComponent/FamilyComponent';

const InfoComponent = ({ familySizeFilter, familyGendersFilter, hideFilter }) => {
  const [fetchedData, setFetchedData] = useState([]);
 
  let searchResults = 0
  // ---------------------------------- ADD API URL BELOW ----------------------------------------------------
  let URL = `https://sheet.best/api/sheets/69691e5c-affa-4614-95ac-7866672bbfea/query?Number Of Children=${familySizeFilter}&Child Gender(s)=${familyGendersFilter}&Sponsored=${hideFilter}`

    useEffect(() => {
       fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            setFetchedData(data)
        })
        .catch((error) => {
          console.error(error);
        });
        
    }, [URL]);

   
  return (
    <>
        <div className="data-container">
          {fetchedData.map((data, key) => {
              const childNames = data["Child Name(s)"].split(",");
              const childAges = data["Child Age(s)"].split(",");
              const childGenders = data["Child Gender(s)"].split(",");
              const childGrades = data["Child Grade(s)"].split(",");
              searchResults += 1
            return (
              <div key={key}>
                  <FamilyComponent
                    key={key}
                    parentFirstName={data["Parents's First Name"]}
                    parentEmail={data["Email"]}
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
              {familySizeFilter === '--'
                ? <h6 className='bottomText'>Please select a family size</h6>
                : searchResults === 0
                  ? <h6 className='bottomText'>0 families found. Please try a different filter.</h6>
                  : searchResults === 1
                    ? <h6 className='bottomText'>1 family found</h6>
                    : <h6 className='bottomText'>{searchResults} families found</h6>
              }        
        </div>
    </>
  );
};

export default InfoComponent;
