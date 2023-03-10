import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const baseURL = "https://slung-summers.000webhostapp.com/v1";

const List = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);

  const getApiData = async () => {
    await fetch(`${baseURL}/list-all.php`)
      .then((response) => response.json())
      .then((response) => setItems(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getApiData();
  }, []);

  function handleCheckbox(e) {
    const { value, checked } = e.target;
    if (checked) {
      setCheckboxes([...checkboxes, parseInt(value)]);
    } else {
      setCheckboxes(checkboxes.filter((e) => e !== parseInt(value)));
    }
  }

  async function handleDelete() {
    await fetch(`${baseURL}/delete.php`, {
      method: "POST",
      body: JSON.stringify({ id: checkboxes }),
    })
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((error) => console.log(error));

    getApiData();
  }

  return (
    <>
      <div className="nav">
        <h1 className="navigation">Product List</h1>
        <div className="btn">
          <button className="add" onClick={() => navigate("/add")}>
            ADD
          </button>
          <button id="delete-product-btn" onClick={() => handleDelete()}>
            MASS DELETE
          </button>
        </div>
      </div>

      <div className="container">
        {items &&
          items.map((item) => (
            <div className="card" key={item.id}>
              <input
                type="checkbox"
                value={item.id}
                className="delete-checkbox"
                onChange={(e) => handleCheckbox(e)}
              />
              <div className="card-body">
                <p className="card-text">{item.sku}</p>
                <h5 className="card-text">{item.name}</h5>
                <p className="card-text">{item.price} $</p>
                <p className="card-text">{item.attribute}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default List;
