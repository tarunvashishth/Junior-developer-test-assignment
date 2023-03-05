import React from "react";

const Dvd = ({ size, setSize, error }) => {
  return (
    <>
      <label htmlFor="size">Size (MB):</label>
      <input
        type="number"
        id="size"
        value={size}
        placeholder="Size in MB"
        onChange={(e) => setSize(e.target.value)}
      />
      {error && !size && <p className="warn">Please, provide DVD Size</p>}
      {error && size <= 0 && (
        <p className="warn">Please, provide positive value</p>
      )}

      <h4>Please provide Size in MB, when type: DVD is selected</h4>
    </>
  );
};

export default Dvd;
