import React from "react";

const Furniture = ({
  height,
  width,
  length,
  setHeight,
  setLength,
  setWidth,
  error,
}) => {
  return (
    <>
      <label htmlFor="height">Height (CM)</label>
      <input
        type="number"
        id="height"
        value={height}
        placeholder="height"
        onChange={(e) => setHeight(e.target.value)}
      />
      {error && !height && (
        <p className="warn">Please, provide furniture height</p>
      )}
      {error && height <= 0 && (
        <p className="warn">Please, provide positive value</p>
      )}

      <label htmlFor="width">Width (CM)</label>
      <input
        type="number"
        id="width"
        value={width}
        placeholder="width"
        onChange={(e) => setWidth(e.target.value)}
      />
      {error && !width && (
        <p className="warn">Please, provide furniture width</p>
      )}
      {error && width <= 0 && (
        <p className="warn">Please, provide positive value</p>
      )}

      <label htmlFor="length">Length (CM)</label>
      <input
        type="number"
        id="length"
        value={length}
        placeholder="length"
        onChange={(event) => setLength(event.target.value)}
      />
      {error && !length && (
        <p className="warn">Please, provide furniture length</p>
      )}
      {error && length <= 0 && (
        <p className="warn">Please, provide positive value</p>
      )}

      <h4>
        Please provide dimensions in HxWxL format, when type: Furniture is
        selected
      </h4>
    </>
  );
};

export default Furniture;
