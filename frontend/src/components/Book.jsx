import React from "react";

const Book = ({ weight, setWeight, error }) => {
  return (
    <>
      <label htmlFor="weight">Weight (KG):</label>
      <input
        type="number"
        id="weight"
        value={weight}
        placeholder="Weight in KG"
        onChange={(e) => setWeight(e.target.value)}
      />
      {error && !weight && <p className="warn">Please, provide Book weight</p>}
      {error && weight <= 0 && (
          <p className="warn">Please, provide positive value</p>
        )}

      <h4>Please provide weight in Kg, when type: Book is selected</h4>
    </>
  );
};

export default Book;
