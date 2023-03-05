import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dvd from "../components/Dvd";
import Book from "../components/Book";
import Furniture from "../components/Furniture";

const baseURL = "https://slung-summers.000webhostapp.com/v1";
let skuExists;

const Add = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);

  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [error, setError] = useState(false);

  const getApiData = async () => {
    await fetch(`${baseURL}/list-all.php`)
      .then((response) => response.json())
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getApiData();
    setError(false);
  }, [sku]);

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
    setError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    skuExists = items.some((item) => item.sku === sku);

    if (!sku || !name || !price || price <= 0 || !productType || skuExists) {
      setError(true);
    } else {
      if (productType === "dvd") {
        if (!size || size <= 0) {
          setError(true);
        } else if (error === false) {
          await fetch(`${baseURL}/insert/create-dvd.php`, {
            method: "POST",
            body: JSON.stringify({
              sku,
              name,
              price,
              size,
            }),
          })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

          navigate("/");
        }
      }
      if (productType === "book") {
        if (!weight || weight <= 0) {
          setError(true);
        } else if (error === false) {
          await fetch(`${baseURL}/insert/create-book.php`, {
            method: "POST",
            body: JSON.stringify({
              sku,
              name,
              price,
              weight,
            }),
          })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

          navigate("/");
        }
      }
      if (productType === "furniture") {
        if (
          !height ||
          height <= 0 ||
          !width ||
          width <= 0 ||
          !length ||
          length <= 0
        ) {
          setError(true);
        } else if (error === false) {
          await fetch(`${baseURL}/insert/create-furniture.php`, {
            method: "POST",
            body: JSON.stringify({
              sku,
              name,
              price,
              height,
              width,
              length,
            }),
          })
            .then((response) => response.json())
            .then((response) => console.log(response))
            .catch((error) => console.log(error));

          navigate("/");
        }
      }
    }
  };

  return (
    <>
      <div className="nav">
        <h1 className="navigation">Product Add</h1>
        <div className="btn">
          <button className="save" onClick={handleSubmit}>
            Save
          </button>
          <button className="cancel" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </div>

      <form id="product_form">
        <label htmlFor="sku">SKU:</label>
        <input
          type="text"
          id="sku"
          value={sku}
          placeholder="SKU"
          onChange={(e) => setSku(e.target.value)}
        />
        {error && !sku && <p className="warn">Please, provide product SKU</p>}
        {error && skuExists && <p className="warn">Please, provide Unique SKU</p>}

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <p className="warn">Please, provide product Name</p>}

        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          id="price"
          value={price}
          placeholder="Price in $"
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && (
          <p className="warn">Please, provide product price</p>
        )}
        {error && price <= 0 && (
          <p className="warn">Please, provide positive value</p>
        )}

        <label htmlFor="productType">Product Type:</label>
        <select
          id="productType"
          value={productType}
          onChange={handleProductTypeChange}
        >
          <option value="">Select product type</option>
          <option value="dvd" id="DVD">
            DVD
          </option>
          <option value="book" id="Book">
            Book
          </option>
          <option value="furniture" id="Furniture">
            Furniture
          </option>
        </select>
        {error && !productType && (
          <p className="warn">Please, provide product type</p>
        )}

        {productType === "dvd" && (
          <Dvd size={size} setSize={setSize} error={error} />
        )}

        {productType === "book" && (
          <Book weight={weight} setWeight={setWeight} error={error} />
        )}

        {productType === "furniture" && (
          <Furniture
            height={height}
            setHeight={setHeight}
            width={width}
            setWidth={setWidth}
            length={length}
            setLength={setLength}
            error={error}
          />
        )}
      </form>
    </>
  );
};

export default Add;
